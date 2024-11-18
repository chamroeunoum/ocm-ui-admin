<template>
  <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick"  :on-after-enter="initial" transform-origin="center" class="relative" >
    <div class="w-11/12 font-pvh min-h-screen text-xl bg-white" >
      <!-- Form edit account -->
      <div class="w-full relative ">
        <div class="relative book-title text-left text-lg p-4 w-full font-moul leading-5 border-b border-gray-200" >សូមជ្រើសរើសឯកសារយោងសម្រាប់ ៖ {{ book.title }}
          <div class="relative m-4 mt-6" >
            <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-white pl-4 pr- h-10 my-1 w-full rounded-full border border-gray-200 focus:border-blue-600 hover:border-blue-600 duration-300" placeholder="ស្វែងរក" />
            <svg class="absolute right-2 top-3 w-6 h-6 text-gray-600  cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
          </div>
        </div>
        <div class="book flex flex-initial" >
          <div class="relative flex-grow px-4 py-1 content-matras flex flex-wrap " >
            <div class="book list-regulators w-full mt-4 mb-16" >
              <Transition name="fade" >
                <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-thumbnail mb-12" >
                  <div v-for="(record, index) in table.records.matched" :key='index' class="item" >
                    <div class="content cursor-pointer" >
                      <!-- <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
                      <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ocmLogoUrl+');' " ></div> -->
                      <div class="flex flex-wrap " >
                        <div class="w-full py-2 mx-auto" >
                          <div class="font-moul text-center" >{{ ( Array.isArray( record.types ) && record.types.length > 0 ? prefixOfTypes[ record.types[0].id ] + ' / ' : '' ) + $toKhmer( record.fid ) }}</div>
                          <div class="text-center" >{{ $toKhmer( record.year.slice(0,10) ) }}</div>
                        </div>
                        <div class="w-full py-2" >
                          <div class="w-full pb-1 mb-1 leading-6 break-all text-justify" v-html="applyTagMark( $toKhmer( record.objective ))" ></div>
                        </div>
                        <div class="w-full flex " >
                          <div v-if="Array.isArray( record.signatures ) && record.signatures.length > 0 " class="w-1/2 text-left text-xs my-1 text-gray-500 mr-2 leading-5 tracking-wider" >{{ record.signatures.map( o => o.name ).join( ' , ' ) }}</div>
                          <div v-if="Array.isArray( record.organizations ) && record.organizations.length > 0 " class="w-1/2 text-right text-xs my-1 text-gray-500 leading-5 tracking-wide" >{{ record.organizations.map( o => o.name ).join( ' , ' ) }}</div>
                        </div>
                      </div>
                      <div class="absolute top-0 left-0 p-1 border-l-0 border-t-0 border border-gray-200 font-moul rounded-br-lg shadow-sm" >{{ $toKhmer( ( table.pagination.perPage * ( table.pagination.page - 1 ) ) + index + 1 ) }}</div>
                      
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <div class="absolute top-0 right-8 p-1 border-l-0 border-t-0 " >
                            <svg 
                              @click="addAsReference(record)"
                              :class="'w-5 h-5 ' + ( record.books!=null&&record.books!=undefined&&Array.isArray(record.books)&&record.books.length>0 ? ' text-green-600 ' : ' text-gray-500 ' ) " 
                              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" fill="currentColor"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z" fill="currentColor"></path></svg>

                          </div>
                        </template>
                        <div class="text-center leading-7" v-html=" 'បញ្ចូល ' +  ( Array.isArray( record.books ) && record.books.length > 0 ? prefixOfTypes[ record.types[0].id ] + ' / ' : '' ) + $toKhmer( record.fid ) + ' ជាឯកសារយោងនៃ ' + ( book != null && book != undefined ? '<br/>' + book.title : '' ) " ></div>
                      </n-tooltip>
                      
                      <div 
                        @click="pdfPreview(record)"
                        :class="'absolute top-0 right-0 p-1 border-l-0 border-t-0 ' + ( record.pdf == false ? ' text-gray-500 ' : ' text-green-500 ' ) " >
                        <svg class="w-5 h-5" 
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path></svg>
                      </div>

                    </div>
                  </div>
                </div>
              </Transition>
              <!-- Pagination of crud -->
              <Transition name="slide-fade" >
                <!-- Pagination of crud -->
                <div class="fixed left-0 right-0 bottom-1 flex flex-wrap " >
                  <!-- This pagination is for the media side with from Medium up -->
                  <div v-if="table.pagination.totalPages>1"  class="vcb-table-pagination">
                    <!-- Information -->
                    <div class="vcb-table-pagination-info font-pvh text-blue-600 leading-6 p-0 mx-2" >{{ table.pagination.totalRecords > 0 ? table.pagination.totalRecords + " មាត្រា" : "" }}</div>
                    <div class="vcb-table-pagination-info font-pvh text-blue-600 leading-6 p-0 mx-2" >{{ table.pagination.totalPages > 0 ? table.pagination.totalPages + " ទំព័រ" : "" }}</div>
                    <!-- First -->
                    <!-- Pages (7) -->
                    <div v-for="(page, index) in table.pagination.buttons" :key="index" :class=" (table.pagination.page == page ? ' vcb-pagination-page-active ' : ' vcb-pagination-page ' )" @click="table.pagination.page == page ? false : goTo(page) " >{{ page }}</div>
                    <!-- Previous -->
                    <Transition name="slide-fade" >
                      <div v-if="table.pagination.page > 1 " class="vcb-pagination-page " v-html='"<"' @click="previous()" ></div>
                    </Transition>
                    <!-- Next -->
                    <Transition name="slide-fade" >
                      <div v-if="table.pagination.page < table.pagination.totalPages " class="vcb-pagination-page " v-html='">"' @click="next()" ></div>
                    </Transition>
                    <!-- Last -->
                    <!-- Go to -->
                    <!-- Total per page -->
                  </div>
                </div>
              </Transition>
            </div>
            <!-- Loading -->
            <Transition name="slide-fade" >
              <div v-if="table.loading" class="table-loading absolute flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-90 z-50">
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
          </div>
        </div>
      </div>
      <!-- PDF Dialog -->
      <Transition name="slide-fade" >
        <div v-if="pdf.viewer&&pdf.url!=''" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white z-40">
          <vue-pdf-embed :source="pdf.url" class="w-full h-screen overflow-y-scroll" />
          <div class="absolute top-3 right-3 cursor-pointer " @click="closePdf" >
            <svg class="w-10 h-10 p-1b border border-gray-200 text-red-500 shadow-sm mr-3 rounded-full bg-gray-100 hover:bg-gray-300 duration-300 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
          </div>
        </div>
      </Transition>
    </div>
  </n-modal>
