<template>
  <div class="flex flex-wrap content-center z-50" >
    <!-- Start transaction of the apps -->
    <Transition  name="fade" >
        <!-- Apps -->
        <div v-if="toggleApps || show" class="fixed top-0 bottom-0 left-0 right-0 z-40 flex flex-wrap content-start w-full px-4 py-16 bg-gray-700 sm:px-4 md:px-4 lg:p-24 xl:p-24 bg-opacity-95 ">
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
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path d="M443.5,420.2L336.7,312.4c20.9-26.2,33.5-59.4,33.5-95.5c0-84.5-68.5-153-153.1-153S64,132.5,64,217s68.5,153,153.1,153
	c36.6,0,70.1-12.8,96.5-34.2l106.1,107.1c3.2,3.4,7.6,5.1,11.9,5.1c4.1,0,8.2-1.5,11.3-4.5C449.5,437.2,449.7,426.8,443.5,420.2z
	 M217.1,337.1c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-84.9c0-32.1,12.5-62.3,35.2-84.9c22.7-22.7,52.9-35.2,85-35.2
	c32.1,0,62.3,12.5,85,35.2c22.7,22.7,35.2,52.9,35.2,84.9c0,32.1-12.5,62.3-35.2,84.9C279.4,324.6,249.2,337.1,217.1,337.1z"></path></svg>
                    </n-icon>
                  </template>
                </n-input>
            </div>
            <!-- End search -->
            <!-- Apps -->
            <div class="flex flex-wrap justify-center w-full apps ">
                <div v-for="(app, index) in matchedApps" :key="index" @click="toggleAppFunc(app.url);$router.push(app.url)" class="py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg">
                    <div class='w-full dashboard-widget-link' >
                      <div class="text-gray-100 w-16 mx-auto my-2 " v-html="app.svg" ></div>
                      <div class="font-pvh p-2 m-auto text-xs text-center text-gray-100" v-html="app.name" ></div>
                    </div>
                </div>
                <div class="py-4 px-8 duration-300 transform hover:scale-110 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg">
                    <div @click="logout()" class='w-full dashboard-widget-link' >
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
              <div v-if="!showLuncher" @click="close()" class="w-12 h-12 p-1 -mt-20 mx-auto text-center bg-white rounded-full shadow-md border border-gray-300 cursor-pointer duration-300 transform hover:scale-110" >
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
import { isAuth, authLogout , isAdmin , getUser } from '../../plugins/authentication'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useDialog , useMessage } from 'naive-ui'
export default {  
  components: {
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
          name: 'សង្ខេបព័ត៌មាន',
          roles: [
            1, // Super
            2, // Administrator
            3, // backend
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
            // 3, // backend
          ]
      },
      {
          url: '/officer' ,
          icon: 'ContactCard32Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2h-6zm-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5zM2 7.25A3.25 3.25 0 0 1 5.25 4h21.5A3.25 3.25 0 0 1 30 7.25v17.5A3.25 3.25 0 0 1 26.75 28H5.25A3.25 3.25 0 0 1 2 24.75V7.25zM5.25 6C4.56 6 4 6.56 4 7.25v17.5c0 .69.56 1.25 1.25 1.25h21.5c.69 0 1.25-.56 1.25-1.25V7.25C28 6.56 27.44 6 26.75 6H5.25z" fill="currentColor"></path></g></svg>' ,
          name: 'មន្ត្រី',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // backend
          ]
      },
      {
          url: '/profile' ,
          icon: 'UserAvatar' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>' ,
          name: 'ព័ត៌មានផ្ទាល់ខ្លួន',
          roles: [
            // 1, // Super
            2, // Administrator
            3, // backend
          ]
      },
      {
          url: '/folder' ,
          icon: 'FolderOpen20Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M16.996 7.073V7a2.5 2.5 0 0 0-2.5-2.5H9.664l-1.6-1.2a1.5 1.5 0 0 0-.9-.3H4.5A2.5 2.5 0 0 0 2 5.5l.001 8.998a2.5 2.5 0 0 0 2.201 2.482c.085.014.172.022.26.022H15.18a1.5 1.5 0 0 0 1.472-1.214l1.358-7a1.501 1.501 0 0 0-1.014-1.715zM4.5 4h2.664a.5.5 0 0 1 .3.1l1.734 1.3a.5.5 0 0 0 .3.1h4.998a1.5 1.5 0 0 1 1.5 1.5v.002H5.824a1.5 1.5 0 0 0-1.472 1.214l-1.298 6.676A1.502 1.502 0 0 1 3 14.498L3 5.5A1.5 1.5 0 0 1 4.5 4zm.833 4.407a.5.5 0 0 1 .491-.405h10.713a.5.5 0 0 1 .491.595l-1.357 7a.5.5 0 0 1-.491.405H4.463a.5.5 0 0 1-.49-.595l1.36-7z" fill="currentColor"></path></g></svg>' ,
          name: 'ថតឯកសារ',
          roles: [
            // 1, // Admin
            // 2, // Administrator
            3, // backend
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
      //       // 3, // backend
      //     ]
      // },
      // {
      //     url: '/law' ,
      //     icon: 'BookLetter20Regular' ,
      //     svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 4v12a2 2 0 0 0 2 2h9.5a.5.5 0 0 0 0-1H6a1 1 0 0 1-1-1h10a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zm10-1a1 1 0 0 1 1 1v11H5V4a1 1 0 0 1 1-1h8zm-4 2c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.92.394L11.813 11H8.187l-.727 1.697a.5.5 0 0 1-.92-.394l3-7A.5.5 0 0 1 10 5zm-1.385 5h2.77L10 6.77L8.615 10z" fill="currentColor"></path></g></svg>' ,
      //     name: 'ច្បាប់',
      //     roles: [
      //       1, // Super
      //       // 2, // Administrator
      //       // 3, // backend
      //     ]
      // },
      {
          url: '/regulator' ,
          icon: 'DocumentPdf24Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path></svg>' ,
          name: 'ឯកសារ',
          roles: [
            1, // Super
            2, // Administrator
            3, // backend
          ]
      },
      {
          url: '/room' ,
          icon: 'Airplay' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M22.996 30H9.004a1.002 1.002 0 0 1-.821-1.577l6.998-9.996a1 1 0 0 1 1.638 0l6.998 9.996a1.002 1.002 0 0 1-.82 1.577zM10.92 28h10.16L16 20.744z" fill="currentColor"></path><path d="M28 24h-4v-2h4V6H4v16h4v2H4a2.002 2.002 0 0 1-2-2V6a2.002 2.002 0 0 1 2-2h24a2.002 2.002 0 0 1 2 2v16a2.002 2.002 0 0 1-2 2z" fill="currentColor"></path></svg>' ,
          name: 'សាល',
          roles: [
            1, // Super
            2, // Administrator
            3, // backend
          ]
      },
      {
          url: '/position' ,
          icon: 'Organization20Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M28.07 21L22 15l6.07-6l1.43 1.41L24.86 15l4.64 4.59L28.07 21z" fill="currentColor"></path><path d="M22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z" fill="currentColor"></path><path d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" fill="currentColor"></path></svg>' ,
          name: 'តួនាទី',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // backend
          ]
      },
      {
          url: '/organization' ,
          icon: 'Organization20Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>' ,
          name: 'ក្រសួងស្ថាប័ន',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // backend
          ]
      },
      {
          url: '/organization/orgchart' ,
          icon: 'Organization20Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10 2a3 3 0 0 0-.5 5.96V9.5h-3A1.5 1.5 0 0 0 5 11v1.042a3.001 3.001 0 1 0 1 0V11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.042a3.001 3.001 0 1 0 1 0V11a1.5 1.5 0 0 0-1.5-1.5h-3V7.96A3.001 3.001 0 0 0 10 2zM8 5a2 2 0 1 1 4 0a2 2 0 0 1-4 0zM3.5 15a2 2 0 1 1 4.001 0A2 2 0 0 1 3.5 15zm11-2a2 2 0 1 1 0 4.001a2 2 0 0 1 0-4.001z" fill="currentColor"></path></g></svg>' ,
          name: 'រចនាសម្ព័ន្ធ',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // backend
          ]
      },
      {
          url: '/attendant' ,
          icon: 'ListChecked' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>' ,
          name: 'វត្តមាន',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // backend
          ]
      },
      {
          url: '/qrcodes' ,
          icon: 'QrCode28Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M10.75 15A2.25 2.25 0 0 1 13 17.25v5.5A2.25 2.25 0 0 1 10.75 25h-5.5A2.25 2.25 0 0 1 3 22.75v-5.5A2.25 2.25 0 0 1 5.25 15h5.5zm7.585 0v3.333h3.332v3.334h-3.332v3.332H15v-3.333h3.333v-3.333H15V15h3.334zM25 21.666V25h-3.333v-3.333H25zM10.75 16.5h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75zm-1.25 2v3h-3v-3h3zM25 15v3.333h-3.333V15H25zM10.75 3A2.25 2.25 0 0 1 13 5.25v5.5A2.25 2.25 0 0 1 10.75 13h-5.5A2.25 2.25 0 0 1 3 10.75v-5.5A2.25 2.25 0 0 1 5.25 3h5.5zm12 0A2.25 2.25 0 0 1 25 5.25v5.5A2.25 2.25 0 0 1 22.75 13h-5.5A2.25 2.25 0 0 1 15 10.75v-5.5A2.25 2.25 0 0 1 17.25 3h5.5zm-12 1.5h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75zm12 0h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75zM9.5 6.5v3h-3v-3h3zm12 0v3h-3v-3h3z" fill="currentColor"></path></g></svg>' ,
          name: 'បញ្ជី QR',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // backend
          ]
      },
      {
          url: '/task' ,
          icon: 'TasksApp20Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9.883l-1 1.01V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4.085c.071.2.185.389.344.55l.441.45H6a2 2 0 0 1-2-2V4zm4 1.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0zM9.5 5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm0 4a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zM9 13.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm-2-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2zm10.855.352a.5.5 0 0 0-.71-.704l-3.643 3.68l-1.645-1.678a.5.5 0 1 0-.714.7l1.929 1.968a.6.6 0 0 0 .855.002l3.928-3.968z" fill="currentColor"></path></g></svg>' ,
          name: 'កិច្ចការ',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // backend
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
    
    function toggleAppFunc(url){
      // if( url == route.path ) props.close()
      toggleApps.value = !toggleApps
      props.close()
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