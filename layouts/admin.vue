<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="['bg-white shadow-md h-screen top-0 overflow-y-auto z-50 lg:sticky transition-transform duration-300 ease-in-out', isSidebarOpen ? 'fixed left-0 w-64' : 'fixed -translate-x-full w-64', 'lg:translate-x-0 lg:w-72']"
      @click.self="closeSidebar"
    >
      <div class="p-4 text-xl font-bold border-b flex justify-between items-center">
        <span>Админ Панель</span>
        <button @click="closeSidebar" class="lg:hidden">
          <Icon name="ph:x" size="20" />
        </button>
      </div>
      <nav class="p-4 space-y-2 text-sm">
        <template v-for="(group, idx) in sidebarItems" :key="idx">
          <div>
            <p class="text-gray-500 font-medium mt-4 mb-1">{{ group.label }}</p>
                <a
                  v-for="item in group.items"
                  :key="item.to"
                  href="#"
                  @click.prevent="navigate(item.to)"
                  class="flex items-center gap-2 px-2 py-2 rounded text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Icon :name="item.icon" size="16" />
                  <span>{{ item.text }}</span>
                </a>
          </div>
        </template>
      </nav>
    </aside>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Header / App Bar -->
      <header class="bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <button @click="toggleSidebar" class="lg:hidden p-2 rounded-full hover:bg-gray-200">
          <Icon name="mdi:menu" size="24" />
        </button>
        <h1 class="text-lg font-semibold hidden lg:block">Админ Панель</h1>
        <div class="space-x-2">
          <button class="p-2 rounded-full hover:bg-gray-200">
            <Icon name="ph:gear" size="20" />
          </button>
          <button class="p-2 rounded-full hover:bg-gray-200">
            <Icon name="ph:user-circle" size="20" />
          </button>
        </div>
      </header>

      <!-- Dynamic Slot Content -->
      <main class="flex-1 p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScroll, useStorage } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue'

// sidebar state
const isSidebarOpen = ref(false)
const savedSidebar = useStorage('sidebarOpen', false)

watch(isSidebarOpen, (val) => {
  savedSidebar.value = val
})

// scroll state
const scroll = useScroll(window)
const savedY = useStorage('scrollY', 0)

watch(() => scroll.y.value, (y) => {
  savedY.value = y
})

// restore sidebar + scroll
onMounted(() => {
  if (process.client) {
    window.history.scrollRestoration = 'auto'
    const unwatch = useRouter().beforeEach(() => {
      window.history.scrollRestoration = 'manual'
      unwatch()
    })
    window.addEventListener('unload', () => {
      window.history.scrollRestoration = 'auto'
    })
  }
})

// navigation logic
const router = useRouter()
const route = useRoute()

const navigate = async (to: string) => {
  if (route.path !== to) {
    savedY.value = window.scrollY
    await router.push(to)
    await nextTick()
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedY.value, behavior: 'auto' })
    })
  }
}

const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value }
const closeSidebar = () => { isSidebarOpen.value = false }

// sidebar menu
const sidebarItems = [
  {
    label: '🏠 Главное',
    items: [
      { text: 'Дашборд', to: '/admin', icon: 'ph:house' },
    ]
  },
  {
    label: '📦 Центр товаров',
    items: [
      { text: 'Управление товарами', to: '/admin/products', icon: 'ph:package' },
      { text: 'Добавление товара', to: '/admin/create', icon: 'ph:plus-square' },
      { text: 'Категория товара', to: '/admin/categories', icon: 'ph:tag' },
      { text: 'Отзывы о товаре', to: '/admin/reviews', icon: 'ph:chat-circle-text' },
    ]
  },
  {
    label: '💱 Центр транзакций',
    items: [
      { text: 'Список заказов', to: '/admin/orders', icon: 'ph:list' },
      { text: 'Отчёты заказов', to: '/admin/reports', icon: 'ph:chart-bar' },
      { text: 'История возвратов', to: '/admin/history', icon: 'ph:clock-counter-clockwise' },
      { text: 'Отзывы о заказах', to: '/admin/reviews', icon: 'ph:chat-centered' },
      { text: 'Добавить заказ вручную', to: '/admin/manual', icon: 'ph:file-plus' },
    ]
  },
  {
    label: '👥 Центр пользователей',
    items: [
      { text: 'Список участников', to: '/admin/users', icon: 'ph:users' },
      { text: 'Уровни участников', to: '/admin/levels', icon: 'ph:stairs' },
    ]
  },
  {
    label: '💳 Финансовые операции',
    items: [
      { text: 'Запросы на вывод', to: '/admin/withdrawals', icon: 'ph:currency-dollar-simple' },
      { text: 'История транзакций', to: '/admin/transactions', icon: 'ph:bank' },
      { text: 'Начисление бонусов', to: '/admin/bonuses', icon: 'ph:gift' },
    ]
  },
  {
    label: '📊 Статистика и отчёты',
    items: [
      { text: 'Общая статистика', to: '/admin/stats', icon: 'ph:chart-line' },
      { text: 'Отчёт по продажам', to: '/admin/sales-report', icon: 'ph:shopping-cart' },
    ]
  },
  {
    label: '🔁 Переработка / выкуп',
    items: [
      { text: 'Выкупы клиентов', to: '/admin/buybacks', icon: 'ph:recycle' },
      { text: 'Ручная переработка', to: '/admin/manualbuybacks', icon: 'ph:toolbox' },
    ]
  },
  {
    label: '🔗 Реферальная система',
    items: [
      { text: 'Ссылки и активность', to: '/admin/referrals', icon: 'ph:link' },
      { text: 'Клиенты менеджеров', to: '/admin/clients', icon: 'ph:user-list' },
    ]
  }
]
</script>