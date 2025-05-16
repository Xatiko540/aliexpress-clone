<template>
  <div class="flex min-h-screen bg-gray-100 relative">
    <!-- Мобильное затемнение -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="{
        'fixed left-0 top-0 w-72 bg-white shadow-md h-full overflow-y-auto z-50 transform transition-transform duration-300 will-change-transform': true,
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
        'lg:relative lg:translate-x-0 lg:sticky lg:top-0': true
      }"
    >
      <div class="p-4 text-xl font-bold border-b flex justify-between items-center">
        <span>Админ Панель</span>
        <button @click="toggleSidebar" class="lg:hidden p-2 rounded-full hover:bg-gray-200">
          <Icon name="mdi:close" size="20" />
        </button>
      </div>
      <nav class="p-4 space-y-4 text-sm">
        <!-- 📦 Центр товаров -->
        <div>
          <p class="text-gray-500 font-medium mb-1">📦 Центр товаров</p>
          <NuxtLink to="/admin/products" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Управление товарами</NuxtLink>
          <NuxtLink to="/admin/create" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Добавление товара</NuxtLink>
          <NuxtLink to="/admin/products/categories" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Категория товара</NuxtLink>
          <NuxtLink to="/admin/products/reviews" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Отзывы о товаре</NuxtLink>
        </div>
        <!-- 💱 Центр транзакций -->
        <div>
          <p class="text-gray-500 font-medium mt-4 mb-1">💱 Центр транзакций</p>
          <NuxtLink to="/admin/orders" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Список заказов</NuxtLink>
          <NuxtLink to="/admin/orders/reports" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Отчёты заказов</NuxtLink>
          <NuxtLink to="/admin/returns/history" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">История возвратов</NuxtLink>
          <NuxtLink to="/admin/orders/reviews" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Отзывы о заказах</NuxtLink>
          <NuxtLink to="/admin/orders/manual" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Добавить заказ вручную</NuxtLink>
        </div>
        <!-- 👥 Центр пользователей -->
        <div>
          <p class="text-gray-500 font-medium mt-4 mb-1">👥 Центр пользователей</p>
          <NuxtLink to="/admin" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Список участников</NuxtLink>
          <NuxtLink to="/admin/levels" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Уровни участников</NuxtLink>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- App Bar -->
      <header class="bg-white border-b shadow-sm p-4 flex justify-between items-center lg:hidden">
        <button @click="toggleSidebar" class="p-2 rounded-full hover:bg-gray-200">
          <Icon name="mdi:menu" size="24" />
        </button>
        <h2 class="text-xl font-bold">Админ Панель</h2>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <h2 class="text-2xl font-bold mb-4">Список товаров</h2>
        <div class="mb-4 bg-white p-4 rounded shadow flex flex-wrap gap-4 items-center">
          <input v-model="searchQuery" type="text" placeholder="🔍 Название товара..." class="border p-2 rounded w-full max-w-xs" />
          <button @click="fetchProducts" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Применить фильтр
          </button>
        </div>
        <div class="overflow-x-auto bg-white p-4 rounded shadow">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-200 text-xs uppercase">
              <tr>
                <th class="px-3 py-2">ID</th>
                <th class="px-3 py-2">Изображение</th>
                <th class="px-3 py-2">Название</th>
                <th class="px-3 py-2">Цена</th>
                <th class="px-3 py-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.id" class="border-b">
                <td class="px-3 py-2">{{ product.id }}</td>
                <td class="px-3 py-2">
                  <img :src="product.url" alt="product" class="w-12 h-12 object-cover rounded" />
                </td>
                <td class="px-3 py-2">{{ product.title }}</td>
                <td class="px-3 py-2">{{ product.price / 100 }} ₽</td>
                <td class="px-3 py-2 space-x-1">
                  <button class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">Редактировать</button>
                  <button class="text-xs px-2 py-1 rounded bg-red-100 text-red-800">Удалить</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
const products = ref([])
const searchQuery = ref('')
const isSidebarOpen = ref(false) // Состояние для управления видимостью боковой панели

const fetchProducts = async () => {
  const res = await useFetch('/api/prisma/get-all-products')
  products.value = res.data.value || []
}

onMounted(fetchProducts)

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(p =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleSidebar = () => {
  console.log('toggleSidebar called');
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
</style>
