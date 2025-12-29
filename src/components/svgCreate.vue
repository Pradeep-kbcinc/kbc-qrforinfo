<template>
    <svg width="500" height="350" viewBox="0 0 500 350">
      <!-- Plot -->
      <rect
        x="100"
        y="50"
        :width="plotWidth"
        :height="plotHeight"
        fill="none"
        stroke="#ff7a18"
        stroke-width="4"
      />
  
      <!-- Labels -->
      <text x="250" y="30" text-anchor="middle" fill="green">North</text>
  
      <text
        :x="100 + plotWidth / 2"
        y="70"
        text-anchor="middle"
        fill="#0099ff"
      >
        {{ plot.width }} FT
      </text>
  
      <text
        :x="100 + plotWidth + 15"
        :y="50 + plotHeight / 2"
        fill="#0099ff"
      >
        {{ plot.height }} FT
      </text>
  
      <!-- Road -->
      <line
        x1="90"
        :y1="50 + plotHeight + 20"
        x2="410"
        :y2="50 + plotHeight + 20"
        stroke="#777"
        stroke-width="6"
      />
      <text x="250" :y="50 + plotHeight + 45" text-anchor="middle">
        {{ plot.roadName || 'Road' }}
      </text>
    </svg>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  
  const plot = ref({
    width: 100,
    height: 200,
    roadName: 'Main Road',
  })
  
  const scale = 2 // visual scale
  
  const plotWidth = computed(() => plot.value.width * scale)
  const plotHeight = computed(() => plot.value.height * scale)
  </script>
  