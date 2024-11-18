<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-mask-click="closeModal" transform-origin="center" :on-after-enter="initial" class=" relative " >
        <n-card class="w-4/5 font-pvh text-xl flex">
          <!-- Member Form -->
          <div class="w-full flex flex-wrap" >
            <div class="w-1/3 p-2 mx-auto mb-6" >
              <n-input type="text" v-model:value="officerSearch" @keyup.enter="getOfficers" class="text-xs" placeholder="ស្វែងរក..." />
            </div>
            <div class="flex justify-center flex-wrap w-full" >
              <div v-for="(officer,index) in officers" :key="index" class="p-2" @click="toggleAssignee(officer)" >
                <div class="p-2 border border-gray-200 rounded-lg w-60 cursor-pointer hover:bg-gray-100 duration-300 relative" >
                  <div class="w-32 h-32 rounded-full mx-auto my-4 bg-cover bg-no-repeat bg-center" :style=" ' background-image: url('+( officer.image != undefined && officer.image.length > 0 ? officer.image : ( officer.people != undefined && officer.people.image != undefined && officer.people.image.length > 0 ? officer.people.image : ocmLogoUrl ) )+'); '" ></div>
                  <div v-if="officer.countesy!=undefined" class="member_countesies text-gray-700 font-moul text-center text-xs leading-6 " >{{ officer.countesy.name }}</div>
                  <div class="member_name  text-gray-700 w-full mb-2 font-moul text-center" >{{ officer.people.lastname + " " + officer.people.firstname }}</div>
                  <div v-if="officer.organization!=undefined" class="member_organizations mb-2 text-gray-500 text-xs leading-6 text-center" >{{ officer.organization.name }}</div>
                  <div v-if="officer.position!=undefined" class="member_positions text-gray-500 text-xs  mb-2 text-center" >{{ officer.position.name }}</div>
                  <n-tooltip v-if="selectedAssignees.find( (assignee) => assignee.id == officer.id )" trigger="hover">
                    <template #trigger>
                      <svg class="w-8 h-8 text-green-500 absolute top-2 right-2 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z" fill="currentColor"></path></svg>
                    </template>
                    ជាសមាជិកក្នុងការងារនេះ 
                  </n-tooltip>
                </div>
              </div>
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
import { useMessage, useNotification, useDialog } from 'naive-ui'
import ocmLogoUrl from './../../../assets/logo.svg'

import dateFormat from "dateformat";
import VuePdfEmbed from 'vue-pdf-embed'

export default {
  components: {
    
    
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
      required: false ,
      default: () => {
        return reactive({
          id: 0
        })
      },
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
    const dialog = useDialog()

    /**
     * Search member
     */
    const people = ref([])
    const peopleSearch = ref('')
    const officers = ref([])
    const officerSearch = ref('')
    const selectedAssignees = ref( [] )

    function getPeople(){
      store.dispatch( 'people/list',{
        search : peopleSearch.value ,
        perPage : 30 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          people.value = res.data.records
        }else{
          notify.warning({
            'title' : 'សមាជិក' ,
            'description' : 'មិនមានសមាជិក។' ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិក' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិក។' ,
          duration : 3000
        })
      })
    }

    function getOfficers(){
      store.dispatch( 'officer/list',{
        search : officerSearch.value ,
        perPage : 30 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          officers.value = res.data.records
        }else{
          notify.warning({
            'title' : 'សមាជិក' ,
            'description' : 'មិនមានសមាជិក។' ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិក' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិក។' ,
          duration : 3000
        })
      })
    }

    function toggleAssignee( assignee ){
      // helper == true -> add member to the meeting, helper == false remove the member from the meeting
      store.dispatch(props.model.name + '/toggleAssignee',{ 
        assignee_id : assignee.id , 
        task_id : props.record.id
      })
      .then( res => {
        if( res.data.ok ){
          selectedAssignees.value = res.data.record.assignees 
        }else{
          notify.error({
            'title' : 'សមាជិក' ,
            'description' : res.data.message ,
            duration : 3000
          })
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិក' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិក។' ,
          duration : 3000
        })
      } )
    }

    function closeModal(){ 
      people.value = []
      selectedAssignees.value = []
      props.onClose()
    }
    /**
     * End upload functions
     */

    function initial(){
      getOfficers()
      selectedAssignees.value = props.record.assignees != undefined && props.record.assignees.length > 0 ? props.record.assignees : []
    }

    return {
      /**
       * Variables
       */
      people ,
      peopleSearch ,
      officers ,
      officerSearch ,
      selectedAssignees ,
      /**
       * Functions
       */
      initial ,
      getPeople , 
      getOfficers,
      closeModal ,
      toggleAssignee ,
      ocmLogoUrl
    }
  }
}
</script>
<style type="text/css" scoped >
</style>