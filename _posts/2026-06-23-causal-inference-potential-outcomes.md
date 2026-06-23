---
layout: meetup
title: "Thinking Causally"
subtitle: "The Potential Outcomes Framework for Social Scientists"
authors: ["Carolina Torreblanca"]
author_pic: ["/assets/images/authors/caro_pic.jpg"]
author_title: ["Penn AI Fellow, Department of Political Science, University of Pennsylvania"]
date: 2026-06-23
permalink: /causal-inference-potential-outcomes/
summary: "Carolina Torreblanca, Penn AI Fellow in Political Science, walks through the Potential Outcomes Framework from first principles — showing why causal claims in research headlines are harder than they look and how social scientists use randomization and quasi-experimental methods to build credible causal arguments."
category: data
draft_note: "First draft generated from the session recording transcript using Claude MCP; edited and verified by the organizer/instructors and editors."
instructors:
  - name: "Carolina Torreblanca"
    affiliation: "Penn AI Fellow, Department of Political Science"
    pic: "/assets/images/authors/caro_pic.jpg"
    url: "https://carolina-torreblanca.github.io/"
editors:
  - name: "Yuxin Liang"
    affiliation: "Data Scientist @DDDI"
    pic: "/assets/images/authors/YuxinL.jpeg"
    url: https://yuxinlg.github.io/
  - name: Colin Twomey
    affiliation: Executive Director @DDDI
    pic: /assets/images/authors/colin_twomey.jpg
    url: https://www.sas.upenn.edu/~crtwomey/
show_disclaimer: false
---

