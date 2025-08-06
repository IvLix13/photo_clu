// stores/names.js
import { defineStore } from 'pinia'

export const useNameStore = defineStore('nameStore', {
  state: () => ({
    inputNames: [],
    fetchedPhotos: []
  }),
  actions: {
    updateInputNames(rawText) {
      this.inputNames = rawText
        .split('\n')
        .map(n => n.trim())
        .filter(n => n.length > 0)
    },
    async fetchPhotos() {
      // Имитируем задержку 500 мс
      await new Promise(resolve => setTimeout(resolve, 500))

      // Для каждой фамилии создаём заглушку-фото
      this.fetchedPhotos = this.inputNames.map(name => ({
        name,
        src: `/${name}.jpg`
      }))
    }
  }
})

/*
this.fetchedPhotos = []

      for (const name of this.inputNames) {
        const response = await fetch(`/api/photos/${name}`) // <-- твой бэкенд
        const arrayBuffer = await response.arrayBuffer()
        const base64 = arrayBufferToBase64(arrayBuffer)

        this.fetchedPhotos.push({
          name,
          src: `data:image/jpeg;base64,${base64}`
       */
//приём фото с бэка