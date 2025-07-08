<template>
  <AdminLayout>
    <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">Создание заказа вручную</h1>
      <form @submit.prevent="submitOrder" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium">ID пользователя</label>
          <input v-model="form.userId" type="text" class="w-full border rounded p-2" required />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">ID товара</label>
          <input v-model="form.productId" type="number" class="w-full border rounded p-2" required />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Страна</label>
          <input v-model="form.country" type="text" class="w-full border rounded p-2" required />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Город</label>
          <input v-model="form.city" type="text" class="w-full border rounded p-2" required />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Адрес</label>
          <input v-model="form.address" type="text" class="w-full border rounded p-2" required />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Почтовый индекс</label>
          <input v-model="form.zipcode" type="text" class="w-full border rounded p-2" required />
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Создать заказ
        </button>
      </form>

      <div v-if="success" class="mt-4 text-green-600 font-medium">
        ✅ Заказ успешно создан!
      </div>
      <div v-if="error" class="mt-4 text-red-600 font-medium">
        ❌ {{ error }}
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/admin.vue'
import { ref } from 'vue'

const form = ref({
  userId: '',
  productId: '',
  country: '',
  city: '',
  address: '',
  zipcode: ''
})

const success = ref(false)
const error = ref('')

const submitOrder = async () => {
  success.value = false
  error.value = ''

  const res = await $fetch('/api/prisma/manual-create-order', {
    method: 'POST',
    body: form.value
  }).catch((err) => {
    error.value = err?.data?.statusMessage || 'Произошла ошибка'
  })

  if (res?.success) {
    success.value = true
    form.value = {
      userId: '',
      productId: '',
      country: '',
      city: '',
      address: '',
      zipcode: ''
    }
  }
}
</script>