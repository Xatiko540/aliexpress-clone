<template>
  <div class="chat__wrapper">
    <ChatList :msgs="chat.messages" />
    <ChatForm @submitMessage="onSend" />
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores/chat'
import { onMounted } from 'vue'
import ChatList from '@/components/ChatList.vue'
import ChatForm from '@/components/ChatForm.vue'

const chat = useChatStore()

onMounted(() => {
  chat.init()
})

function onSend(text) {
  chat.send(text)
}
</script>

<style scoped>
.chat__wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  background: #f9f9f9;
}
</style>