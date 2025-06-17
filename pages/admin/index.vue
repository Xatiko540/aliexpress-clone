<template>
  <AdminLayout>
    <!-- Page Content -->
    <main class="p-6">
      <!-- Статистика -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white shadow rounded p-4">
          <h3 class="text-sm text-gray-500">Всего товаров</h3>
          <p class="text-2xl font-bold">{{ products.length }}</p>
        </div>
        <div class="bg-white shadow rounded p-4">
          <h3 class="text-sm text-gray-500">Активные заказы</h3>
          <p class="text-2xl font-bold">{{ orders.length }}</p>
        </div>
        <div class="bg-white shadow rounded p-4">
          <h3 class="text-sm text-gray-500">Пользователи</h3>
          <p class="text-2xl font-bold">{{ users.length }}</p>
        </div>
        <div class="bg-white shadow rounded p-4">
          <h3 class="text-sm text-gray-500">Продажи (₽)</h3>
          <p class="text-2xl font-bold">{{ totalSales }}</p>
        </div>
      </div>

      <!-- Графики -->
      <ClientOnly>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white rounded shadow p-4">
            <apexchart type="line" height="300" :options="chartOptions.sales" :series="series.sales" />
          </div>
          <div class="bg-white rounded shadow p-4">
            <apexchart type="bar" height="300" :options="chartOptions.orders" :series="series.orders" />
          </div>
          <div class="bg-white rounded shadow p-4 md:col-span-2">
            <apexchart type="area" height="300" :options="chartOptions.users" :series="series.users" />
          </div>
        </div>
      </ClientOnly>
    </main>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
import { onMounted, ref } from 'vue'

const products = ref([])
const orders = ref([])
const users = ref([])
const totalSales = ref(0)

const fetchStats = async () => {
  const res1 = await useFetch('/api/prisma/get-all-products')
  const res2 = await useFetch('/api/prisma/get-all-orders')
  const res3 = await useFetch('/api/prisma/get-all-users')

  products.value = res1.data.value || []
  orders.value = res2.data.value || []
  users.value = res3.data.value || []

  totalSales.value = orders.value.reduce((sum, order) => sum + (order.total || 0), 0)
}
onMounted(fetchStats)

const series = {
  sales: [{
    name: 'Продажи',
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }],
  orders: [{
    name: 'Заказы',
    data: [5, 15, 20, 30, 25, 35, 40, 38, 50]
  }],
  users: [{
    name: 'Пользователи',
    data: [100, 120, 150, 200, 250, 300, 400, 500, 600]
  }]
}

const chartOptions = {
  sales: {
    chart: { id: 'sales' },
    xaxis: { categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен'] }
  },
  orders: {
    chart: { id: 'orders' },
    xaxis: { categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен'] }
  },
  users: {
    chart: { id: 'users' },
    xaxis: { categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен'] }
  }
}
</script>