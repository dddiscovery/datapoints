---
layout: blog
title: "What Happens to Your Data When You Use AI?"
subtitle: "A Researcher's Guide to Cloud Infrastructure and Privacy"
authors: ["Melanie Segado"]
author_pic: ["/assets/images/authors/melanie-segado.png"]
author_title: ["Penn AI Fellow"]
date: 2026-06-17
permalink: /cloud-ai-data-privacy/
summary: "Melanie Segado, Penn AI Fellow, traces what happens to your data at every stage of a cloud AI pipeline — from on-device processing to distributed GPU clusters — and offers practical strategies for researchers working with sensitive data."
---

In this tutorial, Melanie Segado — Penn AI Fellow — walks through what actually happens to your data when you use AI tools: from the moment a photo is taken on your phone to the moment a query returns from a remote GPU cluster. Drawing on her own research with sensitive video data of infants at neuromotor risk, she maps out the physical, technical, and legal layers of cloud AI infrastructure — and offers practical strategies for researchers who need to think carefully about what they share, with whom, and under what conditions.

<div class="meetup-takeaways" markdown="1">

## Key Takeaways

- Every photo, video, and AI query travels through multiple physical servers before returning to you — often altered, often stored in ways that are hard to fully revoke
- Modern phones perform on-device AI processing that can modify your data before it even reaches the cloud — the Samsung moon photo controversy is a striking example
- At the hardware level, AI computation happens on physical chips (CPUs and GPUs) housed in specific geographic locations — understanding this makes data governance decisions concrete rather than abstract
- Privacy at each stage of the chain depends on separate policies: your device, your ISP, the cloud provider, and any third-party sub-agents each have distinct access and retention rules
- AI search fundamentally changes your relationship to sources — the model curates and interprets, reducing your ability to evaluate evidence independently
- Agentic AI fans your queries across potentially hundreds of machines; a single request may traverse a distributed network of third-party contractors
- Local models and sandboxing are practical options for researchers working with sensitive data — but come with real capability tradeoffs worth understanding

</div>

<div class="workflow-scroll-panel">
<div class="workflow-chart">
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Your Device</div>
        <ul class="workflow-list">
          <li>On-device AI alters data at capture</li>
          <li>Local storage feels permanent</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Cloud Upload</div>
        <ul class="workflow-list">
          <li>Backup sends copies to remote servers</li>
          <li>Sharded across many geographic locations</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Physical Hardware</div>
        <ul class="workflow-list">
          <li>Transistors → logic gates → CPUs/GPUs</li>
          <li>Data centers with 100,000s of GPUs</li>
          <li>Undersea fiber carries data as light</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">The Data Journey</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Encryption &amp; Consent</div>
        <ul class="workflow-list">
          <li>Each hop has different visibility</li>
          <li>Terms of service grant broad licenses</li>
          <li>"Deleted" ≠ server-side deleted</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">AI Search &amp; Agents</div>
        <ul class="workflow-list">
          <li>Model infers intent, curates sources</li>
          <li>Agentic calls fan to sub-agents</li>
          <li>Model may modify your query silently</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Privacy Across the Chain</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Local Models</div>
        <ul class="workflow-list">
          <li>Open-weight models (e.g. Qwen)</li>
          <li>Data never leaves your machine</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Sandboxing</div>
        <ul class="workflow-list">
          <li>Restrict file/folder access</li>
          <li>Prevent accidental disclosure</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Monitoring</div>
        <ul class="workflow-list">
          <li>Airplane mode test</li>
          <li>Permission audit</li>
          <li>Read privacy policy sections</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Practical Strategies</div>
  </div>
</div>
</div>
<div class="workflow-caption">Figure 1: From data capture to cloud infrastructure — and how researchers can stay in control</div>

## The Data Journey

### From Device to Cloud

Melanie opened the session with the question that drives her research practice: at every stage of her computation pipeline, where does the data physically live?

