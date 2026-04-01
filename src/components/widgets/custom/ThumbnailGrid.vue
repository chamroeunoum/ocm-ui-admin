<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div class="relative aspect-square">
        <img 
          :src="item.image" 
          :alt="item.title"
          class="w-full h-full object-cover"
        >
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
        <p v-if="item.description" class="mt-2 text-sm text-gray-600">
          {{ item.description }}
        </p>
        <slot :name="`item-${index}`" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(item => {
          return item.image && item.title
        })
      }
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
