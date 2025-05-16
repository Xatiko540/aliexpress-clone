// plugins/init-user.client.ts
import { useUserStore } from '~/stores/user'
import { useCookie } from '#app'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const token = useCookie('auth_token')

  if (token.value && !userStore.user) {
    await userStore.fetchUser()
  }
})