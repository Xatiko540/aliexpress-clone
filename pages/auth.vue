<template>
  <div id="AuthPage" class="w-full h-screen bg-white">
    <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
      <NuxtLink to="/" class="min-w-[170px]">
        <img width="170" src="/AliExpress-logo.png" />
      </NuxtLink>
    </div>

    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6 text-lg font-semibold">{{ $t('auth.title') }}</div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        
        <!-- Login/Register Mode -->
        <div v-if="mode === 'login' || mode === 'register'" class="space-y-4">
          <input
            v-model="email"
            type="email"
            :placeholder="$t('auth.email')"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="password"
            type="password"
            :placeholder="$t('auth.password')"
            class="w-full p-2 border rounded"
          />
          
          <!-- Forgot Password Link -->
          <p v-if="mode === 'login'" class="text-center text-sm text-blue-600 cursor-pointer underline" @click="mode = 'forgot'">
            Forgot your password?
          </p>
        </div>

        <!-- Forgot Password Mode -->
        <div v-else-if="mode === 'forgot'" class="space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full p-2 border rounded"
          />
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Send Code
          </button>
        </div>

        <!-- Reset Password Mode -->
        <div v-else-if="mode === 'reset'" class="space-y-4">
          <input
            v-model="code"
            type="text"
            placeholder="Enter code from email"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="newPassword"
            type="password"
            placeholder="New password"
            class="w-full p-2 border rounded"
          />
          <button
            type="submit"
            class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Reset Password
          </button>
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

        <!-- Login/Register Submit -->
        <button
          v-if="mode === 'login' || mode === 'register'"
          type="submit"
          class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          {{ $t(`auth.${mode}`) }}
        </button>

        <!-- Toggle Login/Register -->
        <p v-if="mode === 'login' || mode === 'register'" class="text-center text-sm text-gray-600">
          <span @click="toggleMode" class="text-blue-500 cursor-pointer underline">
            {{ $t(`auth.toggle.${mode}`) }}
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
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authToken = useCookie('auth_token')


const mode = ref<'login' | 'register' | 'forgot' | 'reset'>('login')
const code = ref('')
const newPassword = ref('')
const sentEmail = ref('')


const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(() => {
  authStore.fetchUser()
})

const handleSubmit = async () => {
  errorMessage.value = ''
  userStore.isLoading = true

  try {
    if (mode.value === 'forgot') {
      const res = await $fetch('/api/request-reset', {
        method: 'POST',
        body: { email: email.value }
      })
      if (res.success) {
        sentEmail.value = email.value
        mode.value = 'reset'
      }
    } else if (mode.value === 'reset') {
      const res = await $fetch('/api/verify-reset', {
        method: 'POST',
        body: {
          email: sentEmail.value,
          code: code.value,
          newPassword: newPassword.value
        }
      })
      if (res.success) {
        mode.value = 'login'
        email.value = sentEmail.value
        password.value = ''
      }
    } else {
      const res = await $fetch(`/api/${mode.value}`, {
        method: 'POST',
        body: { email: email.value, password: password.value }
      })
      if (res?.success) {
        await nextTick()
        await authStore.fetchUser()
        router.push('/')
      } else {
        errorMessage.value = res?.message || 'Login/Registration Error'
      }
    }
  } catch (err) {
    console.error('❌ Submit error:', err)
    errorMessage.value = 'Something went wrong'
  } finally {
    userStore.isLoading = false
  }
}

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  errorMessage.value = ''
}
</script>