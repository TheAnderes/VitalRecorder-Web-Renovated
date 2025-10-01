<template>
  <div class="line-chart" ref="chartElement">
    <div class="chart-header" v-if="title">
      <h3>{{ title }}</h3>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="chart-container" ref="containerElement">
      <svg :width="svgWidth" :height="svgHeight" class="line-svg" :viewBox="`0 0 ${svgWidth} ${svgHeight}`">
        <!-- Grid lines -->
        <g class="grid">
          <line
            v-for="tick in yAxisTicks"
            :key="'y-' + tick"
            :x1="padding"
            :y1="getYPosition(tick)"
            :x2="svgWidth - padding"
            :y2="getYPosition(tick)"
            stroke="#f3f4f6"
            stroke-width="1"
          />
          <line
            v-for="(label, index) in labels"
            :key="'x-' + index"
            :x1="getXPosition(index)"
            :y1="padding"
            :x2="getXPosition(index)"
            :y2="svgHeight - padding * 2"
            stroke="#f3f4f6"
            stroke-width="1"
          />
        </g>
        
        <!-- Area fill (optional) -->
        <path
          v-if="showArea"
          :d="areaPath"
          :fill="`url(#gradient-${componentId})`"
          opacity="0.2"
        />
        
        <!-- Line path -->
        <path
          :d="linePath"
          :stroke="lineColor"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        
        <!-- Data points -->
        <g class="data-points">
          <circle
            v-for="(value, index) in data"
            :key="index"
            :cx="getXPosition(index)"
            :cy="getYPosition(value)"
            :r="pointRadius"
            :fill="lineColor"
            stroke="white"
            stroke-width="2"
            class="data-point"
            @mouseenter="showTooltip(index, $event)"
            @mouseleave="hideTooltip"
          />
        </g>
        
        <!-- Y Axis labels -->
        <g class="y-axis-labels">
          <text
            v-for="tick in yAxisTicks"
            :key="'y-label-' + tick"
            :x="padding - 10"
            :y="getYPosition(tick)"
            text-anchor="end"
            dominant-baseline="middle"
            class="axis-label"
          >
            {{ tick }}
          </text>
        </g>
        
        <!-- X Axis labels -->
        <g class="x-axis-labels">
          <text
            v-for="(label, index) in labels"
            :key="'x-label-' + index"
            :x="getXPosition(index)"
            :y="svgHeight - padding + 20"
            text-anchor="middle"
            class="axis-label"
          >
            {{ label }}
          </text>
        </g>
        
        <!-- Gradient definition -->
        <defs v-if="showArea">
          <linearGradient :id="`gradient-${componentId}`" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" :style="`stop-color:${lineColor};stop-opacity:0.4`" />
            <stop offset="100%" :style="`stop-color:${lineColor};stop-opacity:0`" />
          </linearGradient>
        </defs>
      </svg>
      
      <!-- Tooltip -->
      <div
        v-if="tooltip.show"
        class="chart-tooltip"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        <div class="tooltip-content">
          <div class="tooltip-label">{{ labels[tooltip.index] }}</div>
          <div class="tooltip-value">{{ data[tooltip.index] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    validator: (data) => data.every(item => typeof item === 'number')
  },
  labels: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  lineColor: {
    type: String,
    default: '#3b82f6'
  },
  showArea: {
    type: Boolean,
    default: false
  },
  pointRadius: {
    type: Number,
    default: 4
  }
})

const chartElement = ref(null)
const containerElement = ref(null)
const svgWidth = ref(600)
const svgHeight = ref(300)
const componentId = ref(Math.random().toString(36).substr(2, 9))
const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  index: 0
})

const padding = 50
const maxValue = computed(() => Math.max(...props.data))
const minValue = computed(() => Math.min(...props.data))
const valueRange = computed(() => maxValue.value - minValue.value || 1)

const yAxisTicks = computed(() => {
  const tickCount = 5
  const step = Math.ceil(valueRange.value / tickCount)
  const ticks = []
  
  for (let i = 0; i <= tickCount; i++) {
    const value = minValue.value + (i * step)
    if (value <= maxValue.value) {
      ticks.push(value)
    }
  }
  
  return ticks
})