</template>
<script>
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import QrcodeVue from 'qrcode.vue'
import { getKhmer } from './../../../../plugins/kh/number.js'
import VuePdfEmbed from 'vue-pdf-embed'


export default {
  components: {
    QrcodeVue ,
    VuePdfEmbed
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
      required: true ,
      default: () => {
        return reactive({
          id: 0 ,
          
        })
      }
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    }
  },
  setup(props){
    var store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const book = ref(null)

    book.value = props.record

    /**
     * Functions
     */
    function clearRecord( actionStatus ){
      props.onClose( actionStatus )
    }
  
    function maskOrEscClick(){
      props.onClose( 1 )
    }

    /**
     * Matra Retreiving
     */
    const table = reactive( {
      loading: false , 
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          description: '' ,
          title: ''
        },
        format: {
          id: 0 ,
          description: '' ,
          title: ''
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

    const prefixOfTypes = ref([
      'មិនមាន' ,
      'នស/រកម' ,
      'នស/រកត' ,
      'អនក្រ/បក' ,
      'ស.ជ.ណ' ,
      'សសរ' ,
      'សរ,សរណន' ,
      'ប្រ.ក' ,
      'គនបជ' ,
      'ផយស' ,
      'បប' ,
      'ផសក្រ' ,
      'អនក្រ.តត' ,
      'នស/រកត'
    ])
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

    function getRecords(){
      /**
       * Clear time interval after calling
       */
      table.loading = true
      table.records.all = table.records.matched = []
      store.dispatch('law/getRegulators',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page ,
        signatures: [] ,
        organizations: [] ,
        types: []
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
    function first(){
      goTo( table.pagination.page > 0 ? 1 : 0)
    }
    function last(){
      goTo( table.pagination.totalPages > 0 ? table.pagination.totalPages : 1 )
    }
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

    function addAsReference(record){
      store.dispatch( 'law/toggleReferences' ,{
        book_id : book.value.id ,
        regulator_id : record.id 
      }).then( res => {
        if( res.data.ok ){
          notify.success({
            title: 'ភ្ចាប់ឯកសារយោង' ,
            content: res.data.message
          })
          getRecords()
        }else{
          notify.warning({
            title: 'ភ្ចាប់ឯកសារយោង' ,
            content: res.data.message
          })
        }
      }).catch( err => {
        console.log( err )
      })
    }

    const pdf = reactive({
      viewer: false ,
      filename: '' ,
      url: ''
    })
    function pdfPreview(record){
      if( record != false && record.pdf ){
        store.dispatch('regulator/pdf',{id:record.id})
          .then( res => {
            pdf.filename = res.data.filename
            pdf.url = res.data.pdf
            pdf.viewer = true
            // notify.success({
            //   title: "បង្ហាញឯកសារយោង" ,
            //   content: res.data.message ,
            //   duration: 3000
            // })
          }).catch( err => {
            notify.error({
              title: "បង្ហាញឯកសារយោង" ,
              content: err.response != undefined && err.response.data != undefined ? err.response.data.message : "មានបញ្ហាអានឯកសារយោង។" ,
              duration: 3000
            })
          })
      }else{
        notify.info({
          title: 'ឯកសារយោង' ,
          description: "មិនមានឯកសារយោងសម្រាប់បង្ហាញ" ,
          duration: 3000
        })  
      }
    }
    function closePdf(){
      pdf.url = ""
      pdf.viewer = false
    }

    /**
     * Initial function of the modal 
     */
    function initial(){
      getRecords()
    }

    return {
      /**
       * Variables
       */
      book ,
      table ,
      prefixOfTypes ,
      /**
       * Functions
       */
      initial ,
      clearRecord ,
      maskOrEscClick ,
      /**
       * Pagination
       */
      filterRecords ,
      goTo ,
      first ,
      previous ,
      last ,
      next ,
      updatePerpage  ,
      applyTagMark ,
      addAsReference ,
      pdf ,
      pdfPreview ,
      closePdf
    }
  }
}
</script>
<style type="text/css" scoped >
  .vcb-table-pagination {
    @apply  mx-auto p-3 bg-white shadow-sm border border-gray-200 ;
  }
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
</style>