<template>
  <div class="flex flex-wrap content-center" >
    <!-- Start transaction of the apps -->
    <Transition  name="fade" >
        <!-- Apps -->
        <div v-if="toggleApps" class="fixed top-0 bottom-0 left-0 right-0 z-40 flex flex-wrap content-start w-full px-4 py-24 bg-gray-800 sm:px-4 md:px-4 lg:p-24 xl:p-24 bg-opacity-95">
            <!-- Search -->
            <div class='absolute top-0 left-0 right-0 flex flex-wrap content-center w-2/5 py-4 m-auto md:w-2/5 xl:w-1/5 lg:w-1/5' >
                <n-input 
                  suffix="ios-search" 
                  placeholder="ស្វែងរក ..." 
                  clearable 
                  v-model:value="search" 
                  @keyup="filterApps()"  
                >
                  <template #prefix>
                    <n-icon>
                      <IosSearch />
                    </n-icon>
                  </template>
                </n-input>
            </div>
            <!-- End search -->
            <!-- Apps -->
            <div class="flex flex-wrap content-center apps">
                <div v-for="(app, index) in matchedApps" :key="index" class="w-32 h-32 text-center p4 md-auto">
                    <div @click="toggleApps=false;$router.push(app.url)" class='w-full dashboard-widget-link cursor-pointer ' >
                        <n-icon size="64" class='text-gray-100 ' >
                          <component :is="app.icon" />
                        </n-icon>
                        <div class="font-pvh p-2 m-auto text-sm text-center text-gray-100" v-html="app.name" ></div>
                    </div>
                </div>
            </div>
            <!-- End apps -->
        </div>
    </Transition>
    <!-- End transaction of the apps -->
    <!-- Apps launcher -->
    <div class='fixed -bottom-14 h-12 left-0 right-0 z-50 flex flex-wrap justify-center w-full py-4' >
      <!-- Apps icon -->
      <div @click="toggleApps = !toggleApps" class="w-12 h-12 p-2 -mt-20 mx-2 text-center bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
          <n-icon class='text-blue-700 ' size="30" >
            <Apps />
          </n-icon>
      </div>
      <div @click="logout()" class="w-12 h-12 p-2 -mt-20 mx-2 text-center bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
          <n-icon class='text-red-700 ' size="30" >
            <Power20Regular />
          </n-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref , computed, onMounted } from 'vue'
import { IosSearch } from '@vicons/ionicons4'
import { SupervisedUserCircleOutlined ,FolderOpenOutlined , SupervisedUserCircleSharp , SupervisedUserCircleRound} from "@vicons/material"
import { Apps, SpeedometerOutline } from '@vicons/ionicons5'
import { isAuth, authLogout , isAdmin , getUser } from './../../plugins/authentication'
import { Receipt2 } from '@vicons/tabler'
import { Receipt20Regular , Power20Regular, DocumentPdf24Regular} from '@vicons/fluent'
import { UserMultiple , ParentChild , UserAvatar} from '@vicons/carbon'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog , useMessage } from 'naive-ui'
export default {  
  components: {
    IosSearch,
    SupervisedUserCircleOutlined ,
    SupervisedUserCircleSharp ,
    FolderOpenOutlined ,
    SupervisedUserCircleRound ,
    Apps ,
    UserMultiple ,
    Receipt20Regular ,
    Receipt2 ,
    SpeedometerOutline ,
    Power20Regular ,
    DocumentPdf24Regular ,
    ParentChild , 
    UserAvatar
  } ,
  name: 'dock' ,
  props: [
      'active'
  ],
  setup(){
    let search = ref(null)
    let apps = ref([
      {
          url: '/' ,
          icon: 'SpeedometerOutline' ,
          name: 'ផ្ទាំងព័ត៌មាន',
          roles: [
            1, // Admin
            3, // Backend member
          ]
      },
      {
          url: '/user' ,
          icon: 'SupervisedUserCircleOutlined' ,
          name: 'គណនី',
          roles: [
            1, // Admin
            // 3, // Backend member
          ]
      },
      {
          url: '/profile' ,
          icon: 'UserAvatar' ,
          name: 'ព័ត៌មានផ្ទាល់ខ្លួន',
          roles: [
            // 1, // Admin
            3, // Backend member
          ]
      },
      {
          url: '/folder' ,
          icon: 'FolderOpenOutlined' ,
          name: 'ថត',
          roles: [
            1, // Admin
            3, // Backend member
          ]
      },
      {
          url: '/role' ,
          icon: 'SupervisedUserCircleRound' ,
          name: 'តួនាទី',
          roles: [
              1, // Admin
          ]
      },
      {
          url: '/regulator' ,
          icon: 'DocumentPdf24Regular' ,
          name: 'ឯកសារ',
          roles: [
            1, // Admin
            3, // Backend member
          ]
      }
    ])
    /** End app metadata */
    let toggleApps = ref(false)
    let user = reactive({})

    let matchedApps = ref([])
    function filterApps(){
      matchedApps.value = []
      /**
       * Filter the apps base on the search string
       */
      matchedApps.value = ( search.value != null && search.value.trim() != '' ) 
      ? apps.value.filter( app => app.name.indexOf( search.value ) != -1 )
      : apps.value
      /**
       * Filter the apps base on the user role
       */
      let userRoleIds = ( getUser() != null && getUser().roles != undefined && Array.isArray( getUser().roles ) ) ? getUser().roles.map(r=>r.id) : false
      /**
       * Error getting user role
       */
      matchedApps.value = matchedApps.value.filter( 
        app => app.roles.find( 
          role => userRoleIds.includes(role)
        ) 
      )
    }
    
    function toggleAppFunc(){
        toggleApps = !toggleApps
    }
    function logoutConfirmation(){
        console.log( "confirm before logout" )
    }

    const dialog = useDialog();
    const message = useMessage();
    const store = useStore();
    const router = useRouter()
    async function logout(){
      const d = dialog.warning({
        title: 'ចាកចេញ',
        content: 'តើអ្នកចង់ចាកចេញមែនទេ?',
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          /**
           * Check whether the user has logged out already
           */
          if( isAuth() ) {
            /**
             * Show confirm dialog
             */
            d.loading = true
            store.dispatch('auth/logout').then( res => {
              authLogout()
              message.success("អ្នកបានចាកចេញដោយជោគជ័យ។")
              d.loading = false
              window.location.href = '/'
            }).catch( err => {
              authLogout()
              console.log( err )
            })
          }else{
            window.location.href = '/login'
          }
        },
        // onNegativeClick: () => {
        //   message.error('Not Sure')
        // }
      })
    }
    function isAdminAccount(){
      return isAdmin()
    }

    filterApps()

    return {
      logout ,
      search ,
      matchedApps ,
      apps ,
      toggleApps ,
      user ,
      filterApps ,
      toggleAppFunc ,
      logoutConfirmation ,
      isAdminAccount 
    }
  }
}
</script>
<style scoped>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>