<template>
  <div class="d-flex flex-column gap-2 p-2">
    <button class="btn btn-secondary" @click="applyGrayscale">Сделать Ч/Б</button>
    <button class="btn btn-secondary" @click="applyColor">Сделать цветными</button>
    <button class="btn btn-primary" @click="downloadAsJPEG">Скачать как JPEG</button>
  </div>
</template>

<script setup>
import { usePhotoStore } from '@/stores/photoStore'
import { inject } from 'vue'


const photoStore = usePhotoStore()
const emit = defineEmits(['download-click'])

const downloadAsJPEG = () => {
  emit('download-click')
}
const applyGrayscale = () => photoStore.toggleGrayscale(true)
const applyColor = () => photoStore.toggleGrayscale(false)
</script>
