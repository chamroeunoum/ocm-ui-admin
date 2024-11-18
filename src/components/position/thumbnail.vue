<template>
  <div>
    <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>
        <div class="font-moul ml-2 leading-9" >{{ positionTitle }}</div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2">
          <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10 2.5a.5.5 0 0 0-1 0V9H2.5a.5.5 0 0 0 0 1H9v6.5a.5.5 0 0 0 1 0V10h6.5a.5.5 0 0 0 0-1H10V2.5z" fill="currentColor"></path></g></svg>
            </template>
            បន្ថែម
          </n-button>
        </div>
        <div class="w-1/5 relative" >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <svg class="absolute w-6 right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
        </div>
        <div class="mt-1 mr-2">
          <div v-if="rootPosition!=null&&rootPosition.pid!=null&&rootPosition.parent_node!=null" class=" p-2 border border-gray-300 rounded-sm cursor-pointer hover:border-blue-500 duration-300" @click="$router.push('/position/'+rootPosition.pid+'/sub')" >{{ rootPosition.parent_node.name }}</div>
        </div>
      </div>
      <!-- Filter panel of crud -->
      <div class="filters-bar"></div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative ">
      <Transition name="slide-fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-thumbnail mb-12" >
          <div v-for="(record, index) in table.records.matched" :key='index' class="item" >
            <div class="content" >
              <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
              <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ ocmLogoUrl +');' " ></div>
              <div class="flex flex-wrap " >
                <div class="w-full py-2" >
                  <div class="w-full text-center leading-6 tracking-wider font-moul text-yellow-600" >{{ record.name }}</div>
                </div>
                <div v-if="record.leader!=undefined&&Array.isArray(record.leader)&&record.leader.length>0" class="w-full pb-2 flex flex-wrap justify-center" >
                  <div v-if="record.leader[0].countesies!=undefined && Array.isArray( record.leader[0].countesies ) && record.leader[0].countesies.length > 0" class="w-full text-center font-moul" >{{  record.leader[0].countesies.map( o => o.name ).join( ' , ' )  }}</div>
                  <div v-if="record.leader[0].positions!=undefined && Array.isArray( record.leader[0].positions ) && record.leader[0].positions.length > 0 " class="w-full font-moul text-center text-xs my-1 leading-5 tracking-wider" >{{ record.leader[0].positions.map( o => o.name ).join( ' , ' ) }}</div>
                  <div class="w-full text-center leading-5 tracking-wider font-moul " >{{ record.leader[0].lastname + " " + record.leader[0].firstname }}</div>
                </div>
                <div class="w-full pb-2 flex mt-4 flex-wrap" >
                  <n-tooltip v-if="record.totalChilds>0" trigger="hover">
                    <template #trigger>
                      <div class="cursor-pointer mx-auto text-center font-moul leading-6 text-green-500 " @click="$router.push('/position/'+record.id+'/sub')" >
                        អង្គភាព<br/>{{ $toKhmer( record.totalChilds ) }}
                      </div>
                    </template>
                    <div class="leading-6" v-html=" 'ចំនួនអង្គភាពក្រោមបង្គាប់' + ( record.childNodes != null && record.childNodes != undefined ? ( ' ៖ <br/>' + record.childNodes.map( ( o ) => '+ ' + o.name ).join('<br/>') ) : '' ) "></div>
                  </n-tooltip>
                  <n-tooltip v-if="record.totalLeaders>0" trigger="hover">
                    <template #trigger>
                      <div class="cursor-pointer mx-auto text-center font-moul leading-6 text-blue-500 " @click="$router.push('/people/thumbnail/'+ ( record.leader.map( (l) => l.id ).join(',') ) )" >ថ្នាក់ដឹកនាំ<br/>{{ $toKhmer( record.totalLeaders) }}</div>
                    </template>
                    <div class="leading-6" v-html=" 'ចំនួនថ្នាក់ដឹកនាំសរុបក្នុងអង្គភាព' + ( record.leader != null && record.leader != undefined ? ( ' ៖ <br/>' + record.leader.map( ( o ) => '+ ' + o.lastname + ' ' + o.firstname ).join('<br/>') ) : '' ) "></div>
                  </n-tooltip>
                  <n-tooltip v-if="record.totalStaffs>0" trigger="hover">
                    <template #trigger>
                      <div class="cursor-pointer mx-auto text-center font-moul leading-6 text-yellow-700 " @click="$router.push('/people/thumbnail/'+ ( record.staffs.map( (l) => l.id ).join(',') ) )" >មន្ត្រី<br/>{{ $toKhmer( record.totalStaffs ) }}</div>
                    </template>
                    <div class="leading-6" v-html=" 'ចំនួនមន្ត្រីសរុបក្នុងអង្គភាព' + ( record.staffs != null && record.staffs != undefined ? ( ' ៖ <br/>' + record.staffs.map( ( o ) => '+ ' + o.lastname + ' ' + o.firstname ).join('<br/>') ) : '' ) "></div>
                  </n-tooltip>
                  <n-tooltip v-if="record.totalStaffAllLevel>0" trigger="hover">
                    <template #trigger>
                      <div class="cursor-pointer mx-auto text-center font-moul leading-6 text-pink-500 " @click="$router.push('/people/thumbnail/'+ ( record.staffs.map( (l) => l.id ).join(',') ) )" >មន្ត្រី<br/>{{ $toKhmer( record.totalStaffs ) }}</div>
                    </template>
                    ចំនួនមន្ត្រីសរុបក្នុងអង្គភាព
                  </n-tooltip>
                  <n-tooltip v-if="record.parentNode!=undefined && record.parentNode != null " trigger="hover">
                    <template #trigger>
                      <svg @click="showEditModal(record)" class="cursor-pointer absolute left-1 top-1 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>
                    </template>
                    {{ record.parentNode.name }}
                  </n-tooltip>
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <svg @click="( parseInt( record.active ) > 0 ? deactivateRecord(record.id) : activateRecord(record.id)  )" :class="'cursor-pointer absolute right-1 top-1 w-5' + ( parseInt( record.active ) > 0 ? ' text-green-500 ' : ' text-gray-300 '  ) " 
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" fill="currentColor"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z" fill="currentColor"></path></svg>
                    </template>
                    {{ ( parseInt( record.active ) > 0 ? 'បិទស្ថាប័ននេះ' : 'បើកដំណើរការស្ថាប័នវិញ'  ) }}
                  </n-tooltip>
                </div>
              </div>
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
        <!-- This pagination is for the media side with from Medium up -->
        <div class="vcb-table-pagination bg-blue-300 mx-auto">
          <!-- Information -->
          <div class="vcb-table-pagination-info" >{{ table.pagination.totalRecords > 0 ? $toKhmer( table.pagination.totalRecords ) + " អង្គភាព" : "" }}</div>
          <div class="vcb-table-pagination-info" >{{ table.pagination.totalPages > 0 ? " ចែកជា " + $toKhmer ( table.pagination.totalPages ) + " ទំព័រ" : "" }}</div>
          <!-- First -->
          <!-- Pages (7) -->
          <div v-for="(page, index) in table.pagination.buttons" :key="index" :class=" (table.pagination.page == page ? ' vcb-pagination-page-active ' : ' vcb-pagination-page ' )" @click="table.pagination.page == page ? false : goTo(page) " >{{ $toKhmer( page ) }}</div>
          <!-- Previous -->          
          <div v-if="table.pagination.page > 1 " class="vcb-pagination-page " v-html='"<"' @click="previous()" ></div>
          <n-tooltip v-if="table.pagination.page <= 1 " trigger="hover">
            <template #trigger>
              <div class="vcb-pagination-page border-gray-200 text-gray-200 " v-html='"<"' ></div>
            </template>
           ទំព័រដើម
          </n-tooltip>
          <!-- Next -->
          <div v-if="table.pagination.page < table.pagination.totalPages " class="vcb-pagination-page " v-html='">"' @click="next()" ></div>
          <n-tooltip v-if="table.pagination.page >= table.pagination.totalPages " trigger="hover">
            <template #trigger>
              <div class="vcb-pagination-page border-gray-200 text-gray-200 " v-html='">"' ></div>
            </template>
            ទំព័រចុងក្រោយ
          </n-tooltip>
          <!-- Last -->
          <!-- Go to -->
          <!-- Total per page -->
        </div>
      </div>
    </div>
    <!-- Create form -->
    <create-form v-bind:model="model" v-bind:show="createModal.show" :onClose="closeCreateModal"/>
    <!-- Update form -->
    <update-form v-bind:model="model" v-bind:show="editModal.show" v-bind:record="editRecord" :onClose="closeEditModal"/>
  </div>
