<template>
  <AdminLayout>
    <main class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold mb-2">Категории товаров</h1>
        <p class="text-gray-600">Просмотр и управление категориями товаров.</p>
      </div>

      <!-- Добавить новую категорию -->
      <div class="bg-white p-4 rounded shadow mb-6">
        <h2 class="text-lg font-semibold mb-2">Добавить категорию</h2>
        <div class="flex gap-4 items-center">
          <input v-model="newCategory" type="text" placeholder="Название категории" class="border px-3 py-2 rounded w-full max-w-xs" />
          <button @click="addCategory" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Добавить</button>
        </div>
      </div>

      <!-- Таблица категорий -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-4">Список категорий</h2>
        <table class="min-w-full text-sm">
          <thead class="bg-gray-200 text-xs uppercase">
            <tr>
              <th class="px-3 py-2 text-left">Название</th>
              <th class="px-3 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cat, index) in categories" :key="index" class="border-b">
              <td class="px-3 py-2">{{ cat }}</td>
              <td class="px-3 py-2">
                <button class="text-xs px-2 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
import { ref } from 'vue'

const categories = ref([
  'Женская одежда',
  'Мужская одежда',
  'Часы',
  'Бижутерия',
  'Игрушки',
  'Обувь',
])
const newCategory = ref('')

const addCategory = () => {
  if (newCategory.value.trim()) {
    categories.value.push(newCategory.value.trim())
    newCategory.value = ''
  }
}
</script>