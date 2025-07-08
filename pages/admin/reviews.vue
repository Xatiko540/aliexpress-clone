<template>
  <AdminLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Отзывы о заказах</h1>

      <div class="mb-6 bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-2">Фильтры</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input type="text" placeholder="🔍 Поиск по пользователю" class="border p-2 rounded w-full" />
          <input type="text" placeholder="🔍 Поиск по ID заказа" class="border p-2 rounded w-full" />
          <select class="border p-2 rounded w-full">
            <option>Все оценки</option>
            <option>5 звёзд</option>
            <option>4 звезды</option>
            <option>3 звезды</option>
            <option>2 звезды</option>
            <option>1 звезда</option>
          </select>
          <button class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">Применить</button>
        </div>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-3">Последние отзывы</h2>
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100 text-xs uppercase">
            <tr>
              <th class="px-3 py-2 text-left">ID</th>
              <th class="px-3 py-2 text-left">Пользователь</th>
              <th class="px-3 py-2 text-left">Заказ</th>
              <th class="px-3 py-2 text-left">Оценка</th>
              <th class="px-3 py-2 text-left">Комментарий</th>
              <th class="px-3 py-2 text-left">Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-3 py-2">1</td>
              <td class="px-3 py-2">user@example.com</td>
              <td class="px-3 py-2">#1234</td>
              <td class="px-3 py-2">⭐⭐⭐⭐</td>
              <td class="px-3 py-2">Быстрая доставка, рекомендую!</td>
              <td class="px-3 py-2">2025-06-17</td>
            </tr>
            <tr class="border-b">
              <td class="px-3 py-2">2</td>
              <td class="px-3 py-2">test@mail.com</td>
              <td class="px-3 py-2">#5678</td>
              <td class="px-3 py-2">⭐⭐⭐</td>
              <td class="px-3 py-2">Нормально, но упаковка была повреждена.</td>
              <td class="px-3 py-2">2025-06-15</td>
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

<style scoped></style>