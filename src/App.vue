<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-md-4">
        <NameInput />
      </div>
      <div class="col-md-8">
        <PhotoCanvas />
      </div>
    </div>
  </div>
</template>

<script setup>
import NameInput from '@/components/NameInput.vue'
import PhotoCanvas from '@/components/PhotoCanvas.vue'
</script>