The simplest case is a photo on your phone. It feels local — stored on the device in your hand. But the moment cloud backup is enabled and you have internet access, a parallel process silently sends copies to remote servers. Those servers aren't a single location. Your photo is **sharded**: split across dozens of machines in different geographic locations, reconstructed on demand, with redundant copies distributed for resilience. Which country the hardware sits in matters: Europeans have data protection regulations that require certain data to remain within the EU; U.S. export controls keep other categories domestic. The copy on your phone may feel like the "real" one, but it's really just one entry point into a distributed pattern of bits you don't own or control.

Melanie's key example: the **Samsung moon photos**. Experiments on Reddit documented users photographing a smudgy streetlight and receiving back a crisp, high-resolution image of the moon. Samsung's on-device AI model had recognized a bright circle in the frame and substituted its internal representation of what the moon looks like. The pixel values you captured were overwritten by a model's inference before the image was ever stored. This isn't a cloud phenomenon — it's happening locally, at capture, invisibly. For scientists using off-the-shelf hardware to collect data, this matters: images of non-standard subjects (unusual postures, skin conditions, medical contexts) may be silently "corrected" toward typical distributions.

### The Physical Layer: Transistors to Data Centers

To make cloud infrastructure concrete, Melanie traced the hardware from the ground up.

The fundamental unit is the **transistor** — a component that holds a state of 0 or 1. Combining transistors into **logic gates** yields Boolean operations. Assembling logic gates into **circuits** produces specific functions like addition. Assembling circuits produces a **processor**. For AI workloads, the critical chip is the **GPU** (Graphics Processing Unit) — originally designed for parallel graphics rendering, now the engine of deep learning. A single H100 GPU contains roughly 80 billion transistors. OpenAI's data centers house approximately 100,000 such GPUs spread across multiple geographic locations.

When you send a query to an AI model, you are asking a specific sequence of operations to run on physical chips inside one of those data centers. The data leaves your device, passes through your ISP, travels through undersea fiber-optic cables carrying light signals across thousands of kilometers of ocean, runs on hardware in a specific building, and returns. The spinning wait cursor you see partly reflects inference time — and partly reflects the speed of light across physical cable.

## Privacy Across the Chain

### Encryption, Consent, and Retention

Privacy isn't a single property — it varies at every hop in the chain.

Your **ISP** sees metadata: who you're communicating with, when, and how much data you're sending, even if the content is encrypted. The **cloud provider** sees content unless end-to-end encryption is in place. Provider **employees** may have limited or full access depending on internal policy. Third-party processors, contractors, and sub-agents may receive fragments of your query under their own separate terms.

Melanie noted that Google Photos stored images unencrypted until 2013 — not ancient history. Apple's approach is more protective: photos sent through their cloud processing pipeline travel via Apple Secure Storage, reportedly encrypted in a way Apple itself cannot access. But even there, the public documentation is more trustworthy than the actual implementation is independently verifiable.

**Consent** is deliberately underspecified. Most terms of service grant the provider a broad license to use your data to "improve their service." Whether that covers fine-tuning, metadata analysis, or full training runs is rarely defined clearly. Opting out of training may not prevent the use of interaction metadata, and the legal definitions are thin enough that definitively answering the question requires more legal research than most users have time to do.

**Retention** is equally murky. Gemini's Penn Engineering instance, as of Melanie's audit, retains server-side copies of conversations for a fixed period even after users delete them from the browser interface. Deletion from your view and deletion from the server are not the same event.

### AI Search and Agentic Calls

Traditional keyword search returned a list of links you evaluated. AI search does something different: it interprets your query, infers your probable intent, curates sources, summarizes them, and sometimes follows up with questions it predicted you would ask. The model's reasoning traces reveal this explicitly — Melanie showed an example where a query about cats triggered reasoning that the user was probably a researcher, leading to a response filtered toward scientific literature rather than general web results.

