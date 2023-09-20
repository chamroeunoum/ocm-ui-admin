<template>
  <div class="flex flex-wrap content-center z-50" >
    <!-- Start transaction of the apps -->
    <Transition  name="fade" >
        <!-- Apps -->
        <div v-if="toggleApps || show" class="fixed top-0 bottom-0 left-0 right-0 z-40 flex flex-wrap content-start w-full px-4 py-24 bg-gray-700 sm:px-4 md:px-4 lg:p-24 xl:p-24 bg-opacity-95">
            <!-- Search -->
            <div class='absolute top-0 left-0 right-0 flex flex-wrap content-center w-2/5 py-4 m-auto md:w-2/5 xl:w-1/5 lg:w-1/5 ' >
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
            <div class="flex justify-center w-full apps">
                <div v-for="(app, index) in matchedApps" :key="index" class="w-28 h-28 text-center p-2 m-4">
                    <div @click="toggleAppFunc(app.url);$router.push(app.url)" class='w-full dashboard-widget-link cursor-pointer ' >
                      <div class="text-gray-100 w-16 mx-auto my-2 " v-html="app.svg" ></div>
                      <div class="font-pvh p-2 m-auto text-xs text-center text-gray-100" v-html="app.name" ></div>
                    </div>
                </div>
                <div class="w-28 h-28 text-center p-2 m-4">
                    <div @click="logout()" class='w-full dashboard-widget-link cursor-pointer ' >
                      <div class="text-gray-100 w-16 mx-auto my-2 " >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
                      </div>
                      <div class="font-pvh p-2 m-auto text-xs text-center text-gray-100" >ចាកចេញ</div>
                    </div>
                </div>

            </div>
            <!-- End apps -->
            <!-- Apps launcher -->
            <div class='fixed -bottom-14 h-14 left-0 right-0 z-50 flex flex-wrap justify-center w-full py-4' >
              <!-- Apps icon -->
              <div v-if="!showLuncher" @click="close()" class="w-10 h-10 p-1 -mt-20 mx-auto text-center bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
              </div>
              <!-- <div v-if="!showLuncher" @click="toggleAppFunc()" class="w-14 h-14 p-2 -mt-20 mx-2 ml-8 text-center bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect x="64" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="64" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="64" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect></svg>
              </div> -->
              <!-- <div v-if="!showLuncher" @click="logout()" class="w-14 h-14 p-2 -mt-20 mx-2 ml-8 text-center text-red-600 bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
              </div> -->
            </div>
        </div>
    </Transition>
    <!-- End transaction of the apps -->
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
import { useRouter, useRoute } from 'vue-router'
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
  props: {
    show : false ,
    showLuncher: false ,
    close: {
      type: Function
    } ,
  },
  setup(props){
    
    let search = ref(null)
    let apps = ref([
      {
          url: '/dashboard' ,
          icon: 'SpeedometerOutline' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M326.1 231.9l-47.5 75.5a31 31 0 0 1-7 7a30.11 30.11 0 0 1-35-49l75.5-47.5a10.23 10.23 0 0 1 11.7 0a10.06 10.06 0 0 1 2.3 14z" fill="currentColor"></path><path d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0 0 56.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0 0 37.1-.1a173.13 173.13 0 0 1 254.8 0a25.19 25.19 0 0 0 37.1.1l3.2-3.5A223.18 223.18 0 0 0 480 287.9C480 164.2 379.7 64 256 64z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 128v32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M416 288h-32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M128 288H96"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M165.49 197.49l-22.63-22.63"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M346.51 197.49l22.63-22.63"></path></svg>' ,
          name: 'ផ្ទាំងព័ត៌មាន',
          roles: [
            1, // Super
            2, // Administrator
            3, // Backend member
          ]
      },
      {
          url: '/user' ,
          icon: 'SupervisedUserCircleOutlined' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12.5 10c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3zm-3 1c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1zm6.5 2c1.11 0 2-.89 2-2c0-1.11-.89-2-2-2c-1.11 0-2.01.89-2 2c0 1.11.89 2 2 2zM11.99 2.01c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10s-4.48-10-10-10zM5.84 17.12c.68-.54 2.27-1.11 3.66-1.11c.07 0 .15.01.23.01c.24-.64.67-1.29 1.3-1.86A9.05 9.05 0 0 0 9.5 14c-1.3 0-3.39.45-4.73 1.43c-.5-1.04-.78-2.2-.78-3.43c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.2-.27 2.34-.75 3.37c-1-.59-2.36-.87-3.24-.87c-1.52 0-4.5.81-4.5 2.7v2.78a7.935 7.935 0 0 1-5.66-2.86z" fill="currentColor"></path></svg>' ,
          name: 'គណនី',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // Backend member
          ]
      },
      {
          url: '/profile' ,
          icon: 'UserAvatar' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>' ,
          name: 'ព័ត៌មានផ្ទាល់ខ្លួន',
          roles: [
            // 1, // Super
            // 2, // Administrator
            3, // Backend member
          ]
      },
      {
          url: '/folder' ,
          icon: 'FolderOpen20Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M16.996 7.073V7a2.5 2.5 0 0 0-2.5-2.5H9.664l-1.6-1.2a1.5 1.5 0 0 0-.9-.3H4.5A2.5 2.5 0 0 0 2 5.5l.001 8.998a2.5 2.5 0 0 0 2.201 2.482c.085.014.172.022.26.022H15.18a1.5 1.5 0 0 0 1.472-1.214l1.358-7a1.501 1.501 0 0 0-1.014-1.715zM4.5 4h2.664a.5.5 0 0 1 .3.1l1.734 1.3a.5.5 0 0 0 .3.1h4.998a1.5 1.5 0 0 1 1.5 1.5v.002H5.824a1.5 1.5 0 0 0-1.472 1.214l-1.298 6.676A1.502 1.502 0 0 1 3 14.498L3 5.5A1.5 1.5 0 0 1 4.5 4zm.833 4.407a.5.5 0 0 1 .491-.405h10.713a.5.5 0 0 1 .491.595l-1.357 7a.5.5 0 0 1-.491.405H4.463a.5.5 0 0 1-.49-.595l1.36-7z" fill="currentColor"></path></g></svg>' ,
          name: 'ថត',
          roles: [
            1, // Admin
            2, // Administrator
            3, // Backend member
          ]
      },
      // {
      //     url: '/role' ,
      //     icon: 'SupervisedUserCircleRound' ,
      //     svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm3.61 6.34c1.07 0 1.93.86 1.93 1.93s-.86 1.93-1.93 1.93s-1.93-.86-1.93-1.93c-.01-1.07.86-1.93 1.93-1.93zm-6-1.58c1.3 0 2.36 1.06 2.36 2.36s-1.06 2.36-2.36 2.36s-2.36-1.06-2.36-2.36c0-1.31 1.05-2.36 2.36-2.36zm0 9.13v3.75c-2.4-.75-4.3-2.6-5.14-4.96c1.05-1.12 3.67-1.69 5.14-1.69c.53 0 1.2.08 1.9.22c-1.64.87-1.9 2.02-1.9 2.68zM12 20c-.27 0-.53-.01-.79-.04v-4.07c0-1.42 2.94-2.13 4.4-2.13c1.07 0 2.92.39 3.84 1.15C18.28 17.88 15.39 20 12 20z" fill="currentColor"></path></svg>' ,
      //     name: 'តួនាទី',
      //     roles: [
      //       1, // Super
      //       2, // Administrator
      //       // 3, // Backend member
      //     ]
      // },
      {
          url: '/regulator' ,
          icon: 'DocumentPdf24Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M7.503 13.002a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-.5H8.5a1.5 1.5 0 0 0 0-3h-.997zm.997 2h-.497v-1H8.5a.5.5 0 1 1 0 1zm6.498-1.5a.5.5 0 0 1 .5-.5h1.505a.5.5 0 1 1 0 1h-1.006l-.001 1.002h1.007a.5.5 0 0 1 0 1h-1.007l.002.497a.5.5 0 0 1-1 .002l-.003-.998v-.002l.003-2.002zm-3.498-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h.498a2 2 0 0 0 0-4H11.5zm.5 3v-2a1 1 0 0 1 0 2zM20 20v-1.164c.591-.281 1-.884 1-1.582V12.75c0-.698-.409-1.3-1-1.582v-1.34a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7.168c-.591.281-1 .884-1 1.582v4.504c0 .698.409 1.3 1 1.582V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-2 .5H6a.5.5 0 0 1-.5-.5v-.996h13V20a.5.5 0 0 1-.5.5zm.5-10.5v1h-13V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5zm-1.122-1.5H14a.5.5 0 0 1-.5-.5V4.621L17.378 8.5zm-12.628 4h14.5a.25.25 0 0 1 .25.25v4.504a.25.25 0 0 1-.25.25H4.75a.25.25 0 0 1-.25-.25V12.75a.25.25 0 0 1 .25-.25z" fill="currentColor"></path></g></svg>' ,
          name: 'ឯកសារ',
          roles: [
            1, // Super
            2, // Administrator
            3, // Backend member
          ]
      },
      {
          url: '/organization' ,
          icon: 'Organization20Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10 2a3 3 0 0 0-.5 5.96V9.5h-3A1.5 1.5 0 0 0 5 11v1.042a3.001 3.001 0 1 0 1 0V11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.042a3.001 3.001 0 1 0 1 0V11a1.5 1.5 0 0 0-1.5-1.5h-3V7.96A3.001 3.001 0 0 0 10 2zM8 5a2 2 0 1 1 4 0a2 2 0 0 1-4 0zM3.5 15a2 2 0 1 1 4.001 0A2 2 0 0 1 3.5 15zm11-2a2 2 0 1 1 0 4.001a2 2 0 0 1 0-4.001z" fill="currentColor"></path></g></svg>' ,
          name: 'អង្គភាព',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // Backend member
          ]
      }
      // {
      //     url: '/orgchart' ,
      //     icon: 'Organization20Regular' ,
      //     svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10 2a3 3 0 0 0-.5 5.96V9.5h-3A1.5 1.5 0 0 0 5 11v1.042a3.001 3.001 0 1 0 1 0V11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.042a3.001 3.001 0 1 0 1 0V11a1.5 1.5 0 0 0-1.5-1.5h-3V7.96A3.001 3.001 0 0 0 10 2zM8 5a2 2 0 1 1 4 0a2 2 0 0 1-4 0zM3.5 15a2 2 0 1 1 4.001 0A2 2 0 0 1 3.5 15zm11-2a2 2 0 1 1 0 4.001a2 2 0 0 1 0-4.001z" fill="currentColor"></path></g></svg>' ,
      //     name: 'ទំនាក់ទំនងឯកសារ',
      //     roles: [
      //       1, // Super
      //       2, // Administrator
      //       // 3, // Backend member
      //     ]
      // }
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
    
    function toggleAppFunc(url){
      if( url == route.path ) props.close()
      toggleApps = !toggleApps
    }
    function logoutConfirmation(){
        console.log( "confirm before logout" )
    }

    const dialog = useDialog();
    const message = useMessage();
    const store = useStore();
    const router = useRouter()
    const route = useRoute()

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
              message.success("អ្នកបានចាកចេញដោយជោគជ័យ។")
              d.loading = false
            }).catch( err => {
              console.log( err )
            })
            authLogout()
            window.location.href = '/'
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