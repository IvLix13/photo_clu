// stores/editorStore.js
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editorStore', {
  state: () => ({
    activeName: null
  }),
  actions: {
    setActive(name) {
      this.activeName = name
    }
  }
})
