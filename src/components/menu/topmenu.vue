<template>
  <div class="font-pvh fixed bg-gray-100 top-0 left-0 right-0 flex h-16 p-2 mb-4 border-b border-gray-300" >
    <div class="flex-none w-9 ml-2">
      <router-link to="/dashboard">
        <img src="./../../assets/logo.svg" class="w-full bg-gray-100"/>
      </router-link>
    </div>
    <div class="flex-grow h-12 text-lg leading-10 text-left pl-4 pt-1 font-moul ">{{ store.state.system.name }}</div>
    <div class="flex-none w-96 h-10 py-1 mr-2 leading-10 text-right">{{ username }}</div>
    <div class="flex-none w-12 h-12 cursor-pointer ">
      <div class="w-12 h-12 rounded-full overflow-hidden " @click="toggleDock" >
        <svg v-if="profilePicture==null" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <img v-if="profilePicture!==null" :src="profilePicture" />
      </div>
    </div>
  </div>
  <Dock v-bind:show="show" :close="function(){show=false}"/>
</template>

<script >
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from './../../plugins/authentication'
import Dock from './../widgets/dock.vue'
export default {
  name: 'Topmenu'  ,
  components: {
    Dock
  },
  setup(){
    const store = useStore()
    const show = ref(false)
    const username = computed(() => {
      let user = getUser()
      return user !== null 
        ? ( user.lastname + " " + user.firstname + ( user.roles != undefined && user.roles != null ? ' (' + user.roles[0].name + ')' : '' ) )
        : "មិនមាន" 
    })

    const profilePicture = computed(() => {
      let user = getUser()
      return user !== null && user.avatar_url !== null ? user.avatar_url : null 
    })
    
    function toggleDock(){
        show.value = true
    }

    return {
      username ,
      profilePicture ,
      store ,
      show ,
      toggleDock
    }
  }
}
</script>