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

      for (const ln of this.inputNames) {
        const response = await fetch(`/api/photos/${ln}`) // <-- твой бэкенд
        const arrayBuffer = await response.arrayBuffer()
        const base64 = arrayBufferToBase64(arrayBuffer)
        const response = await fetch(`/api/extractname/${ln})
        const name = response.text
        this.fetchedPhotos.push({
          name,
          src: `data:image/jpeg;base64,${base64}`
       */
//приём фото с бэка
//еще одна версия на всякий случай
/*  async fetchPhotos() {
      this.fetchedPhotos = [] // очищаем перед новым запросом

      for (const name of this.inputNames) {
        try {
          // Предположим, что сервер отдаёт бинарное изображение по пути `/api/photo/${name}`
          const response = await fetch(`/api/photo/${name}`)

          if (!response.ok) throw new Error(`Ошибка при получении фото для: ${name}`)

          const blob = await response.blob()
          const base64 = await this.blobToBase64(blob)

          this.fetchedPhotos.push({
            name,
            src: base64 // вставляем Data URL в качестве изображения
          })
        } catch (err) {
          console.error(`Ошибка при загрузке фото ${name}:`, err)

          // Вставим заглушку, если не удалось загрузить
          this.fetchedPhotos.push({
            name,
            src: '/placeholder.jpg'
          })
        }
      }
    },

    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    }
  }
})*/