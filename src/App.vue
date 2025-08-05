<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-md-2">
        <NameInput />
      </div>
      <div class="col-md-8">
        <PhotoCanvas ref="photoCanvasRef" />
      </div>
      <div class="col-md-2">
        <PhotoControl @download-click="handleDownload"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NameInput from '@/components/NameInput.vue'
import PhotoCanvas from '@/components/PhotoCanvas.vue'
import PhotoControl from '@/components/PhotoControl.vue'

const photoCanvasRef = ref()

const handleDownload = () => {
  photoCanvasRef.value?.downloadAsJpeg()
}
</script>
