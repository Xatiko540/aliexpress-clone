<template>
  <div class="chat__body" id="chat__body">
    <chat-message
      v-for="(msg, index) in msgs"
      :key="index"
      :msg="msg"
      :prev="index === 0 ? null : msgs[index - 1]"
    >
    </chat-message>
  </div>
</template>

<script>
import ChatMessage from "@/components/ChatMessage";

export default {
  components: {
    ChatMessage,
  },
  props: ["msgs"],
  updated() {
    const body = document.getElementById("chat__body");
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  },
};
</script>

<style>
.chat__body {
  padding: 2rem;
  padding-bottom: 90px; /* 👈 сюда, чтобы сообщения не скрывались за формой */
  overflow-y: auto;
  scroll-behavior: smooth;
}

.chat__body::-webkit-scrollbar {
  display: none;
}
</style>
