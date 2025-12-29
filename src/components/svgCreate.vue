<template>
    <div>
      <!-- Toolbar -->
      <div class="mb-3 d-flex mb-2">
        <v-btn  color="primary" min-width="90" class="text-none mr-2" rounded="lg" @click="tool = 'pen'"> <v-icon size="large">mdi-pen</v-icon> Pen</v-btn>
        <!-- <v-btn size="small" min-width="10" @click="tool = 'rect'" class="text-none">Rect</v-btn>
        <v-btn size="small" min-width="10" @click="tool = 'circle'" class="text-none">Circle</v-btn>
        <v-btn size="small" min-width="10" @click="tool = 'text'" class="text-none">Text</v-btn> -->
        <v-btn  color="error" min-width="90" @click="clear" class="text-none"><v-icon size="large">mdi-delete</v-icon> Clear</v-btn>
      </div>
  
      <!-- Canvas -->
      <v-stage
        ref="stageRef"
        :config="stageConfig"
        @pointerdown="pointerDown"
        @pointermove="pointerMove"
        @pointerup="pointerUp"
        style="border:1px solid #ccc; touch-action:none;cursor: crosshair;"
      >
        <v-layer ref="layerRef">
          <!-- Free draw lines -->
          <v-line
            v-for="(line, i) in lines"
            :key="'l'+i"
            :config="line"
          />
  
          <!-- Rectangles -->
          <v-rect
            v-for="(rect, i) in rects"
            :key="'r'+i"
            :config="rect"
            draggable
          />
  
          <!-- Circles -->
          <v-circle
            v-for="(circle, i) in circles"
            :key="'c'+i"
            :config="circle"
            draggable
          />
  
          <!-- Text -->
          <v-text
            v-for="(text, i) in texts"
            :key="'t'+i"
            :config="text"
            draggable
          />
        </v-layer>
      </v-stage>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const stageRef = ref(null)
  const layerRef = ref(null)
  
  const tool = ref('pen')
  let isDrawing = false
  let currentShape = null
  
  const lines = ref([])
  const rects = ref([])
  const circles = ref([])
  const texts = ref([])
  
  const stageConfig = {
    width: 1000,
    height: 500
  }
  
  const pointerDown = (e) => {
    const stage = stageRef.value.getStage()
    const pos = stage.getPointerPosition()
    isDrawing = true
  
    if (tool.value === 'pen') {
      lines.value.push({
        points: [pos.x, pos.y],
        stroke: '#ff7a18',
        strokeWidth: 4,
        lineCap: 'round',
        lineJoin: 'round',
        perfectDrawEnabled: false
      })
    }
  
    if (tool.value === 'rect') {
      currentShape = {
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        stroke: '#4f46e5',
        strokeWidth: 3
      }
      rects.value.push(currentShape)
    }
  
    if (tool.value === 'circle') {
      currentShape = {
        x: pos.x,
        y: pos.y,
        radius: 1,
        stroke: '#16a34a',
        strokeWidth: 3
      }
      circles.value.push(currentShape)
    }
  
    if (tool.value === 'text') {
      texts.value.push({
        x: pos.x,
        y: pos.y,
        text: 'Text',
        fontSize: 18,
        fill: '#000'
      })
      isDrawing = false
    }
  }
  
  const pointerMove = () => {
    if (!isDrawing) return
  
    const stage = stageRef.value.getStage()
    const pos = stage.getPointerPosition()
  
    if (tool.value === 'pen') {
      const lastLine = lines.value[lines.value.length - 1]
      lastLine.points.push(pos.x, pos.y)
    }
  
    if (tool.value === 'rect') {
      currentShape.width = pos.x - currentShape.x
      currentShape.height = pos.y - currentShape.y
    }
  
    if (tool.value === 'circle') {
      currentShape.radius = Math.sqrt(
        Math.pow(pos.x - currentShape.x, 2) +
        Math.pow(pos.y - currentShape.y, 2)
      )
    }
  
    layerRef.value.getNode().batchDraw()
  }
  
  const pointerUp = () => {
    isDrawing = false
    currentShape = null
  }
  
  const clear = () => {
    lines.value = []
    rects.value = []
    circles.value = []
    texts.value = []
  }
  </script>
  