<template>
  <div id="MenuOverlay" class="fixed z-50 bottom-0 h-full w-full bg-white px-3">
    <div class="flex items-center justify-between py-5">
      <NuxtLink to="/" @click="userStore.isMenuOverlay = false">
        <img width="170" src="/AliExpress-logo.png" />
      </NuxtLink>


        <li class="px-3 hover:text-[#FF4646] cursor-pointer list-none">
          <select v-model="$i18n.locale" class="text-sm border rounded p-1">
            <option value="en">🇺🇸 EN</option>
            <option value="ru">🇷🇺 RU</option>
          </select>
        </li>


      <button @click="userStore.isMenuOverlay = false" class="rounded-full p-1 hover:bg-gray-200">
        <Icon name="mdi:close" size="30" />
      </button>
    </div>

    <ul class="w-full">


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



            <!-- Добавлено: пункт Чат -->
       <li 
          v-if="authStore.user"
          @click="() => { userStore.isMenuOverlay = false; navigateTo(`/chat?name=${authStore.user?.username ?? ' anonymity'}`) }"
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="fluent:chat-16-regular" size="33" />
            <span class="pl-4">Message Center</span>
          </div>
        </li>

        <li 
          @click="() => { userStore.isMenuOverlay = false; navigateTo('/topup') }"
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="mdi:coin-outline" size="33" />
            <span class="pl-4">My coins</span>
          </div>
        </li>

      <li @click="goTo('categories')" class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:grid-four-light" size="33" />
          <span class="pl-4">{{ $t('menu.categories') }}</span>
        </div>
      </li>

      <li @click="goTo('orders')" class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:pen-light" size="33"/>
          <span class="pl-4">{{ $t('menu.orders') }}</span>
        </div>
      </li>

      <li @click="goTo('shoppingcart')" class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:shopping-cart-simple-light" size="33"/>
          <span class="pl-4">{{ $t('menu.cart') }}</span>
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
          <span class="pl-4">{{ $t('menu.signOut') }}</span>
        </div>
      </li>

      <li 
        v-else 
        @click="signIn()"
        class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
      >
        <div class="flex items-center text-[20px] font-semibold">
          <Icon name="ph:sign-in-light" size="33"/>
          <span class="pl-4">{{ $t('menu.signIn') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { useUserStore } from '~/stores/user'
import { useAuthStore } from '~/stores/auth'
import { useI18n } from 'vue-i18n'

const { t: $t, locale } = useI18n()
const userStore = useUserStore()
const authStore = useAuthStore()

onMounted(() => {
  const savedLang = localStorage.getItem('lang')
  if (savedLang === 'ru' || savedLang === 'en') {
    locale.value = savedLang
  }
})

watch(() => locale.value, (lang) => {
  localStorage.setItem('lang', lang)
})

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