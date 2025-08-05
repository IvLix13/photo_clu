// stores/photoStore.js
import { defineStore } from 'pinia'

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    photos: [],
  }),
  actions: {
    addPhoto(photoData) {
      this.photos.push({
        id: crypto.randomUUID(),
        src: photoData.src,
        caption: photoData.caption || '',
        scale: photoData.scale || 1,
        grayscale: photoData.grayscale || false,
        rotation: photoData.rotation || 0,
      })
    },
    updatePhoto(id, newData) {
      const photo = this.photos.find(p => p.id === id)
      if (photo) Object.assign(photo, newData)
    },
    removePhoto(id) {
      this.photos = this.photos.filter(p => p.id !== id)
    },
    toggleGrayscale(grayscale) {
       this.photos.forEach(photo => {
    photo.grayscale = grayscale
        })
       console.log(grayscale)
    },
  },
})
