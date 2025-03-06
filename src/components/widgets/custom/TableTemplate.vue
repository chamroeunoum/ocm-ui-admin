<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th 
            v-for="(header, index) in headers"
            :key="index"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            @click="sortBy(header.key)"
          >
            {{ header.label }}
            <span v-if="sortKey === header.key">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(row, rowIndex) in sortedData" :key="rowIndex">
          <td 
            v-for="(header, colIndex) in headers"
            :key="colIndex"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          >
            <slot :name="`cell(${header.key})`" :row="row">
              {{ row[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ startItem }}</span>
            to
            <span class="font-medium">{{ endItem }}</span>
            of
            <span class="font-medium">{{ totalItems }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Previous</span>
              <
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                page === currentPage 
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Next</span>
              >
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(header => 
          typeof header === 'object' && 
          header.hasOwnProperty('key') && 
          header.hasOwnProperty('label')
        )
      }
    },
    data: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1,
      sortKey: '',
      sortOrder: 'asc'
    }
  },
  computed: {
    totalItems() {
      return this.data.length
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    startItem() {
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    endItem() {
      const end = this.currentPage * this.itemsPerPage
      return end > this.totalItems ? this.totalItems : end
    },
    visiblePages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    },
    sortedData() {
      if (!this.sortKey) return this.paginatedData
      
      return [...this.paginatedData].sort((a, b) => {
        const valueA = a[this.sortKey]
        const valueB = b[this.sortKey]
        
        if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1
        if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1
        return 0
      })
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.data.slice(start, end)
    }
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }
    },
    goToPage(page) {
      this.currentPage = page
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
