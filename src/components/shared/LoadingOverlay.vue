<template>
  <div v-if="isLoading" class="vr-loading-overlay" role="status" aria-live="polite" :aria-busy="String(isLoading)">
  <div class="vr-bg-layer" />
  <!-- Galaxy background shown only while loading -->
  <GalaxyBackground />
  <div class="vr-loading-card">
      <!-- Visually hidden SEO-friendly content while loading -->
      <div class="vr-visually-hidden" aria-hidden="false">
        <h1 v-if="seoTitle">{{ seoTitle }}</h1>
        <p v-if="seoDescription">{{ seoDescription }}</p>
      </div>
      <div class="vr-ecg-wrap">
        <!-- Heart + ECG animated SVG -->
        <svg class="vr-ecg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#7dd3fc" />
              <stop offset="100%" stop-color="#60a5fa" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="none" />
          <path class="ecg-line" d="M0 30 L30 30 L38 30 L42 5 L46 55 L54 30 L90 30 L98 30 L102 10 L106 30 L120 30 L150 30 L200 30" stroke="url(#g1)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <g class="heart" transform="translate(70,6)">
            <path d="M14 2C9 -3 0 1 0 8c0 7 14 14 14 14s14-7 14-14c0-7-9-11-14-6-5-5-14-1-14 6" fill="#ef4444"/>
          </g>
        </svg>
      </div>
      <div class="vr-loading-text">Cargando contenido...<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>
      <div class="vr-floating-icons" aria-hidden="true">
        <i class="bi bi-heart-pulse-fill icon icon-1"></i>
        <i class="bi bi-bandage-fill icon icon-2"></i>
        <i class="bi bi-person-lines-fill icon icon-3"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onUnmounted, defineProps } from 'vue'
import GalaxyBackground from '@/components/shared/GalaxyBackground.vue'
import { useLoading } from '@/stores/loading'

const props = defineProps({
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' }
})

const seoTitle = props.seoTitle
const seoDescription = props.seoDescription

// register locally
const components = { GalaxyBackground }

const loadingStore = useLoading()
const isLoading = computed(() => loadingStore.loading.value)

// Disable body scrolling while loading and restore previous overflow when done
let prevOverflow = ''
let prevTitle = ''
let prevMetaDescription = null
let createdMeta = false

function setSEO() {
  try {
    if (typeof document === 'undefined') return
    if (seoTitle) {
      prevTitle = document.title || ''
      document.title = seoTitle
    }
    if (seoDescription) {
      let meta = document.querySelector('meta[name="description"]')
      if (meta) {
        prevMetaDescription = meta.getAttribute('content') || ''
        meta.setAttribute('content', seoDescription)
      } else {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        meta.setAttribute('content', seoDescription)
        document.head.appendChild(meta)
        createdMeta = true
      }
    }
  } catch (e) {
    // ignore environments without document
  }
}

function restoreSEO() {
  try {
    if (typeof document === 'undefined') return
    if (seoTitle && prevTitle !== null) {
      document.title = prevTitle
      prevTitle = ''
    }
    if (seoDescription) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) {
        if (createdMeta) {
          meta.remove()
        } else if (prevMetaDescription !== null) {
          meta.setAttribute('content', prevMetaDescription)
        }
      }
      prevMetaDescription = null
      createdMeta = false
    }
  } catch (e) {}
}
watch(isLoading, (val) => {
  try {
    if (val) {
      prevOverflow = document.documentElement.style.overflow || document.body.style.overflow || ''
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      // apply SEO changes while loading
      setSEO()
    } else {
      document.documentElement.style.overflow = prevOverflow
      document.body.style.overflow = prevOverflow
      // restore previous SEO
      restoreSEO()
    }
  } catch (e) {
    // ignore (server-side rendering or environments without document)
  }
})

onUnmounted(() => {
  try {
    document.documentElement.style.overflow = prevOverflow
    document.body.style.overflow = prevOverflow
    restoreSEO()
  } catch (e) {}
})
</script>

<style scoped>
.vr-loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  z-index: 2147483647; /* max z-index to be sure nothing is above */
}

.vr-bg-layer {
  position: absolute;
  inset: 0;
  background: #021026; /* solid dark color to fully hide background */
  /* keep a subtle texture via overlay gradient if wanted */
}

.vr-loading-card {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 26px 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  color: #e6eef8;
  box-shadow: 0 8px 30px rgba(2,6,23,0.6);
  min-width: 320px;
}

.vr-ecg-wrap { width: 220px; height: 60px; display:flex; align-items:center; justify-content:center }
.vr-ecg { width: 220px; height: 60px; overflow: visible }
.ecg-line {
  stroke-dasharray: 240;
  stroke-dashoffset: 240;
  animation: ecg 1.4s linear infinite;
}

@keyframes ecg {
  0% { stroke-dashoffset: 240 }
  30% { stroke-dashoffset: 120 }
  60% { stroke-dashoffset: 40 }
  100% { stroke-dashoffset: 0 }
}

.heart path { transform-origin: center; animation: beat 1s ease-in-out infinite; }
@keyframes beat { 0%,100% { transform: scale(1) } 50% { transform: scale(1.12) } }

.vr-loading-text { font-weight: 600; font-size: 15px; color: #dbeafe }
.vr-loading-text .dot { animation: dots 1s steps(3,end) infinite; margin-left: 2px }
@keyframes dots { 0% { opacity: 0.2 } 50% { opacity: 1 } 100% { opacity: 0.2 } }

.vr-floating-icons { position: absolute; right: -12px; bottom: -12px; display:flex; gap:8px; opacity: 0.9 }
.vr-floating-icons .icon { font-size: 18px; color: rgba(255,255,255,0.85); transform: translateY(0); }
.vr-floating-icons .icon-1 { animation: float 3s ease-in-out infinite; }
.vr-floating-icons .icon-2 { animation: float 4s ease-in-out 0.2s infinite; }
.vr-floating-icons .icon-3 { animation: float 3.5s ease-in-out 0.6s infinite; }
@keyframes float { 0% { transform: translateY(0) } 50% { transform: translateY(-8px) } 100% { transform: translateY(0) } }

/* visually-hidden / sr-only for accessible SEO content */
.vr-visually-hidden,
.vr-visually-hidden * {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}

</style>
