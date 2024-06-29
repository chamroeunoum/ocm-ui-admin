<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" :on-before-leave="tableClearBeforeLeave" transform-origin="center" :on-after-enter="initial" >
        <n-card class="w-4/5 font-pvh text-xl relative" :title="'ប្រតិបត្តិការផ្សេងទៀតរបស់ ' + model.title" :bordered="false" size="small">
          <div class="flex title-bar border-b border-gray-200">
            <!-- Actions button of the crud -->
            <div class="flex-grow action-buttons flex-row-reverse flex">
              <div class="w-2/5 relative" >
                <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
                <Icon size="27" class="absolute right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" >
                  <n-icon>
                    <Search20Regular />
                  </n-icon>
                </Icon>
              </div>
            </div>
            <!-- Filter panel of crud -->
            <div class="filters-bar"></div>
          </div>
          <!-- Table of crud -->
          <div v-if=" table.records.matched" class="vcb-table-panel vcb-thumbnail">
            <div v-for="(user, index) in table.records.matched" :key='index' 
              class="item"
              @click="user.regulators == undefined ? addReader(user) : ( user.regulators.find( r => r.id == record.id ) ? removeReader(user) : addReader(user) ) "
              >
                <div class="content" >
                  <div class="rounded-lg mx-auto w-14 mb-4 overflow-hidden bg-white flex flex-wrap" >
                    <img :src="user.avatar_url != '' && user.avatar_url != null ? user.avatar_url : ocmLogoUrl " class="w-full mx-auto" />
                  </div> 
                  <div class="font-bold absolute left-2 top-2 " >{{ index + 1 }}</div>
                  <div v-if="isShared(user)" class="absolute right-2 top-2 " >
                    <svg class="text-green-500 w-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z" fill="currentColor"></path></svg>
                  </div>
                  <div class="my-1 mb-4 w-full text-xs text-center font-moul" >{{ user.lastname + " " + user.firstname }}</div>
                  <!-- <div  class="" >{{ user.username }}</div> -->
                  <div class="my-1 w-full text-xs" >{{ user.phone }}</div>
                  <div class="my-1 w-full text-xs" >{{ user.email }}</div>
                  <!-- <div class="" >{{ user.roles == undefined ? "គ្មាន" : user.roles[0].name  }}</div> -->
                </div>
            </div>
          </div>
          <!-- Pagination of crud -->
          <div class="fixed bottom-5 left-0 right-0" >
            <div @click="loadmore()" class="border rounded-full py-2 px-8 m-4 w-60 text-center mx-auto hover:border-blue-500 focus:border-blue-500 duration-300 cursor-pointer bg-gray-100" >បង្ហាញបន្ថែម</div>
          </div>
          <!-- Loading -->
          <div v-if="table.loading" class="table-loading absolute left-0 top-0 right-0 bottom-0 bg-white bg-opacity-75 ">
              <div class="spinner mt-24 mx-auto w-60 text-center">
                <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
                <br/><br/>
                កំពុងអាន...
              </div>
            </div>
        </n-card>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import { Switcher } from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { Save20Regular, Search20Regular , ContactCard28Regular, DocumentPdf24Regular, AppsList20Regular } from '@vicons/fluent'
import ocmLogoUrl from './../../../../assets/logo.svg'

