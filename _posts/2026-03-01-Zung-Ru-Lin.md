---
layout: blog
# title: "Research and Data: A Stream Through the Lens of the Contentious Politics"
title: "Turning Fast-moving Crises into Structured, Revisitable Evidence"
subtitle: "dashboards + information extraction as research deliverables"
authors: ["[Zung-Ru Lin](https://zungru.com/)"]
author_pic: ["/assets/images/authors/zung_ru_lin.png"]
author_title: ["Chief Data Scientist & Co-PI of MLP @ PDRI-DevLab"]
date: 2026-03-04
permalink: /dashboards-as-research-deliverables/
summary: "A narrative essay on how to keep sequence and evidence visible under polarization: turning fast-moving crises into structured, revisitable context."
---

<div class="prelude" markdown="1">
This post opens with a **social-pressure concern**. In fast, polarized news cycles, interpretation can drift away from chronology, and the first section explains why that matters for public judgment and for research.

It then moves to a concrete **social-good case** from the [Machine Learning for Peace project](https://web.sas.upenn.edu/mlp-devlab/) at [PDRI-DevLab](https://pdri-devlab.upenn.edu/), where multilingual reporting is turned into structured civic and RAI signals and rendered in interactive dashboard views.

The middle sections provide the **technical path** for building an impact-driven artifact with reader-contract design, reproducible pipelines, auditable inputs, and practical tools that keep outputs inspectable and citable.
</div>

## From the saddening to the waking: when information performs

We all, at one point, get tired of chasing the news and watching the same event split into incompatible realities. Even when outlets agree on the facts, they sort them into stories that defend a long-term stance across sources. The facts do not disappear, but they arrive packaged with incentives: certainty over doubt, performance over patience, allegiance over curiosity. In polarized environments, information does not only inform; it recruits. It hardens impressions, rewards confirmation, and turns ambiguity into a kind of moral failure. Technology accelerates the process. Feeds optimize for engagement, and generative systems can now assemble plausible narratives at the speed of reaction, long before most readers have had a chance to check the underlying sequence.

The other fatigue is political, not technological. In public argument, a single tactical move can be praised as "effective" even when its ethics, legality, and downstream consequences are murkier. Those consequences arrive asymmetrically: leaders get credit in the short term, while people on the ground absorb the long term. When domestic politics are already polarized and radicalized, this distortion becomes contagious. It trains audiences to treat governance as spectacle and to treat doubt as disloyalty.

So I have started to care less about whose framing wins the hour and more about whether we can still see the sequence underneath it, including what remains uncertain. That is part of why the last days around Iran have felt so clarifying. The same interval gets framed as diplomacy or deterrence, precaution or provocation, even tragedy, depending on where you stand, and allegiance starts doing the work chronology should be doing. I do not think sequence will settle the argument. I think it keeps the argument tethered to time, which is already something.

Put the U.S. incumbent’s political posture in this crisis aside for a moment; this does not require romanticizing Tehran, nor ignoring the long record of repression, proxy warfare, and internal violence under Ali Khamenei. It also does not require pretending that Iranians have not suffered under that system for decades, or that change would be a simple loss. It requires something simpler and more demanding, refusing to let outrage, loyalty, or exhaustion erase the timeline. The timeline does not answer the question, but it keeps us from answering a different one.

### Underperforms, the storyline nobody sees

Then the pace changed. Some of the enabling moves were visible earlier, but as of March 1, 2026, the crisis can be read, at minimum, as a sequence rather than a set of isolated headlines.

On February 5, Reuters summarized how the U.S. position had widened beyond the nuclear file to include Iran's ballistic missiles, its regional armed networks, and its internal record.[^1] On February 26, Oman's mediator described the Geneva talks as making significant progress even as Reuters reported a large U.S. military buildup and growing fear that diplomacy had become the last narrow bridge before war.[^2] The next day, Reuters reported that one of the administration's public missile claims was not backed by U.S. intelligence.[^3] In fast crises, the public rationale can race ahead of what can be substantiated. That gap matters because it reshapes what escalation feels like "pre-authorized" to different audiences.

By February 28, the story moved from signaling to action. The U.N. Security Council was called into emergency session after U.S. and Israeli strikes on Iran and retaliation across the region.[^4] Briefing the Council, the U.N. Secretary-General warned that the exchange posed a grave threat to international peace and security, and urged de-escalation and a return to negotiations.[^5] On March 1, Iranian state media confirmed Ali Khamenei’s death in the strikes. Reuters and AP reported the announcement and the immediate uncertainty around succession.[^6] That same day, Reuters and AP reported protests in Pakistan and Iraq; in Karachi, crowds reached the U.S. consulate and violence left deaths and injuries.[^7]

Putting those steps next to each other does not settle what they mean, but it keeps the order from disappearing. Widened conditions, diplomacy under threat, contested claims, kinetic escalation, emergency diplomacy, leadership shock, and cross-border reaction. Later, once the moment has passed, that order is what lets you revisit the week without rebuilding it from fragments and impressions.

Once that sequence is visible, some public misreadings become easier to spot. People are not necessarily bad at facts; they are often being asked to reason without the timeline. A headline tells them what just happened. It rarely tells them what had already been preparing the ground beneath it, which is one reason diplomacy is interpreted so unevenly. By the time diplomacy becomes visible, it is frequently already encircled by threat, flattened into the language of winners and losers, or filtered through patriotic theater. What vanishes first is chronology. What vanishes second is proportion. And what vanishes with both is judgment.

At that point, it stops being only a complaint about media and becomes a problem of method. If readers are asked to reason without chronology, then the research question is also about representation: what kind of deliverable keeps the record stable enough to revisit, argue with, and learn from after the attention has moved on?

## Signal by signal, actionable through ______

Many open questions. Once you start thinking this way, you notice how often analysis is really just a fragile personal archive built from bookmarked links, a messy note with dates, a half-remembered sequence reconstructed after the fact. Under speed and polarization, memory is a bad database.

Plus, different readers lean on that stability in different ways. Policymakers need triage on what moved, where, and what it might trigger. Researchers need comparability, a way to ask what this resembles. Practitioners need timing, enough structure to separate noise from an early signal. And everyone else still benefits from the same thing, a shared record that keeps us oriented when the story gets loud.

After years of carrying this belief around, we turned it into a real project, something closer to an instrument than a note. The idea itself won’t hand you a verdict, but it can do what headlines rarely do. One step further, for me as a visual animal, that instrument comes alive as a dashboard, a research-ready place you want to revisit when something feels urgent.

### Machine Learning for Peace: Civic Space + RAI

This has been the recurring problem behind our work in MLP (Machine Learning for Peace project)[^8] at PDRI-DevLab. We wanted a way to turn a multilingual flood of reporting into a record you can revisit after the attention has moved on.

Our Civic Space project is built to detect changes in civic space, especially in the Global South and other democracy-fragile settings where institutions can shift quickly and evidence is often scattered. We aim to surface timely, evidence-based signals that help people make sense of contention and institutional change while it is happening, and sometimes before democratic backsliding becomes obvious.

Our RAI (Resurgent Authoritarian Influence) work complements that lens by tracking external influence activity, including diplomatic positioning and other strategic engagement that can shape alignments, partnerships, and security postures over time. Here too, not to over-interpret a single headline; it is to make the pattern of engagement legible enough to revisit and argue with.

Here is what we actually built: a monthly event series and a set of public dashboards. The stream forces consistency (same unit of time, same event families, same country list); the dashboards make it legible enough to use. In practice, that means you can revisit a period and ask: what moved first, what followed, and how did patterns spread across places and event families?

Because the monthly records are consistent most of the time, we can also run an early-warning layer on top of it. It produces likelihood estimates, with an explicit confidence measure, that a country's civic pressure or external-influence activity will rise in the near term (next 1-6 months), and that the rise is likely to climb toward a local peak. In a real workflow, that reads like: which places are more likely to move higher next month, and which are more likely to be moving into the same regional wave. Those estimates are not necessarily a substitute for judgment; they are a way to allocate attention early and to make the reasoning auditable.

In retrospect, the peak markers in our civic and RAI series often line up with episodes most readers can name, even if they remember them through different politics or different media frames:

- **Ukraine**: protest activity is flagged in `2013-12` as Euromaidan intensifies; coup-related activity is flagged in `2014-02` during the government rupture; diplomatic-statement pressure is flagged in `2014-03` as international positioning hardens.
- **Turkey**: coup-related activity is flagged in `2016-07`, followed by arrest-related activity flagged in `2016-08` as the domestic security response consolidates.
- **Belarus**: protest activity is flagged in `2020-08` after the contested election; military-activity pressure is flagged in `2022-02` around the start of Russia's full-scale invasion of Ukraine.
- **Niger**: coup-related activity is flagged in `2023-07`, followed by intelligence/counterintelligence in `2023-09` and security engagement in `2024-03`.
- **Ethiopia**: security mobilization is flagged in `2015-10`, then emergency-governance in `2016-10` around the state of emergency.
- **Georgia**: election-activity pressure is flagged in `2024-10`, followed by protest activity in `2024-11`.

I am not trying to claim these cases are the same, or that one society can be reduced to another society's timeline. But we believe crises do have a habit of rhyming in structure before they rhyme in vocabulary. A surface is useful when it makes that rhyme visible without pretending the stories are interchangeable.

<details>
<summary>How we approach this? (brief)</summary>

In this project, we ingest about 120 million articles from roughly 400 sources (40+ languages) and represent them as monthly event "scales" across 66 countries (2012-01 to 2025-10 in this interactive view): 20 civic event families and 21 RAI event families.
Under the hood, we scrape, standardize, machine-translate text with open-source fine-tuned models, classify events with a ModernBERT-based encoder, and run a geoparser (can be down to subnational mentions) with modifier rules and constraints, so that an event's time-and-space scope stays consistent.
Automating human interpretation isn’t the goal. The goal is to keep time and place stable enough that you can aggregate, visualize, analyze, and revisit an episode without re-litigating the basic scope.

</details>

*Interactive note: The two windows below are a compact example: one timeline and one map built on our monthly civic/RAI events in time series, with optional event-level peak markers.*

<div
  id="mlp-mini-dashboard"
  data-dashboard-data-url="{{ '/assets/post_assets/2026-03-01-Zung-Ru-Lin/interactive/dashboard_data.json?v=20260303i' | relative_url }}"
>
  <div class="mlp-dashboard-grid">
    <section class="mlp-dashboard-card">
      <div class="mlp-dashboard-head">
        <h4>Signal Timeline Explorer</h4>
        <p>Pick 2-3 countries, switch civic/RAI, choose an indicator, and toggle peak markers.</p>
      </div>
      <div class="mlp-dashboard-controls">
        <label for="mlp-metric-select">Dataset</label>
        <select id="mlp-metric-select">
          <option value="civic">Civic space</option>
          <option value="rai">RAI (combined)</option>
        </select>

        <label for="mlp-surge-event-select">Indicator
          <span class="mlp-help-wrap" aria-label="Peak marker info" tabindex="0">?
            <span class="mlp-help-box">Peak markers come from the indicator-level <code>NormShock</code> flag. A marker appears only where that indicator is flagged as a local peak against that country’s baseline.</span>
          </span>
        </label>
        <select id="mlp-surge-event-select"></select>

        <label for="mlp-country-1">Country 1</label>
        <select id="mlp-country-1"></select>

        <label for="mlp-country-2">Country 2</label>
        <select id="mlp-country-2"></select>

        <label for="mlp-country-3">Country 3</label>
        <select id="mlp-country-3"></select>

        <label class="mlp-switch" for="mlp-show-peaks">
          <input id="mlp-show-peaks" type="checkbox" checked>
          <span>Show peak markers</span>
        </label>
      </div>
      <div id="mlp-ts-window" class="mlp-plot-canvas"></div>
    </section>

    <section class="mlp-dashboard-card">
      <div class="mlp-dashboard-head">
        <h4>Monthly Intensity Map</h4>
        <p>Use the month slider, or click countries on the map to add them to the timeline.
          <span class="mlp-help-wrap" aria-label="Map marker info" tabindex="0">?
            <span class="mlp-help-box">Map fill color shows the selected indicator intensity. X markers show countries where that same indicator’s peak flag is 1 in the selected month.</span>
          </span>
        </p>
      </div>
      <div class="mlp-map-controls">
        <label for="mlp-month-slider">Month</label>
        <input id="mlp-month-slider" type="range" min="0" max="0" value="0" step="1">
        <span id="mlp-month-label">-</span>
        <button id="mlp-play-months" type="button">Play</button>
        <button id="mlp-latest-month" type="button">Latest</button>
      </div>
      <div id="mlp-map-window" class="mlp-plot-canvas"></div>
    </section>
  </div>
  <p id="mlp-dashboard-status" class="mlp-dashboard-status">Loading interactive windows...</p>
</div>

<link rel="stylesheet" href="{{ '/assets/post_assets/2026-03-01-Zung-Ru-Lin/interactive/dashboard_windows.css?v=20260303i' | relative_url }}">
<script src="{{ '/assets/post_assets/2026-03-01-Zung-Ru-Lin/interactive/dashboard_windows.js?v=20260303i' | relative_url }}"></script>

Try the window for a minute. Add a few countries, switch between civic and RAI, and slide through months. When crises move fast, the record shows up as scattered pieces across places, categories, and time. The job is to capture those pieces as stable, referenceable units that you can aggregate, visualize, and revisit later without rebuilding the basics. The next section sketches a generic workflow for building that kind of deliverable on top of your own data.

## Toolkit: from fragments to research deliverable

**Note:** Some examples use Python and modern ML tooling, but the point is similar in any stack. The goal is a record you can rerun and defend.

### 1) Define what the artifact is for

#### 1.1 Start with a reader contract
Before writing code, set a one-sentence reader contract. Name the reader, the recurring question, the timescale, and what you are not claiming. For example, “For X, this shows Y by month for Z. It is descriptive, not causal, and it updates on W.” The point is not to sound rigorous; instead, we may avoid accidental overreach when someone asks if this is causal or something even less backed. That single sentence becomes the boundary of the artifact and clarifies what the surface is allowed to ignore.

#### 1.2 Build one surface for your question
When someone says they want to see the data (in a visual way), I don’t reach for a feature list. Instead, I reach for the use case, the moment that made them ask for it. Are they trying to see change over time, compare places, or answer the question that always comes next: what else was happening around then? Pick one question from your reader contract and build the smallest surface that can answer it. A timeline plus a map is often a good first pair because it keeps both time and geography in view, and of course, they look good together.

My first version is usually plain on purpose: fixed axes when comparing groups, clear units, hover text that exposes denominators, and a visible “last updated” timestamp. It is not an aesthetic choice as much as an audit choice. An afternoon version can be one table, one time grain, one unit of analysis, and one plot. Aggregate to one row per entity-month (or entity-week), put the raw count and the normalized rate in the hover text, and resist the temptation to add interactivity that you cannot explain. Recurring render issues have also haunted me more times than I can count. If you add marker options (e.g., surge/peak to flag at-scale event-month points), make sure the definition fits in a tooltip, with a simplified descriptive version of the algorithm.

Implementation-wise, there is a spectrum. A static embed (one Plotly/Vega chart embedded in a page) is often enough when your goal is just to read. For a blog or a static site, you can also go a step further with a small JavaScript widget that reads a compact dataset and renders quickly. A lightweight app is useful when your goal is exploration. Streamlit is one approachable option for the latter.[^9][^10] And I use it a lot.


<details markdown="1">
<summary>A beginner-friendly Streamlit starter (optional)</summary>

```python
# Save as app.py, then:
#   pip install streamlit pandas plotly pyarrow
#   streamlit run app.py
#
# This is intentionally generic: upload a table, pick your columns, and explore a timeline.

from __future__ import annotations

import io

import pandas as pd
import plotly.express as px
import streamlit as st


st.set_page_config(page_title="Quick Timeline Explorer", layout="wide")
st.title("Quick Timeline Explorer")
st.caption("Upload a CSV/Parquet file, choose the columns, and get a clean interactive timeline.")

uploaded = st.file_uploader("Upload data", type=["csv", "parquet", "pq"])
if uploaded is None:
    st.info("Start with a table that has a date column and a numeric column (plus an optional group/entity column).")
    st.stop()


@st.cache_data(show_spinner=False)
def read_upload(file: st.runtime.uploaded_file_manager.UploadedFile) -> pd.DataFrame:
    name = (file.name or "").lower()
    raw = io.BytesIO(file.getvalue())
    if name.endswith((".parquet", ".pq")):
        return pd.read_parquet(raw)
    return pd.read_csv(raw)


df = read_upload(uploaded)
df.columns = [c.strip() for c in df.columns]

st.write("Preview")
st.dataframe(df.head(20), use_container_width=True)

with st.sidebar:
    st.subheader("Pick Columns")
    date_col = st.selectbox("Date column", options=df.columns)
    value_col = st.selectbox("Value column", options=df.columns)
    group_col = st.selectbox("Group column (optional)", options=["(none)"] + list(df.columns))

    st.subheader("Time Grain")
    grain = st.selectbox("Aggregate to", options=["None", "Daily", "Weekly", "Monthly"], index=3)


data = df.copy()
data[date_col] = pd.to_datetime(data[date_col], errors="coerce")
data[value_col] = pd.to_numeric(data[value_col], errors="coerce")
data = data.dropna(subset=[date_col, value_col]).sort_values(date_col)

if group_col != "(none)":
    data[group_col] = data[group_col].astype(str)
    choices = sorted(data[group_col].unique())
    selected = st.sidebar.multiselect("Groups (pick up to 3)", choices, default=choices[:1])
    selected = selected[:3]
    if not selected:
        st.warning("Pick at least one group.")
        st.stop()
    data = data[data[group_col].isin(selected)]

if grain != "None":
    rule = {"Daily": "D", "Weekly": "W", "Monthly": "MS"}[grain]
    if group_col != "(none)":
        data = (
            data.set_index(date_col)
                .groupby(group_col)[value_col]
                .resample(rule)
                .mean()
                .reset_index()
        )
    else:
        data = (
            data.set_index(date_col)[value_col]
                .resample(rule)
                .mean()
                .reset_index()
        )

fig = px.line(
    data,
    x=date_col,
    y=value_col,
    color=None if group_col == "(none)" else group_col,
    markers=False,
)
fig.update_layout(margin=dict(l=10, r=10, t=40, b=10), hovermode="x unified")
st.plotly_chart(fig, use_container_width=True)

with st.expander("Download filtered data"):
    st.download_button(
        "Download CSV",
        data=data.to_csv(index=False).encode("utf-8"),
        file_name="filtered_data.csv",
        mime="text/csv",
    )
```
</details>

### 2) Make it reproducible and citable

#### 2.1 Make revisits cheap
Once you put anything public in front of people, the same questions show up sooner or later. Where did this number come from? Can we rerun it after the next data drop? I try to make the answer boringly repeatable. That usually means keeping the deliverables deliberately plain: a raw append-only layer that never overwrites sources, stable IDs for each source item and each run, transformations encoded as code rather than spreadsheet muscle memory, and a data contract that spells out columns, units, and update schedules.[^11] For many projects, [Apache Parquet](https://parquet.apache.org/) + [DuckDB](https://duckdb.org/docs/) is a solid base because it stays quick during exploration while still being strict enough to reproduce.

In reality, two things prevent this from turning into wishful thinking. Put a schema check at the end of every transformation step, even if it is only a handful of assertions about types, missingness, and ranges. Then keep a single end-to-end entrypoint, one command that can rebuild the artifacts you publish from scratch, whether that is a Makefile target, a shell script, or a `python -m ...` call (“which python” has gotten me more than once). If you can, keep a short changelog and a data dictionary next to the dataset so a future revisit does not turn into guesswork.

#### 2.2 Version the moving parts
Pipelines drift in quiet ways. Dependencies change, model checkpoints get swapped, data backfills arrive, and two people can run the same code and produce different artifacts. So treat version control as part of the deliverable. Pin the environment, record the model and data versions, and save the run configuration that produced each published output. This is just so you can tell, later, what code, data, and model produced the numbers on the page.

#### 2.3 Make evaluation a first-class artifact
If the work is research-facing, metrics are part of the record. Save the evaluation set, the scoring script, and the exact model snapshot tied to the numbers you show in papers, memos, or slides. Prefer a small, pre-defined validation task that you rerun whenever the pipeline changes, plus a fixed regression set that catches silent breakage.

#### 2.4 Write for the future reader
A good README is not a tutorial. It is a contract for someone who was not there sitting next to you. Spell out what the artifact measures, what it does not measure, the unit of analysis, update cadence, and how late data is handled. Include a short “reproduce this figure/table” section with the one command that rebuilds the outputs. If you present results publicly, make “Where did this come from?” answerable from the metadata you already record.

#### 2.5 Borrow building blocks, then verify early
When moving fast, the technical side of the work benefits from borrowing proven building blocks and verifying them early. For that, the usual starting points are [GitHub](https://github.com/) for code, [arXiv](https://arxiv.org/), and [OpenReview](https://openreview.net/) for papers and reviews, [Papers with Code](https://paperswithcode.com/) for reproducible baselines, and the [Hugging Face Hub](https://huggingface.co/) for model and dataset artifacts. Model cards, licenses, and one small validation pass do most of the risk reduction before anything gets near a production-like workflow.

### 3) Keep the inputs auditable

#### 3.1 Standardize without losing provenance
Standardization is where many projects stall because “clean” becomes a second kind of chaos, with half-documented transforms, schema drift, and features no one trusts. Different teams start from different modalities, so treat the examples as options, not assumptions. 

For text, the canonical object might be JSONL with stable IDs, timestamps, source URLs, and offsets back to the original so citations remain possible. For images, OCR text paired with bounding boxes when text is the evidence, or detected objects with attributes when objects are the evidence. For audio, transcripts with timestamps and speaker segments. For video, keyframes, shot boundaries, and extracted captions. If extraction changes over time, keep a small regression set of representative items to catch silent breakage.

If you work with documents, extraction and OCR are common choke points. Tools like Unstructured can help turn PDFs and HTML into a consistent canonical form,[^12] and OCR stacks can help with scanned pages and images.[^13][^14][^15]

### 4) Optional extensions

#### 4.1 Optional: add AI, grounded in evidence

In our MLP project, the dashboard answers the “what” at scale, but the next question is often “what is driving this month.” That is where AI assistance can help, mainly as a bridge from aggregated signals back to the underlying stories. We use GenAI for monthly briefs pulled from surged event-months, short digests that cluster recurring storylines, and a grounded Q&A interface that helps a reader navigate recent documents without pretending to replace analysis. Human validation is still needed before any of it reaches practitioners.

Retrieval can help, but it is only one option and often not the fastest one. Sometimes a simple filter on the relevant country-month, a keyword search, or a curated set of exemplars is enough. When retrieval does make sense, the idea is simple: pull a small set of relevant passages from a corpus and keep summaries or answers anchored to what was actually retrieved. Vector search and RAG-style setups can support that, but they are tools, not defaults (pgvector[^16], LlamaIndex query transformations[^17]).

Use deterministic code for the numbers, and use AI for what it is better at, summarizing text, grouping themes, and pointing readers back to sources. Make it easy to see what documents the system relied on, and what it did not.

#### 4.2 Keep it honest in public

Once a public-facing tool is out in the world, it won’t stay still. Data arrives late, labels change, bug fixes shift counts, and search/retrieval indexes quietly go out of date. A simple habit that may help is to keep a small checklist of the questions people actually ask, what sources you expect to support the answers, and a few errors you never want to ship. Not a benchmark, but a guard against drift turning into confident, wrong prose.

Whatever the stack, publish the basics alongside the visuals: what the system measures and cannot measure, how often it updates (and what “late data” means), and how a reader can trace a claim back to a source. That is how a surface stays a research deliverable instead of becoming another genre of persuasion.

## Closing: what we owe the reader

This kind of public-facing surface should count as a research deliverable because it does more than display results. It makes claims more checkable. For us, when power moves quickly and interpretation turns punitive or theatrical, that commitment matters. It keeps sequence and context intact long enough for judgment to be something more than reaction.

And in chaotic eras, taking the reader seriously does not mean sentimentality. It means refusing to forget that escalation curves and sudden silences in the record are attached to human beings who live downstream of decisions they did not make. If our work helps policymakers decide more responsibly, helps researchers reason more carefully, helps practitioners intervene earlier, and helps readers feel less manipulated by speed, then the surface is not a side product. It is part of what responsible research looks like.

In moments like these, the line between scholarship and loyalty tests can start to blur. Holding to the record, and to the norms that keep it independent, is one quiet way of standing with the people this work is ultimately about.

If you want to explore the live dashboards and project site:

- [MLP Civic Dashboard](https://huggingface.co/spaces/zungru/mlp-civic-dashboard)
- [MLP RAI Dashboard](https://huggingface.co/spaces/zungru/mlp-rai-dashboard)
- [MLP-DevLab @ Penn](https://web.sas.upenn.edu/mlp-devlab/)

## Notes and references

[^1]: Reuters, ["What are key issues dividing US and Iran in nuclear talks?"](https://www.reuters.com/business/aerospace-defense/iran-crisis-issues-dividing-washington-tehran-2026-02-05/), February 5, 2026.
[^2]: Reuters, ["US-Iran talks end with no deal but potential signs of progress"](https://www.reuters.com/world/middle-east/us-iran-nuclear-talks-resume-geneva-against-backdrop-military-threat-2026-02-26/), February 26, 2026.
[^3]: Reuters, ["Trump Iranian missile claim unsupported by U.S. intelligence, say sources"](https://www.reuters.com/business/aerospace-defense/trump-iranian-missile-claim-unsupported-by-us-intelligence-say-sources-2026-02-27/), February 27, 2026.
[^4]: Reuters, ["UN Security Council to meet on Saturday on Iran conflict"](https://www.reuters.com/world/china/un-security-council-meet-saturday-iran-conflict-2026-02-28/), February 28, 2026.
[^5]: UN Office at Geneva, ["Bombing of Iran and retaliatory strikes ‘a grave threat to international peace and security’: Guterres"](https://www.ungeneva.org/en/news-media/news/2026/02/116328/bombing-iran-and-retaliatory-strikes-grave-threat-international), February 28, 2026.
[^6]: Reuters, ["Iran's Ali Khamenei, who based iron rule on fiery hostility to US and Israel, dies at 86"](https://www.reuters.com/world/middle-east/irans-ali-khamenei-who-based-iron-rule-fiery-hostility-us-israel-dies-86-2026-03-01/), March 1, 2026; AP, ["Iran's Supreme Leader Ayatollah Ali Khamenei, who led the Islamic Republic since 1989, is dead at 86"](https://apnews.com/article/5b13b69b708c4ed38e8f95f5fb41a597), March 1, 2026.
[^7]: Reuters, ["Nine people killed as protests erupt in Pakistan and Iraq over Khamenei's death"](https://www.reuters.com/world/asia-pacific/pakistan-police-fire-tear-gas-protesters-outside-us-consulate-reuters-witness-2026-03-01/), March 1, 2026; AP, ["At least 22 people killed in Pakistan and Iraq protests over Khamenei's death"](https://apnews.com/article/a3cc0c3c6f126cc54a657f61d312a203), March 1, 2026.
[^8]: MLP-DevLab @ Penn, [Machine Learning for Peace (MLP-DevLab)](https://web.sas.upenn.edu/mlp-devlab/).
[^9]: Streamlit, [Create an app](https://docs.streamlit.io/get-started/tutorials/create-an-app).
[^10]: Streamlit, [Documentation](https://docs.streamlit.io/).
[^11]: Open Data Contract Standard, [Open Data Contract Standard (ODCS)](https://bitol-io.github.io/open-data-contract-standard/latest/).
[^12]: Unstructured, [Open-source overview](https://docs.unstructured.io/open-source/introduction/overview).
[^13]: PyMuPDF, [OCR recipe](https://pymupdf.readthedocs.io/en/latest/recipes-ocr.html).
[^14]: Kreuzberg, [Features (OCR)](https://docs.kreuzberg.dev/features/#ocr-optical-character-recognition).
[^15]: PaddleOCR, [Documentation](https://www.paddleocr.ai/latest/en/index.html).
[^16]: pgvector, [pgvector](https://github.com/pgvector/pgvector).
[^17]: LlamaIndex, [Query transformations](https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/).
