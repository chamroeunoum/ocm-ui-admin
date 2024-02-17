<template>
  <div>
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2h-6zm-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5zM2 7.25A3.25 3.25 0 0 1 5.25 4h21.5A3.25 3.25 0 0 1 30 7.25v17.5A3.25 3.25 0 0 1 26.75 28H5.25A3.25 3.25 0 0 1 2 24.75V7.25zM5.25 6C4.56 6 4 6.56 4 7.25v17.5c0 .69.56 1.25 1.25 1.25h21.5c.69 0 1.25-.56 1.25-1.25V7.25C28 6.56 27.44 6 26.75 6H5.25z" fill="currentColor"></path></g></svg>
        <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2">
          <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <n-icon>
                <Add20Regular />
              </n-icon>
            </template>
            បន្ថែម
          </n-button>
        </div>
        <div 
        
        class="w-2/5 relative" >
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
    <div class="vcb-table-panel relative">
      <Transition name="fade" >
        <table v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-table" >
          <tr class="vcb-table-headers" >
            <th class="vcb-table-header" >ល.រ</th>
            <th class="vcb-table-header">ឈ្មោះ</th>
            <th class="vcb-table-header">ថ្ងៃខែឆ្នាំកំណើត</th>
            <th class="vcb-table-header">លេខទូរស័ព្ទ</th>
            <th class="vcb-table-header">អសយដ្ឋានអេឡិចត្រូនិច</th>
            <th class="vcb-table-header text-center w-40" >ប្រតិបត្តិការ</th>
          </tr>
          <tr v-for="(record, index) in table.records.matched" :key='index' class="vcb-table-row hover:bg-gray-200 duration-300" >
            <td class="vcb-table-cell font-bold w-12" >{{ ( ( table.pagination.perPage * ( table.pagination.page - 1 ) ) + index + 1 ) }}</td>
            <td class="vcb-table-cell flex flex-wrap " >
              <div class="w-full flex" >
                <div v-if="Array.isArray( record.countesies ) && record.countesies.length > 0" class="flex-none font-moul mr-2" >{{  record.countesies.map( o => o.name ).join( ' , ' )  }}</div>
                <div class="flex-grow font-moul" >{{ record.lastname + " " + record.firstname }}<br/></div>
              </div>
              <div class="w-full flex flex-wrap" >
                <div v-if=" Array.isArray( record.positions ) && record.positions.length > 0 " class="text-xs mt-1 text-gray-500 mr-2" >{{ record.positions.map( o => o.name ).join( ' , ' ) }}</div>
                <div v-if=" Array.isArray( record.organizations ) && record.organizations.length > 0 " class="text-xs mt-1 text-gray-500 " >{{ record.organizations.map( o => o.name ).join( ' , ' ) }}</div>
              </div>
            </td>
            <td  class="vcb-table-cell w-40" >{{ record.dob }}</td>
            <td  class="vcb-table-cell w-40" >{{ record.mobile_phone }}</td>
            <td class="vcb-table-cell" >{{ record.email }}</td>
            <td class="vcb-table-actions-panel w-40 flex items-center place-content-center " >
              <n-tooltip v-if="record.user != undefined " trigger="hover">
                <template #trigger>
                  <svg class="w-6 h-6 text-blue-600 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>
                </template>
                គណនីចូលប្រើប្រព័ន្ធ
              </n-tooltip>
              <svg class="cursor-pointer text-blue-500 w-6 " @click="showEditModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 15h5.986c-.227.3-.4.639-.51 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5.232c-.326.14-.631.343-.897.609L15 9.944V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1zm8-9.5a.5.5 0 0 1 1 0v6.444l-.88.88A.498.498 0 0 1 12 12.5v-7zm-7 2a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zM9 9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3A.5.5 0 0 0 9 9zm1.98 6.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498c.096-.386.296-.74.578-1.02z" fill="currentColor"></path></g></svg>
              <svg class="cursor-pointer text-red-500 w-6 " @click="deleteAccount(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>              
            </td>
          </tr>
        </table>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
              <br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-1 right-1 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
            <svg class="w-14 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </div>
        </div>
      </Transition>
    </div>
    <!-- Pagination of crud -->
    <div class="fixed left-0 right-0 bottom-12 flex flex-wrap" >
      <!-- This pagination is for the media side with from Medium up -->
      <div class="vcb-table-pagination bg-blue-300">
        <!-- First -->
        <!-- Previous -->
        <div class="vcb-pagination-page " v-html='"<"' @click="previous()" ></div>
        <!-- Pages (7) -->
        <div v-for="(page, index) in table.pagination.buttons" :key="index" :class="'vcb-pagination-page pages h-8 mx-2 font-bold' + (table.pagination.page == page ? ' text-blue-500 text-lg border-none rounded-full' : '' )" @click="table.pagination.page == page ? false : goTo(page) " >
          <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">{{ page }}</div>
        </div>
        <!-- Next -->
        <div class="vcb-pagination-page " v-html='">"' @click="next()" ></div>
        <!-- Last -->
        <!-- Go to -->
        <!-- Total per page -->
      </div>
    </div>
    
    <!-- End of change password -->
    <!-- Form create account -->
    <create-form v-bind:model="model" v-bind:show="createModal.show" :onClose="closeCreateModal"/>
    <!-- Form update account -->
    <update-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="editModal.show" :onClose="closeEditModal"/>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { Switcher } from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular } from '@vicons/fluent'
/**
 * CRUD component form
 */
