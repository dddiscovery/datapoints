---
layout: meetup
title: "From Toy to Tool"
subtitle: "AI in Physics Research — A Training Session at Penn"
authors: ["Department of  Physics and Astronomy & DDDI"]
author_pic: ["/assets/images/authors/dddi.png"]
author_title: ["Collaborative Training Session"]
date: 2026-05-07
permalink: /ai-tools-scientific-research/
image: /assets/images/posts/meetup_cover_may.png
summary: "Five Penn physicists — from HEP theorists to experimentalists to astrophysicists — share their real AI workflows, covering symbolic computation, agentic coding, and the honest limits of trust."
category: meetup
draft_note: "First draft generated from the session transcript using Claude MCP; edited and verified by the editors."
organizers:
 - name: "Bhuvnesh Jain"
   affiliation:
     - "Walter H. and Leonore C. Annenberg Professor in the Natural Sciences"
     - "Co-Director of the Penn Center for Particle Cosmology"
     - "Co-Director of the Penn Data Driven Discovery Initiative"
   pic: "/assets/images/authors/Jain_Bhuvnesh.jpg"
   url: "https://live-sas-physics.pantheon.sas.upenn.edu/people/standing-faculty/bhuvnesh-jain"
editors:
 - name: "Yuxin Liang"
   affiliation: "Data Scientist @DDDI"
   pic: "/assets/images/authors/YuxinL.jpeg"
   url: https://github.com/yuxinlg
 - name: Colin Twomey
   affiliation: Executive Director @DDDI
   pic: /assets/images/authors/colin_twomey.jpg
   url: https://www.sas.upenn.edu/~crtwomey/
---


## About This Session


On May 7, 2026, the Department of Physics and Astronomy at Penn held a tutorial session focused on practical uses of AI in scientific research. Faculty, postdocs, and PhD students—including high-energy theorists, experimentalists, and astrophysicists—came together to exchange and demonstrate the specific AI workflows they were using, aiming to move beyond general awareness toward detailed, real-world examples and honest discussion.


## How the Session Was Structured


Five researchers each gave a 10-minute talk on how they use AI in their own work, followed by Q&A. The afternoon closed with 45 minutes of guided hands-on exploration. The lineup covered the breadth of use cases from the broadest (AI across the full research lifecycle) to the most specific (commit-by-commit expert coding workflow with Codex). 


<div class="meetup-takeaways" markdown="1">


## Key Takeaways


*The following reflect patterns and observations shared by attendees across two sessions — not empirically validated findings or universal best practices.*


- Treat AI as a **cognitive partner**: give it context the way you'd brief a smart colleague who knows nothing about your project yet — explicit, detailed, generous with background.
- **Run the same symbolic calculation across multiple parallel sessions** and verify numerically; only one of five attempts may actually be correct, and the wrong ones will claim to have verified themselves.
- **Match the task to the risk profile**: exploratory code (visualizations, format translation, sanity checks) can be handed off with minimal checking; multi-step production workflows need decomposition and pull-request-level review.
- **Literature synthesis in adjacent fields is genuinely useful**; specific paper citations frequently hallucinate — verify every link before citing.
- **Context rot is real**: around 60% of a context window, quality degrades — scope sessions by task and restart or compact deliberately.
- Start every coding task by iterating on the design first; ask the model to "ask me questions before you write any code."
- The right question isn't "when will AI replace researchers?" — it's "what research becomes possible now that wasn't before?"


</div>


## Bhuv Jain — AI as a Cognitive Partner: The Full Range of Use Cases


Bhuv Jain opened with the framing that anchored the rest of the day: the single most useful reframe for AI is to treat it not as a search engine or a code autocomplete, but as a **cognitive partner**. If you give it context — the way you'd brief a smart new collaborator who has just joined the project — the quality of its responses changes substantially.


He ran through an impressively wide range of use cases: travel planning with neighborhood-level granularity, grant management by uploading award letters and monthly reports so the model could compute month-by-month spend-down projections, lecture note refinement, quiz question iteration, and drafting. The through-line was always the same: create a project or folder, upload everything relevant, describe your goals, iterate.


On research specifically, Jain mapped the full lifecycle — formulating a project, sharpening a vague idea, literature search, planning the analysis, writing and debugging code, and writing the paper — and flagged where AI has already proven most valuable. Coding dominates at the moment; plot-making and paper-writing are not far behind. His practical advice: pay $20/month (the free tier silently downgrades to weaker models as you approach token limits), don't agonize over which model to use (Claude, ChatGPT, and Gemini are comparable for most research tasks), and expect capabilities to take a meaningful step up every six months.


## Hayden Lee — Using AI for Theoretical Research


Hayden Lee, a high-energy theorist, opened with the benchmark data that has been circulating in the community: frontier models now solve more than 50% of problems from FrontierMath — a curated set of expert-level problems written by research mathematicians. Two years ago, the best models scored around 2%. His framing: the trend line matters more than any individual number, and the trajectory has crossed from AI as a toy to AI as a tool, now reaching something approximating PhD-level mathematical reasoning.


### Use case 1: Symbolic computation


