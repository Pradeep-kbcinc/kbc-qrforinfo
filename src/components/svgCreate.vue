<template>
  <div>
    <!-- Controls -->
    <v-row no-gutters class="mb-4">
      <v-col cols="12" sm="3">
        <v-number-input
          v-model.number="plot.widthFt"
          label="Width (ft)"
          type="number"
          variant="outlined"
          rounded="lg"
          
        />
      </v-col>

      <v-col cols="12" sm="3">
        <v-number-input
          v-model.number="plot.heightFt"
          label="Height (ft)"
          type="number"
          variant="outlined"
          rounded="lg"
          class="ml-1"
        />
      </v-col>
      <v-col cols="12">
        <v-btn @click="returnVal" color="primary" class="text-none font-weight-bold rounded-lg elevation-0" height="48">Save Dimention</v-btn>
      </v-col>
    </v-row>

    <!-- Canvas -->
     <div class="d-flex justify-center">
        <v-stage :config="stageConfig">
          <v-layer>
            <!-- Plot Boundary -->
            <v-rect :config="plotRect" />

            <!-- Dimension Lines -->
            <v-line
              v-for="(line, i) in dimensionLines"
              :key="'line' + i"
              :config="line"
            />

            <!-- Dimension Text -->
            <v-text
              v-for="(text, i) in dimensionTexts"
              :key="'text' + i"
              :config="text"
            />
          </v-layer>
        </v-stage>
  </div>
  </div>
</template>

<script setup>
  import { toast } from 'vue3-toastify';
import { ref, computed } from 'vue'


const props = defineProps(['width','height'])
/* ========================
   USER INPUT (Feet)
======================== */
const plot = ref({
  widthFt: props.width ? Number(props.width) : null,
  heightFt: props.height ? Number(props.height) : null
})

/* ========================
   CANVAS CONFIG
======================== */
const STAGE_WIDTH = 1500
const STAGE_HEIGHT = 600
const SCALE = 2 // 1 ft = 5 px

const stageConfig = {
  width: STAGE_WIDTH,
  height: STAGE_HEIGHT
}

/* ========================
   CENTERING LOGIC
======================== */
const startX = computed(() => {
  return (STAGE_WIDTH - plot.value.widthFt * SCALE) / 2
})

const startY = computed(() => {
  return (STAGE_HEIGHT - plot.value.heightFt * SCALE) / 2
})

/* ========================
   PLOT RECTANGLE
======================== */
const plotRect = computed(() => ({
  x: startX.value,
  y: startY.value,
  width: plot.value.widthFt * SCALE,
  height: plot.value.heightFt * SCALE,
  stroke: '#1e40af',
  strokeWidth: 3
}))

/* ========================
   DIMENSION LINES
======================== */
const dimensionLines = computed(() => {
  const { x, y, width, height } = plotRect.value

  return [
    // Width line (top)
    {
      points: [x, y - 20, x + width, y - 20],
      stroke: '#000',
      strokeWidth: 1
    },
    // Height line (left)
    {
      points: [x - 20, y, x - 20, y + height],
      stroke: '#000',
      strokeWidth: 1
    }
  ]
})

/* ========================
   DIMENSION TEXT
======================== */
const dimensionTexts = computed(() => {
  const { x, y, width, height } = plotRect.value

  return [
    {
      x: x + width / 2 - 25,
      y: y - 40,
      text: `${plot.value.widthFt} ft`,
      fontSize: 16,
      fill: '#000'
    },
    {
      x: x - 60,
      y: y + height / 2 + 25,
      text: `${plot.value.heightFt} ft`,
      fontSize: 16,
      fill: '#000',
      rotation: -90
    }
  ]
})

const emit = defineEmits(['getVal'])

const returnVal = ()=>{
  if(plot.value && plot.value.heightFt && plot.value.widthFt){
    emit('getVal', plot.value)
  }else{
    toast.info('Please choose width and height', {
            autoClose: 4000,
          });
  }
  
}
</script>

<style scoped>
/* optional */
</style>
