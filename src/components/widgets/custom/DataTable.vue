<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th 
            v-for="(header, index) in headers" 
            :key="index"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td 
            v-for="(cell, cellIndex) in row" 
            :key="cellIndex"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          >
            <slot :name="`cell-${cellIndex}`" :value="cell">
              {{ cell }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
