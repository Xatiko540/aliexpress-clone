<template>
  <MainLayout>
    <div class="max-w-[1200px] mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-6">Account Settings</h1>

      <div class="bg-white rounded-lg p-6 shadow-md space-y-6">

        <!-- User Info -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Profile</h2>
          <div class="text-sm">Email: <strong>{{ user?.email }}</strong></div>
        </div>

        <hr />

        <!-- Update Password -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Update Password</h2>
          <form @submit.prevent="updatePassword" class="space-y-2">
            <input type="password" v-model="newPassword" placeholder="New Password" class="border rounded w-full p-2" />
            <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Update Password
            </button>
          </form>
        </div>

        <hr />

        <!-- Delete Account -->
        <div>
          <h2 class="text-lg font-semibold mb-2 text-red-600">Danger Zone</h2>
          <button @click="deleteAccount" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Delete My Account
          </button>
        </div>

      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import MainLayout from '~/layouts/MainLayout.vue'
import { useCookie } from '#app'
import { useUserStore } from '~/stores/user'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.user
const userStore = useUserStore()

const newPassword = ref('')

const updatePassword = async () => {
  if (!newPassword.value) return alert('Enter new password')

  try {
    await $fetch('/api/update-password', {
      method: 'POST',
      body: {
        userId: user.id,
        newPassword: newPassword.value
      }
    })
    alert('Password updated')
  } catch {
    alert('Error updating password')
  }
}

onMounted(async () => {
  userStore.isLoading = true
  await authStore.fetchUser()
  userStore.isLoading = false
})

const deleteAccount = async () => {
  if (!confirm('Are you sure you want to delete your account?')) return

  try {
    await $fetch('/api/delete-user', {
      method: 'POST',
      body: { userId: user.id }
    })
    useCookie('auth_token').value = null
    authStore.logout()
    router.push('/auth')
  } catch {
    alert('Error deleting account')
  }
}




</script>