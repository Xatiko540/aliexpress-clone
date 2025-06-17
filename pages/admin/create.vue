<script setup>
import AdminLayout from "@/layouts/admin.vue";

const title = ref('')
const description = ref('')
const price = ref(0)
const url = ref('')
const success = ref(false)

const submit = async () => {
  const res = await $fetch('/api/prisma/create-order', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      price: Number(price.value),
      url: url.value
    }
  })
  if (res?.id) {
    success.value = true
    setTimeout(() => navigateTo('/admin/products'), 1500)
  }
}
</script>

<template>
      <AdminLayout>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="bg-white p-6 shadow rounded max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Добавить товар</h1>

      <div v-if="success" class="mb-4 text-green-600">Товар успешно добавлен!</div>

      <form @submit.prevent="submit" class="space-y-4">
        <input v-model="title" type="text" placeholder="Название" class="w-full p-2 border rounded" required />
        <textarea v-model="description" placeholder="Описание" class="w-full p-2 border rounded" required></textarea>
        <input v-model="price" type="number" placeholder="Цена в руб." class="w-full p-2 border rounded" required />
        <input v-model="url" type="text" placeholder="URL изображения" class="w-full p-2 border rounded" required />

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Добавить товар
        </button>
      </form>
    </div>
  </div>
  </AdminLayout>
</template>
