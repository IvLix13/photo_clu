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
        src: `https://via.placeholder.com/113x151.png?text=${encodeURIComponent(name)}`
      }))
    }
  }
})
