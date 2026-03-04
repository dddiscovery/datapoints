#!/usr/bin/env python3
"""
Build a compact JSON payload for the mini interactive windows embedded in
_posts/2026-03-01-Zung-Ru-Lin.md.

Data source (local): mlp-data-intro/data/final-counts
  - full-civic-data.parquet
  - full-rai-data.parquet

We intentionally keep this JSON:
  - small enough to load quickly in a blog post
  - faithful to the dashboard definitions:
      value = <indicator>Norm  (share of articles in each country-month)
      peak markers = <indicator>NormShock (binary flag) for that country-month

Output:
  - dashboard_data.json (same folder)
"""

from __future__ import annotations

import json
from pathlib import Path

import pandas as pd


HERE = Path(__file__).resolve().parent
DEFAULT_DATA_DIR = Path("/Users/zungrulin/Documents/GitHub/mlp-data-intro/data/final-counts")

START_MONTH = "2012-01"
END_MONTH = "2025-10"
PER_N_DEFAULT = 1000


CIVIC_INDICATORS = [
    "arrest",
    "censor",
    "electionactivity",
    "electionirregularities",
    "cooperate",
    "coup",
    "defamationcase",
    "disaster",
    "legalaction",
    "legalchange",
    "martiallaw",
    "mobilizesecurity",
    "corruption",
    "activism",
    "protest",
    "purge",
    "raid",
    "threaten",
    "violencelethal",
    "violencenonlethal",
]

RAI_INDICATORS = [
    "arms_transfer_security_aid_assistance",
    "bribery_economic_corruption",
    "cyber_attack",
    "diplomatic_action",
    "diplomatic_mediation",
    "diplomatic_meeting",
    "diplomatic_statement",
    "diplomatic_ties",
    "foreign_aid_assistance",
    "foreign_investment",
    "intelligence_counterintelligence",
    "joint_security_force_exercise",
    "media_campaign_intervention",
    "military_activity",
    "political_process_policy_intervention",
    "security_engagement",
    "social_academic_cultural_activity",
    "tech_transfer_investment",
    "trade_agreement_exchange",
    "trade_financial_sanction",
    "transnational_organization_crime",
]


def _indicator_label(ind_id: str) -> str:
    return ind_id.replace("_", " ").strip().title()


def _month_list(start: str, end: str) -> list[str]:
    return pd.period_range(start=start, end=end, freq="M").astype(str).tolist()


def _ensure_datetime(df: pd.DataFrame, col: str = "date") -> pd.DataFrame:
    if col in df.columns:
        df[col] = pd.to_datetime(df[col], errors="coerce")
    return df


def _filter_month_window(df: pd.DataFrame, months: list[str]) -> pd.DataFrame:
    df = df.copy()
    df["month_str"] = df["date"].dt.to_period("M").astype(str)
    return df[df["month_str"].isin(months)].copy()


def _shock_col_for(ind_id: str, df_cols: set[str]) -> str:
    """
    Prefer <id>NormShock (what the dashboards use).
    Fall back to <id>_normShock if needed.
    """
    c1 = f"{ind_id}NormShock"
    if c1 in df_cols:
        return c1
    c2 = f"{ind_id}_normShock"
    if c2 in df_cols:
        return c2
    raise KeyError(f"Missing shock column for {ind_id}: tried {c1} and {c2}")


