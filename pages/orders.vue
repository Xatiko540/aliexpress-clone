<template>
    <MainLayout>
        <div id="OrdersPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
            <div class="bg-white w-full p-6 min-h-[150px]">
                <div class="flex items-center text-xl">
                    <Icon name="carbon:delivery" color="#5FCB04" size="35"/>
                    <span class="pl-4">Orders</span>
                </div>
                <div 
                    v-if="orders && orders.data" 
                    v-for="order in orders.data" 
                    class="text-sm pl-[50px]"
                >
                    <div class="border-b py-1">
                        <p>Stripe ID: {{ order.stripeId }}</p>

                        <div class="pt-2"></div>

                        <div v-for="item in order.orderItem">
                            <NuxtLink 
                                class="flex items-center gap-3 p-1 hover:underline hover:text-blue-500" 
                                :to="`/item/${item.productId}`"
                            >
                                <img width="40" :src="item.product.url">
                                {{ item.product.title }}
                            </NuxtLink>
                        </div>

                        <div class="pt-2 pb-5">
                            Delivery Address: {{ order.name }}, {{ order.address }}, {{ order.zipcode }}, {{ order.city }}, {{ order.country }}
                        </div>
                    </div>
                </div>

                <div v-else class="flex items-center justify-center">
                    You have no order history
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user)
const orders = ref([])

onBeforeMount(async () => {
  if (!user.value) {
    return router.push('/auth')
  }

  try {
    const { data, error } = await useAsyncData(() =>
      $fetch(`/api/prisma/get-all-orders-by-user/${user.value.id}`)
    )
    if (error.value) {
      console.error(error.value)
    } else {
      orders.value = data.value
    }
  } catch (err) {
    console.error('Fetch failed:', err)
  }
})
</script>