This isn't neutral. The model is making decisions about what you probably want to know, narrowing your discovery space before you've had a chance to explore it. One study found that in roughly 93% of AI-assisted searches, users never explicitly told the model to search the internet — the model made that call autonomously. Each autonomous internet call creates a **sub-agent**: a separate process that may run on third-party infrastructure, under separate terms, with potentially different encryption guarantees.

For Melanie's research, this is a live concern. When she queries a model with questions about infant movement data, the model may assess the query as sensitive, silently modify what it sends downstream, flag the interaction for review, or restrict its own response — none of which she would be notified about directly. The pipeline she intended as a single conversation may have fanned her data across dozens of machines, including machines she has no contractual relationship with.

## Practical Strategies for Researchers

### Local Models and Sandboxing

The most direct solution for sensitive data is to keep computation local. Open-weight models like **Qwen** can run on a lab server without internet access, eliminating the data-sharing problem. The capability tradeoff is real — local models are generally weaker than frontier models — but for specific, bounded tasks, Melanie has found them sufficient.

Her example: she needed to find video frames containing a specific on-screen visual cue (a red border that appears in her data-capture application). Previously, this would have required training a dedicated object detector. A local vision-language model, prompted with a one-shot description, does it well enough. It isn't computationally optimal — but the data never leaves her machine, and the task gets done.

**Sandboxing** is complementary. Cloud AI providers typically allow you to define a restricted environment — a specific folder, a bounded set of file permissions — within which an AI assistant operates. Melanie noted from experience with Claude Code that the assistant will explore files beyond the immediate task if given the opportunity; explicit boundaries prevent accidental disclosure through search behavior.

<div class="workflow-scroll-panel">
<div class="workflow-chart">
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Classify the data</div>
        <ul class="workflow-list">
          <li>Regulated? (HIPAA, export controls)</li>
          <li>Consented for third-party processing?</li>
          <li>Identifiable / sensitive subjects?</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Choose compute strategy</div>
        <ul class="workflow-list">
          <li>Local open-weight model (most control)</li>
          <li>Sandboxed cloud with scoped access</li>
          <li>Open cloud (least control)</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Audit and monitor</div>
        <ul class="workflow-list">
          <li>Airplane mode test for hidden network calls</li>
          <li>Permission review vs. stated function</li>
          <li>Read retention and training sections of ToS</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Decision Framework for Sensitive Research Data</div>
  </div>
</div>
</div>
<div class="workflow-caption">Figure 2: A practical decision framework for researchers handling sensitive data with AI tools</div>

### Monitoring and Friction

For cases where cloud tools are unavoidable, two practical heuristics help surface hidden data flows.

**Airplane mode testing**: take your device offline and observe what breaks. Applications that stop functioning without internet access despite appearing to run locally are doing computation or data transfer you weren't aware of. This is a quick, zero-cost audit of where computation is actually happening.

**Permission auditing**: compare the permissions an app requests against the permissions strictly necessary for its stated function. Location access, microphone access, or network permissions unrelated to the app's purpose are worth investigating — they often reflect data collection beyond the stated use case.

Privacy policies have a poor reputation for opacity, but Melanie argued they're worth reading selectively. The sections on data retention, training data use, and third-party sharing contain disclosures companies are legally obligated to make, and they're more informative than their length would suggest.

The session closed with a broader observation. The internet was conceived as a public, federated infrastructure. The current AI ecosystem concentrates compute in a small number of private companies operating on profit incentives, with terms that can change overnight. The abrupt disappearance of the Fable model — which researchers had built workflows around, removed within 48 hours of release — illustrated the practical stakes: model continuity operates on a deprecation cycle far shorter and less predictable than traditional scientific software. For any research team working with sensitive data, the question of whether to treat AI as a utility (owned by someone else, efficient and convenient) or as infrastructure you control is one worth answering before the decision gets made for you.