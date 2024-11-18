<template>
  <div class="relative" >
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg class="text-red-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5c-17.2-10.5-28.7-25-36.8-46.3c3.9-16.1 10.1-40.6 5.4-56c-4.2-26.2-37.8-23.6-42.6-5.9c-4.4 16.1-.4 38.5 7 67.1c-10 23.9-24.9 56-35.4 74.4c-20 10.3-47 26.2-51 46.2c-3.3 15.8 26 55.2 76.1-31.2c22.4-7.4 46.8-16.5 68.4-20.1c18.9 10.2 41 17 55.8 17c25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35c-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8c-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7c8.3 15.1 18.9 27.2 30.1 35.5c-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" fill="currentColor"></path></svg>
        <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2 flex flex-wrap">
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg class="w-8 h-8 cursor-pointer hover:text-green-500 duration-300" @click="showCreateModal()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
            </template>
            បន្ថែមទិន្នន័យថ្មី
          </n-tooltip>
        </div>
        <div class="w-3/5 md:w-2/5 relative" >
          <n-tooltip trigger="hover">
            <template #trigger>
              <div class="w-full relative" >
                <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-8 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 duration-300" placeholder="ស្វែងរក" />
                <svg class="absolute right-1 top-2 w-6 h-6 text-gray-400  cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
              </div>
            </template>
            សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរក
          </n-tooltip>
        </div>
        <div class="mt-1 mr-2 flex flex-wrap">
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg class="w-7 h-7 p-1 bg-white rounded-full border border-gray-300 cursor-pointer hover:text-green-500 duration-300" @click="toggleFilter()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2zM6 6v3.59l8 8V26h4v-8.41l8-8V6z" fill="currentColor"></path></svg>
            </template>
            សម្រង់ទិន្នន័យ
          </n-tooltip>
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative ">
      <Transition name="fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-thumbnail mb-12" >
          <div v-for="(record, index) in table.records.matched" :key='index' class="item" >
            <div class="content" >
              <!-- <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
              <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ocmLogoUrl+');' " ></div> -->
              <div class="flex flex-wrap " >
                <div class="w-full py-2" >
                  <div class="font-moul" style="font-size: 0.7rem; " >{{ ( Array.isArray( record.types ) && record.types.length > 0 ? record.types[0].desp + '/' : ' ' ) + $toKhmer( record.fid ) }}</div>
                  <div class="" >{{ $toKhmer( record.year.slice(0,10) ) }}</div>
                </div>
                <div class="w-full py-2" >
                  <div class="w-full pb-1 mb-1 leading-6 break-all text-left " v-html="applyTagMark( $toKhmer( record.objective ))" ></div>
                </div>
                <div class="w-full flex " >
                  <div v-if="Array.isArray( record.signatures ) && record.signatures.length > 0 " class="w-1/2 text-left text-gray-600 mr-2 leading-4 font-moul" style="font-size: 0.5rem; " >{{ record.signatures.map( o => o.name ).join( ' , ' ) }}</div>
                  <div v-if="Array.isArray( record.organizations ) && record.organizations.length > 0 " class="w-1/2 text-right text-gray-600 leading-4 font-moul" style="font-size: 0.5rem; " >{{ record.organizations.map( o => o.name ).join( ' , ' ) }}</div>
                </div>
              </div>
              <thumbnail-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" />
              <div class="absolute top-0 left-0 p-1 border-l-0 border-t-0 border border-gray-200 font-moul rounded-br-lg shadow-sm" style="font-size: 0.6rem; " >{{ $toKhmer( ( table.pagination.perPage * ( table.pagination.page - 1 ) ) + index + 1 ) }}</div>
            </div>
          </div>
        </div>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-10 right-0 bottom-0 bg-white bg-opacity-90 ">
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
              <br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-2 right-2 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
            <svg class="w-10 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </div>
        </div>
      </Transition>
      <!-- Pagination of crud -->
      <div class="fixed left-0 right-0 bottom-1 flex flex-wrap" >
        <Transition name="slide-fade" >
          <!-- This pagination is for the media side with from Medium up -->
          <div v-if="table.pagination.totalPages > 1" class="vcb-table-pagination bg-blue-300 mx-auto">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-popselect 
                  trigger="click"
                  v-model:value="table.pagination.perPage"
                  :options="[
                    { label: 5 , value: 5 } ,
                    { label: 10 , value: 10 } ,
                    { label: 20 , value: 20 } ,
                    { label: 30 , value: 30 } ,
                    { label: 40 , value: 40 } ,
                    { label: 50 , value: 50 } ,
                    { label: 100 , value: 100 } ,
                    { label: 200 , value: 200 } ,
                    { label: 500 , value: 500 } ,
                  ]"
                  size="small"
                  scrollable
                  @update:value="goTo(1)"
                >
                  <div class="cursor-pointer font-pvh rounded-full p-2 px-4 border border-gray-200 text-blue-600" >{{ $toKhmer( table.pagination.perPage ) }}</div>
                </n-popselect>
              </template>
              ចំនួនព័ត៌មានបង្ហាញម្ដង
            </n-tooltip>
            <!-- Information -->
            <div class="vcb-table-pagination-info font-pvh text-blue-600 p-1 mx-2" >{{ table.pagination.totalRecords > 0 ? $toKhmer( table.pagination.totalRecords ) + " ឯកសារ" : "" }}</div>
            <div class="vcb-table-pagination-info font-pvh text-blue-600 p-1 mx-2" >{{ table.pagination.totalPages > 0 ? $toKhmer( table.pagination.totalPages ) + " ទំព័រ" : "" }}</div>
            <!-- Pages (7) -->
            <div v-for="(page, index) in table.pagination.buttons" :key="index" :class=" (table.pagination.page == page ? ' vcb-pagination-page-active ' : ' vcb-pagination-page ' )" @click="table.pagination.page == page ? false : goTo(page) " >{{ $toKhmer( page ) }}</div>
            <!-- First -->
            <div v-if="table.pagination.page > 1 " class="vcb-pagination-page p-1" @click="first()" >
              <svg class="w-5 h-5 mx-auto" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M18.29 17.29a.996.996 0 0 0 0-1.41L14.42 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L12.3 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z" fill="currentColor"></path><path d="M11.7 17.29a.996.996 0 0 0 0-1.41L7.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L5.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z" fill="currentColor"></path></svg>
            </div>
            <!-- Previous -->
            <Transition name="slide-fade" >
              <div v-if="table.pagination.page > 1 " class="vcb-pagination-page p-1" @click="previous()" >
                <svg class="w-5 h-5 mx-auto" 
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42z" fill="currentColor"></path></svg>
              </div>
            </Transition>
            <!-- Next -->
            <Transition name="slide-fade" >
              <div v-if="table.pagination.page < table.pagination.totalPages " class="vcb-pagination-page p-1" @click="next()" >
                <svg class="w-5 h-5 mx-auto" 
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z" fill="currentColor"></path></svg>
              </div>
            </Transition>
            <!-- Last -->
            <div v-if="table.pagination.page < table.pagination.totalPages "  class="vcb-pagination-page p-1" @click="last()" >
              <svg class="w-5 h-5 mx-auto" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M5.7 6.71a.996.996 0 0 0 0 1.41L9.58 12L5.7 15.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L7.12 6.71c-.39-.39-1.03-.39-1.42 0z" fill="currentColor"></path><path d="M12.29 6.71a.996.996 0 0 0 0 1.41L16.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L13.7 6.7c-.38-.38-1.02-.38-1.41.01z" fill="currentColor"></path></svg>
            </div>
            <!-- Go to -->
            <!-- Total per page -->
          </div>
        </Transition>
      </div>
    </div>
    <!-- Form create account -->
    <create-form v-bind:model="model" v-bind:show="createModal.show" :onClose="closeCreateModal"/>
    <!-- Filter panel of crud -->
    <Transition name="slide-fade" >
      <div v-if="filter" class="vcb-filters-panel">
        <svg @click="toggleFilter()" class="absolute bg-white rounded-full shadow p-2 right-2 top-2 w-10 h-10 border border-gray-200 cursor-pointer hover:text-green-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2zM6 6v3.59l8 8V26h4v-8.41l8-8V6z" fill="currentColor"></path></svg>
        <div class="filter-title font-moul" >សូមជ្រើសរើសលក្ខណ សម្រង់ទិន្នន័យ៖</div>
        <div class="filter-actions" >
          <div class="filter-action" >
            <!-- Positions -->
            <n-select v-model:value="selectedDocumentTypes" multiple filterable @update:value="filterRecords(false)" placeholder="សូមជ្រើសរើស ប្រភេទឯកសារ" :options="optionDocumentTypes" />
          </div>
          <div class="filter-action" >
            <!-- Organizations -->
            <n-select v-model:value="selectedDocumentOrganizations" multiple filterable @update:value="filterRecords(false)" placeholder="សូមជ្រើសើស ស្ថាប័ន / អង្គភាព" :options="optionDocumentOrganizations" />
          </div>
          <div class="filter-action" >
            <!-- Organizations -->
            <n-select v-model:value="selectedDocumentSignatures" multiple filterable @update:value="filterRecords(false)" placeholder="សូមជ្រើសើស អ្នកចុះហត្ថលេខា" :options="optionDocumentSignatures" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
