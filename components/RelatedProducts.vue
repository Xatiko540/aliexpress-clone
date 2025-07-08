<template>
  <div class="mt-10">
<h3 class="text-xl font-semibold mb-4">
  {{ $t('layout.relatedProducts') }}: <span class="text-[#FF4646]">{{ category }}</span>
</h3>

    <Swiper
      :slides-per-view="2"
      :space-between="12"
      :breakpoints="{
        640: { slidesPerView: 2.5 },
        768: { slidesPerView: 3.5 },
        1024: { slidesPerView: 4.5 }
      }"
      :navigation="true"
      :loop="true"
      class="related-swiper"
    >
      <SwiperSlide v-for="item in related" :key="item.id">
        <ProductComponent :product="item" />
      </SwiperSlide>
    </Swiper>

    <div v-if="!related.length && fallback.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      <ProductComponent
        v-for="item in fallback"
        :key="item.id"
        :product="item"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

import ProductComponent from '~/components/ProductComponent.vue'

const props = defineProps({ category: String })
const route = useRoute()

const related = ref([])
const fallback = ref([])

onMounted(async () => {
  try {
    const { data } = await useFetch('/api/products', {
      query: { category: props.category }
    })

    if (data.value && data.value.length > 1) {
      related.value = data.value.filter(item => item.id != route.params.id).slice(0, 10)
    } else {
      const all = await $fetch('/api/products')
      fallback.value = all.filter(item => item.id != route.params.id).slice(0, 6)
    }
  } catch (e) {
    console.error('❌ Ошибка загрузки похожих товаров:', e)
  }
})
</script>