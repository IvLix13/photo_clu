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
import { computed, onMounted, ref } from 'vue'
import { usePhotoStore } from '@/stores/photoStore'
import { useEditorStore } from '@/stores/editorStore'

const props = defineProps({
  id: String,
  name: String,
  src: String,
  grayscale: Boolean,
})

const wrapper = ref(null)

const photoStore = usePhotoStore()
const editorStore = useEditorStore()

// Проверка: активна ли сейчас эта фотка
const isActive = computed(() => editorStore.activeId === props.id)

// Получаем фото из photoStore
const currentPhoto = computed(() =>
  photoStore.photos.find(p => p.id === props.id)
)

// Реактивные привязки — offsetX, offsetY, scale — теперь computed
const offsetX = computed({
  get: () => currentPhoto.value?.offsetX ?? 0,
  set: (val) => {
    if (currentPhoto.value) {
      photoStore.updatePhoto(props.id, { offsetX: val })
    }
  }
})

const offsetY = computed({
  get: () => currentPhoto.value?.offsetY ?? 0,
  set: (val) => {
    if (currentPhoto.value) {
      photoStore.updatePhoto(props.id, { offsetY: val })
    }
  }
})

const scale = computed({
  get: () => currentPhoto.value?.scale ?? 1,
  set: (val) => {
    if (currentPhoto.value) {
      photoStore.updatePhoto(props.id, { scale: val })
    }
  }
})

// Стили для изображения
const imgStyle = computed(() => ({
  transform: `translate(${offsetX.value}px, ${offsetY.value}px) scale(${scale.value})`,
  left: '0',
  top: '0',
  width: '113px',
  height: '151px',
  transformOrigin: 'center',
  filter: props.grayscale ? 'grayscale(100%)' : 'none'
}))

// Сделать фото активным
const activate = () => {
  editorStore.setActive(props.id)
  wrapper.value?.focus()
}

// Обработка клавиш
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
