<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center">Вход в админку</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full px-3 py-2 border rounded" />
        <input v-model="password" type="password" placeholder="Пароль" class="w-full px-3 py-2 border rounded" />

        <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authToken = useCookie('auth_token')

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Введите email и пароль'
    return
  }

  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })

    if (res?.token) {
      authToken.value = res.token
      router.push('/admin')
    } else {
      errorMessage.value = res?.message || 'Ошибка входа'
    }
  } catch (err) {
    errorMessage.value = 'Сервер не отвечает'
  }
}
</script>

<style scoped>
</style>
