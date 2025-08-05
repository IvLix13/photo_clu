<template>
  <div
    class="photo-wrapper position-relative border"
    tabindex="0"
    @click="activate"
    @keydown="handleKey"
    :class="{ 'border-primary': isActive }"
    style="width: 113px; height: 151px; overflow: hidden;"
    ref="wrapper"
  >
    <img
      :src="src"
      :style="imgStyle"
      class="position-absolute"
      draggable="false"
    />
    </div>
      <!-- Подпись -->
  <div class="mt-2 position-absolute w-100 text-center bg-white small">
      {{ name }}
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEditorStore } from '@/stores/editorStore'

const props = defineProps({
  name: String,
  src: String,
  grayscale: Boolean,
})

const wrapper = ref(null)
const offsetX = ref(0)
const offsetY = ref(0)
const scale = ref(1)

const editorStore = useEditorStore()
const isActive = computed(() => editorStore.activeName === props.name)

const imgStyle = computed(() => ({
  transform: `translate(${offsetX.value}px, ${offsetY.value}px) scale(${scale.value})`,
  left: '0',
  top: '0',
  width: '113px',
  height: '151px',
  transformOrigin: 'center',
  filter: props.grayscale ? 'grayscale(100%)' : 'none'
}))

const activate = () => {
  editorStore.setActive(props.name)
  wrapper.value?.focus()
}

const handleKey = (e) => {
  if (!isActive.value) return

  const step = e.shiftKey ? 5 : 2
  const key = e.key.toLowerCase()

  if (key === 'w') offsetY.value -= step
  else if (key === 's') offsetY.value += step
  else if (key === 'a') offsetX.value -= step
  else if (key === 'd') offsetX.value += step
  else if (key === '+' || key === '=') {
    if (scale.value < 2) scale.value += 0.05
  } else if (key === '-' || key === '_') {
    if (scale.value > 0.5) scale.value -= 0.05
  }
}
</script>

<style scoped>
.photo-wrapper {
  position: relative;
  cursor: pointer;
}

.photo-wrapper:focus {
  outline: none;
  border-color: #0d6efd; /* bootstrap primary */
}

/* Треугольник в правом нижнем углу */
.photo-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 60px 60px; /* размер треугольника */
  border-color: transparent transparent white transparent;
  z-index: 10;
  pointer-events: none; /* чтобы треугольник не блокировал клики */
}
</style>
