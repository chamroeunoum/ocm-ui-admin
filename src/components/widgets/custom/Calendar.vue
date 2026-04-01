<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- Calendar Header -->
    <div class="flex justify-between items-center mb-4">
      <button 
        @click="previousMonth"
        class="p-2 rounded-lg hover:bg-gray-100"
      >
        &lt;
      </button>
      <h2 class="text-xl font-semibold">
        {{ currentMonthName }} {{ currentYear }}
      </h2>
      <button 
        @click="nextMonth"
        class="p-2 rounded-lg hover:bg-gray-100"
      >
        &gt;
      </button>
    </div>

    <!-- Weekdays -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div 
        v-for="day in weekdays" 
        :key="day"
        class="text-center font-medium text-gray-600"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1">
      <div 
        v-for="day in calendarDays" 
        :key="day.date"
        class="p-2 border rounded-lg min-h-[100px]"
        :class="{
          'bg-gray-50': !day.isCurrentMonth,
          'hover:bg-gray-100 cursor-pointer': day.isCurrentMonth
        }"
        @click="selectDate(day)"
      >
        <div class="text-right">{{ day.date.getDate() }}</div>
        
        <!-- Events -->
        <div 
          v-for="event in getEventsForDate(day.date)"
          :key="event.id"
          class="text-xs p-1 mt-1 rounded bg-blue-100 text-blue-900 truncate"
        >
          {{ event.title }}
        </div>
      </div>
    </div>

    <!-- Event Modal -->
    <div 
      v-if="showEventModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">
          {{ selectedEvent ? 'Edit Event' : 'New Event' }}
        </h3>
        
        <div class="space-y-4">
          <input
            v-model="eventForm.title"
            placeholder="Event title"
            class="w-full p-2 border rounded-lg"
          >
          
          <div class="flex gap-2">
            <input
              type="date"
              v-model="eventForm.startDate"
              class="flex-1 p-2 border rounded-lg"
            >
            <input
              type="date"
              v-model="eventForm.endDate"
              class="flex-1 p-2 border rounded-lg"
            >
          </div>
          
          <div class="flex justify-end gap-2">
            <button
              @click="showEventModal = false"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="saveEvent"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      events: [],
      showEventModal: false,
      selectedEvent: null,
      eventForm: {
        title: '',
        startDate: '',
        endDate: ''
      }
    }
  },
  computed: {
    currentMonthName() {
      return this.currentDate.toLocaleString('default', { month: 'long' })
    },
    currentYear() {
      return this.currentDate.getFullYear()
    },
    calendarDays() {
      const days = []
      const startOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)
      const endOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0)
      const startDay = startOfMonth.getDay()
      
      // Previous month days
      for (let i = startDay; i > 0; i--) {
        const date = new Date(startOfMonth)
        date.setDate(date.getDate() - i)
        days.push({
          date,
          isCurrentMonth: false
        })
      }

      // Current month days
      for (let i = 1; i <= endOfMonth.getDate(); i++) {
        const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i)
        days.push({
          date,
          isCurrentMonth: true
        })
      }

      // Next month days
      const totalDays = days.length
      const remainingDays = 42 - totalDays
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(endOfMonth)
        date.setDate(date.getDate() + i)
        days.push({
          date,
          isCurrentMonth: false
        })
      }

      return days
    }
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
    },
    selectDate(day) {
      if (!day.isCurrentMonth) return
      
      this.eventForm = {
        title: '',
        startDate: this.formatDate(day.date),
        endDate: this.formatDate(day.date)
      }
      this.selectedEvent = null
      this.showEventModal = true
    },
    saveEvent() {
      const event = {
        id: Date.now(),
        title: this.eventForm.title,
        startDate: new Date(this.eventForm.startDate),
        endDate: new Date(this.eventForm.endDate)
      }
      
      if (this.selectedEvent) {
        const index = this.events.findIndex(e => e.id === this.selectedEvent.id)
        this.events.splice(index, 1, event)
      } else {
        this.events.push(event)
      }
      
      this.showEventModal = false
    },
    getEventsForDate(date) {
      return this.events.filter(event => {
        const eventStart = new Date(event.startDate)
        const eventEnd = new Date(event.endDate)
        return date >= eventStart && date <= eventEnd
      })
    },
    formatDate(date) {
      return date.toISOString().split('T')[0]
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
