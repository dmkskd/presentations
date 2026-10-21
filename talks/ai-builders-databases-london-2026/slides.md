---
theme: seriph
title: A Visual Journey into ClickHouse Through Open Source Tools
info: |
  AI Builders and Databases London · Wednesday 21 October 2026
author: Filippo
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
routerMode: hash
addons:
  - qrcode
---

<h1 class="!text-5xl !leading-tight">A Visual Journey into ClickHouse<br>Through Open Source Tools</h1>

<div class="abs-bl m-6 text-sm opacity-60">
AI Builders & Databases London · Wednesday 21 October 2026
</div>

<div class="abs-br m-6">
  <QrCode :size="120" />
</div>

<!--
Speaker notes go in HTML comments at the end of a slide.
Press "p" in the browser for presenter mode.
-->

---

# Who am I

- **Who am I:** Filippo Macchiettini
- **What I do:** SRE / Data
- **Where to find me:** ddmmkk@proton.me

---

# Agenda

1. Tooling in the LLM era
2. TraceHouse
3. ClickHouse Patterns
4. TFView (Terraform View)
5. Wrap up

---

# Tooling in the LLMs era

<v-clicks class="text-lg">

- Historically, creating tools was always a question of trade-offs
  - is it going to be that useful?
  - can you quantify how much it's going to save?
- With AI, most of those questions and blockers can go away
  - prototyping is a matter of minutes
  - UI is mostly free
  - although making something good still takes a lot of time!
- When seeing an opportunity, try to go for it
- Sharing my experience in creating three ClickHouse tools

</v-clicks>


<style>
/* fade finished sections once the next one appears; the current section stays bright */
ul:not(li ul) > li:has(~ li:not(.slidev-vclick-hidden)) { opacity: 0.4; transition: opacity 0.3s; }
</style>

---

# TraceHouse

<v-clicks  class="text-lg">

- The problem: ClickHouse Monitoring
  - teams are using Grafana and similar observability tools
  - many dashboards, many graphs, but hard to go into a single query or event
  - let's ignore LLM agents for now
- The idea
  - Let's build something tailored to our needs!
  - We want to drill down into ClickHouse Primitives: queries, merges etc
- Demo
  - https://dmkskd.github.io/tracehouse/
  - but what if we are already using Grafana? We won't move to another tool
- Takeaways
  - it's relatively easy to build the tool you need
  - it may be possible to extend the tool you are already using (e.g. Grafana)

</v-clicks>
<style>
/* fade finished sections once the next one appears; the current section stays bright */
ul:not(li ul) > li:has(~ li:not(.slidev-vclick-hidden)) { opacity: 0.4; transition: opacity 0.3s; }
</style>

---

# ClickHouse Patterns

<v-clicks class="text-lg">

- The problem
  - What are ClickHouse best practices, especially for ingestion?
  - How do I share ClickHouse patterns and decisions with my team?
- The idea
  - A playground where you can try, copy and modify patterns
  - Comes with agentic skills, so adding a new pattern has a low cost
- Demo
  - https://dmkskd.github.io/clickhouse-patterns/
- Takeaways
  - Many ways to solve the same problem, each with its own trade-offs
  - Make it easy to brainstorm, iterate on and communicate your architecture

</v-clicks>
<style>
/* fade finished sections once the next one appears; the current section stays bright */
ul:not(li ul) > li:has(~ li:not(.slidev-vclick-hidden)) { opacity: 0.4; transition: opacity 0.3s; }
</style>

---

# TF View (Terraform View)


<v-clicks>

- The problem
  - ClickHouse may be deployed using terraform
  - Reviewing a terraform plan is always nerve wracking
  - Staring at a terraform plan diff is no fun
- The idea
  - Can we make the terraform plan more visual?
  - Highlight what's going to change?
  - Can we add it to the Pull Request flow?
- Demo
  - https://github.com/dmkskd/tf-view
  - https://github.com/dmkskd/tf-view-demo/pull/30
- Takeaways
  - Looking at a large tf plan diff is really no fun

</v-clicks>

---

# Wrap Up

- TraceHouse: https://github.com/dmkskd/tracehouse
- ClickHouse Patterns: https://github.com/dmkskd/clickhouse-patterns
- TFView: https://github.com/dmkskd/tf-view

Questions?

<QrCode class="mt-8" :size="220" />
