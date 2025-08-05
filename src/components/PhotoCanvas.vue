<template>
  <div ref="photoref">
  <div class="d-flex flex-column align-items-center p-2 bg-light">
    <!-- Кнопка загрузки 
    <button class="btn btn-primary mb-3" @click="downloadAsJpeg">
      Скачать как JPEG
    </button>
-->
    <!-- A4 лист -->
    <div
      class="a4-sheet position-relative"
      ref="sheetRef"
      :style="{ width: a4Width + 'px', height: a4Height + 'px' }"
    >
      <div
        v-for="(photo, index) in editedPagePhotos"
        :key="index"
        class="position-absolute"
        :style="getPhotoStyle(index)"
      >
        <PhotoEditor
          :name="photo.caption"
          :src="photo.src"
          :grayscale="photo.grayscale"
        />
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, provide } from 'vue'
import { useNameStore } from '@/stores/name'
import { usePhotoStore } from '@/stores/photoStore'
import PhotoEditor from './PhotoEditor.vue'
import { toJpeg } from 'html-to-image' // 📦 npm install html-to-image



const store = useNameStore()
const photoStore = usePhotoStore()

const a4Width = 794
const a4Height = 1123

const photoWidth = 113
const photoHeight = 151

const cols = 3
const rows = 5
const xGap = 60
const yGap = 60

const marginLeft = 30
const marginTop = 50

const sheetRef = ref(null)

const currentPagePhotos = computed(() => store.fetchedPhotos.slice(0, 15))

const editedPagePhotos = computed(() => photoStore.photos.slice(0, 15))

const getPhotoStyle = (index) => {
  const col = index % cols
  const row = Math.floor(index / cols)
  const left = marginLeft + col * (photoWidth + xGap)
  const top = marginTop + row * (photoHeight + yGap)
  return {
    left: `${left}px`,
    top: `${top}px`
  }
}

// 🔄 Сохраняем фото в стор
watch(
  () => currentPagePhotos.value,
  (newPhotos) => {
    photoStore.photos = []
    newPhotos.forEach(photo => {
      photoStore.addPhoto({
        src: photo.src,
        caption: photo.name,
        scale: 1,
        grayscale: false,
        rotation: 0
      })
    })
  },
  { immediate: true }
)
const photoRef = ref(null)
// 📥 Скачивание как JPEG
const downloadAsJpeg = async () => {
  if (photoRef) {
  const node = sheetRef.value
  if (!node) return

  try {
    const dataUrl = await toJpeg(node, {
      quality: 0.95,
      backgroundColor: 'white'
    })

    const link = document.createElement('a')
    link.download = 'photo-sheet.jpeg'
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Ошибка при скачивании JPEG:', error)
  }
}
}

// Предоставляем метод через provide
defineExpose({ downloadAsJpeg })
</script>

<style scoped>
.a4-sheet {
  background-color: white;
  border: 1px solid #999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}
</style>
