// stores/editorStore.js
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editorStore', {
  state: () => ({
    activeId: null
  }),
  actions: {
    setActive(id) {
      this.activeId = id
    }
  }
})