This post adapts the content and structure of [Carolina Torreblanca's tutorial session on causal inference](https://datascience.sas.upenn.edu/events/summer-hangouts-carolina-torreblanca) for [DDDI's Summer Hangouts 2026](https://datascience.sas.upenn.edu/events/data-science-summer-hangouts-series-2026). Carolina, a Penn AI Fellow in the Department of Political Science at Penn, walks through the subject from first principles. Starting from a misleading news headline, she builds up the Potential Outcomes Framework step by step and explains why isolating cause from correlation is genuinely hard, and how modern social science has developed rigorous tools to get there. No statistics background required.

<div class="meetup-takeaways" markdown="1">

## Key Takeaways

- Most causal claims in research headlines rest on implicit comparisons that are hard to defend
- The Potential Outcomes Framework defines causation as the difference between two worlds: one where treatment happened, one where it didn't
- The Fundamental Problem of Causal Inference is a missing data problem: you can only ever observe one of those worlds
- Shifting from individual to average treatment effects makes the problem tractable — but only if the two groups you're comparing are genuinely equivalent
- Randomization is powerful precisely because it makes that equivalence credible in expectation
- Confounding and selection bias are the two main ways observational comparisons go wrong
- Quasi-experimental methods — RDD, DiD, IV — are tools for finding credible comparisons when randomization is off the table

</div>

<div class="workflow-scroll-panel">
<div class="workflow-chart">
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">A Causal Headline</div>
        <ul class="workflow-list">
          <li>Social media → depression?</li>
          <li>Compared to whom?</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Causality in Social Science</div>
        <ul class="workflow-list">
          <li>Not necessary or sufficient</li>
          <li>Probabilistic: makes Y more likely</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Motivation</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Potential Outcomes</div>
        <ul class="workflow-list">
          <li>Y(1): outcome if treated</li>
          <li>Y(0): outcome if untreated</li>
          <li>τᵢ = Y(1)ᵢ − Y(0)ᵢ</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Fundamental Problem</div>
        <ul class="workflow-list">
          <li>Only one potential outcome observed</li>
          <li>Counterfactual always missing</li>
          <li>Reframe as missing data</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Average Treatment Effect</div>
        <ul class="workflow-list">
          <li>Target ATE, not individual τᵢ</li>
          <li>ATE = E[Y(1)] − E[Y(0)]</li>
          <li>Plug-in: Ȳ₁ − Ȳ₀ (if groups are comparable)</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Potential Outcomes Framework</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Randomization</div>
        <ul class="workflow-list">
          <li>Coin-flip makes groups comparable</li>
          <li>Gold standard — but often impossible</li>
          <li>Threats: confounding, selection bias</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Quasi-Experimental Methods</div>
        <ul class="workflow-list">
          <li>Lottery / draft designs</li>
          <li>Regression Discontinuity (RDD)</li>
          <li>Diff-in-Differences / IV</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Identification Strategies</div>
  </div>
</div>
</div>
<div class="workflow-caption">Figure 1: From causal question to credible estimate</div>

## Motivation

### A Causal Headline

Carolina opened the session with a headline from the Medical Journal of Australia: *"High social media use increases mental health risk in adolescents."* The paper was substantial — it followed 1,200 teenagers over a decade and found that teens using social media more than two hours a day had a higher risk of depression than lighter users.

Sounds conclusive. But notice the structure of the claim: heavy users are *more likely* to develop depression than lighter users. More likely *compared to what?* That question — what is the right comparison? — is the core of causal inference. The entire tutorial is an attempt to make it precise.

### Causality in Social Science

Different disciplines conceptualize causality differently. In the hard sciences, causality is often framed in terms of **necessary conditions** (oxygen is necessary for combustion — remove it and fire stops) or **sufficient conditions** (exceeding 100°C is sufficient for water to boil — do it and boiling follows). Social media passes neither test: many heavy users never become depressed (not sufficient), and many depressed people never used social media heavily (not necessary).

In the social sciences, causality is a **probabilistic statement**: treatment shifts the probability of an outcome. Social media use *makes depression more likely*. This is an inherently comparative claim — more likely than the counterfactual world in which the same person didn't use social media heavily. Nailing down that counterfactual is the challenge.

## Potential Outcomes Framework

### Potential Outcomes

The rigorous answer to "compared to what?" comes from the **Potential Outcomes Framework**, rooted in Neyman's 1920s dissertation on fertilizer use and developed further by Rubin in the 1970s.

The idea is simple: for any unit — a plot of land, a person, a country — imagine two potential outcomes existing simultaneously in parallel worlds:

- **Y(1)**: the outcome *if* the unit receives treatment (fertilizer applied; teen uses social media heavily)
- **Y(0)**: the outcome *if* the unit does not receive treatment (no fertilizer; teen is a light user)

The causal effect of treatment on unit *i* is the difference:

<div class="equation-block">

$$
\tau_i = Y(1)_i - Y(0)_i
$$

</div>

This is what Carolina called the multiverse definition of causality: τᵢ is the gap between two parallel worlds — the one that happened, and the one that didn't. Simple to write. Impossible to observe.

### Fundamental Problem

Here is the core obstacle. When the farmer applies fertilizer, they observe Y(1) for that plot. When they don't, they observe Y(0). **They can never observe both for the same plot at the same time.** Only one branch of the multiverse is ever accessible.

Carolina named this Holland's **Fundamental Problem of Causal Inference** and reframed it as a missing data problem. Imagine a table with one row per unit and two columns: Y(1) and Y(0). For every row, exactly one cell is filled — whichever potential outcome was realized by the treatment actually received. The other cell is permanently blank. Individual causal effects are row-level subtractions; with half the table missing, they cannot be computed.

### Average Treatment Effect

The move that makes progress possible is to shift the target. Instead of individual causal effects τᵢ, aim for the **Average Treatment Effect (ATE)** — the average of τᵢ across all units:

<div class="equation-block">

$$
\text{ATE} = \mathbb{E}[Y(1)] - \mathbb{E}[Y(0)]
$$

</div>

By linearity of expectations, this is the difference between two population averages. And now there's a tempting shortcut: compute the observed average outcome among treated units (Ȳ₁) and the observed average among untreated units (Ȳ₀), and use Ȳ₁ − Ȳ₀ as the estimate.

This plug-in estimator is valid — but only under a critical condition. The treated and untreated groups must be **identical in expectation** on every characteristic that matters: they must look the same, on average, in the counterfactual world where neither received treatment. In other words, untreated units must be a plausible stand-in for what treated units *would have looked like* had they not been treated — and vice versa.

This is a counterfactual claim. It cannot be directly tested. Making it credible is the entire job of causal inference.

## Identification Strategies

### Randomization

The most powerful tool for making that claim credible is **randomization**. If treatment is assigned by a coin flip, then by the Central Limit Theorem and the law of large numbers, treated and untreated groups will be identical in expectation on every pre-treatment characteristic — observed *and* unobserved. The coin doesn't know which plots are sunnier, which teenagers are genetically predisposed to depression, or which farmers are more skilled. It allocates blindly, producing groups that are comparable on everything.

This is why randomized controlled trials are the gold standard. Randomization doesn't just control for the confounders you thought of — it controls for the ones you didn't.

The problem is that many of the most important questions in social science cannot be randomized. You can't randomly assign victimization to study its effect on political participation. You can't randomize wars to study their effect on national identity. You can't randomly relocate immigrants to study wage effects without raising serious ethical concerns. Carolina flagged the debate this creates: some researchers argue it's better to answer narrow questions credibly than to attempt big questions without the machinery to answer them properly. Her own view is that this is a false choice — rigorous *and* ambitious work is possible, but it requires being honest about what your design can and cannot establish.

When randomization isn't available, two threats to the plug-in estimator become salient.

**Confounding** arises when a hidden third variable causes both the treatment and the outcome, creating a spurious association. Wine drinkers live 21% longer than beer and spirits drinkers in observational data — but wine is expensive, and class affects both beverage choice and longevity. The correlation is real; the causal story is wrong. Museum visitors appear to have lower mortality — but visiting museums requires time and disposable income, both of which also predict better health. In both cases, plugging Ȳ₁ − Ȳ₀ into the ATE formula gives a biased answer because the two groups weren't alike to begin with.

**Selection bias** is subtler. It arises when the sample is conditioned on a variable that is itself a consequence of the treatment, distorting the observed relationship. Carolina's example: in NBA data, taller players score *fewer* points per game on average. This seems absurd — height obviously helps in basketball. But NBA players aren't a random sample of tall and short people. Short players only survive the selection process if they compensate with extraordinary skill. Conditioning on "reached the NBA" creates a sample where the height–skill relationship is inverted, making height appear to hurt performance.

### Quasi-Experimental Methods

When randomization is off the table, the empirical strategy is to find settings where nature, history, or policy introduced *as-if* random variation in treatment assignment — and exploit that variation to justify a credible comparison.

<div class="workflow-scroll-panel">
<div class="workflow-chart">
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title" style="color: #fc4357;">Randomization not feasible</div>
        <ul class="workflow-list">
          <li>Ethical constraints</li>
          <li>Logistical or political barriers</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Find as-if random variation</div>
        <ul class="workflow-list">
          <li>Nature or policy creates near-random assignment</li>
          <li>Defend comparability in a narrow window</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Starting Point</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Lottery / Draft Design</div>
        <ul class="workflow-list">
          <li>Genuine randomness from external event</li>
          <li>Example: 1969 Vietnam draft lottery</li>
          <li>Estimates: military service → later earnings</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Regression Discontinuity</div>
        <ul class="workflow-list">
          <li>Compare units just above/below a threshold</li>
          <li>Assignment near-random at the cutoff</li>
          <li>Tradeoff: local estimate near threshold only</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Diff-in-Differences / IV</div>
        <ul class="workflow-list">
          <li>DiD: before/after × treated/control</li>
          <li>IV: instrument with no direct effect on Y</li>
          <li>Both rest on strong, untestable assumptions</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Quasi-Experimental Toolkit</div>
  </div>
</div>
</div>
<div class="workflow-caption">Figure 2: Quasi-experimental methods — finding credible comparisons when randomization is off the table</div>

The main toolkit, with one canonical example each:

- **Lottery/Draft designs**: the 1969 Vietnam draft lottery assigned induction order by birthday — a genuinely random process. Researchers use lottery number as an instrument to estimate the causal effect of military service on later earnings, sidestepping the selection problem that volunteers and non-volunteers differ in ways correlated with earnings.
- **Regression Discontinuity (RDD)**: compares units just above and just below an arbitrary threshold — a scholarship cutoff, a voting age, a policy income limit. Near the threshold, which side of the line you fall on is effectively accidental, making the two groups credible counterfactuals for each other. The cost: estimates are local to the threshold and may not generalize.
- **Difference-in-Differences (DiD)**: compares the before/after change in a treated group against the before/after change in an untreated control group. By differencing twice, stable pre-existing differences between groups cancel out. The core assumption — that trends would have been parallel in the absence of treatment — is untestable but often defensible.
- **Instrumental Variables (IV)**: finds a variable that affects treatment but has no direct effect on the outcome except through treatment. Using the instrument as a lever isolates the portion of treatment variation that is as-if random.

What all these methods share: they are different arguments for why the comparison being drawn is *plausible* — why the untreated group is a reasonable stand-in for the counterfactual treated group. None of them prove it. They make the case.

Returning to the opening headline: do heavy social media users provide a valid counterfactual for light users? Almost certainly not. Heavy and light users likely differ in unobserved ways — genetic predisposition to depression, family stability, peer networks, sleep habits — that independently affect mental health. Worse, the relationship may run in the opposite direction: struggling teens may turn to social media *because* they are struggling, not the other way around. The researchers' longitudinal design is richer than a simple cross-section, but without a credible source of exogenous variation in usage, the causal story remains contested.

The lesson Carolina left the room with is not that causal inference is hopeless — it's that it is demanding. Every causal claim rests on an untestable assumption about what the world would have looked like had treatment not occurred. The researcher's job is to make that assumption as explicit, as narrow, and as defensible as possible. The entire toolkit of modern empirical social science — from RCTs to RDDs to structural models — is machinery for that one task.
