<template>
  <div class="p-3">
    <h5>Фамилии сотрудников</h5>
    <textarea
      v-model="rawText"
      class="form-control mb-2"
      rows="15"
      placeholder="Введите фамилии построчно"
    ></textarea>
    <button class="btn btn-primary w-100" @click="handleFetch">
      Выгрузить фото
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNameStore } from '../stores/name'

const store = useNameStore()
const rawText = ref('')

const handleFetch = () => {
  store.updateInputNames(rawText.value)
  store.fetchPhotos()
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
