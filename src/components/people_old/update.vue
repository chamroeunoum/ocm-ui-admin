<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="clearRecord" :on-after-enter="initial" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" :title="'កែប្រែ ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="update()" >
              <template #icon>
                <n-icon>
                  <Save20Regular />
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
                  <n-form-item label="ងារ" path="countesy" class="w-4/5 mr-8" >
                    <n-select
                      v-model:value="selectedCountesies"
                      filterable
                      placeholder="សូមជ្រើសរើស ងារ"
                      :options="countesies"
                      multiple
                    />
                  </n-form-item>
                  <n-form-item label="ត្រកូល" path="lastname" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.lastname" placeholder="ត្រកូល" />
                  </n-form-item>
                  <n-form-item label="ឈ្មោះ" path="firstname" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.firstname" placeholder="ឈ្មោះ" />
                  </n-form-item>
                  <n-form-item label="ភេទ" path="gender" class="w-4/5 mr-8" >
                    <n-radio-group v-model:value="record.gender" name="radiobuttongroup1">
                      <n-radio-button
                        v-for="marry in [{label:'ស្រី',value:0},{label:'ប្រុស',value:1}]"
                        :key="marry.value"
                        :value="marry.value"
                        :label="marry.label"
                      />
                    </n-radio-group>
                  </n-form-item>
                  <n-form-item label="ទូរស័ព្ទ ផ្ទាល់ខ្លួន" path="mobile_phone" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.mobile_phone" placeholder="ទូរស័ព្ទ ផ្ទាល់ខ្លួន" />
                  </n-form-item>
                  <n-form-item label="ទូរស័ព្ទ ការិយាល័យ" path="office_phone" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.office_phone" placeholder="ទូរស័ព្ទ ការិយាល័យ" />
                  </n-form-item>
                  <n-form-item label="អ៊ីមែល" path="email" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.email" placeholder="អ៊ីមែល" />
                  </n-form-item>
                  <n-form-item label="ស្ថានភាពអាពាហ៍ពិពាហ៍" path="email" class="w-4/5 mr-8" >
                    <n-radio-group v-model:value="record.marry_status" name="radiobuttongroup1">
                      <n-radio-button
                        v-for="marry in [{label:'លីវ',value:'single'},{label:'រៀបការរួច',value:'married'},{label:'បានលែងគ្នារួច',value:'devorced'}]"
                        :key="marry.value"
                        :value="marry.value"
                        :label="marry.label"
                      />
                    </n-radio-group>
                  </n-form-item>
                  <n-form-item label="អង្គភាព" path="organization" class="w-4/5 mr-8" >
                    <n-select
                      v-model:value="selectedOrganizations"
                      filterable
                      placeholder="សូមជ្រើសរើសអង្គភាព"
                      :options="organizations"
                      multiple
                    />
                  </n-form-item>
                  <n-form-item label="តួនាទី" path="position" class="w-4/5 mr-8" >
                    <n-select
                      v-model:value="selectedPositions"
                      filterable
                      placeholder="សូមជ្រើសរើសតួនាទី"
                      :options="positions"
                      multiple
                    />
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
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import { Save20Regular } from '@vicons/fluent'

export default {
  components: {
    Save20Regular
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
          firstname: '' ,
          lastname: '' ,
          gender: 0 ,
          dob: '' ,
          email: '' ,
          mobile_phone: '' ,
          office_phone: '' ,
          nid: '' ,
          image: '' ,
          marry_status: '' ,
          fatther: 0 ,
          mother: 0 ,
          orgainzations: [] ,
          positions: [] ,
          countesies: []
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
    var store = useStore()
    const message = useMessage()
    const notify = useNotification()

    const selectedOrganizations = ref([])
    const selectedPositions = ref([])
    const selectedCountesies = ref([])

    const organizations = computed( () => 
      store.getters['organizations/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    )
    const countesies = computed( () => 
      store.getters['countesy/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    )
    const positions = computed( () => 
      store.getters['position/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    ) 
    

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
        }
    }
    /**
     * Functions
     */
    function clearRecord(){
      props.record.id = 0
      props.record.gender = 1
      props.record.dob = ""
      props.record.firstname = ""
      props.record.lastname = ""
      props.record.mobile_phone = ""
      props.record.office_phone = ""
      props.record.email = ""
      props.record.marry_status = ''
      props.record.organizations = [] 
      props.record.countesies = [] 
      props.record.positions = []
      selectedPositions.value = []
      selectedCountesies.value = []
      selectedOrganizations.value = []
      props.onClose()
    }

    function update(){
      if( props.record.phone == "" && props.record.email == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'សូមបំពេញ លេខទូរស័ព្ទ ឬ អ៊ីមែល' ,
          duration: 2000
        })
        return false
      }
      if( props.model === undefined || props.model.lastname == "" || props.model.firstname == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration: 2000
        })
        return false
      }
      
      store.dispatch( props.model.name+'/update',{
        id: props.record.id ,
        dob: props.record.dob ,
        firstname: props.record.firstname ,
        lastname: props.record.lastname ,
        gender: props.record.gender ,
        marry_status: props.record.marry_status ,
        mobile_phone: props.record.mobile_phone ,
        office_phone: props.record.office_phone ,
        email: props.record.email.toLowerCase() ,
        organizations: selectedOrganizations.value ,
        positions: selectedPositions.value ,
        countesies: selectedCountesies.value ,
      }).then( res => {
        if( res.data.ok ){
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: res.data.message ,
            duration: 2000
          })
          clearRecord()
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
    }
  
    function initial(){
      console.log( props.record )
      selectedOrganizations.value = Array.isArray( props.record.organizations ) ? props.record.organizations.map( o => o.id ) : []
      selectedPositions.value = Array.isArray( props.record.positions ) ? props.record.positions.map( o => o.id ) : []
      selectedCountesies.value = Array.isArray( props.record.countesies ) ? props.record.countesies.map( o => o.id ) : []
    }

    return {
      /**
       * Variables
       */
      rules ,
      positions ,
      countesies ,
      organizations ,
      selectedPositions ,
      selectedCountesies ,
      selectedOrganizations ,
      /**
       * Functions
       */
      update  ,
      initial ,
      clearRecord
    }
  }
}
</script>