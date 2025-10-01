<template>
  <div class="bar-chart">
    <div class="chart-header" v-if="title">
      <h3>{{ title }}</h3>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="chart-container">
      <div class="chart-bars">
        <div 
          v-for="(item, index) in chartData" 
          :key="index"
          class="bar-item"
        >
          <div class="bar-wrapper">
            <div 
              class="bar"
              :style="{ 
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || colors[index % colors.length]
              }"
            ></div>
            <span class="bar-value">{{ item.value }}</span>
          </div>
          <span class="bar-label">{{ item.label }}</span>
        </div>
      </div>
      
      <!-- Eje Y (valores) -->
      <div class="y-axis">
        <div 
          v-for="tick in yAxisTicks" 
          :key="tick"
          class="y-axis-tick"
          :style="{ bottom: `${(tick / maxValue) * 100}%` }"
        >
          {{ tick }}
        </div>
      </div>
    </div>
    
    <!-- Leyenda -->
    <div class="chart-legend" v-if="showLegend && chartData.length > 1">
      <div 
        v-for="(item, index) in chartData" 
        :key="index"
        class="legend-item"
      >
        <div 
          class="legend-color"
          :style="{ backgroundColor: item.color || colors[index % colors.length] }"
        ></div>
        <span>{{ item.label }}: {{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
    default: () => ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f97316']
  },
  showLegend: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: '300px'
  }
})

const chartData = computed(() => props.data)
const maxValue = computed(() => Math.max(...props.data.map(item => item.value)))

const yAxisTicks = computed(() => {
  const max = maxValue.value
  const tickCount = 5
  const step = Math.ceil(max / tickCount)
  const ticks = []
  
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(i * step)
  }
  
  return ticks.filter(tick => tick <= max)
})
</script>

<style scoped>
.bar-chart {
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
  position: relative;
  height: v-bind(height);
  padding: 1rem 2rem 2rem 3rem;
}

@media (max-width: 768px) {
  .chart-container {
    padding: 0.75rem 1rem 1.5rem 2rem;
  }
}

@media (max-width: 480px) {
  .chart-container {
    padding: 0.5rem 0.75rem 1rem 1.5rem;
  }
}

.chart-bars {
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 100%;
  gap: 1rem;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 60px;
}

.bar-wrapper {
  position: relative;
  height: 80%;
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
}

.bar {
  width: 100%;
  min-height: 4px;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  position: relative;
}

.bar:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

.bar-value {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.bar-label {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  font-weight: 500;
  word-wrap: break-word;
  max-width: 100%;
}

.y-axis {
  position: absolute;
  left: 0;
  top: 1rem;
  bottom: 2rem;
  width: 3rem;
  pointer-events: none;
}

.y-axis-tick {
  position: absolute;
  left: 0;
  width: 2.5rem;
  height: 1px;
  background: #e5e7eb;
  font-size: 0.75rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 0.5rem;
}

.y-axis-tick::after {
  content: '';
  position: absolute;
  right: -1px;
  width: calc(100vw - 3rem);
  height: 1px;
  background: #f3f4f6;
  z-index: 0;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .chart-container {
    padding: 1rem 1rem 2rem 2rem;
  }
  
  .chart-bars {
    gap: 0.5rem;
  }
  
  .bar-item {
    max-width: 40px;
  }
  
  .bar-label {
    font-size: 0.625rem;
  }
  
  .chart-legend {
    flex-direction: column;
    align-items: center;
  }
}
</style>
