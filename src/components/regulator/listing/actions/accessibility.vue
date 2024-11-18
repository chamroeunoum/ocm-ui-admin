<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="onClose" :on-mask-click="onClose" transform-origin="center" :on-after-enter="afterEnterModal" >
        <n-card class="w-2/5 font-pvh text-xl relative font-moul" title="កំណត់វិសាលភាពប្រើប្រាស់ឯកសារ" :bordered="false" size="small">
          <div class="accessibility-paletter" >
            <div class="cursor-pointer w-full p-4 border-b border-gray-100 relative hover:bg-gray-100 duration-300 " @click="updateRegulatorAccessibility(0)" >បិទការប្រើប្រាស់
              <svg v-if="parseInt( record.accessibility ) == 0 " 
              class="absolute right-2 top-2 w-8 h-8 text-green-600 " 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"><g fill="none"><path d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" fill="currentColor"></path></g></svg>
            </div>
            <div class="cursor-pointer w-full p-4 border-b border-gray-100 relative hover:bg-gray-100 duration-300 " @click="updateRegulatorAccessibility(1)" >ប្រើប្រាស់ផ្ទាល់ខ្លួន និង អ្នកដែលបានចែករំលែកទៅ
              <svg v-if="parseInt( record.accessibility ) == 1 " 
              class="absolute right-2 top-2 w-8 h-8 text-green-600 " 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"><g fill="none"><path d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" fill="currentColor"></path></g></svg>
            </div>
            <div class="cursor-pointer w-full p-4 border-b border-gray-100 relative hover:bg-gray-100 duration-300 " @click="updateRegulatorAccessibility(2)" >ប្រើប្រាស់ទូទៅក្នុងប្រព័ន្ធ
              <svg v-if="parseInt( record.accessibility ) == 2 " 
              class="absolute right-2 top-2 w-8 h-8 text-green-600 " 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"><g fill="none"><path d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" fill="currentColor"></path></g></svg>
            </div>
            <div class="cursor-pointer w-full p-4 border-b border-gray-100 relative hover:bg-gray-100 duration-300 " @click="updateRegulatorAccessibility(4)" >ប្រើប្រាស់ជាសកល
              <svg v-if="parseInt( record.accessibility ) == 4 " 
              class="absolute right-2 top-2 w-8 h-8 text-green-600 " 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"><g fill="none"><path d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" fill="currentColor"></path></g></svg>
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
import { useMessage, useNotification } from 'naive-ui'

export default {
  components: {
    
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
          id: 0 ,
          fid: '' ,
          title: '' ,
          objective: '' ,
          active: 1 ,
          year: null ,
          type_id: null ,
          pdfs: [] ,
          publish: 0 ,
          accessibility: 0
        })
      },
      // validator: (val) => {
      //   for(var field in ['id','username','firstname','lastname','email','phone','password','active'] ){
      //     if( !val.hasOwnProperty(field) ) return false
      //   }
      //   return true 
      // }
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

    function updateRegulatorAccessibility(mode){
      store.dispatch('regulator/updateAccessibility',{ id: props.record.id , mode : mode } ).then( res => {
        if( res.data.ok ){
          props.record.accessibility = res.data.record.accessibility 
          // Successfully updated
          props.onClose(props.record)
        }
      }).catch( err => {
        console.log( err )
      })
    }

    function afterEnterModal(){
      
    }

    function beforeLeaveModal(){
      
    }

    return {
      /**
       * Variables
       */
      /**
       * Functions
       */
      afterEnterModal ,
      beforeLeaveModal ,
      updateRegulatorAccessibility
    }
  }
}
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}

</style>