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
      <nav class="p-4 space-y-4 text-sm">


        <!-- 🏠 Dashboard -->
        <div>
          <p class="text-gray-500 font-medium mb-1">🏠 Главное</p>
          <NuxtLink to="/admin" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Дашборд</NuxtLink>
        </div>


        <!-- 📦 Центр товаров -->
        <div>
          <p class="text-gray-500 font-medium mb-1">📦 Центр товаров</p>
          <NuxtLink to="/admin/products" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Управление товарами</NuxtLink>
          <NuxtLink to="/admin/create" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Добавление товара</NuxtLink>
          <NuxtLink to="/admin/categories" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Категория товара</NuxtLink>
          <NuxtLink to="/admin/reviews" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Отзывы о товаре</NuxtLink>
        </div>

        <!-- 💱 Центр транзакций -->
        <div>
          <p class="text-gray-500 font-medium mt-4 mb-1">💱 Центр транзакций</p>
          <NuxtLink to="/admin/orders" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Список заказов</NuxtLink>
          <NuxtLink to="/admin/reports" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Отчёты заказов</NuxtLink>
          <NuxtLink to="/admin/history" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">История возвратов</NuxtLink>
          <NuxtLink to="/admin/reviews" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Отзывы о заказах</NuxtLink>
          <NuxtLink to="/admin/manual" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Добавить заказ вручную</NuxtLink>
        </div>

        <!--  Центр пользователей -->
        <div>
          <p class="text-gray-500 font-medium mt-4 mb-1">👥 Центр пользователей</p>
          <NuxtLink to="/admin/users/" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Список участников</NuxtLink>
          <NuxtLink to="/admin/levels" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Уровни участников</NuxtLink>
        </div>


        <!--  Финансовые операции-->
        <div>
          <p class="text-gray-500 font-medium mt-4 mb-1">💳 Финансовые операции</p>
          <NuxtLink to="/admin/withdrawals" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Запросы на вывод</NuxtLink>
          <NuxtLink to="/admin/transactions" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">История транзакций</NuxtLink>
          <NuxtLink to="/admin/bonuses" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Начисление бонусов</NuxtLink>
        </div>



              <!-- Статистика и отчёты-->
        <div>
          <p class="text-gray-500 font-medium mt-4 mb-1">📊 Статистика и отчёты</p>
          <NuxtLink to="/admin/stats" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Общая статистика</NuxtLink>
          <NuxtLink to="/admin/sales-report" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Отчёт по продажам</NuxtLink>
        </div>


             <!-- Обратный выкуп / переработка-->
        <div>
          <p class="text-gray-500 font-medium mt-4 mb-1">🔁 Переработка / выкуп</p>
          <NuxtLink to="/admin/buybacks" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Выкупы клиентов</NuxtLink>
          <NuxtLink to="/admin/buybacks/manual" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Ручная переработка</NuxtLink>
        </div>


                  <!-- Рефералы и менеджеры-->
        <div>
            <p class="text-gray-500 font-medium mt-4 mb-1">🔗 Реферальная система</p>
            <NuxtLink to="/admin/referrals" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Ссылки и активность</NuxtLink>
            <NuxtLink to="/admin/clients" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Клиенты менеджеров</NuxtLink>
        </div>



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

<script setup>
const isSidebarOpen = ref(false)
const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value }
const closeSidebar = () => { isSidebarOpen.value = false }
</script>