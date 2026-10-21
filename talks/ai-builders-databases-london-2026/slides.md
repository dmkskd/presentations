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


- 
- **Demo**
- **Takeaways**


<style>
/* fade finished sections once the next one appears; the current section stays bright */
ul:not(li ul) > li:has(~ li:not(.slidev-vclick-hidden)) { opacity: 0.4; transition: opacity 0.3s; }
</style>

---

# TraceHouse

<v-clicks depth="2" class="text-lg">

- Problem
  - Monitoring ClickHouse
  - teams are using the usual su
  - let's ignore LLM agents for now
- **The idea**
  - What the tool does differently
- **Demo**
  - http://178.104.103.140
- **Takeaways**
  - The one thing to remember

</v-clicks>
<style>
/* fade finished sections once the next one appears; the current section stays bright */
ul:not(li ul) > li:has(~ li:not(.slidev-vclick-hidden)) { opacity: 0.4; transition: opacity 0.3s; }
</style>

---

# ClickHouse Patterns

<v-clicks depth="2" class="text-lg">

- Problem
  - what are the ClickHouse best practices 
  - how can I communicate them to other team members
  - 
- **The idea**
  - What the tool does differently
- **Demo**
  - https://github.com/dmkskd/clickhouse-patterns
- **Takeaways**
  - The one thing to remember

</v-clicks>
<style>
/* fade finished sections once the next one appears; the current section stays bright */
ul:not(li ul) > li:has(~ li:not(.slidev-vclick-hidden)) { opacity: 0.4; transition: opacity 0.3s; }
</style>

---

# TF View (Terraform View)


<v-clicks>

- The problem
- The idea
- Demo
- Takeaways

</v-clicks>

---

# Wrap Up

Questions?

<QrCode class="mt-8" :size="220" />
