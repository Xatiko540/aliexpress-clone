<template>
  <AdminLayout>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Ссылки и активность</h2>

      <!-- Список ссылок -->
      <div class="mb-6 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Реферальные ссылки</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="border rounded p-3" v-for="link in mockLinks" :key="link.code">
            <p class="text-sm text-gray-500">Код:</p>
            <p class="font-mono font-semibold">{{ link.code }}</p>
            <p class="text-sm text-gray-500 mt-2">Менеджер ID:</p>
            <p>{{ link.managerId }}</p>
          </div>
        </div>
      </div>

      <!-- Активность -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Активность по ссылкам</h3>
        <table class="w-full text-sm">
          <thead class="bg-gray-200">
            <tr>
              <th class="text-left px-2 py-2">Пользователь</th>
              <th class="text-left px-2 py-2">Email</th>
              <th class="text-left px-2 py-2">Ссылка</th>
              <th class="text-left px-2 py-2">Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="act in mockActivity" :key="act.email" class="border-b">
              <td class="px-2 py-2">{{ act.name }}</td>
              <td class="px-2 py-2">{{ act.email }}</td>
              <td class="px-2 py-2">{{ act.refCode }}</td>
              <td class="px-2 py-2">{{ act.registered }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'

const mockLinks = [
  { code: 'REF12345', managerId: 'mgr-001' },
  { code: 'BONUS6789', managerId: 'mgr-002' }
]

const mockActivity = [
  { name: 'Иван Петров', email: 'ivan@example.com', refCode: 'REF12345', registered: '2024-01-15' },
  { name: 'Анна Смирнова', email: 'anna@example.com', refCode: 'BONUS6789', registered: '2024-02-10' }
]
</script>