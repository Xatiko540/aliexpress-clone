<template>
  <AdminLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Уровни участников</h1>

      <div class="bg-white rounded shadow p-4 overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100 text-left text-xs uppercase">
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Название уровня</th>
              <th class="px-4 py-2">Минимальный рейтинг</th>
              <th class="px-4 py-2">Описание</th>
              <th class="px-4 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="level in levels" :key="level.id" class="border-b">
              <td class="px-4 py-2">{{ level.id }}</td>
              <td class="px-4 py-2">{{ level.name }}</td>
              <td class="px-4 py-2">{{ level.minReputation }}</td>
              <td class="px-4 py-2">{{ level.description }}</td>
              <td class="px-4 py-2">
                <button class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Редактировать</button>
                <button class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded ml-2">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
const levels = ref([
  { id: 1, name: 'Новичок', minReputation: 0, description: 'Базовый уровень пользователя' },
  { id: 2, name: 'Проверенный', minReputation: 100, description: 'Пользователь с хорошей репутацией' },
  { id: 3, name: 'Профессионал', minReputation: 300, description: 'Опытный и активный участник' },
])
</script>