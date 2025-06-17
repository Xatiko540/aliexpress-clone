// pages/admin/clients.vue
<template>
  <AdminLayout>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Клиенты менеджеров</h2>
      <div class="bg-white p-4 rounded shadow">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100 text-xs uppercase">
            <tr>
              <th class="px-3 py-2">UID</th>
              <th class="px-3 py-2">Email</th>
              <th class="px-3 py-2">ФИО</th>
              <th class="px-3 py-2">Реф. менеджер</th>
              <th class="px-3 py-2">Баланс</th>
              <th class="px-3 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 6" :key="i" class="border-b">
              <td class="px-3 py-2">123e4567-e89b-12d3-a456-426614174000</td>
              <td class="px-3 py-2">user{{ i }}@mail.com</td>
              <td class="px-3 py-2">Иванов Иван</td>
              <td class="px-3 py-2">manager_01</td>
              <td class="px-3 py-2">1500 ₽</td>
              <td class="px-3 py-2 space-x-1">
                <button class="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">Редактировать</button>
                <button class="text-xs px-2 py-1 rounded bg-red-100 text-red-800">Блокировать</button>
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
</script>