Lee needed to solve a recursion relation for partial wave coefficients in conformal field theory — a calculation Mathematica could handle but only in an unwieldy closed form involving gamma functions and Pochhammer symbols. He ran the same equation through five separate ChatGPT 5.2 Pro chat instances simultaneously. One produced a clean, correct rational expression after 18 minutes of reasoning. The other four produced plausible but wrong answers — and all four claimed to have verified their results numerically. He confirmed the correct one by checking it in Mathematica. The lesson: run parallel instances, verify independently, and treat any model's claim of self-verification as noise.


### Use case 2: Pattern recognition at scale


Starting from a 6-particle one-loop scattering amplitude — a 100,000-term expression that occupied nearly a gigabyte of memory — Lee asked Claude Opus 4.6 to identify the symmetry structure of the monomials. The model correctly identified all orbit structures and stabilizer groups, reducing the problem to six independent terms and producing clear graph-theoretic diagrams of the sector decomposition.


His summary of what LLMs are good at in theoretical work: tedious algebra, advanced calculus, elementary Mathematica, and endless iterations. What still needs babysitting: knowing what's physically interesting, catching plausible-but-wrong formulas, and supplying physical intuition. His current workflow involves maintaining a dozen simultaneous chat windows and moving between them as each reasoning step completes — like a chess grandmaster running ten games at once.


## Dylan Rankin — Experiment, Data Analysis, and the Limits of Trust


Dylan Rankin, a high-energy experimentalist, led with code comprehension as an underappreciated use case. If you want to add a feature to a large existing codebase — he used the example of adding Spearman correlation as a training metric to a model-monitoring repository — you can now ask Claude to read the repo, explain the architecture, identify which files need to change, implement the feature, and generate a test suite. An orientation task that would previously take hours of reading source code now takes minutes of conversation.


His broader point was about calibrating trust. LLMs handle individual tasks well but struggle with long chains of interdependent reasoning, where a small wrong assumption compounds into something hard to debug — especially because the model will confidently assert correctness at each step. His recommendation: **decompose complex workflows into manually-verified subtasks**, establish a stable, understood codebase, then use agentic tools for incremental feature additions reviewed as pull requests.


He closed with a pointed observation about fully autonomous analysis: an AI system had recently produced a complete LHC analysis with sensible-looking plots, but wrote in every caption that "data-simulation agreement is excellent" — because that's what every paper it trained on said, regardless of what the plots actually showed.


## Supranta Boruah — Exploratory Coding with Claude Code


Supranta Boruah, a cosmologist, offered the most candid observation about AI-generated code: it is usually correct, but it is almost always **verbose**. A 14-line function comes back as 300 lines, with defensive checks for impossible edge cases and error handling that isn't needed. For long-lived production code, that verbosity creates technical debt. But for exploratory research — iterating quickly over hypotheses, generating diagnostic plots, running sanity checks — it's nearly ideal. The time from idea to running code collapses.


His example project: comparing galaxy-halo occupation statistics across simulations with incompatible data formats. Code translation — paste in the format specification for simulation A, paste in the read logic for simulation B, ask it to adapt — is exactly what these tools handle well. He also flagged **context rot**: around 60% of a session's context window, performance degrades noticeably. He monitors context usage in Claude Code with the `/context` command and either compacts memory or restarts sessions before quality drops.


On literature: AI synthesizes adjacent-field research well, but will confidently hallucinate paper citations. Verify every link.


## Mike Jarvis — Expert-Level Coding with Codex


Mike Jarvis closed the talks with the most detailed workflow description of the session. He drew a distinction between exploratory code and what he called "expert-level" code: software maintained long-term, with users, semantic versioning, and a rigorous test suite. For this kind, he has moved entirely to Codex-mediated development. Since February, he no longer writes code without it.


His standard commit workflow: describe the feature and its edge cases, ask the model to iterate on the design before writing anything ("ask me questions, let's agree on the approach"), go back and forth two or three rounds, then let it work for 2–10 minutes. Then `git diff`: start with the tests, because they're easiest to read and reveal whether the model understood the problem. He tightens tolerance parameters (models write tests at `RTOL=0.1` when he wants machine precision), adds edge cases, then reviews the implementation for unnecessary defensive code, overly clever algorithms, and doc-string accuracy.


Two instructions he's added to his global Codex settings: "If you think I'm mistaken, push back and tell me" — this has caught several cases where he was wrong about his own codebase — and "If you're not sure about something, ask before you start." The first reduces sycophancy. The second saves expensive context from code that needed to be thrown out.


## What This Session Was Really About


What made the afternoon work was the calibration it offered: five researchers with different workflows and different skepticism levels being specific about what they actually do. The underlying question surfaced explicitly near the end: will AI replace physics researchers? The room's view was that it's the wrong frame. Spreadsheet software didn't eliminate accountants; it multiplied them. The more interesting questions are what new problems become tractable, whether PhDs can be done well in four years instead of five, and how departments think about the infrastructure — licensing, compute, training — that their researchers now need.


A follow-up session on agentic workflows and Claude Code internals was being discussed before the room cleared.


Check the talk slides [here](https://docs.google.com/presentation/d/1thLrhePZ4s8AeC3kDKFxJ9FlrtBUsEQxlD74t5VWKCo/edit?usp=sharing).