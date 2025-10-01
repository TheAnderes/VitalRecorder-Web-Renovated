<template>
  <div class="pie-chart">
    <div class="chart-header" v-if="title">
      <h3>{{ title }}</h3>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="chart-container">
      <!-- SVG Pie Chart -->
      <div class="pie-svg-container">
        <svg :width="size" :height="size" class="pie-svg">
          <g :transform="`translate(${size/2}, ${size/2})`">
            <path
              v-for="(slice, index) in slices"
              :key="index"
              :d="slice.path"
              :fill="slice.color"
              :class="{ 'slice-hover': hoveredIndex === index }"
              @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = null"
              class="pie-slice"
            />
          </g>
        </svg>
        
        <!-- Centro del gráfico -->
        <div class="pie-center">
          <div class="center-content">
            <div class="total-value">{{ totalValue }}</div>
            <div class="total-label">{{ centerLabel }}</div>
          </div>
        </div>
      </div>
      
      <!-- Leyenda -->
      <div class="pie-legend">
        <div
          v-for="(item, index) in chartData"
          :key="index"
          class="legend-item"
          :class="{ 'legend-hover': hoveredIndex === index }"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <div 
            class="legend-color"
            :style="{ backgroundColor: item.color || colors[index % colors.length] }"
          ></div>
          <div class="legend-text">
            <span class="legend-label">{{ item.label }}</span>
            <span class="legend-value">{{ item.value }} ({{ getPercentage(item.value) }}%)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    validator: (data) => data.every(item => 
      typeof item === 'object' && 
      'label' in item && 
      'value' in item && 
      typeof item.value === 'number'
    )
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  colors: {
    type: Array,
    default: () => ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4', '#84cc16']
  },
  size: {
    type: Number,
    default: 200
  },
  centerLabel: {
    type: String,
    default: 'Total'
  }
})

const hoveredIndex = ref(null)
const chartData = computed(() => props.data)
const totalValue = computed(() => props.data.reduce((sum, item) => sum + item.value, 0))

const getPercentage = (value) => {
  return Math.round((value / totalValue.value) * 100)
}

const slices = computed(() => {
  const radius = (props.size - 20) / 2
  let currentAngle = -Math.PI / 2 // Empezar desde arriba
  
  return props.data.map((item, index) => {
    const percentage = item.value / totalValue.value
    const angle = percentage * 2 * Math.PI
    
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    
    const x1 = Math.cos(startAngle) * radius
    const y1 = Math.sin(startAngle) * radius
    const x2 = Math.cos(endAngle) * radius
    const y2 = Math.sin(endAngle) * radius
    
    const largeArc = angle > Math.PI ? 1 : 0
    
    const pathData = [
      'M', 0, 0,
      'L', x1, y1,
      'A', radius, radius, 0, largeArc, 1, x2, y2,
      'Z'
    ].join(' ')
    
    currentAngle += angle
    
    return {
      path: pathData,
      color: item.color || props.colors[index % props.colors.length],
      percentage: Math.round(percentage * 100)
    }
  })
})
</script>

<style scoped>
.pie-chart {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
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
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .chart-container {
    flex-direction: column;
    gap: 1rem;
  }
}

.pie-svg-container {
  position: relative;
  flex-shrink: 0;
}

.pie-svg {
  display: block;
}

.pie-slice {
  transition: all 0.3s ease;
  cursor: pointer;
  stroke: white;
  stroke-width: 2;
}

.slice-hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.center-content {
  text-align: center;
}

.total-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.total-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  margin-top: 0.25rem;
}

.pie-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.legend-item:hover,
.legend-hover {
  background: #f9fafb;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  flex-shrink: 0;
}

.legend-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
}

.legend-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}

.legend-value {
  font-size: 0.75rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .chart-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .pie-legend {
    min-width: auto;
    width: 100%;
  }
  
  .legend-item {
    padding: 0.75rem;
  }
  
  .total-value {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .pie-chart {
    padding: 1rem;
  }
  
  .pie-svg-container svg {
    width: 160px;
    height: 160px;
  }
}
</style>
