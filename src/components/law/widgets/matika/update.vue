<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick" :on-after-enter="initial" transform-origin="center">
        <n-card class="w-10/12 sm:w-3/4 md:w-8/12 lg:w-3/5 xl:w-7/12" :title="'កែប្រែ ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="update()" >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap ">
                <n-form v-if="record!=null" 
                  class="w-full text-left font-btb text-lg flex flex-wrap" 
                  :label-width="80"
                  :model="record"
                  size="large"
                  ref="formRef"
                >
                  <n-form-item label="លេខមាត្រា" class="w-11/12 p-1" >
                    <n-input v-model:value="record.number" placeholder="លេខមាត្រា" />
                  </n-form-item>
                  <n-form-item label="លេខ ឬ ចំណងជើងមាត្រា" class="w-11/12 p-1" >
                    <n-input v-model:value="record.title" placeholder="លេខ ឬ ចំណងជើងមាត្រា" />
                  </n-form-item>
                </n-form>
                <div class="w-1/2 h-8"></div>  
              </div>
            </div>
          </div>
          <!-- End form edit account -->
          <template #footer></template>
        </n-card>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive , ref , computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'

import dateFormat from "dateformat";


export default {
  components: {

  },
  props: {
    id: {
      type: Number ,
      required: true ,
      default: () => {
        return 0
      },
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
    const store = useStore()
    const message = useMessage()
    const route = useRoute()
    const notify = useNotification()

    const model = reactive({
      title: "មាតិកា" ,
      name: "matika"
    })
    const record = ref(null)

    /**
     * Functions
     */
     function clearRecord( actionStatus ){
      props.onClose( actionStatus )
    }

    function maskOrEscClick(){
      props.onClose( 0 )
    }

    function getRecord(){
      if( props.id >= 0 ){
        store.dispatch(model.name+'/read',{ id: props.id }).then( res => {
          if( res.data.ok ){
            record.value = res.data.record 
          }
        }).catch( err => {
          console.log( err )
        })
      }else{
        message.warning("សូមជ្រើសរើសមាតិកាជាមុនសិន។")
      }
    }

    function update(){
      if( record.title == "" && record.number == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'សូមបំពេញ អោយបានពេញលេញ។' ,
          duration: 2000
        })
        return false
      }
      if( model === undefined || model.name == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration: 2000
        })
        return false
      }

      store.dispatch( model.name+'/update',{
        id: record.value.id ,
        number: record.value.number ,
        title: record.value.title
      }).then( res => {
        if( res.data.ok ){
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: res.data.message ,
            duration: 2000
          })
          clearRecord( {
            status: 1 ,
            record: res.data.record
          } )
        }else{
          notify.error({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
            duration: 2000
          })
        }
      }).catch( err => {
        message.error( err )
      })
      clearRecord( { status : 0 , record : null } )
    }
  
    function initial(){
      console.log( props.id )
      getRecord()
    }

    return {
      /**
       * Variables
       */
      model ,
      record ,
      /**
       * Functions
       */
      update  ,
      initial ,
      clearRecord ,
      maskOrEscClick
    }
  }
}
</script>
<style type="text/css" scoped >
</style>