<template>
  <n-card class="max-w-2xl mx-auto p-6">
    <div class="flex items-center gap-4 mb-6">
      <n-avatar
        round
        :size="80"
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        class="border-2 border-gray-200"
      />
      <div>
        <h1 class="text-2xl font-semibold">
          {{ firstName }} {{ lastName }}
        </h1>
        <p class="text-gray-500">User Profile</p>
      </div>
    </div>

    <n-descriptions label-placement="left" bordered class="mb-4">
      <n-descriptions-item label="First Name">
        {{ firstName }}
      </n-descriptions-item>
      <n-descriptions-item label="Last Name">
        {{ lastName }}
      </n-descriptions-item>
      <n-descriptions-item label="Gender">
        {{ gender }}
      </n-descriptions-item>
      <n-descriptions-item label="Date of Birth">
        {{ dateOfBirth }}
      </n-descriptions-item>
      <n-descriptions-item label="Place of Birth">
        {{ placeOfBirth }}
      </n-descriptions-item>
    </n-descriptions>
  </n-card>
</template>

<script setup>
import { NCard, NAvatar, NDescriptions, NDescriptionsItem } from 'naive-ui'

const props = defineProps({
  firstName: {
    type: String,
    default: 'John'
  },
  lastName: {
    type: String,
    default: 'Doe'
  },
  gender: {
    type: String,
    default: 'Male'
  },
  dateOfBirth: {
    type: String,
    default: '1990-01-01'
  },
  placeOfBirth: {
    type: String, 
    default: 'Phnom Penh, Cambodia'
  }
})
</script>

<style scoped>
.n-card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}
</style>