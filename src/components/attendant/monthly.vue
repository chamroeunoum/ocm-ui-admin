<template>
  <div class=" mb-24" >
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-12 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>
        <div class="font-moul ml-2 h-12 leading-10" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <!-- <div class="mt-1 ml-2">
          <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <n-icon>
                <Add20Regular />
              </n-icon>
            </template>
            បន្ថែម
          </n-button>
        </div> -->
        <div class="w-1/5 relative hidden" >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <svg class="absolute right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
        </div>
        <div class="mt-1 mr-2">
          <n-date-picker v-model:value="attendantDate" type="month" @update:value="filterRecords(false)"/>
        </div>
        <div class="mt-1 mr-2">
          <n-button type="default" @click="$router.push('/attendant')" >
            បញ្ជីវត្តមាន
          </n-button>
        </div>
      </div>
      <!-- Filter panel of crud -->
      <div class="filters-bar"></div>
    </div>
    <!-- Table of crud -->
    <div class="mt-4 relative">
      <Transition name="fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="w-full flex flex-wrap justify-between " >
          <div class="w-full flex flex-wrap m-4 py-16 shadow-sm border border-gray-300" >
            <div class="report-title font-moul text-center w-full mt-4 text-xl" >របាយការណ៍វត្តមានប្រចាំខែ</div>
            <div class="report-title font-tacteing text-center w-full h-10 leading-10 my-4" style="font-size: 5rem; " >6</div>
            <div v-if="user!=null" class="report-title font-moul text-left w-1/2 pl-2" >មន្ត្រីឈ្មោះ ៖ &ensp;&ensp;{{ user.lastname }}&ensp;{{ user.firstname }}</div>
            <div v-if="attendantDate!=null" class="report-title font-moul text-right w-1/2 pr-2" >កាលបរិច្ឆែទ ៖ &ensp;&ensp;{{ dateFormat( new Date( attendantDate ) , 'mm - yyyy' ) }}</div>
            <div class="attendant-list w-full my-8 mt-12" >
              <div class="attendant-header flex bg-gray-100 h-14 leading-10 py-2" >
                <div class="attendant-header-row w-40 font-moul" >ថ្ងៃ</div>
                <div class="attendant-header-row flex-grow font-moul" >វេនធ្វើការ</div>
                <div class="attendant-header-row w-60 font-moul" >សរុបរយះពេលបំពេញការងារ</div>
                <div class="attendant-header-row w-60 font-moul" >រយះពេលដែល លើស / ខ្វះ</div>
              </div>
              <div v-for="(attendant, index) in table.records.matched" :key='index' :class="'flex attendant-row py-4w-full ' + ( index % 2 ? ' bg-gray-100 ' : ' bg-white ' ) " >
                <div class="day-number w-40 p-4 font-kantumruy" :style="'color: ' + ( getDayOfWeek(attendant.day_of_week).color.hexa ) + '; '" >
                  <div class="font-bold text-xl">{{ dateFormat( new Date( attendant.date ) , 'dd' ) }}</div>
                  <div class="font-bold text-xl">{{ getDayOfWeek(attendant.day_of_week).name.kh }}</div>
                </div>
                <div class="flex-grow p-4" >
                  <table class="w-full" >
                    <thead>
                      <tr class="" >
                        <td class="font-kantumruy py-1 text-left font-bold">វេន</td>
                        <td class="font-kantumruy py-1 text-left font-bold">ចូល</td>
                        <td class="font-kantumruy py-1 text-left font-bold">ចេញ</td>
                        <td class="font-kantumruy py-1 text-right font-bold">សរុប</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ct , ctIndex) in attendant.calculateTime.checktimes" :key="ctIndex">
                        <td class=" py-1 text-left " >{{ ct.timeslot.title }} {{ ct.timeslot.start +'-'+ct.timeslot.end }}</td>
                        <td class=" py-1 text-left " >{{ ct.checkin }}</td>
                        <td class=" py-1 text-left " >{{ ct.checkout }}</td>
                        <td class=" py-1 text-right font-bold" >{{ ct.workedTime }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class=" w-60 p-4 font-bold text-xl " >{{ attendant.calculateTime.total.workedTime }}</div>
                <div :class="'w-60 p-4 font-bold  text-xl ' + ( ( attendant.calculateTime.total.workedTime - attendant.calculateTime.total.duration ) > 0 ? ' text-green-600 ' : ' text-red-600 ' )" >{{ attendant.calculateTime.total.workedTime - attendant.calculateTime.total.duration }}</div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <div v-if="!Array.isArray( table.records.matched ) || table.records.matched.length <= 0 " class="w-full flex flex-wrap justify-between " >មិនមានព័ត៌មានដែលអ្នកកំពុងស្វែងរកឡើយ។</div>
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
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat";
/**
 * CRUD component form
 */
export default {
  name: "User" ,
  components: {
    QrcodeVue ,
    Vue3Barcode
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const route = useRoute()
    const router = useRouter()
    const notify = useNotification()
    const user = ref(null)
    const attendantDate = ref( null )
    attendantDate.value = route.params.date != '' && route.params.date != undefined
    ? (new Date( route.params.date )).getTime()
    : (new Date()).getTime()

    const daysOfWeek = reactive([
      {
        name: {
          kh: 'អាទិត្យ' ,
          en: 'Sunday' 
        },
        symbol: 'Bravery / Courage' ,
        color: {
          kh: 'ក្រហម' ,
          en: 'red' ,
          hexa: '#D80032' 
        } ,
        number: 0
      },
      {
        name: {
          kh: 'ច័ន្ទ' ,
          en: 'Monday' 
        },
        symbol: 'Equality' ,
        color: {
          kh: 'ទឹកក្រូច' ,
          en: 'orange' ,
          hexa: '#EC8F5E' 
        } ,
        number: 1
      },
      {
        name: {
          kh: 'អង្គារ៍' ,
          en: 'Tuesday' 
        },
        symbol: 'Honesty / Loyalty' ,
        color: {
          kh: 'ស្វាយ' ,
          en: 'Purple' ,
          hexa: '#B15EFF' 
        } ,
        number: 2
      },
      {
        name: {
          kh: 'ពុធ' ,
          en: 'Wednesday' 
        },
        symbol: 'Embodying justice' ,
        color: {
          kh: 'ត្រួយចេក' ,
          en: 'Mustard Green' ,
          hexa: '#79AC78' 
        } ,
        number: 3
      },
      {
        name: {
          kh: 'ព្រហស្បត៍' ,
          en: 'Thursday' 
        },
        symbol: 'Signifying hope' ,
        color: {
          kh: 'បៃតង' ,
          en: 'Green' ,
          hexa: '#004225' 
        } ,
        number: 4
      },
      {
        name: {
          kh: 'សុក្រ' ,
          en: 'Thursday' 
        },
        symbol: 'Forgiveness' ,
        color: {
          kh: 'ខៀវ' ,
          en: 'Blue' ,
          hexa: '#39A7FF' 
        } ,
        number: 5
      },
      {
        name: {
          kh: 'សៅរ៍' ,
          en: 'Thursday' 
        },
        symbol: 'Signifying sadness' ,
        color: {
          kh: 'ឈាមជ្រូក' ,
          en: 'Burgundy' ,
          hexa: '#952323' 
        } ,
        number: 6
      }
    ])
    /**
     * Variables
     */    
    var model = reactive( {
      name: "attendant" ,
      title: "វត្តមានប្រចាំខែ"
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
          date: '' ,
          attendant_type : ''
        },
        format: {
          date: '' ,
          attendant_type: 'A' ,
          ot_hours: 0 ,
          ot_minutes: 0 ,
          worked_hours: 0 ,
          worked_minutes: 0 
        }
      } ,
      pagination: {
        perPage: 50 ,
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
      console.log( dateFormat( new Date(attendantDate.value) , "yyyy-mm-dd" ) )
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/userAttendants',{
        userId: route.params.userId ,
        date: attendantDate.value != null && parseInt( attendantDate.value ) > 0 ? dateFormat( new Date(attendantDate.value) , "yyyy-mm-dd" ) : dateFormat( new Date() , "yyyy-mm-dd" ) ,
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        user.value = res.data.user
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
     * Load organization
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
          description: 'មានបញ្ហាពេលអានអានអង្គភាព។'
        })
        console.log( err )
      })
    }

    function getEffectiveDayName(effectiveDayNumbers){
      let days = ["អាទិត្យ","ចន្ទ័","អង្គារ៍","ពុធ","ព្រសហ្បត៍","សុក្រ","សៅរ៍"]
      return effectiveDayNumbers.map( ( dayNumber )=> days[ dayNumber ] )
    }

    function minutesToStringTime(minutes){
      let time = {
        hours: 0 ,
        minutes: 0 
      }
      if( minutes > 60 ){
        time.minutes = minutes % 60
        time.hours = ( minutes - time.minutes ) / 60
      }else{
        time.minutes = minutes
      }
      return time
    }
    function getDayOfWeek(number){
      return daysOfWeek.find( day => day.number == number )
    }
    /**
     * Initial the data
     */
    getRecords()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      user ,
      attendantDate ,
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
      getEffectiveDayName ,
      minutesToStringTime ,
      getDayOfWeek ,
      dateFormat
    }
  }
}

</script>

<style scoped >
  .vcb-table-cell {
    @apply p-2 ;
  }
</style>