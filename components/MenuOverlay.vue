<template>
  <div id="MenuOverlay" class="fixed z-50 bottom-0 h-full w-full bg-white px-3">
    <div class="flex items-center justify-between py-5">
      <NuxtLink to="/" @click="userStore.isMenuOverlay = false">
        <img width="170" src="/AliExpress-logo.png" />
      </NuxtLink>
      <button @click="userStore.isMenuOverlay = false" class="rounded-full p-1 hover:bg-gray-200">
        <Icon name="mdi:close" size="30" />
      </button>
    </div>

    <ul class="w-full">
      <!-- 👤 Styled Mobile Profile Block -->
      <li 
        @click="goTo('settings')" 
        v-if="authStore.user"
        class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
      >
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:user-light" size="33"/>
          <div class="flex flex-col pl-4 text-left leading-tight">
            <span class="text-[16px] text-[#333] font-semibold truncate">{{ authStore.user.email }}</span>

          </div>
        </div>
      </li>


      <li 
        @click="goTo('categories')"
        class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
        <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:grid-four-light" size="33" />
            <span class="pl-4">Categories</span>
        </div>
      </li>

      <li 
        @click="goTo('orders')"
        class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
      >
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:pen-light" size="33"/>
          <span class="pl-4">My Orders</span>
        </div>
      </li>

      <li 
        @click="goTo('shoppingcart')"
        class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
      >
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:shopping-cart-simple-light" size="33"/>
          <span class="pl-4">Cart</span>
        </div>
        <div class="flex items-center justify-center bg-[#FF4646] h-[35px] min-w-[35px] text-lg text-white rounded-full">
          {{ userStore.cart.length }}
        </div>
      </li>

      <li 
        v-if="authStore.user"
        @click="signOut()"
        class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
      >
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:sign-out-light" size="33"/>
          <span class="pl-4">Sign out</span>
        </div>
      </li>

      <li 
        v-else 
        @click="signIn()"
        class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
      >
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:sign-in-light" size="33"/>
          <span class="pl-4">Sign in / Register</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { useUserStore } from '~/stores/user'
import { useAuthStore } from '~/stores/auth'
import { NuxtImg } from '#components'
const user = computed(() => authStore.user)

const userStore = useUserStore()
const authStore = useAuthStore()

const goTo = (url: string) => {
  userStore.isMenuOverlay = false
  return navigateTo(`/${url}`)
}

const signOut = () => {
  authStore.logout()
  userStore.isMenuOverlay = false
  return navigateTo('/')
}

const signIn = () => {
  userStore.isMenuOverlay = false
  return navigateTo('/auth')
}
</script>
