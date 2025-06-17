// pages/admin/manualbuybacks.vue
<template>
  <AdminLayout>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Ручная переработка</h2>
      <div class="bg-white p-4 rounded shadow">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">ID клиента</label>
          <input type="text" class="w-full border rounded p-2" placeholder="Введите ID клиента" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">ID продукта</label>
          <input type="text" class="w-full border rounded p-2" placeholder="Введите ID продукта" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Процент выкупа</label>
          <input type="number" class="w-full border rounded p-2" placeholder="25" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
          <textarea class="w-full border rounded p-2" rows="3" placeholder="Укажите причину или детали"></textarea>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Подтвердить переработку
        </button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
</script>