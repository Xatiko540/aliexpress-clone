<template>
  <AdminLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Отчёты по заказам</h1>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-semibold mb-4">Фильтрация по дате</h2>
        <div class="flex flex-wrap gap-4 mb-6">
          <input type="date" class="border p-2 rounded w-full max-w-xs" placeholder="Дата начала" />
          <input type="date" class="border p-2 rounded w-full max-w-xs" placeholder="Дата окончания" />
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Применить</button>
        </div>

        <h2 class="text-lg font-semibold mb-2">Общая информация</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div class="bg-gray-100 p-4 rounded">
            <p class="text-gray-500 text-sm">Всего заказов</p>
            <p class="text-xl font-bold">43</p>
          </div>
          <div class="bg-gray-100 p-4 rounded">
            <p class="text-gray-500 text-sm">Общая сумма</p>
            <p class="text-xl font-bold">23450 ₽</p>
          </div>
          <div class="bg-gray-100 p-4 rounded">
            <p class="text-gray-500 text-sm">Обработано</p>
            <p class="text-xl font-bold">37</p>
          </div>
          <div class="bg-gray-100 p-4 rounded">
            <p class="text-gray-500 text-sm">В ожидании</p>
            <p class="text-xl font-bold">6</p>
          </div>
        </div>

        <h2 class="text-lg font-semibold mb-2">Последние заказы</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-200 text-xs uppercase">
              <tr>
                <th class="px-3 py-2">ID</th>
                <th class="px-3 py-2">Клиент</th>
                <th class="px-3 py-2">Сумма</th>
                <th class="px-3 py-2">Статус</th>
                <th class="px-3 py-2">Дата</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="px-3 py-2">#1001</td>
                <td class="px-3 py-2">Иван Петров</td>
                <td class="px-3 py-2">1299 ₽</td>
                <td class="px-3 py-2 text-green-600">Завершён</td>
                <td class="px-3 py-2">2024-06-10</td>
              </tr>
              <tr class="border-b">
                <td class="px-3 py-2">#1002</td>
                <td class="px-3 py-2">Мария Иванова</td>
                <td class="px-3 py-2">2999 ₽</td>
                <td class="px-3 py-2 text-yellow-600">В обработке</td>
                <td class="px-3 py-2">2024-06-11</td>
              </tr>
              <tr class="border-b">
                <td class="px-3 py-2">#1003</td>
                <td class="px-3 py-2">Алексей Смирнов</td>
                <td class="px-3 py-2">3490 ₽</td>
                <td class="px-3 py-2 text-red-600">Отклонён</td>
                <td class="px-3 py-2">2024-06-12</td>
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
</script>