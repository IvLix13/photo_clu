<template>
  <div class="d-flex justify-content-center align-items-start p-4 bg-light">
    <canvas
      ref="canvasRef"
      :width="a4Width"
      :height="a4Height"
      class="border shadow-sm bg-white"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useNameStore } from '@/stores/name'
import * as fabric from 'fabric' 

const store = useNameStore()

const canvasRef = ref(null)
const canvas = ref(null)

const a4Width = 794
const a4Height = 1123

const photoWidth = 113
const photoHeight = 151

const cols = 3
const xGap = 15
const yGap = 30
const marginTop = 30

const drawPhotos = async () => {
  if (!canvas.value) return
  canvas.value.clear()

  const totalRowWidth = cols * photoWidth + (cols - 1) * xGap

  for (let i = 0; i < Math.min(store.fetchedPhotos.length, 15); i++) {
    const photo = store.fetchedPhotos[i]
    const row = Math.floor(i / cols)
    const col = i % cols

    const left = Math.round((a4Width - totalRowWidth) / 2) + col * (photoWidth + xGap)
    const top = marginTop + row * (photoHeight + yGap)

    // Загружаем фото
    const img = await loadImage(photo.src)
    img.set({
      originX: 'left',
      originY: 'top',
      selectable: true,
      hasControls: true,
      lockScalingFlip: true,
      cornerStyle: 'circle'
    })
    img.scaleToWidth(photoWidth)
    img.scaleToHeight(photoHeight)

    // Текст подписи, относительно картинки (0, фотоВысота + отступ)
    const text = new fabric.Text(photo.name, {
      left: 0,
      top: photoHeight + 5,
      fontSize: 14,
      originX: 'left',
      originY: 'top',
      selectable: false
    })

    // Группа из картинки и текста
    const group = new fabric.Group([img, text], {
      left,
      top,
      selectable: true,
      hasControls: true,
      lockScalingFlip: true,
      cornerStyle: 'circle'
    })

    canvas.value.add(group)
  }
  canvas.value.renderAll()
}

const loadImage = (url) =>
  new Promise((resolve) => {
    fabric.Image.fromURL(url, (img) => resolve(img), { crossOrigin: 'anonymous' })
  })

onMounted(() => {
  canvas.value = new fabric.Canvas(canvasRef.value, {
    selection: false
  })
  drawPhotos()
})

watch(
  () => store.fetchedPhotos,
  () => drawPhotos()
)
</script>

<style scoped>
canvas {
  border: 1px solid #999;
  background-color: white;
}
</style>