import CreateForm from './create.vue'
import UpdateForm from './update.vue'
export default {
  name: "People" ,
  components: {
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    Icon,
    IosCheckmarkCircleOutline,
    CreateForm,
    IosRefresh ,
    CloseCircleOutline ,
    UpdateForm,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    /**
     * Variables
     */    
    var model = reactive( {
      name: "people" ,
      title: "មន្ត្រី"
    })
    var table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          firstname: '' ,
          lastname: '' ,
          dob: '' ,
          email: '' ,
          mobile_phone: '' ,
          office_phone: '' ,
          nid: ''
        },
        format: {
          id: 0 ,
          firstname: '' ,
          lastname: '' ,
          gender: 0 ,
          dob: '' ,
          email: '' ,
          mobile_phone: '' ,
          office_phone: '' ,
          nid: '' ,
          image: '' ,
          marry_status: '' ,
          fatther: 0 ,
          mother: 0 ,
          countesies: [] ,
          positions: [] ,
          organizations: []
        }
      } ,
      pagination: {
        perPage: 20 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })

    function filterRecords(helper=true){
      if( helper ){
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
        setTimeout( goTo(1) , 500 )
      }
    }

    /**
     * Functions
     */
    function getRecords(){
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        
        var paginationNumberList = 10
        if( ( table.pagination.page - ( parseInt( paginationNumberList / 2 ) + 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > paginationNumberList ? paginationNumberList : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page - parseInt( paginationNumberList / 2 )
          table.pagination.end = table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + parseInt( paginationNumberList / 2 )
        }
        /**
         * Create pagination buttons
         */
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){
          table.pagination.buttons.push(i)
        }

        closeTableLoading()
      }).catch( err => {
        console.log( err )
      })
    }
    function closeTableLoading(){
      table.loading = false
    }
    /**
     * Pagination functions
     */
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getRecords()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getRecords()
    }

    
    /**
     * Create modal handling
     */
    var createModal = reactive({show:false})
    function showCreateModal(){
      createModal.show = true
    }

    function closeCreateModal(){
      createModal.show = false
      getRecords()
    }

    var editModal = reactive({show:false})
    var editRecord = reactive({
      id: 0 ,
      firstname: '' ,
      lastname: '' ,
      gender: 0 ,
      dob: '' ,
      email: '' ,
      mobile_phone: '' ,
      office_phone: '' ,
      nid: '' ,
      image: '' ,
      marry_status: '' ,
      fatther: 0 ,
      mother: 0 ,
      countesies: [] ,
      positions: [] ,
      organizations: []
    })
    function showEditModal(record){
      editRecord.id = record.id
      editRecord.firstname = record.firstname
      editRecord.lastname = record.lastname
      editRecord.mobile_phone = record.mobile_phone
      editRecord.office_phone = record.office_phone
      editRecord.email = record.email
      editRecord.gender = parseInt( record.gender ) >= 0 ? record.gender : 1 // Male
      editRecord.dob = record.dob
      editRecord.nid = record.nid
      editRecord.image = record.image
      editRecord.marry_status =  record.marry_status != null && record.marry_status != '' ? record.marry_status : 'single'
      editRecord.father = record.father
      editRecord.mother = record.mother
      editRecord.countesies = record.countesies
      editRecord.organizations = record.organizations
      editRecord.positions = record.positions
      console.log( editRecord )
      editModal.show = true
    }
    function closeEditModal(record){
      editModal.show = false
      getRecords()
    }

    function deleteAccount(record){
      dialog.warning({
        title: "លុបគណនី" ,
        content: "តើអ្នកចង់ លុប គណនីនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'លុបទិន្នន័យ' ,
                description: 'លុបបានរួចរាល់។' ,
                duration: 3000
              })
              getRecords()
            }else{
              notify.success({
                title: 'លុបទិន្នន័យ' ,
                description: 'មានបញ្ហាក្នុងពេលលុបទិន្នន័យ។' ,
                duration: 3000
              })
            }
        }).catch( err => {
          message.error( err )
        })
        },
        onNegativeClick: () => {
        }
      })
    }
    
    /**
     * Load positions
     */
     function getPositions(){
      store.dispatch('position/list',{
        page: 1 ,
        perPage: 1000 ,
        search: ''
      }).then(res=>{
        store.commit('position/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានតំណែង' ,
          description: 'មានបញ្ហាពេលអានតំណែង។'
        })
        console.log( err )
      })
    }

    /**
     * Load organizations
     */
     function getOrganizations(){
      store.dispatch('organizations/list',{
        page: 1 ,
        perPage: 1000 ,
        search: '' ,
        id: 164
      }).then(res=>{
        store.commit('organizations/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានអង្គភាព' ,
          description: 'មានបញ្ហាពេលអានអង្គភាព។'
        })
        console.log( err )
      })
    }

    /**
     * Load countesies
     */
     function getCountesies(){
      store.dispatch('countesy/list',{
        page: 1 ,
        perPage: 1000 ,
        search: '' ,
        id: 15
      }).then(res=>{
        store.commit('countesy/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានងារ' ,
          description: 'មានបញ្ហាពេលអានងារ។'
        })
        console.log( err )
      })
    }

    /**
     * Initial the data
     */
    getRecords()
    getPositions()
    getOrganizations()
    getCountesies()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Creating
       */
      createModal ,
      showCreateModal ,
      closeCreateModal ,     
      /**
       * Editing
       */
      editModal ,
      showEditModal ,
      closeEditModal , 
      editRecord ,
      /**
       * Functions
       */
      deleteAccount
    }
  }
}

</script>