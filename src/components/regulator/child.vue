<template>
  <div>
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <Icon size="27" class="text-red-600 mr-2" >
          <n-icon>
            <DocumentPdf24Regular />
          </n-icon>
        </Icon>
        <div class="leading-8 font-bold" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2"></div>
        <div class="w-2/5 relative" >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <Icon size="27" class="absolute right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" >
            <n-icon>
              <Search20Regular />
            </n-icon>
          </Icon>
          <!-- <Icon size="27" class="absolute -left-10 top-2 text-gray-500 hover:text-blue-700 cursor-pointer" @click="filterPanel=!filterPanel">
            <n-icon>
              <Filter />
            </n-icon>
          </Icon> -->
        </div>
        
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative flex">
      <table class="vcb-table" >
        <tr class="vcb-table-headers" >
          <th class="vcb-table-header" >ល.រ</th>
          <th class="vcb-table-header">កម្មវត្ថុ</th>
          <th class="vcb-table-header">លេខ</th>
          <th class="vcb-table-header w-32">ប្រភេទ</th>
          <th class="vcb-table-header w-24">ថ្ងៃខែឆ្នាំ</th>
          <th class="vcb-table-header text-right w-20" >ប្រតិបត្តិការ</th>
        </tr>
        <tr v-for="(record, index) in table.records.matched" :key='index' class="vcb-table-row" >
          <td class="vcb-table-cell font-bold" >{{ index + 1 }}</td>
          <td class="vcb-table-cell" v-html="applyTagMark(record.objective)" ></td>
          <td  class="vcb-table-cell" >{{ record.fid }}</td>
          <td  class="vcb-table-cell" >{{ record.type.name }}</td>
          <td class="vcb-table-cell" >{{ record.year.slice(0,10) }}</td>
          <td class="vcb-table-actions-panel text-center" >
            <!-- <n-icon size="20" class="cursor-pointer mx-1 pt-2 " @click="$router.push('/regulator/child/'+record.id)" >
              <ParentChild />
            </n-icon> -->
            <n-icon size="22" :class="'cursor-pointer mx-auto pt-2' + ( record.parentDocument != undefined && record.parentDocument != null && record.parentDocument.parent_id == $route.params.id ? ' text-blue-500' : ' text-gray-500' ) " @click="childDocument(record.id)" title="កែប្រែព័ត៌មាន" >
              <PedestrianChild />
            </n-icon>
          </td>
        </tr>
      </table>
      <!-- Loading -->
      <div v-if="table.loading" class="table-loading absolute left-0 top-0 right-0 bottom-0 bg-white bg-opacity-75 ">
        <div class="spinner mt-24">
          <Icon size="40" class="animate-spin  text-blue-500" >
           <IosRefresh />
          </Icon><br/><br/>
          កំពុងអាន...
        </div>
        <div class="absolute top-3 right-3 " @click="$router.push('/regulator/child')" >
          <Icon size="40" class="text-red-600" >
           <CloseCircleOutline />
          </Icon>
        </div>
      </div>
    </div>
    <!-- Pagination of crud -->
    <div class="vcb-table-pagination">
      <!-- First -->
      <!-- Previous -->
      <div class="vcb-pagination-page" v-html='"<"' @click="previous()" ></div>
      <!-- Pages (7) -->
      <div v-for="(page, index) in table.pagination.buttons" :key="index" class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="table.pagination.page == page ? false : goTo(page) " >
        <div :class="'page w-8 h-8 text-center align-middle leading-8 cursor-pointer' + (table.pagination.page == page ? ' text-blue-500' : '' ) ">{{ page }}</div>
      </div>
      <!-- Next -->
      <div class="vcb-pagination-page" v-html='">"' @click="next()" ></div>
      <!-- Last -->
      <!-- Go to -->
      <!-- Total per page -->
    </div>
    <!-- Filter panel of crud -->
    <div v-if="filterPanel" class="vcb-filter-panel h-64">
      <div class="filter-container relative w-full flex">
        <Icon size="40" class="absolute right-0 top-0 cursor-pointer text-red-700" @click="filterPanel=!filterPanel" >
          <CloseCircleOutline />
        </Icon>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { Switcher, Filter, DataStructured , ParentChild, PedestrianChild} from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular, DocumentPdf24Regular } from '@vicons/fluent'
