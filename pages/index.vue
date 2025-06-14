<template>
  <MainLayout>
<div class="w-full max-w-[1150px] mx-auto mt-6 px-3 relative">
    <!-- Слайдер -->
    <Swiper
      :modules="modules"
      :navigation="{
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      }"
      :pagination="{ clickable: true, el: '.swiper-pagination' }"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      loop
      class="rounded-md overflow-hidden shadow"
    >
      <SwiperSlide>
        <img src="/baner.png" alt="Баннер 1" class="w-full object-cover max-h-[400px] sm:max-h-[300px] xs:max-h-[200px]" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/AliExpress-logo.png" alt="Баннер 2" class="w-full object-cover max-h-[400px] sm:max-h-[300px] xs:max-h-[200px]" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/baner.png" alt="Баннер 3" class="w-full object-cover max-h-[400px] sm:max-h-[300px] xs:max-h-[200px]" />
      </SwiperSlide>
    </Swiper>

    <!-- 🔘 Pagination Dots -->
    <div class="swiper-pagination mt-2 flex justify-center gap-1"></div>

    <!-- ⬅️➡️ Custom Navigation -->
    <button class="swiper-prev absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10 hidden sm:flex">
      <Icon name="ph:arrow-left-bold" size="20" />
    </button>
    <button class="swiper-next absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10 hidden sm:flex">
      <Icon name="ph:arrow-right-bold" size="20" />
    </button>
  </div>

    <!-- 🧱 Сетка товаров -->
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        <template v-if="products">
          <div v-for="product in products.data" :key="product">
            <ProductComponent :product="product" />
          </div>
        </template>
        <template v-else>
          <div v-for="i in 12" :key="i" class="bg-gray-200 rounded-lg animate-pulse p-4">
            <div class="h-40 bg-gray-300 rounded mb-4"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </template>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Navigation, Pagination, Autoplay]

import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

let products = ref(null)
onBeforeMount(async () => {
    products.value = await useFetch('/api/prisma/get-all-products')
    setTimeout(() => userStore.isLoading = false, 1000)
})
</script>
