<template>
  <div class="d-flex justify-content-center align-items-start p-4 bg-light">
    <div
      class="a4-sheet position-relative"
      :style="{ width: a4Width + 'px', height: a4Height + 'px' }"
    >
      <div
        v-for="(photo, index) in currentPagePhotos"
        :key="index"
        class="position-absolute"
        :style="getPhotoStyle(index)"
      >
        <PhotoEditor :name="photo.name" :src="photo.src" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNameStore } from '@/stores/name'
import PhotoEditor from './PhotoEditor.vue'

const store = useNameStore()

const a4Width = 794
const a4Height = 1123

const photoWidth = 113
const photoHeight = 151

const cols = 3
const rows = 5
const xGap = 15
const yGap = 30 // увеличили вертикальный отступ

const totalRowWidth = cols * photoWidth + (cols - 1) * xGap

const marginTop = 30

const currentPagePhotos = computed(() => store.fetchedPhotos.slice(0, 15))

const getPhotoStyle = (index) => {
  const row = Math.floor(index / cols)
  const col = index % cols

  const left = Math.round((a4Width - totalRowWidth) / 2) + col * (photoWidth + xGap)
  const top = marginTop + row * (photoHeight + yGap)

  return {
    left: `${left}px`,
    top: `${top}px`
  }
}
</script>

<style scoped>
.a4-sheet {
  background-color: white;
  border: 1px solid #999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
