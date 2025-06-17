<template>
  <AdminLayout>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Общая статистика</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white rounded shadow p-4">
          <h3 class="text-gray-500 text-sm">Пользователи</h3>
          <p class="text-2xl font-bold">1,234</p>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h3 class="text-gray-500 text-sm">Товары</h3>
          <p class="text-2xl font-bold">567</p>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h3 class="text-gray-500 text-sm">Заказы</h3>
          <p class="text-2xl font-bold">982</p>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h3 class="text-gray-500 text-sm">Выручка (₽)</h3>
          <p class="text-2xl font-bold">345,678</p>
        </div>
      </div>

      <div class="mt-6 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-4">График активности</h3>
        <ClientOnly>
          <apexchart type="line" height="300" :options="chartOptions" :series="series" />
        </ClientOnly>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
import { ref } from 'vue'

const series = [
  {
    name: 'Заказы',
    data: [31, 40, 28, 51, 42, 85, 77, 65, 80, 92, 110, 120]
  }
]

const chartOptions = {
  chart: { id: 'stats-chart' },
  xaxis: {
    categories: [
      'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
      'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
    ]
  }
}
</script>