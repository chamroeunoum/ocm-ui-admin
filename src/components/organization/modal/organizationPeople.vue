<template >
  <Transition name="slide-fade" >
    <div v-if="show" class="w-full" >
      <!-- Leader of the organization -->
      <!-- Staffs of the organization -->
      <div class="w-full " >
        <div class="w-full my-4" >
          <n-select
            v-model:value="selectedPeople"
            filterable
            placeholder="ជ្រើសរើសមន្ត្រី"
            :options="optionPeople"
            @update:value="addPeopleToOrganization"
          />
        </div>
        <table class="w-full bg-gray-50" >
          <tr class="bg-gray-300" >
            <th class="text-left p-2" >ល.រ</th>
            <th class="text-left p-2" >ឈ្មោះ</th>
            <th class="text-left p-2" >តួនាទី</th>
            <th class="text-left p-2" >ទូរស័ព្ទ</th>
            <th class="text-left p-2" >អសយដ្ឋានអេឡិចត្រូនិច</th>
            <th class="text-center p-2 w-40" >ប្រតិបត្តិការ</th>
          </tr>
          <tr v-for="(staff,index) in staffs" :key="index" :class="'hover:bg-gray-200 duration-300 ' + ( index % 2 ? ' bg-gray-50 ' : ' bg-gray-100' ) " >
            <td class="text-left p-2" >{{  index + 1 }}</td>
            <td class="text-left p-2" >{{  
              ( staff.countesies != undefined && staff.countesies.length > 0 ? staff.countesies.map( ( c ) => c.name ).join( ' ' ) + ' ' : '' )
              + ( staff.lastname != undefined ? staff.lastname + ' ' : '' ) + ( staff.firstname != undefined ? staff.firstname + ' ' : '' )
            }}</td>
            <td class="text-left p-2" >{{  
              ( staff.positions != undefined && staff.positions.length > 0 ? staff.positions.map( ( p ) => p.name ).join( ' ' ) + ' ' : '' )
            }}</td>
            <td class="text-left p-2" >{{ ( staff.mobile_phone != undefined ? staff.mobile_phone : '' ) }}</td>
            <td class="text-left p-2" >{{ ( staff.email != undefined ? staff.email : '' ) }}</td>
            <td class="text-center p-2 flex items-center place-content-center" >
              <n-tooltip>
                <template #trigger>
                  <svg class="text-red-600 w-6 h-6 cursor-pointer" @click="removePeopleToOrganization(staff.id)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>
                </template>
                ដកចេញ
              </n-tooltip>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </Transition>
</template>
<script >
import { ref ,reactive , onMounted , defineComponent, h, computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage , useNotification , NAvatar, NText, NTag } from 'naive-ui'

export default {
  name : 'OrganizationPeople' ,
  components: {

  } ,
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
          parentId: "" ,
          name: "" ,
          image: "https://picsum.photos/200/300" ,
          desp: "" ,
          leader: [] 
        })
      }
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    } ,
  },
  setup(props){

    const store = useStore()
    const notify = useNotification()
    const message = useMessage()

    const staffs = ref([])
    const leaders = ref([])
    const leader = ref(null)
    const selectedPeople = ref(null)
    const people = ref([])

    const optionPeople = computed( () => {
      let result = people.value.map( ( p ) => {
        return { label : (
          ( p.countesies != undefined && p.countesies.length > 0 ? p.countesies.map( (c) => c.name ).join(' ') + " " : '' ) 
          + p.lastname + " " + p.firstname
        ) , value : p.id }
      })
      // result.unshift({ label: 'សូមជ្រើសរើសថ្នាក់ដឹកនាំ' , value : null })
      return result
    })

    function getPeople(){
      console.log( "getPeople" )
      store.dispatch( 'people/list',{
        search : selectedPeople.value == null || selectedPeople.value == undefined ? '' : selectedPeople.value ,
        perPage : 3000 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          people.value = res.data.records
        }else{
          notify.warning({
            'title' : 'សមាជិកប្រជុំ' ,
            'description' : 'មិនមានសមាជិកប្រជុំ។' ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិកប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិកប្រជុំ។' ,
          duration : 3000
        })
      })
    }

    function getOrganizationPeople(){
      console.log( "getOrganizationPeople" )
      store.dispatch( props.model.name + '/people',{
        id: props.record.id
      }).then( res => {
        if( res.data.ok ){
          staffs.value = res.data.record.staffs
          leaders.value = res.data.record.leader
        }else{
          notify.warning({
            'title' : 'អានព័ត៌មានមន្ត្រី' ,
            'description' : 'មិនមាន អានព័ត៌មានមន្ត្រី' ,
            duration : 3000
          })
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'អានព័ត៌មានមន្ត្រី' ,
          'description' : 'មានបញ្ហាក្នុងពេល អានព័ត៌មានមន្ត្រី។' ,
          duration : 3000
        })
      })
    }
    function setLeader(){
      store.dispatch('organizations/setLeader',{
        'organization_id' : props.record.id ,
        'people_id' : leader.value > 0 ? leader.value : 0
      }).then( res => {
        if( res.data.ok ){
        }else{
          notify.error({
            title: 'ព័ត៌មានក្រសួង ស្ថាប័ន' ,
            content: res.data.message ,
            description: res.data.message ,
            duration: 3000
          })
        }
      }).catch( err => {
        console.log( err )
      });
    }

    function addPeopleToOrganization(){
      store.dispatch('organizations/addPeople',{
        'organization_id' : props.record.id ,
        'people_id' : selectedPeople.value > 0 ? selectedPeople.value : 0
      }).then( res => {
        if( res.data.ok ){
          leaders.value = res.data.record.leader
          staffs.value = res.data.record.staffs
        }else{
          notify.error({
            title: 'បញ្ចូលមន្ត្រី' ,
            content: res.data.message ,
            description: res.data.message ,
            duration: 3000
          })
        }
        selectedPeople.value = null
      }).catch( err => {
        console.log( err )
      });
    }
    function removePeopleToOrganization(selectedPeopleId){
      selectedPeople.value = selectedPeopleId
      addPeopleToOrganization()
    }

    onMounted(() => {
      leader.value = props.record.leader != undefined && props.record.leader[0] != null ? props.record.leader[0].id : null
      getOrganizationPeople()
      getPeople()
    })

    return {
      staffs ,
      leaders ,
      leader ,
      optionPeople ,
      selectedPeople ,
      /**
       * Functions
       */
      removePeopleToOrganization ,
      addPeopleToOrganization ,
      setLeader
    }
  }
}
</script>