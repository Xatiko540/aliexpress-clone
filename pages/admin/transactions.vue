<template>
  <AdminLayout>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">История транзакций</h2>

      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-200 text-xs uppercase">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Пользователь</th>
              <th class="px-4 py-2 text-left">Тип</th>
              <th class="px-4 py-2 text-left">Сумма</th>
              <th class="px-4 py-2 text-left">Описание</th>
              <th class="px-4 py-2 text-left">Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 8" :key="i" class="border-b">
              <td class="px-4 py-2">#TRX00{{ i }}</td>
              <td class="px-4 py-2">user{{ i }}@email.com</td>
              <td class="px-4 py-2">purchase</td>
              <td class="px-4 py-2">₽{{ 1000 * i }}</td>
              <td class="px-4 py-2">Покупка товара</td>
              <td class="px-4 py-2">2024-06-{{ 10 + i }}</td>
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