const getXPosition = (index) => {
  const chartWidth = svgWidth.value - (padding * 2)
  const stepWidth = chartWidth / (props.data.length - 1)
  return padding + (index * stepWidth)
}

const getYPosition = (value) => {
  const chartHeight = svgHeight.value - (padding * 2)
  const normalizedValue = (value - minValue.value) / valueRange.value
  return svgHeight.value - padding - (normalizedValue * chartHeight)
}

const linePath = computed(() => {
  if (props.data.length === 0) return ''
  
  let path = `M ${getXPosition(0)} ${getYPosition(props.data[0])}`
  
  for (let i = 1; i < props.data.length; i++) {
    path += ` L ${getXPosition(i)} ${getYPosition(props.data[i])}`
  }
  
  return path
})

const areaPath = computed(() => {
  if (props.data.length === 0) return ''
  
  let path = `M ${getXPosition(0)} ${getYPosition(props.data[0])}`
  
  for (let i = 1; i < props.data.length; i++) {
    path += ` L ${getXPosition(i)} ${getYPosition(props.data[i])}`
  }
  
  // Close the area by drawing to bottom right, then bottom left
  path += ` L ${getXPosition(props.data.length - 1)} ${svgHeight.value - padding}`
  path += ` L ${getXPosition(0)} ${svgHeight.value - padding}`
  path += ' Z'
  
  return path
})

const showTooltip = (index, event) => {
  tooltip.value.show = true
  tooltip.value.index = index
  tooltip.value.x = event.offsetX + 10
  tooltip.value.y = event.offsetY - 10
}

const hideTooltip = () => {
  tooltip.value.show = false
}

const updateSize = () => {
  if (containerElement.value) {
    const rect = containerElement.value.getBoundingClientRect()
    // Allow smaller widths in mobile so the SVG fits the container without overflow
    svgWidth.value = Math.max(280, rect.width || 600)
    // Slightly smaller minimum height for mobile
    svgHeight.value = Math.max(200, Math.min(400, svgWidth.value * 0.5))
  }
}

let resizeObserver = null

onMounted(async () => {
  // Generar ID único para el gradiente
  componentId.value = Math.random().toString(36).substr(2, 9)
  
  await nextTick()
  updateSize()
  
  // Configurar ResizeObserver para detectar cambios de tamaño
  if (window.ResizeObserver && containerElement.value) {
    resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(containerElement.value)
  }
  
  // Fallback: escuchar resize del window
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  window.removeEventListener('resize', updateSize)
})
</script>

<style scoped>
.line-chart {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  width: 100%;
  overflow: hidden;
}

.chart-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.chart-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.chart-header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.chart-container {
  position: relative;
  overflow: visible;
}

.line-svg {
  width: 100%;
  height: auto;
  display: block;
  max-width: 100%;
}

@media (max-width: 768px) {
  .line-chart {
    padding: 1rem;
  }
  
  .chart-header h3 {
    font-size: 1.125rem;
  }
  
  .axis-label {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .line-chart {
    padding: 0.75rem;
  }
  
  .chart-header {
    margin-bottom: 1rem;
  }
  
  .axis-label {
    font-size: 0.675rem;
  }
}

.axis-label {
  font-size: 0.75rem;
  fill: #9ca3af;
  font-family: system-ui, -apple-system, sans-serif;
}

.data-point {
  cursor: pointer;
  transition: all 0.2s ease;
}

.data-point:hover {
  r: 6;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.chart-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  pointer-events: none;
  z-index: 10;
  min-width: 80px;
}

.tooltip-content {
  text-align: center;
}

.tooltip-label {
  font-weight: 500;
  margin-bottom: 0.125rem;
}

.tooltip-value {
  font-weight: 700;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .line-chart {
    padding: 1rem;
  }
  
  .axis-label {
    font-size: 0.625rem;
  }
  
  .chart-tooltip {
    font-size: 0.75rem;
    padding: 0.375rem 0.5rem;
  }
}
</style>
