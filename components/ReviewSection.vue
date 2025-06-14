<template>
  <div class="mt-12">
    <div class="flex gap-6 text-lg font-semibold border-b mb-4">
      <div class="pb-2 border-b-2 border-black">{{ $t('reviews.title') }}</div>
      <div class="pb-2 text-gray-400">{{ $t('reviews.ask') }}</div>
    </div>

    <div class="flex flex-col sm:flex-row gap-6 mb-6">
      <div class="flex items-center gap-2 text-4xl font-bold">
        <span>5,0</span>
        <span class="text-orange-500">★★★★★</span>
      </div>
      <div class="flex-1">
        <div v-for="i in 5" :key="i" class="flex items-center text-sm text-gray-500 gap-2">
          <span class="text-orange-500">{{ 6 - i }} ★</span>
          <div class="h-1 bg-gray-200 flex-1 rounded overflow-hidden">
            <div class="bg-orange-500 h-full w-full" v-if="i === 1" />
          </div>
          <span v-if="i === 1" class="text-blue-600 ml-2">1</span>
          <span v-else class="text-gray-400 ml-2">0</span>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <button class="border px-3 py-1 rounded text-sm hover:bg-gray-100">{{ $t('filters.withPhoto') }}</button>
      <button class="border px-3 py-1 rounded text-sm hover:bg-gray-100">{{ $t('filters.fromRussia') }}</button>
      <button class="border px-3 py-1 rounded text-sm hover:bg-gray-100">{{ $t('filters.allStars') }}</button>
      <button class="border px-3 py-1 rounded text-sm hover:bg-gray-100">{{ $t('filters.additional') }}</button>
      <div class="ml-auto text-sm text-gray-600">{{ $t('filters.helpfulFirst') }}</div>
    </div>

    <div class="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 bg-white shadow-sm">
      <div class="flex items-center gap-2">
        <div class="bg-orange-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold">
          d
        </div>
        <div class="text-sm">
          <div class="font-semibold">dario p.</div>
          <div class="text-gray-400 text-xs">28 мая 2025</div>
        </div>
      </div>
      <div class="flex-1">
        <div class="text-orange-500 mb-2">★★★★★</div>
        <p class="text-sm text-gray-800">{{ $t('reviews.sample') }}</p>
      </div>
      <div class="flex items-start">
        <button class="text-gray-400 text-sm hover:text-black">
          <Icon name="material-symbols:thumb-up" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '#components'
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()
</script>