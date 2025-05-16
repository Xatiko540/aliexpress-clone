<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-72 bg-white shadow-md h-screen sticky top-0 overflow-y-auto">
      <div class="p-4 text-xl font-bold border-b">Админ Панель</div>
      <nav class="p-4 space-y-4 text-sm">
        <!-- 📦 Центр товаров -->
        <div>
          <p class="text-gray-500 font-medium mb-1">📦 Центр товаров</p>
          <NuxtLink to="/admin/products" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Управление товарами</NuxtLink>
          <NuxtLink to="/admin/products/create" class="block pl-2 py-1 text-gray-700 hover:text-blue-600">Добавление товара</NuxtLink>
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

    <!-- Content Area -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Header / App Bar -->
      <header class="bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <h1 class="text-lg font-semibold">Админ Панель</h1>
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
