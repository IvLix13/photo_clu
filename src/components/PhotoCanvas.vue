<template>
  <div ref="photoref">
    <div class="d-flex flex-column align-items-center p-2 bg-light">
      <!-- 🔘 Переключение листов -->
      <div class="mb-3">
        <button
          v-for="page in totalPages"
          :key="page"
          class="btn btn-sm mx-1"
          :class="{
            'btn-primary': page === currentPage,
            'btn-outline-primary': page !== currentPage
          }"
          @click="currentPage = page"
        >
          Лист {{ page }}
        </button>
      </div>

      <!-- 📄 Лист A4 -->
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
import { ref, computed, watch, defineExpose } from 'vue'
import { useNameStore } from '@/stores/name'
import { usePhotoStore } from '@/stores/photoStore'
import PhotoEditor from './PhotoEditor.vue'
import { toJpeg } from 'html-to-image'

// 📦 Сторы
const nameStore = useNameStore()
const photoStore = usePhotoStore()

// 📐 A4 размеры
const a4Width = 794
const a4Height = 1123

const photoWidth = 113
const photoHeight = 151

const cols = 3
const rows = 5
const xGap = 100
const yGap = 60

const marginLeft = 100
const marginTop = 50

const sheetRef = ref(null)
const currentPage = ref(1)

// 🔢 Всего страниц
const totalPages = computed(() => {
  return Math.ceil(nameStore.fetchedPhotos.length / 15)
})

// 📸 Фото для текущей страницы
const currentPagePhotos = computed(() => {
  const start = (currentPage.value - 1) * 15
  const end = start + 15
  return nameStore.fetchedPhotos.slice(start, end)
})


// 📦 Переносим в Pinia photoStore только текущие
const editedPagePhotos = computed(() => photoStore.photos)

// 🧠 Автоматически обновляем стор
watch(
  () => currentPagePhotos.value,
  (newPhotos) => {
    photoStore.photos = []
    newPhotos.forEach(photo => {
      photoStore.addPhoto({
        src: photo.src,
        caption: photo.name,
        scale: 1,
        grayscale: true,
        rotation: 0
      })
    })
  },
  { immediate: true }
)

// 📐 Расчет позиции фото на листе
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

// 📥 Скачать JPEG текущего листа
const downloadAsJpeg = async () => {
  const node = sheetRef.value
  if (!node) return

  try {
    const dataUrl = await toJpeg(node, {
      quality: 0.95,
      backgroundColor: 'white'
    })

    const link = document.createElement('a')
    link.download = `photo-sheet-page-${currentPage.value}.jpeg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Ошибка при скачивании JPEG:', error)
  }
}

// 💉 Предоставляем в другие компоненты
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
