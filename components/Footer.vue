<template>
  <div id="FooterMain" class="w-full bg-[#E8E8E8] mt-10 mb-2">
    <div class="max-w-[1200px] mx-auto px-4">
      <div class="md:flex gap-4 justify-between w-full">
        <div class="md:w-[50%] pt-4">
          <div class="text-lg font-semibold text-[#282828]">{{ $t('footer.help.title') }}</div>
          <div class="text-[#999999] text-sm">{{ $t('footer.help.content') }}</div>
        </div>
        <div class="md:w-[50%] pt-4">
          <div class="text-lg font-semibold text-[#282828]">{{ $t('footer.languages.title') }}</div>
          <div class="text-[#999999] text-sm">{{ $t('footer.languages.content') }}</div>
        </div>
      </div>

      <div class="md:flex gap-4 justify-between w-full">
        <div class="md:w-[50%] pt-4">
          <div class="text-lg font-semibold text-[#282828]">{{ $t('footer.categories.title') }}</div>
          <div class="text-[#999999] text-sm">{{ $t('footer.categories.content') }}</div>
        </div>
        <div class="md:w-[50%] pt-4">
          <div class="text-lg font-semibold text-[#282828]">{{ $t('footer.group.title') }}</div>
          <div class="text-[#999999] text-sm">{{ $t('footer.group.content') }}</div>
        </div>
      </div>
    </div>
  </div>

  <div id="FooterSub" class="w-full bg-[#333333] text-sm text-gray-400">
    <div class="max-w-[1200px] mx-auto p-4">
      {{ $t('footer.subtext') }}
    </div>
  </div>
</template>

<script setup>

import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

</script>
