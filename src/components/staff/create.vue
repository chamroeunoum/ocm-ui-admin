<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-after-leave="onClose" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" :title="'បន្ថែមព័ត៌មាន ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="create()" >
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
                </n-icon>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap ">
                <n-form 
                  class="w-full text-left font-btb text-lg flex flex-wrap" 
                  :label-width="80"
                  :model="record"
                  :rules="rules"
                  size="large"
                  ref="formRef"
                >
                  <n-form-item label="ត្រកូល" path="lastname" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.lastname" placeholder="ត្រកូល" />
                  </n-form-item>
                  <n-form-item label="ឈ្មោះ" path="firstname" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.firstname" placeholder="ឈ្មោះ" />
                  </n-form-item>
                  <n-form-item label="ទូរស័ព្ទ" path="phone" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.phone" placeholder="ទូរស័ព្ទ" />
                  </n-form-item>
                  <n-form-item label="អ៊ីមែល" path="email" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.email" placeholder="អ៊ីមែល" />
                  </n-form-item>
                  <n-form-item label="ប្រាក់ខែ" path="salary" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.salary" placeholder="ប្រាក់ខែ" />
                  </n-form-item>
                  <n-form-item label="អសយដ្ឋាន" path="address" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.address" placeholder="អសយដ្ឋាន" />
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
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'


export default {

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
    var store = useStore()
    const message = useMessage()
    var record = reactive({
        lastname: '' ,
        firstname: '' ,
        phone: '' ,
        email: '' ,
        salary: 0 ,
        address: ''
      })
    /**
     * Variables
     */    
    var rules = {
        firstname: {
          required: true,
          message: 'សូមបញ្ចូលឈ្មោះ',
          trigger: [ 'blur']
        },
        lastname: {
          required: true,
          message: 'សូមបញ្ចូលត្រកូល',
          trigger: [ 'blur']
        },
        salary: {
          required: true,
          message: 'សូមបញ្ជាក់ប្រាក់ខែ',
          trigger: [ 'blur']
        }
    }
    /**
     * Functions
     */
    function clearRecord(){
      record.lastname = ''
      record.firstname = ''
      record.phone = '' 
      record.email = '' 
      record.salary = '' 
      record.address = ''
    }

    function closeForm(){
      props.show = false 
      props.onClose()
    }

    function create(){
      if( record.firstname == "" || record.lastname == "" || record.salary == "" ){
        message.warning('សូមបំពេញ ត្រកូល និង ឈ្មោះ និង ប្រាក់ខែ')
        return false
      }
      if( props.model === undefined || props.model.name == "" ){
        message.warning("ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។")
        return false
      }
      store.dispatch( props.model.name+'/create',{
        firstname: record.firstname ,
        lastname: record.lastname ,
        phone: record.phone ,
        email: record.email ,
        salary: record.salary ,
        address: record.address 
      }).then( res => {
        switch( res.status ){
          case 200 : 
          message.success( res.data.message )
          clearRecord()
          closeForm()
          break;
        }
      }).catch( err => {
        message.error( err )
      })
    }
    

    return {
      /**
       * Variables
       */
      rules ,
      record ,
      /**
       * Functions
       */
      create
    }
  }
}
</script>