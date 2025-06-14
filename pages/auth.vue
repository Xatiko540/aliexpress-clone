

<template>
  <div id="AuthPage" class="w-full h-[100vh] bg-white">
    <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
      <NuxtLink to="/" class="min-w-[170px]">
        <img width="170" src="/AliExpress-logo.png" />
      </NuxtLink>
    </div>

    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6 text-lg font-semibold">Login / Register</div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-2 border rounded"
        />

        <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

        <button
          type="submit"
          class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          {{ mode === 'login' ? 'Login' : 'Register' }}
        </button>

        <p class="text-center text-sm text-gray-600">
          <span @click="toggleMode" class="text-blue-500 cursor-pointer underline">
            {{ mode === 'login' ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войти' }}
          </span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick} from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import { $fetch } from 'ofetch'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'

const email = ref('')
const password = ref('')
const mode = ref<'login' | 'register'>('login')
const errorMessage = ref('')
const router = useRouter()
const authToken = useCookie('auth_token')


const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(() => {
  authStore.fetchUser()
})

const handleSubmit = async () => {
  errorMessage.value = ''
  userStore.isLoading = true

  if (!email.value || !password.value) {
    errorMessage.value = 'Введите email и пароль'
    userStore.isLoading = false
    return
  }

  try {
    const res = await $fetch<{ success: boolean; message?: string }>(
      `/api/${mode.value}`,
      {
        method: 'POST',
        body: { email: email.value, password: password.value }
      }
    )

    if (res?.success) {
      await nextTick()
      await authStore.fetchUser()
      router.push('/')
    } else {
      errorMessage.value = res?.message || 'Ошибка входа/регистрации'
    }
  } catch (err) {
    errorMessage.value = 'Сервер не отвечает. Попробуйте позже.'
  } finally {
    userStore.isLoading = false
  }
}

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  errorMessage.value = ''
}
</script>