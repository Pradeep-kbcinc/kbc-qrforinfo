import { ref, watch, onMounted } from 'vue'

const DEFAULT_SCALE = 0.9

const uiScale = ref(DEFAULT_SCALE)
const browserZoom = ref(1)

export function useUiScale() {
  const detectBrowserZoom = () => {
    browserZoom.value = window.devicePixelRatio || 1
  }

  const applyScale = (scale) => {
    const app = document.getElementById('app')
    if (!app) return
  
    app.style.transform = `scale(${scale})`
    app.style.transformOrigin = 'top left'
    app.style.width = `${100 / scale}%`
    app.style.height = `${100 / scale}%`
  }
  

  onMounted(() => {
    detectBrowserZoom()
    applyScale(uiScale.value)
    window.addEventListener('resize', detectBrowserZoom)
  })

  watch(uiScale, (val) => applyScale(val))

  return {
    uiScale,
    browserZoom,
    applyScale,
  }
}