export default {
  components: {
    Save20Regular ,
    DocumentPdf24Regular ,
    AppsList20Regular ,
    Switcher,
    Icon,
    IosCheckmarkCircleOutline,
    IosRefresh ,
    CloseCircleOutline ,
    Search20Regular ,
    ContactCard28Regular
  },
  props: {
    model: {
      type: Object ,
      required: true ,
      default: () => {
        return reactive({
          name: 'Undefined' ,
          title: 'No title'
        })
      },
      // validator: (val) => {}
    } , 
    record: {
      type: Object ,
      required: false ,
      default: () => {
        return reactive({
          id: 0 ,
          number: '' ,
          title: '' ,
          objective: '' ,
          active: 1 ,
          year: null ,
          type_id: null ,
          pdfs: [] ,
          publish: 0
        })
      },
      // validator: (val) => {
      //   for(var field in ['id','username','firstname','lastname','email','phone','password','active'] ){
      //     if( !val.hasOwnProperty(field) ) return false
      //   }
      //   return true 
      // }
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    } ,
    // onShow: {
    //   type: Function
    // }
  },
  setup(props){
    const store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const btnSavingLoadingRef = ref(false)
    const publish = ref(false)
    /**
     * Get user accounts
     */
     var table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        },
        format: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        }
      } ,
      pagination: {
        perPage: 50 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0
      },
      loadmore: false
    })

    function filterRecords(helper=true){
      if( helper ){
        /**
         * Search locally within the records that already loaded
         */
        table.records.matched = []
        if( table.search != "" ) {
          for(var index in table.records.all ){
            for(var field in table.records.all[index] ){
              if( (""+table.records.all[index][field]).includes( table.search ) !== false ) {
                table.records.matched.push( table.records.all[index] )
                break;
              }
            }
          }
        }
        if( table.records.matched.length <= 0 ) {
          table.records.matched = table.records.all
        }
      }else{
        /**
         * Search from server
         */
        table.loadmore = false
        table.pagination.perPage = 50
        table.pagination.page = 1
        table.pagination.totalPages = 0
        table.pagination.totalRecords = 0
        table.records.all = []
        table.records.matched = []
        setTimeout( getUsers() , 500 )
      }
    }

    function getUsers(){
      showTableLoading()
      store.dispatch('user/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
        if( table.loadmore ){
          table.records.all = table.records.all.concat( res.data.records )
          table.records.matched = table.records.matched.concat( res.data.records )
        }else{
          table.records.all = table.records.matched = res.data.records
        }
        table.pagination = res.data.pagination
        closeTableLoading()
      }).catch( err => {
        console.log( err )
      })
    }

    function showTableLoading(){
      table.loading = true
    }

    function closeTableLoading(){
      table.loading = false
    }
    /**
     * Pagination functions
     */
    function previous(){
      if( table.pagination.page > 1 ){
        table.pagination.page = table.pagination.page - 1 
        getUsers()
      }else{
        message.info("មិនមានទិន្នន័យទៀតឡើយ។")
      }
    }
    function next(){
      if( table.pagination.page < table.pagination.totalPages ){
        table.pagination.page = table.pagination.page + 1
        getUsers()
      }else{
        message.info("មិនមានទិន្នន័យទៀតឡើយ។")
      }
    }
    function goTo(page){
      if( page < 1 || table.pagination.page == page || page > table.pagination.totalPages ){
        return false
      }
      table.pagination.page = page 
      getUsers()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getUsers()
    }

    function tableInitialState(){
      table.pagination = {
        perPage: 50 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0
      }
      table.search = '' 
      table.loadmore = false
      table.records = {
        all: [] ,
        matched: []
      }
      getUsers()
    }

    function tableClearBeforeLeave(){
      table.pagination = {
        perPage: 50 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0
      }
      table.search = '' 
      table.loadmore = false
      table.records = {
        all: [] ,
        matched: []
      }
    }

    function loadmore(){
      table.loadmore = true
      next()
    }

    function addReader(user){
      store.dispatch('regulator/addReader',{ user_id : user.id , document_id : props.record.id }).then( res => {
        message.info(res.data.message )
        tableClearBeforeLeave()
        getUsers()
      }).catch( err => {
        console.log( err )
        notify.error({
          title: 'បញ្ចូលអ្នកអាន' ,
          content: 'មានបញ្ហាពេលបញ្ចូលអ្នកអាន' ,
          duration : 3000
        })
      })
    }

    function removeReader(user){
      store.dispatch('regulator/removeReader',{ user_id : user.id , document_id : props.record.id }).then( res => {
        message.info(res.data.message )
        tableClearBeforeLeave()
        getUsers()
      }).catch( err => {
        console.log( err )
        notify.error({
          title: 'ដកអ្នកអាន' ,
          content: 'មានបញ្ហាពេលដកអ្នកអាន' ,
          duration : 3000
        })
      })
    }

    function isShared(user){
      if( user.regulators != undefined && Array.isArray( user.regulators ) && user.regulators.length ){
        return user.regulators.find( r => r.id == props.record.id ) != undefined ? true : false
      }
      return false 
    }

    function initial(){
      /**
       * Clear listing conditions before load the users at initial state
       */
      tableInitialState()
    }

    return {
      /**
       * Computed
       */
      /**
       * Variables
       */
      btnSavingLoadingRef ,
      /**
       * Table functions
       */
      table ,
      filterRecords ,
      tableClearBeforeLeave ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      loadmore ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      showTableLoading ,
      addReader ,
      removeReader ,
      isShared ,
      /**
       * Initial function
       */
      initial ,
      ocmLogoUrl
    }
  }
}
</script>

<style type="text/css" scoped >
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
.vcb-thumbnail {
  @apply flex flex-wrap justify-center;
}
.vcb-thumbnail .item {
  @apply xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 p-2 ;
}
.vcb-thumbnail .item .content {
  @apply border rounded-lg hover:shadow duration-500 p-4 relative hover:scale-105 transform-gpu bg-white cursor-pointer;
}
.vcb-thumbnail .item .content .image {
  @apply border rounded-full border-gray-200 p-2 w-20 h-20 flex-none mx-auto overflow-hidden bg-white ;
}
.vcb-filters-panel {
  @apply fixed left-0 top-10 right-0 bottom-0 bg-opacity-60 bg-white ;
}
.vcb-filters-panel .filter-title {
  @apply w-full text-left p-4 bg-white rounded-lg ;
}
.vcb-filters-panel .filter-actions {
  @apply w-full text-left p-4 flex flex-wrap justify-center;
}
.vcb-filters-panel .filter-actions .filter-action {
  @apply p-2 m-2 bg-white rounded-lg shadow border border-gray-300 w-4/6 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-2/6 ;
}
</style>