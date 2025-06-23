<template>
  <AdminLayout>
    <div class="p-6 max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Заявки на вывод средств</h1>

      <div class="mb-4">
        <select v-model="status" class="border p-2 rounded">
          <option value="">Все</option>
          <option value="PENDING">Ожидают</option>
          <option value="APPROVED">Одобрены</option>
          <option value="REJECTED">Отклонены</option>
        </select>
      </div>

      <div v-if="withdrawals.length === 0">Нет данных</div>
      <div v-else class="space-y-2">
        <div v-for="item in withdrawals" :key="item.id" class="border rounded p-4">
          <div class="flex justify-between">
            <div>
              <div><strong>{{ item.user.email }}</strong> | ID: {{ item.id }}</div>
              <div>Сумма: {{ item.amount }}₽</div>
              <div>Карта: {{ item.cardInfo }}</div>
              <div>Статус: {{ item.status }}</div>
              <div>Дата: {{ new Date(item.createdAt).toLocaleString() }}</div>
            </div>
            <div v-if="item.status === 'PENDING'" class="space-x-2">
              <button @click="approve(item.id)" class="bg-green-500 text-white px-3 py-1 rounded">Одобрить</button>
              <button @click="reject(item.id)" class="bg-red-500 text-white px-3 py-1 rounded">Отклонить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, watch } from 'vue'
import AdminLayout from '@/layouts/admin.vue'

const status = ref('')
const withdrawals = ref([])

const load = async () => {
  withdrawals.value = await $fetch('/api/admin/withdrawals', {
    query: status.value ? { status: status.value } : {}
  })
    .then(res => res.data)
    .catch(() => [])
}

watch(status, load, { immediate: true })

const approve = async (id) => {
  await $fetch(`/api/admin/withdrawals/${id}/approve`, { method: 'POST' })
  load()
}

const reject = async (id) => {
  await $fetch(`/api/admin/withdrawals/${id}/reject`, { method: 'POST' })
  load()
}
</script>