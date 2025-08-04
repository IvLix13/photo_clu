<template>
  <div class="position-relative d-flex flex-column align-items-center m-1" style="width: 113px;">
    <img
      :src="src"
      class="border"
      style="width: 113px; height: 151px; object-fit: cover;"
      alt="Фото сотрудника"
    />
    <div class="text-center mt-1 small fw-semibold">{{ name }}</div>

    <!-- Кнопка в правом верхнем углу -->
    <div class="position-absolute top-0 end-0">
      <div class="dropdown">
        <button
          class="btn btn-sm btn-light border dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          ⋮
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Удалить</a></li>
          <li><a class="dropdown-item" href="#">Заменить</a></li>
          <li><a class="dropdown-item" href="#">Редактировать</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  src: String
})
</script>

<style scoped>
.dropdown-toggle {
  padding: 0 6px;
  font-size: 14px;
  line-height: 1;
}
</style>
