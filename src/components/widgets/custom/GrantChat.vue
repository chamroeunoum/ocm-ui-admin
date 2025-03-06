<template>
  <div class="flex flex-col h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Chat Header -->
    <div class="p-4 bg-blue-600 text-white">
      <h2 class="text-lg font-semibold">Grant Chat</h2>
    </div>

    <!-- Messages Area -->
    <div class="flex-1 p-4 overflow-y-auto space-y-4">
      <div 
        v-for="(message, index) in messages" 
        :key="index"
        :class="[
          'flex',
          message.sender === 'user' ? 'justify-end' : 'justify-start'
        ]"
      >
        <div 
          :class="[
            'max-w-[80%] p-3 rounded-lg',
            message.sender === 'user' 
              ? 'bg-blue-100 text-blue-900' 
              : 'bg-gray-100 text-gray-900'
          ]"
        >
          <div class="text-sm">{{ message.text }}</div>
          <div class="text-xs text-gray-500 mt-1">
            {{ formatTimestamp(message.timestamp) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t">
      <div class="flex gap-2">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        >
        <button
          @click="sendMessage"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.messages.push({
          text: this.newMessage,
          sender: 'user',
          timestamp: new Date()
        })
        this.newMessage = ''
        this.autoReply()
      }
    },
    autoReply() {
      setTimeout(() => {
        this.messages.push({
          text: 'Thank you for your message. We will review your grant inquiry shortly.',
          sender: 'system',
          timestamp: new Date()
        })
      }, 1000)
    },
    formatTimestamp(date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
