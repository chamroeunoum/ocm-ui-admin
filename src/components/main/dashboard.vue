<template >
    <Transition name="slide-fade" >
        <div v-if="toggleDashboardWidgets" >
            <div class="border-gray-200 border-b w-full h-10 font-moul text-sm leading-10" >សង្ខេបព័ត៌មាន</div>
            <div class="flex flex-wrap justify-center p-4 text-md">
                <div @click="$router.push('/organization/orgchart')" class="widget-thumbnail-tln hover:scale-105 transform-gpu duration-300">
                    <svg class="m-auto mb-4 h-12 text-yellow-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M23.998 4a7.501 7.501 0 0 0-1.25 14.898V23H15.25a3.75 3.75 0 0 0-3.75 3.75v2.352a7.501 7.501 0 1 0 2.5 0V26.75c0-.69.56-1.25 1.25-1.25h17.498c.69 0 1.25.56 1.25 1.25v2.352a7.501 7.501 0 1 0 2.5 0V26.75a3.75 3.75 0 0 0-3.75-3.75h-7.499v-4.102A7.501 7.501 0 0 0 23.998 4zm-5 7.501a5.001 5.001 0 1 1 10.001 0a5.001 5.001 0 0 1-10.002 0zM7.75 36.5a5.001 5.001 0 1 1 10.002 0a5.001 5.001 0 0 1-10.002 0zm27.5-5.001a5.001 5.001 0 1 1 0 10.002a5.001 5.001 0 0 1 0-10.002z" fill="currentColor"></path></g></svg>
                    <div class="m-auto mb-2">រចនាសម្ព័ន្ធស្ថាប័ន</div>
                    <div class="m-auto mb-2 font-bold text-blue-600 text-lg" ></div>
                </div>
                <div @click="$router.push('/regulator')" class="widget-thumbnail-tln hover:scale-105 transform-gpu duration-300">
                    <svg class="m-auto mb-4 h-12 text-red-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path></svg>
                    <div class="m-auto mb-2">ឯកសារ</div>
                    <div class="m-auto mb-2 font-bold text-blue-600" v-html=" getKhmer( totalRegulators )" ></div>
                </div>
                <div v-if="isBackendManagement()" @click="$router.push('/user')" class="widget-thumbnail-tln hover:scale-105 transform-gpu duration-300">
                    <svg class="m-auto mb-4 h-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>
                    <div class="m-auto mb-2">គណនី</div>
                    <div class="m-auto mb-2 font-bold text-blue-600" v-html="getKhmer( totalAccounts )" ></div>
                </div>
                <div v-if="isBackendManagement()" @click="$router.push('/people')" class="widget-thumbnail-tln hover:scale-105 transform-gpu duration-300">
                    <svg class="m-auto mb-4 h-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2h-6zm-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5zM2 7.25A3.25 3.25 0 0 1 5.25 4h21.5A3.25 3.25 0 0 1 30 7.25v17.5A3.25 3.25 0 0 1 26.75 28H5.25A3.25 3.25 0 0 1 2 24.75V7.25zM5.25 6C4.56 6 4 6.56 4 7.25v17.5c0 .69.56 1.25 1.25 1.25h21.5c.69 0 1.25-.56 1.25-1.25V7.25C28 6.56 27.44 6 26.75 6H5.25z" fill="currentColor"></path></g></svg>
                    <div class="m-auto mb-2">មន្ត្រី</div>
                    <div class="m-auto mb-2 font-bold text-blue-600" v-html="getKhmer( totalPeople )" ></div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script >
import { Icon } from '@vicons/utils'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { DocumentPdf24Regular } from '@vicons/fluent'
import { PersonCircleOutline } from '@vicons/ionicons5'
import { ParentChild } from '@vicons/carbon'
import { FolderOpenOutlined , SupervisedUserCircleRound } from  "@vicons/material"
import { ref , reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { authLogout, isAdmin , isSuper } from './../../plugins/authentication'
import { getKhmer } from './../../plugins/kh/number.js'


export default {
    name: 'Dashboard',
    components: {
        Icon ,
        /**
         * Material
         */
         SupervisedUserCircleRound ,
        /**
         * fluent
         */
        DocumentPdf24Regular ,
        PersonCircleOutline
    },
    name: 'dashboard' ,
    setup() {
        const router = useRouter()
        const store = useStore()
        const dialog = useDialog()
        const message = useMessage()
        const notify = useNotification()

        /**
         * Account
         */
        const accountResponse = ref(null)
        const totalAccounts = computed(() => {
            return accountResponse.value !== null ? accountResponse.value.pagination.totalRecords : 0 
        })
        function getAccounts(){
            store.dispatch('user/list',{
                search: '' ,
                perPage: 10 ,
                page: 1
            }).then( res => {
                if( res.data.ok ){
                    accountResponse.value = res.data
                }else{
                    accountResponse.value = null
                }
            }).catch( err => {
                console.log( err )
                notify.error({
                    title: "អានបញ្ជីគណនី" ,
                    content: "មានបញ្ហាពេលអានបញ្ជីគណនី។" ,
                    duration: 3000 ,
                    background: true
                })
            })
        }

        /**
         * People
         */
        const peopleResponse = ref(null)
        const totalPeople = computed(() => {
            return peopleResponse.value !== null ? peopleResponse.value.pagination.totalRecords : 0 
        })
        function getPeople(){
            store.dispatch('people/list',{
                search: '' ,
                perPage: 10 ,
                page: 1
            }).then( res => {
                if( res.data.ok ){
                    peopleResponse.value = res.data
                }else{
                    peopleResponse.value = null
                }
            }).catch( err => {
                console.log( err )
                notify.error({
                    title: "អានបញ្ជីគណនី" ,
                    content: "មានបញ្ហាពេលអានបញ្ជីគណនី។" ,
                    duration: 3000 ,
                    background: true
                })
            })
        }

        /**
         * Regulator
         */
        const regulatorResponse = ref(null)
        const totalRegulators = computed(() => {
            return regulatorResponse.value !== null ? regulatorResponse.value.pagination.totalRecords : 0 
        })
        function getRegulators(){
            store.dispatch('regulator/list',{
                search: '' ,
                perPage: 10 ,
                page: 1
            }).then( res => {
                if( res.data.ok ){
                    regulatorResponse.value = res.data
                }else{
                    regulatorResponse.value = null
                }
            }).catch( err => {
                switch( err.response.status ) {
                    case 401 :
                        authLogout()
                        router.push('/login')
                        break;
                    default: 
                        notify.error({
                            title: "អានឯកសារគតិយុត្ត" ,
                            content: "មានបញ្ហាពេលអានឯកសារគតិយុត្ត។" ,
                            duration: 3000 ,
                            background: true
                        })
                        break;
                }
            })
        }

        const toggleDashboardWidgets = ref(false)
        onMounted( () => {
            toggleDashboardWidgets.value = true
        })

        function isBackendManagement(){
            return isAdmin() || isSuper()
        }

        /**
         * Initial
         */
        getRegulators()
        getAccounts()
        getPeople()

        return {
            totalRegulators ,
            totalAccounts ,
            totalPeople ,
            toggleDashboardWidgets ,
            isBackendManagement ,
            getKhmer
        }
    }
}
</script>
<style scoped>
    .widget-thumbnail-tln {
        @apply bg-white hover:bg-yellow-50  hover:border-yellow-400 hover:shadow m-4 p-8 border rounded duration-500 cursor-pointer ;
    }
</style>