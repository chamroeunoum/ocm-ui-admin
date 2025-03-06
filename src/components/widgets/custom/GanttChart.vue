<template>
  <div class="overflow-x-auto">
    <!-- Column Headers (Days) -->
    <div class="flex">
      <div class="w-48"></div>
      <div 
        v-for="day in daysInMonth" 
        :key="day"
        class="flex-1 min-w-[60px] text-center border-b p-2"
      >
        {{ day }}
      </div>
    </div>

    <!-- Rows (Tasks) -->
    <div 
      v-for="(task, index) in tasks" 
      :key="task.id"
      class="flex items-center border-b"
    >
      <!-- Task Label -->
      <div class="w-48 p-2 border-r">
        {{ task.description }}
      </div>

      <!-- Task Bar Area -->
      <div class="flex-1 flex relative h-10">
        <!-- Background Grid -->
        <div 
          v-for="day in daysInMonth" 
          :key="day"
          class="flex-1 border-l"
        ></div>

        <!-- Task Bar -->
        <div
          v-if="task.startDay && task.endDay"
          :style="{
            left: `${((task.startDay - 1) / daysInMonth.length) * 100}%`,
            width: `${((task.endDay - task.startDay + 1) / daysInMonth.length) * 100}%`
          }"
          class="absolute h-8 bg-blue-500 rounded-lg m-1 cursor-move"
          draggable="true"
          @dragstart="startDrag(index, $event)"
          @dragend="stopDrag(index, $event)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daysInMonth: this.generateDaysInMonth(),
      tasks: [
        { id: 1, description: 'Project Planning', startDay: 3, endDay: 7 },
        { id: 2, description: 'UI Design', startDay: 5, endDay: 10 },
        { id: 3, description: 'Development', startDay: 8, endDay: 20 }
      ],
      draggingTask: null
    }
  },
  methods: {
    generateDaysInMonth() {
      const days = []
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      const daysCount = new Date(year, month + 1, 0).getDate()
      
      for (let i = 1; i <= daysCount; i++) {
        days.push(i)
      }
      return days
    },
    startDrag(index, event) {
      this.draggingTask = index
      event.dataTransfer.setData('text/plain', '')
    },
    stopDrag(index, event) {
      const rect = event.target.parentElement.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const dayWidth = rect.width / this.daysInMonth.length
      const newStartDay = Math.round(offsetX / dayWidth) + 1
      
      const task = this.tasks[index]
      const duration = task.endDay - task.startDay
      task.startDay = Math.max(1, Math.min(newStartDay, this.daysInMonth.length - duration))
      task.endDay = task.startDay + duration
      
      this.draggingTask = null
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  height: 8px;
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
