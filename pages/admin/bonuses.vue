<template>
  <AdminLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Начисление бонусов</h1>
      <div class="bg-white shadow rounded p-4">
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email пользователя</label>
            <input type="email" placeholder="user@example.com" class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Сумма бонуса (₽)</label>
            <input type="number" min="1" class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
            <textarea rows="3" class="w-full border rounded p-2" placeholder="Причина начисления..."></textarea>
          </div>

          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Начислить бонус
          </button>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
</script>

<style scoped>
</style>