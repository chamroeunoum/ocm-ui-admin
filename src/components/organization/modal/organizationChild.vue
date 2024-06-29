<template >
  <Transition name="slide-fade" >
    <div v-if="show" class="w-full" >
      <!-- Leader of the organization -->
      <!-- Staffs of the organization -->
      <div class="w-full " >
        <div class="w-full my-4" >
          <n-select
            v-model:value="selectedOrganization"
            filterable
            placeholder="ជ្រើសរើសស្ថាប័នក្រោមបង្គាប់"
            :options="optionOrganizations"
            @update:value="addChild"
          />
        </div>
        <table class="w-full bg-gray-50" >
          <tr class="bg-gray-300" >
            <th class="text-left p-2" >ល.រ</th>
            <th class="text-left p-2" >ឈ្មោះ</th>
            <th class="text-left p-2" >ផ្សេងៗ</th>
            <th class="text-center p-2 w-40" >ប្រតិបត្តិការ</th>
          </tr>
          <tr v-for="(organization,index) in childOrganizations" :key="index" :class="'hover:bg-gray-200 duration-300 ' + ( index % 2 ? ' bg-gray-50 ' : ' bg-gray-100' ) " >
            <td class="text-left p-2" >{{ index + 1 }}</td>
            <td class="text-left p-2" >{{ organization.name }}</td>
            <td class="text-left p-2" >{{  organization.desp }}</td>
            <td class="text-center p-2 flex items-center place-content-center" >
              <n-tooltip>
                <template #trigger>
                  <svg class="text-red-600 w-6 h-6 cursor-pointer" @click="removeChild(organization.id)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>
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
  name : 'OrganizationChild' ,
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
          name: "" ,
          desp: ""
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
    console.log( props.record )
    const store = useStore()
    const notify = useNotification()
    const message = useMessage()

    const selectedOrganization = ref(null)
    const organizations = ref([])

    console.log( props.record  )

    const optionOrganizations = computed( () => {
      let result = organizations.value
        // Filter out the added organizations
        .filter( p => p.parentId != props.record.id )
        // Filter out the organizations that have been selected as the child of another
        .filter( p => p.parentId == null || parseInt( p.parentId ) <= 0 )
        // Filter out the self organization
        .filter( p => p.parentId == props.record.id )
        .map( ( p ) => {
        return { label : p.name + " " + p.desp , value : p.id }
      })
      // result.unshift({ label: 'សូមជ្រើសរើសថ្នាក់ដឹកនាំ' , value : null })
      return result
    })

    console.log( props.record )
    const childOrganizations = computed( () => {
      return organizations.value.filter( p => p.parentId == props.record.id )
    })

    function getOragnizations(){
      console.log( "getOragnization" )
      store.dispatch( 'organizations/list',{
        search : selectedOrganization.value == null || selectedOrganization.value == undefined ? '' : selectedOrganization.value ,
        perPage : 3000 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          organizations.value = res.data.records
        }else{
          notify.warning({
            'title' : 'ព័ត៌មានអង្គភាព' ,
            'description' : 'មិនមានព័ត៌មានអង្គភាព' ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'ព័ត៌មានអង្គភាព' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកព័ត៌មានអង្គភាព។' ,
          duration : 3000
        })
      })
    }

    function removeChild( organization ){
      
    }
    
    function addChild( ){
      console.log( selectedOrganization.value )
      store.dispatch( 'organizations/addchild',{
        pid: props.record.id ,
        cid: selectedOrganization.value
      }).then( res => {
        console.log( res.data )
        getOragnizations()
      }).catch( err => {
        console.log( err )
      })
    }

    onMounted(() => {
      getOragnizations()
    })

    return {
      optionOrganizations ,
      selectedOrganization ,
      removeChild ,
      addChild ,
      organizations ,
      childOrganizations
    }
  }
}
</script>