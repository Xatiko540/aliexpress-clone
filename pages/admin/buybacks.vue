<template>
  <AdminLayout>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Выкупы клиентов</h2>

      <div class="mb-4 bg-white p-4 rounded shadow flex flex-wrap gap-4 items-center">
        <input v-model="searchQuery" type="text" placeholder="🔍 ID или название товара..." class="border p-2 rounded w-full max-w-xs" />
        <button @click="fetchBuybacks" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Применить фильтр
        </button>
      </div>

      <div class="overflow-x-auto bg-white p-4 rounded shadow">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-200 text-xs uppercase">
            <tr>
              <th class="px-3 py-2">ID</th>
              <th class="px-3 py-2">Товар</th>
              <th class="px-3 py-2">Пользователь</th>
              <th class="px-3 py-2">Процент</th>
              <th class="px-3 py-2">Награда</th>
              <th class="px-3 py-2">Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="buyback in filteredBuybacks" :key="buyback.id" class="border-b">
              <td class="px-3 py-2">{{ buyback.id }}</td>
              <td class="px-3 py-2">{{ buyback.product.title }}</td>
              <td class="px-3 py-2">{{ buyback.user.email }}</td>
              <td class="px-3 py-2">{{ buyback.percent }}%</td>
              <td class="px-3 py-2">{{ buyback.reward }} ₽</td>
              <td class="px-3 py-2">{{ buyback.createdAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
import { ref, computed, onMounted } from 'vue'

const buybacks = ref([
  { id: 1, product: { title: 'Товар A' }, user: { email: 'user@example.com' }, percent: 25, reward: 500, createdAt: '2025-06-17' },
  { id: 2, product: { title: 'Товар B' }, user: { email: 'demo@demo.com' }, percent: 30, reward: 750, createdAt: '2025-06-16' },
])
const searchQuery = ref('')

const filteredBuybacks = computed(() => {
  if (!searchQuery.value) return buybacks.value
  return buybacks.value.filter(b =>
    b.product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    b.user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const fetchBuybacks = () => {
  // Фейковая логика фильтрации уже встроена
}
</script>

