---
layout: blog
title: "From MCP Servers to Peer Review Integrity: How Research Power Users Are Rethinking Agentic AI"
subtitle: ""
authors: ["DDDI AI Fellow Meetup"]
author_pic: ["/assets/images/authors/dddi.png"]
author_title: ["Postdoctoral Researchers, DDDI"]
date: 2026-03-19
permalink: /agentic-coding-postdoc-meetups/
summary: "Postdoctoral researchers across two sessions compared model selection strategies, built MCP servers live, and debated what agentic AI means for peer review integrity and student learning — here's what they found."
---

**Disclaimer:** This post captures informal, off-the-cuff reflections from meeting attendees. The views discussed here are the personal opinions and preliminary assessments of the attendees, and should not be treated as peer-reviewed findings or vetted best practices.

This post draws from discussions across the March 19 and March 20 sessions of the DDDI AI Fellow Gathering. Over nearly three hours, postdoctoral researchers from astrophysics, nursing, urban analytics, neuroscience, and education worked through what agentic AI actually looks like in practice — not the pitch, but the mechanics, the failure modes, and the harder questions underneath.

## Key Takeaways

- Use different models for different phases: Sonnet for rapid code generation, Opus for architectural planning — with deliberate switching between them during review
- Structure your context files (global `claude.md`, project-local instructions, auto-generated `memory.md`) before writing your first prompt; they shape everything that follows
- Context rot is real: monitor token usage and compact at around 60% to preserve response quality — don't wait until the context is full
- A working MCP server takes under five minutes to build and eliminates an entire class of hallucination failures involving external state
- Planning mode earns its value as a thinking tool: edit Claude's internal plan before execution, not after
- Two-agent adversarial workflows — one generating, one critiquing — catch failure modes that single-agent loops miss
- AI-generated peer reviews are already detectable and represent a field-level integrity problem; norms need to come before publisher enforcement

## Choosing Models Like a Workflow, Not a Default Setting

A practical consensus emerged early in the March 19 session: model selection isn't a one-time preference, it's a recurring workflow decision. Claude Sonnet handles rapid line-by-line code generation well; Opus suits high-level architectural planning. The pattern that surfaced repeatedly was architect with Opus, implement with Sonnet, then interleave both for review — each pass with a distinct prompt framing ("add new to-do notes, review everything de novo") rather than a simple "is this right?"

Cost shapes the experience dramatically. The group was direct: around $100/month, the most common frustrating failure modes largely disappear. Free-tier strategies exist — education accounts, startup incentives, cache optimization — but they come with real tradeoffs in model quality and context availability.

## The Agentic Pipeline: What Actually Works

The workflow the group described has evolved from trying to use agents on real scientific projects. The broad structure: rough dictation → planning pass → implementation → multiple distinct review passes → alignment verification. The last step is easily skipped and often shouldn't be: does the output actually do what was intended, not just syntactically pass?

The key caveat the group returned to: this pipeline assumes domain expertise. Agentic coding doesn't lower the skill floor — it raises the ceiling for skilled practitioners. Without the ability to evaluate output at each stage, the feedback loop fails fast. Whole codebases can become unsalvageable.

## Context Management: What Claude Loads Before You Type

One of the more concrete March 19 discussions covered what's already in place before writing the first prompt: a global `claude.md` (cross-project coding standards), a local `.claude` folder (project-specific instructions), and an auto-generated `memory.md` built from prior sessions. A `skills.md` file can hold reusable task templates — one example shared was a NumPyro MCMC fitting template with preferred prior structures and chain initialization settings.

Context rot — gradual quality degradation as token count climbs — affects all models but differently. The practical rule: monitor usage and compact at around 60%, not 100%. For high-stakes generation, one-shotting (fresh context, one well-structured prompt) often beats iterative refinement in the same session. Research findings added a wrinkle: simply repeating a prompt verbatim twice yields roughly a 20% performance boost for non-reasoning models, while elaborate initialization files often don't help and sometimes hurt.

## Building an MCP Server in Under Five Minutes

The March 19 session included a live demo that illustrated a broader design principle. The Model Context Protocol lets a language model call external tools rather than hallucinate answers to questions involving external state. Starting from an empty folder and a brief prompt, the group produced a working time-server — `server.py`, requirements, CLI configuration — in under five minutes.

The point wasn't speed. Hand-written tools with guaranteed, deterministic behavior replace an entire class of model failures. The same MCP server works programmatically and via agent, making it composable across workflows. Email retrieval, Slack integration, cluster status checks — all can become reliable tools rather than unreliable prompts.

## Planning Mode and the Two-Agent Pattern

Two distinct workflow innovations surfaced in the March 20 session. Planning mode — which presents Claude's internal execution plan for human review before any code runs — proved valuable less for the plan it produces than for the thinking it forces. One participant described it as "an infinitely patient research buddy to argue with." Editing the plan first consistently yields better downstream output than iterating after the fact.

The adversarial development pattern takes a complementary approach: run two agents simultaneously, one generating and one critiquing, with outputs logged to a shared evaluation folder. More advanced implementations spawn sub-agents within a single Claude session to fill both roles — though this requires careful instruction design to avoid self-reinforcing loops.

## What Doesn't Have Easy Answers

The March 20 session expanded into territory without clean technical solutions.

**Security and sensitive data.** HIPAA-compliant model instances exist through institutional partnerships, but documented cases of models escaping sandbox restrictions also exist. The guarantees are probabilistic. For genuinely sensitive data, the safer approach is physical separation — a dedicated machine — not folder-level permissions on a personal laptop.

**Peer review integrity.** AI-generated reviews are already detectable: generically balanced, avoiding specific critique, missing the nuances that careful reading surfaces. With submission rates roughly doubling since 2022, reviewer fatigue creates real incentives to outsource. No major publisher currently screens reviews for AI use, and the problem is accumulating faster than the field is responding.

**Student learning and values.** Where is the line between eliminating obsolete skills and eliminating foundational ones? The concern wasn't AI tools per se but the incentives time pressure creates: students optimizing for output rather than understanding. Models trained to please users rather than serve scientific truth compound this — a model told to "forecast weather" may overfit if generalization isn't made explicit.

## What Two Sessions Signal

The March 19 session was largely technical: which models, which interfaces, how to structure context. The March 20 session opened onto harder questions about research integrity, student formation, and what it means to think *with* AI rather than *through* it. Together, they suggest a community that has moved past novelty into more uncomfortable territory. The tools are capable enough that the limiting factor is increasingly not what they can do — but whether the researchers using them have thought carefully enough about what they actually want to accomplish.
