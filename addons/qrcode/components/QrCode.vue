<!--
  QR code pointing at this talk's public URL.
  Usage: <QrCode />, <QrCode :size="160" />, <QrCode url="https://..." :show-url="false" />
  The URL comes from VITE_TALK_URL (set by scripts/run.js and scripts/build-all.js),
  falling back to the address the deck is currently served from. A localhost fallback is
  useless to the audience, so a placeholder is shown instead until a GitHub remote exists.
-->
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import QRCode from 'qrcode'

const props = withDefaults(defineProps<{
  url?: string
  size?: number
  showUrl?: boolean
}>(), { size: 200, showUrl: true })

const target = computed(() => {
  const url = props.url || import.meta.env.VITE_TALK_URL || `${location.origin}${location.pathname}`
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/.test(url) ? '' : url
})

const label = computed(() => target.value.replace(/^https?:\/\//, '').replace(/\/$/, ''))

const svg = ref('')
watchEffect(async () => {
  if (!target.value) return
  // dark-on-white with a quiet zone scans reliably even on dark themes and projectors
  svg.value = await QRCode.toString(target.value, {
    type: 'svg',
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark: '#000000', light: '#ffffff' },
  })
})
</script>

<template>
  <div v-if="!target" class="qrcode-missing inline-flex items-center justify-center text-center text-xs p-2 rounded-md border-2 border-dashed opacity-70" :style="{ width: `${size}px`, height: `${size}px` }">
    QR code appears once the repo has a GitHub remote
  </div>
  <div v-else class="qrcode inline-flex flex-col items-center gap-2">
    <div class="rounded-md overflow-hidden" :style="{ width: `${size}px`, height: `${size}px` }" v-html="svg" />
    <a v-if="showUrl" :href="target" target="_blank" class="text-sm opacity-80 !border-none">{{ label }}</a>
  </div>
</template>

<style scoped>
.qrcode :deep(svg) { width: 100%; height: 100%; display: block; }
</style>