</template>
<script>
import { reactive ,ref , computed , watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat";
import Frame4Corner from './../../components/widgets/frame/corner4.vue'
import { getKhmer } from '../../plugins/kh/number'
import ocmLogoUrl from './../../assets/logo.svg'
/**
 * CRUD component form
 */
import CreateForm from './widgets/create.vue'
import UpdateForm from './widgets/update.vue'
export default {
  name: "Position" ,
  components: {
    QrcodeVue ,
    Vue3Barcode ,
    Frame4Corner ,
    CreateForm ,
    UpdateForm
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const router = useRouter()
    const route = useRoute()
    const notify = useNotification()
    const currentPositionId = ref(
      route.params.rootId != undefined && parseInt( route.params.rootId ) > 0
        ? parseInt( route.params.rootId )
        : null
    )
    /**
     * Variables
     */    
    var model = reactive( {
      name: "position" ,
      title: "តួនាទី"
    })
    const rootPosition = ref(null)
    const positionTitle = computed( () => {
      return rootPosition.value == null ? model.title : "តួនាទី ៖ " + rootPosition.value.name
    })

    watch( () => route.params.rootId, (newValue, oldValue) => {
      setCurrentPositionId( newValue )
    })

    function setCurrentPositionId( id ){
      currentPositionId.value = id
      getRecords()
    }
    
    var table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          name: '' ,
          desp : ''
        },
        format: {
          name: '' ,
          deap: ''
        }
      } ,
      pagination: {
        perPage: 100 ,
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
        page: table.pagination.page ,
        id: parseInt( currentPositionId.value ) > 0 ? parseInt( currentPositionId.value ) : null
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
        rootPosition.value = res.data.root
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

    function closeCreateModal( actionStatus ){
      createModal.show = false
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }

    /**
     * Edit modal handling
     */
    const editRecord = reactive({
      id: 0 ,
      name : "" ,
      desp : '' ,
      pid: null
    })
    const editModal = reactive({show:false})
    function showEditModal(record){
      editRecord.id = record.id
      editRecord.name = record.name
      editRecord.desp = record.desp
      editRecord.pid = record.pid
      editModal.show = true
    }

    function closeEditModal( actionStatus ){
      editModal.show = false
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }

    function getPositions(){
      store.dispatch('position/compact',{
        page: 1 ,
        perPage: 1000 ,
        search: '' ,
        id: 163
      }).then(res=>{
        store.commit('position/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានអង្គភាព' ,
          description: 'មានបញ្ហាពេលអានអានអង្គភាព។'
        })
        console.log( err )
      })
    }

    function deactivateRecord(id){
      store.dispatch('position/deactivate',{id:id,active:0})
      getRecords()
    }
    function activateRecord(id){
      store.dispatch('position/activate',{id:id,active:1})
      getRecords()
    }
    /**
     * Initial the data
     */
    getPositions()
    getRecords()


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
       * Functions
       */
      rootPosition ,
      currentPositionId ,
      positionTitle ,
      setCurrentPositionId ,
      /**
       * Creating
       */
      createModal ,
      showCreateModal ,
      closeCreateModal ,
      /**
       * Editing
       */
      editRecord ,
      editModal ,
      showEditModal ,
      closeEditModal ,
      /**
       * Activate and Deactivate
       */
      deactivateRecord ,
      activateRecord ,
      ocmLogoUrl
    }
  }
}

</script>

<style type="text/css" scoped >
.vcb-thumbnail {
  @apply flex flex-wrap justify-center;
}
.vcb-thumbnail .item {
  @apply xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 p-2 ;
}
.vcb-thumbnail .item .content {
  @apply border rounded-lg hover:shadow duration-500 p-4 relative hover:scale-105 transform-gpu bg-white hover:bg-yellow-100;
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