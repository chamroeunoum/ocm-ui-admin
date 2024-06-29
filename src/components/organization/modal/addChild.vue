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
            placeholder="ជ្រើសរើសក្រសួងស្ថាប័នក្រោមបង្គាប់"
            :options="optionOrganizations"
            @update:value="addChildOrganization"
          />
        </div>
        <table class="w-full bg-gray-50" >
          <tr class="bg-gray-300" >
            <th class="text-left p-2" >ល.រ</th>
            <th class="text-left p-2" >ថ្នាក់ដឹកនាំ</th>
            <th class="text-left p-2" >ឈ្មោះ</th>
            <th class="text-left p-2" >ផ្សេងៗ</th>
            <th class="text-center p-2 w-40" >ប្រតិបត្តិការ</th>
          </tr>
          <tr v-for="(organization,index) in organizations" :key="index" :class="'hover:bg-gray-200 duration-300 ' + ( index % 2 ? ' bg-gray-50 ' : ' bg-gray-100' ) " >
            <td class="text-left p-2" >{{  index + 1 }}</td>
            <td class="text-left p-2" >{{  
              ( organization.leader.countesies != undefined && organization.leader.countesies.length > 0 ? organization.leader.countesies.map( ( c ) => c.name ).join( ' ' ) + ' ' : '' )
              + ( organization.leader.lastname != undefined ? organization.leader.lastname + ' ' : '' ) + ( organization.leader.firstname != undefined ? organization.leader.firstname + ' ' : '' )
            }} {{  
              ( organization.leader.positions != undefined && organization.leader.positions.length > 0 ? organization.leader.positions.map( ( p ) => p.name ).join( ' ' ) + ' ' : '' )
            }}</td>
            <td class="text-left p-2" >{{ organization.name }}</td>
            <td class="text-left p-2" >{{ organization.desp }}</td>
            <td class="text-center p-2 flex items-center place-content-center" >
              <n-tooltip>
                <template #trigger>
                  <svg class="text-red-600 w-6 h-6 cursor-pointer" @click="removeChildOrganization(organization.id)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>
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
  name : 'ChildOrganization' ,
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

    function AddChildOrganization(){
      if( selectedOrganization.value <= 0 ){
        notify.info({
          title: "បញ្ចូលក្រសួងស្ថាប័នក្រោមបង្គាប់" ,
          content: 'សូមជ្រើសរើសក្រសួងស្ថាប័នក្រោមបង្គាប់។'
        })
        return false
      }
      store.dispatch('organizations/store',{
        
      }).then( res => {
        if( res.data.ok ){
          
        }else{
          notify.error({
            title: 'បញ្ចូលក្រសួងស្ថាប័នក្រោមបង្គាប់' ,
            content: res.data.message ,
            description: res.data.message ,
            duration: 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
      });
    }

    onMounted(() => {
      
    })

    return {
      /**
       * Functions
       */
      
    }
  }
}
</script>