export default {
  name: "Regulator" ,
  components: {
    ParentChild, 
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    DataStructured,
    Icon,
    IosCheckmarkCircleOutline,
    IosRefresh ,
    CloseCircleOutline ,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    DocumentPdf24Regular ,
    PedestrianChild,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular ,
    Filter
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const route = useRoute()
    const router = useRouter()
    /**
     * Variables
     */    
    const model = reactive( {
      name: "regulator" ,
      title: "លិខិតបទដ្ឋានគតិយុត្ត - កម្រិតកូន"
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
    const filterPanel = ref(false)

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
      console.log( route.params.id )
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/childList',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page ,
        parent_id: route.params.id
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination

        var paginationNumberList = 5
        if( ( table.pagination.page - ( paginationNumberList - 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > 9 ? 9 : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page  - ( paginationNumberList - 1 )
          table.pagination.end = table.pagination.page + 4 >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 4
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
    const paginationButtons = computed(()=>{
      /**
       * 9 Buttons is recommended
       */
      return table.pagination.totalPages ? table.pagination.totalPages : 0
    })

    /**
     * Update the following function to add child to parent document
     */
    function childDocument(childId){
      console.log( "លេខឯកសារមេ ៖ " + route.params.id + " , លេខឯកសារកូន ៖ " + childId )
      store.dispatch( 'regulator/childDocument',{
        document_id : childId ,
        parent_id : route.params.id
      }).then( res => {
        if( res.data.ok ){
          notify.success({
            title: 'ដាក់បញ្ចូលកូនឯកសារ' ,
            description: res.data.message ,
            duration: 3000
          })
          getRecords()
        }else{
          notify.error({
            title: 'ដាក់បញ្ចូលកូនឯកសារ' ,
            description: 'មានបញ្ហាបញ្ចូលឯកសារកូន' ,
            duration: 3000
          })
        }
      }).catch( err => {
        message.error( err )
      })
    }

    /**
     * Load pivot data of this model
     */
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
     * Initial the data
     */
    getRecords()
    getDocumentTypes()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
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
      paginationButtons ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Functions
       */
      childDocument ,
      applyTagMark
    }
  }
}

</script>

<style scoped>
  .vcb-table-panel {
    @apply absolute right-4 left-4 mt-4 mb-16 top-12 bottom-0 overflow-auto;
  }
  .vcb-table {
    @apply w-full ;
  }
  .vcb-table tr.vcb-table-row {
    @apply border-b border-gray-100 text-left ;
  }
  .vcb-table tr.vcb-table-row td {
    @apply p-2;
  }
  .vcb-table-actions-panel {
    @apply flex flex-row-reverse ;
  }
  .vcb-table-actions-panel .vcb-action-button {
    @apply  rounded-full border border-gray-200 w-8 h-8 mx-2 text-center cursor-pointer hover:border-blue-500 hover:text-blue-500  duration-300;
  }
  .vcb-table-headers {
    @apply border-b border-gray-200;
  }
  .vcb-table-headers .vcb-table-header {
    @apply px-2 py-4 text-left ;
  }
  .vcb-table-pagination {
    @apply flex flex-row absolute bg-white right-0 bottom-0 border border-l p-3 ;
  }
  .vcb-pagination-page {
    @apply  rounded-full border border-gray-200 mx-1 leading-7 w-8 h-8 font-bold cursor-pointer hover:text-blue-500 hover:border-blue-500 duration-300;
  }
  .vcb-filter-panel {
    @apply flex flex-row fixed bg-white right-0 bottom-0 left-0 border border-l p-3 ;
  }
  .vcb-table-cell {
    @apply leading-6 align-text-top;
  }
</style>