def _build_matrix(
    df: pd.DataFrame,
    *,
    countries: list[str],
    months: list[str],
    indicators: list[str],
) -> tuple[dict[str, list[list[float]]], dict[str, list[list[int]]], dict[str, float]]:
    """
    Returns:
      values_by_indicator[ind] = matrix[country_idx][month_idx] of <ind>Norm (float)
      shocks_by_indicator[ind] = list-of-lists per country of month_idx where shock flag == 1
      max_by_indicator[ind] = max value in values matrix (for map scaling)
    """
    df_cols = set(df.columns)
    month_index = {m: i for i, m in enumerate(months)}

    values_by_indicator: dict[str, list[list[float]]] = {}
    shocks_by_indicator: dict[str, list[list[int]]] = {}
    max_by_indicator: dict[str, float] = {}

    # Pre-index rows by (country, month_str) for fast lookup.
    # We keep only the columns we need to reduce memory churn.
    keep_cols = ["country", "month_str"]
    for ind in indicators:
        keep_cols.append(f"{ind}Norm")
        keep_cols.append(_shock_col_for(ind, df_cols))
    sub = df[keep_cols].copy()

    # Build lookup per country once.
    grouped = {c: g.set_index("month_str", drop=False) for c, g in sub.groupby("country", sort=False)}

    for ind in indicators:
        val_col = f"{ind}Norm"
        shock_col = _shock_col_for(ind, df_cols)

        mat: list[list[float]] = []
        shock_lists: list[list[int]] = []
        ind_max = 0.0

        for country in countries:
            g = grouped.get(country)
            if g is None:
                # country missing entirely: fill zeros
                row_vals = [0.0] * len(months)
                mat.append(row_vals)
                shock_lists.append([])
                continue

            # Reindex to full month window; fill missing as 0.0
            gv = pd.to_numeric(g[val_col], errors="coerce")
            gs = pd.to_numeric(g[shock_col], errors="coerce")
            v = gv.reindex(months).fillna(0.0).astype(float).tolist()
            s = gs.reindex(months).fillna(0.0).astype(float).tolist()

            # Round to keep JSON smaller (values are proportions; 6dp is plenty here).
            v = [round(float(x), 6) for x in v]

            # Shock list = month indices where flag > 0
            idxs = [month_index[m] for m, flag in zip(months, s) if flag and flag > 0]

            mat.append(v)
            shock_lists.append(idxs)
            if v:
                ind_max = max(ind_max, max(v))

        values_by_indicator[ind] = mat
        shocks_by_indicator[ind] = shock_lists
        max_by_indicator[ind] = float(ind_max)

    return values_by_indicator, shocks_by_indicator, max_by_indicator


def main() -> None:
    months = _month_list(START_MONTH, END_MONTH)

    civic_path = DEFAULT_DATA_DIR / "full-civic-data.parquet"
    rai_path = DEFAULT_DATA_DIR / "full-rai-data.parquet"

    civic = pd.read_parquet(civic_path)
    civic = _ensure_datetime(civic)
    civic = _filter_month_window(civic, months)

    # Establish canonical country order from civic (matches the dashboard).
    countries = sorted(civic["country"].dropna().astype(str).unique().tolist())

    # Civic matrices
    civic_vals, civic_shocks, civic_max = _build_matrix(
        civic,
        countries=countries,
        months=months,
        indicators=CIVIC_INDICATORS,
    )

    # RAI (combined influencer only)
    rai = pd.read_parquet(rai_path)
    rai = _ensure_datetime(rai)
    rai = rai[rai["influencer"].astype(str).str.lower() == "combined"].copy()
    rai = _filter_month_window(rai, months)

    # Ensure country list is consistent (intersection), but keep civic order.
    rai_countries = set(rai["country"].dropna().astype(str).unique().tolist())
    countries = [c for c in countries if c in rai_countries]

    rai_vals, rai_shocks, rai_max = _build_matrix(
        rai,
        countries=countries,
        months=months,
        indicators=RAI_INDICATORS,
    )

    payload = {
        "meta": {
            "start_month": START_MONTH,
            "end_month": END_MONTH,
            "month_count": len(months),
            "country_count": len(countries),
            "per_n_default": PER_N_DEFAULT,
            "default_indicator": {"civic": "protest", "rai": "diplomatic_statement"},
            "rai_influencer": "combined",
            "max_values": {"civic": civic_max, "rai": rai_max},
        },
        "months": months,
        "countries": countries,
        "indicators": {
            "civic": [{"id": i, "label": _indicator_label(i)} for i in CIVIC_INDICATORS],
            "rai": [{"id": i, "label": _indicator_label(i)} for i in RAI_INDICATORS],
        },
        "values": {"civic": civic_vals, "rai": rai_vals},
        "shock_months": {"civic": civic_shocks, "rai": rai_shocks},
    }

    out_path = HERE / "dashboard_data.json"
    out_path.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {out_path} ({out_path.stat().st_size/1024/1024:.2f} MB)")


if __name__ == "__main__":
    main()

