<template>
  <div class="flex h-screen">
    <!-- Workspace Area -->
    <div class="flex-1 p-4 bg-gray-100">
      <div 
        ref="editableDiv"
        class="absolute border-2 border-dashed border-blue-500"
        :style="styleObject"
        @mousedown="startDrag"
        @mouseup="stopDrag"
      >
        Editable Div
      </div>
    </div>

    <!-- Style Controls Panel -->
    <div class="w-96 bg-white border-l p-4 overflow-y-auto">
      <div class="space-y-4">
        <!-- Position Controls -->
        <div class="space-y-2">
          <h3 class="font-semibold">Position</h3>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm">Top</label>
              <input 
                type="number" 
                v-model.number="styleObject.top"
                class="w-full p-1 border rounded"
              >
            </div>
            <div>
              <label class="block text-sm">Left</label>
              <input 
                type="number" 
                v-model.number="styleObject.left"
                class="w-full p-1 border rounded"
              >
            </div>
          </div>
        </div>

        <!-- Size Controls -->
        <div class="space-y-2">
          <h3 class="font-semibold">Size</h3>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm">Width</label>
              <input 
                type="number" 
                v-model.number="styleObject.width"
                class="w-full p-1 border rounded"
              >
            </div>
            <div>
              <label class="block text-sm">Height</label>
              <input 
                type="number" 
                v-model.number="styleObject.height"
                class="w-full p-1 border rounded"
              >
            </div>
          </div>
        </div>

        <!-- Background Controls -->
        <div class="space-y-2">
          <h3 class="font-semibold">Background</h3>
          <div>
            <label class="block text-sm">Color</label>
            <input 
              type="color" 
              v-model="styleObject.backgroundColor"
              class="w-full"
            >
          </div>
        </div>

        <!-- Border Controls -->
        <div class="space-y-2">
          <h3 class="font-semibold">Border</h3>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm">Width</label>
              <input 
                type="number" 
                v-model.number="styleObject.borderWidth"
                class="w-full p-1 border rounded"
              >
            </div>
            <div>
              <label class="block text-sm">Color</label>
              <input 
                type="color" 
                v-model="styleObject.borderColor"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <!-- Save/Load Buttons -->
        <div class="flex gap-2">
          <button 
            @click="saveStyles"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button 
            @click="loadStyles"
            class="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Load
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleObject: {
        top: 50,
        left: 50,
        width: 200,
        height: 150,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#000000',
        position: 'absolute'
      },
      isDragging: false
    }
  },
  methods: {
    startDrag(event) {
      this.isDragging = true
      document.addEventListener('mousemove', this.handleDrag)
    },
    stopDrag() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.handleDrag)
    },
    handleDrag(event) {
      if (this.isDragging) {
        const workspaceRect = this.$el.getBoundingClientRect()
        this.styleObject.left = event.clientX - workspaceRect.left
        this.styleObject.top = event.clientY - workspaceRect.top
      }
    },
    saveStyles() {
      localStorage.setItem('savedStyles', JSON.stringify(this.styleObject))
    },
    loadStyles() {
      const savedStyles = localStorage.getItem('savedStyles')
      if (savedStyles) {
        this.styleObject = JSON.parse(savedStyles)
      }
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
