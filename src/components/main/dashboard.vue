<template >
    <!-- <Transition name="fade" > -->
        <div v-if="toggleDashboardWidgets" >
            <div class="w-full h-12 leading-10 font-muol text-lg border-b border-gray-200" >សង្ខេបព័ត៌មាន</div>
            <div class="flex flex-wrap justify-center p-8 text-md">
                <!-- <div @click="$router.push('/orgchart')" class="bg-gray-200 rounded border border-gray-100 hover:border-gray-200 hover:bg-gray-100 duration-300 p-8 m-8 cursor-pointer min-w-200">
                    <Icon size="60" class=" m-auto mb-4 h-12" >
                        <ParentChild />
                    </Icon>
                    <div class="m-auto mb-2 ">តារាងរចនាសម្ព័ន្ធ</div>
                    <div class="m-auto mb-2 font-bold text-lg text-blue-600 " ></div>
                </div> -->
                <div @click="$router.push('/regulator')" class="bg-gray-200 rounded border border-gray-100 hover:border-gray-200 hover:bg-gray-100 duration-300 p-4 m-8 cursor-pointer min-w-120">
                    <Icon size="40" class="text-red-700 m-auto mb-4 h-8" >
                        <DocumentPdf24Regular />
                    </Icon>
                    <div class="m-auto mb-2 ">ឯកសារ</div>
                    <div class="m-auto mb-2 font-bold text-blue-600 " v-html="totalRegulators" ></div>
                </div>
                <div @click="$router.push('/folder')" class="bg-gray-200 rounded border border-gray-100 hover:border-gray-200 hover:bg-gray-100 duration-300 p-4 m-8 cursor-pointer min-w-120">
                    <Icon size="40" class=" m-auto mb-4 h-8" >
                        <FolderOpenOutlined />
                    </Icon>
                    <div class="m-auto mb-2 ">ថត</div>
                    <div class="m-auto mb-2 font-bold text-blue-600 " v-html="totalFolders" ></div>
                </div>
                <div v-if="isBackendManagement()" @click="$router.push('/user')" class="bg-gray-200 rounded border border-gray-100 hover:border-gray-200 hover:bg-gray-100 duration-300 p-4 m-8 cursor-pointer min-w-120">
                    <Icon size="40" class=" m-auto mb-4 h-8" >
                        <PersonCircleOutline />
                    </Icon>
                    <div class="m-auto mb-2 ">គណនី</div>
                    <div class="m-auto mb-2 font-bold text-blue-600 " v-html="totalAccounts" ></div>
                </div>
                <!-- <div v-if="isBackendManagement()" @click="$router.push('/role')" class="bg-gray-200 rounded border border-gray-100 hover:border-gray-200 hover:bg-gray-100 duration-300 p-8 m-8 cursor-pointer min-w-200">
                    <Icon size="60" class=" m-auto mb-4 h-12" >
                        <SupervisedUserCircleRound />
                    </Icon>
                    <div class="m-auto mb-2 ">តួនាទី</div>
                    <div class="m-auto mb-2 font-bold text-lg text-blue-600 " v-html="totalRoles" ></div>
                </div> -->
            </div>
        </div>
    <!-- </Transition> -->
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


export default {
    name: 'Dashboard',
    components: {
        Icon ,
        /**
         * Material
         */
         FolderOpenOutlined ,
         SupervisedUserCircleRound ,
        /**
         * fluent
         */
        DocumentPdf24Regular ,
        PersonCircleOutline ,
        ParentChild
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

        /**
         * Folder
         */
        const folderResponse = ref(null)
        const totalFolders = computed(() => {
            return folderResponse.value !== null ? folderResponse.value.pagination.totalRecords : 0 
        })
        function getFolders(){
            store.dispatch('folder/list',{
                search: '' ,
                perPage: 10 ,
                page: 1
            }).then( res => {
                if( res.data.ok ){
                    folderResponse.value = res.data
                }else{
                    folderResponse.value = null
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

        /**
         * Role
         */
        // const roleResponse = ref(null)
        // const totalRoles = computed(() => {
        //     return roleResponse.value !== null ? roleResponse.value.pagination.totalRecords : 0 
        // })
        // function getRoles(){
        //     store.dispatch('role/list',{
        //         search: '' ,
        //         perPage: 10 ,
        //         page: 1
        //     }).then( res => {
        //         if( res.data.ok ){
        //             roleResponse.value = res.data
        //         }else{
        //             roleResponse.value = null
        //         }
        //     }).catch( err => {
        //         switch( err.response.status ) {
        //             case 401 :
        //                 authLogout()
        //                 router.push('/login')
        //                 break;
        //             default: 
        //                 notify.error({
        //                     title: "អានឯកសារគតិយុត្ត" ,
        //                     content: "មានបញ្ហាពេលអានឯកសារគតិយុត្ត។" ,
        //                     duration: 3000 ,
        //                     background: true
        //                 })
        //                 break;
        //         }
        //     })
        // }

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
        getFolders()
        // getRoles()

        return {
            totalRegulators ,
            totalAccounts ,
            totalFolders ,
            // totalRoles ,
            toggleDashboardWidgets ,
            isBackendManagement
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