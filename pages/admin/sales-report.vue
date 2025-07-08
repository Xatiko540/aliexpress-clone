<template>
  <AdminLayout>
    <div class="p-6 space-y-6">
      <h1 class="text-2xl font-bold">Отчёт по продажам</h1>

      <div class="bg-white rounded shadow p-4 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Дата начала</label>
            <input type="date" class="mt-1 block w-full border rounded p-2" v-model="startDate">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Дата окончания</label>
            <input type="date" class="mt-1 block w-full border rounded p-2" v-model="endDate">
          </div>
          <div class="flex items-end">
            <button @click="fetchReport" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Сформировать отчёт</button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-100">
              <tr>
                <th class="text-left px-4 py-2">ID заказа</th>
                <th class="text-left px-4 py-2">Пользователь</th>
                <th class="text-left px-4 py-2">Товар</th>
                <th class="text-left px-4 py-2">Сумма</th>
                <th class="text-left px-4 py-2">Дата</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in dummyOrders" :key="order.id" class="border-t">
                <td class="px-4 py-2">{{ order.id }}</td>
                <td class="px-4 py-2">{{ order.user }}</td>
                <td class="px-4 py-2">{{ order.product }}</td>
                <td class="px-4 py-2">{{ order.amount }} ₽</td>
                <td class="px-4 py-2">{{ order.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
import { ref } from 'vue'

const startDate = ref('')
const endDate = ref('')
const dummyOrders = ref([
  { id: 101, user: 'ivan@mail.com', product: 'Часы Smart Pro', amount: 1990, date: '2025-06-10' },
  { id: 102, user: 'kate@mail.com', product: 'Наушники Bass+', amount: 990, date: '2025-06-11' },
  { id: 103, user: 'leo@mail.com', product: 'Камера Web HD', amount: 1590, date: '2025-06-12' },
])

const fetchReport = () => {
  console.log('Формирование отчёта с', startDate.value, 'по', endDate.value)
}
</script>