import { reactive ,ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import ocmLogoUrl from './../../../assets/logo.svg'
/**
 * CRUD component form
 */
import CreateForm from './../widgets/create.vue'
import ThumbnailActionsForm from './actions/thumbnail-action.vue'
export default {
  name: "Regulator" ,
  components: {
    QrcodeVue ,
    Vue3Barcode,
    CreateForm ,
    ThumbnailActionsForm
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()

    /**
     * Variables
     */    
    const model = reactive( {
      name: "regulator" ,
      title: "លិខិតគតិយុត្ត"
    })
    const table = reactive( {
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
        setTimeout( function(){
          table.pagination.page = 1
          getRecords()
        } , 500 )
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
        page: table.pagination.page ,
        signatures: selectedDocumentSignatures.value ,
        types: selectedDocumentTypes.value ,
        organizations: selectedDocumentOrganizations.value
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        
        var paginationNumberList = 5
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
    function first(){
      goTo( table.pagination.totalPages > 0 ? 1 : 0 )
    }
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function last(){
      goTo( table.pagination.totalPages > 0 ? table.pagination.totalPages : 0 )
    }
    function goTo(page){
      table.pagination.page = page >= table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
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

    function closeCreateModal( actionStatus ){
      createModal.show = false
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }

    function closeActions( actionStatus ){
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }

    const filter = ref(false)
    function toggleFilter(){
      filter.value = !filter.value
    }

    /**
     * Mark the matched text with in search box
     */
     function applyTagMark(str){
      // Split the string by whitespace
      if( table.search.trim() != "" ){
        var arrStrSearch = table.search.split(/(\s+)/).filter( e => e.trim().length > 0).map( e => e.replaceAll(" ","") )
        for( var i in arrStrSearch ){
          if( str.includes( arrStrSearch[i] ) ) str = str.replaceAll( arrStrSearch[i] , '<mark>' + arrStrSearch[i] + '</mark>' ) 
        }
      }
      return str
    }

    /**
     * Load pivot data of this model
     */
    const selectedDocumentTypes = ref([])
    const optionDocumentTypes = computed(( )=>{
      return store.getters['regulatorType/getRecords'].map( (type) => { return { label : type.name , value : type.id } } )
    })
    function getDocumentTypes(){
      store.dispatch('regulatorType/compact').then(res=>{
        store.commit('regulatorType/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានប្រភេទឯកសារ' ,
          description: 'មានបញ្ហាក្នុងពេលអានប្រភេទឯកសារ។'
        })
        console.log( err )
      })
    }
    /**
     * Load pivot data of this model
     */
    const selectedDocumentOrganizations = ref([])
    const optionDocumentOrganizations = computed(( )=>{
      return store.getters['regulatorOrganization/getRecords'].map( (type) => { return { label : type.name , value : type.id } } )
    })
    function getDocumentOrganizations(){
      store.dispatch('regulatorOrganization/compact').then(res=>{
        store.commit('regulatorOrganization/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានអង្គភាពនៃឯកសាររួចរាល់' ,
          description: 'មានបញ្ហាក្នុងពេលអានអង្គភាពរបស់ឯកសារ។'
        })
        console.log( err )
      })
    }
    /**
     * Load pivot data of this model
     */
    const selectedDocumentSignatures = ref([])
    const optionDocumentSignatures = computed(( )=>{
      return store.getters['regulatorSignature/getRecords'].map( (type) => { return { label : type.name , value : type.id } } )
    })
    function getDocumentSignatures(){
      store.dispatch('regulatorSignature/compact').then(res=>{
        store.commit('regulatorSignature/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានហត្ថលេខានៃឯកសាររួចរាល់' ,
          description: 'មានបញ្ហាក្នុងពេលអានហត្ថលេខារបស់ឯកសារ។'
        })
        console.log( err )
      })
    }

    /**
     * Initial the data
     */
    getRecords()
    getDocumentTypes()
    getDocumentOrganizations()
    getDocumentSignatures()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      ocmLogoUrl ,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      first ,
      previous ,
      last ,
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
      closeActions ,
      /**
       * Functions
       */
      toggleFilter ,
      filterRecords ,
      filter ,
      /**
      * Filters
      */
      optionDocumentTypes ,
      selectedDocumentTypes ,
      optionDocumentSignatures ,
      selectedDocumentSignatures ,
      optionDocumentOrganizations ,
      selectedDocumentOrganizations  ,
      applyTagMark ,
      getDocumentTypes ,
      getDocumentOrganizations ,
      getDocumentSignatures
    }
  }
}

</script>
<style type="text/css" scoped >
.vcb-thumbnail {
  @apply flex flex-wrap justify-center;
}
.vcb-thumbnail .item {
  @apply xl:w-1/4 lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 p-2 ;
}
.vcb-thumbnail .item .content {
  @apply border rounded-lg p-4 relative hover:shadow duration-500 hover:scale-105 transform-gpu bg-white hover:bg-yellow-100;
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