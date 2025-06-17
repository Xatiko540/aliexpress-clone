<template>
  <AdminLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Запросы на вывод</h1>

      <div class="overflow-x-auto bg-white shadow rounded p-4">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-200 text-xs uppercase">
            <tr>
              <th class="px-3 py-2">ID</th>
              <th class="px-3 py-2">Пользователь</th>
              <th class="px-3 py-2">Сумма</th>
              <th class="px-3 py-2">Карта</th>
              <th class="px-3 py-2">Статус</th>
              <th class="px-3 py-2">Дата</th>
              <th class="px-3 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 6" :key="i" class="border-b">
              <td class="px-3 py-2">#{{ i }}</td>
              <td class="px-3 py-2">user_{{ i }}</td>
              <td class="px-3 py-2">{{ (i * 1000).toLocaleString() }} ₽</td>
              <td class="px-3 py-2">**** **** **** {{ 1000 + i }}</td>
              <td class="px-3 py-2">PENDING</td>
              <td class="px-3 py-2">2024-06-17</td>
              <td class="px-3 py-2 space-x-1">
                <button class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Подтвердить</button>
                <button class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Отклонить</button>
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