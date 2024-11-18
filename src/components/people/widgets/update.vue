<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick" :on-after-enter="initial" transform-origin="center">
        <n-card class="w-10/12 sm:w-3/4 md:w-8/12 lg:w-3/5 xl:w-7/12" :title="'កែប្រែ ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="update" >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <!-- Tab -->
            <n-tabs type="segment" animated>
              <n-tab-pane name="account-detail" tab="ព័ត៌មានផ្ទាល់ខ្លួន">
                <div class="py-4" >
                  <div class=" mx-auto p-4 flex-wrap">
                    <div class="crud-form-panel w-full flex flex-wrap ">
                      <n-form v-if="record!=null" 
                        class="w-full text-left font-btb text-lg flex flex-wrap" 
                        :label-width="80"
                        :model="record"
                        :rules="rules"
                        size="large"
                        ref="formRef"
                      >
                      <n-form-item label="ងារ" path="countesies" class="w-full p-1" >
                          <n-select
                            v-model:value="selectedCountesies"
                            filterable
                            placeholder="សូមជ្រើសរើសងារ"
                            :options="countesies"
                            multiple
                          />
                        </n-form-item>
                        <n-form-item label="ត្រកូល" path="lastname" class="w-6/12 p-1" >
                          <n-input v-model:value="record.lastname" placeholder="នាមត្រកូល" />
                        </n-form-item>
                        <n-form-item label="ឈ្មោះ" path="firstname" class="w-6/12 p-1" >
                          <n-input v-model:value="record.firstname" placeholder="នាមខ្លួន" />
                        </n-form-item>
                        <n-form-item label="ថ្ងៃ ខែ ឆ្នាំ កំណើត" path="dob" class="w-4/12 p-1" >
                          <n-date-picker v-model:value="dob" type="date" placeholder="ថ្ងៃ ខែ ឆ្នាំ កំណើត" class="w-full" />
                        </n-form-item>
                        <n-form-item label="" path="gender" class="w-3/12 p-1 " >
                          <n-radio-group v-model:value="record.gender" class="mx-auto" >
                            <n-space>
                              <n-radio
                                v-for="gender in [{label:'ស្រី',value:0},{label:'ប្រុស',value:1}]"
                                :key="gender.value"
                                :value="gender.value"
                                :label="gender.label"
                              />
                            </n-space>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item label="" path="marry" class="w-5/12 p-1" >
                          <n-radio-group v-model:value="record.marry_status" class="mx-auto" >
                            <n-space>
                              <n-radio
                              v-for="status in [{label:'នៅលីវ',value:'single'},{label:'រៀបការរួច',value:'married'},{label:'ពោះមាយ / មេមាយ',value:'divorced'}]"
                              :key="status.value"
                              :value="status.value"
                              :label="status.label"
                              />
                            </n-space>
                          </n-radio-group>

                        </n-form-item>
                        
                        <n-form-item label="លេខអត្តសញ្ញាណបណ្ណ" path="nid" class="w-1/2 p-1" >
                          <n-input v-model:value="record.nid" placeholder="លេខអត្តសញ្ញាណបណ្ណ" />
                        </n-form-item>
                        <n-form-item label="អ៊ីមែល" path="email" class="w-1/2 p-1" >
                          <n-input v-model:value="record.email" placeholder="អ៊ីមែល" />
                        </n-form-item>
                        <n-form-item label="ទូរស័ព្ទផ្ទាល់ខ្លួន" path="mobile_phone" class="w-1/2 p-1" >
                          <n-input v-model:value="record.mobile_phone" placeholder="ទូរស័ព្ទផ្ទាល់ខ្លួន" />
                        </n-form-item>
                        <n-form-item label="ទូរស័ព្ទការិយាល័យ" path="phone" class="w-1/2 p-1" >
                          <n-input v-model:value="record.office_phone" placeholder="ទូរស័ព្ទការិយាល័យ" />
                        </n-form-item>
                      </n-form>
                      <div class="w-1/2 h-8"></div>  
                    </div>
                  </div>
                </div>
              </n-tab-pane>
              <n-tab-pane name="organization-detail" tab="ព័ត៌មានក្នុងអង្គភាព">
                <div class="p-4" >
                  <div label="អង្គភាព" path="organization" class="w-full mb-4" >
                    <n-select
                      v-model:value="selectedOrganizations"
                      filterable
                      placeholder="សូមជ្រើសរើសអង្គភាព"
                      :options="organizations"
                      multiple
                    />
                  </div>
                  <div label="តួនាទី" path="position" class="w-full mb-4" >
                    <n-select
                      v-model:value="selectedPositions"
                      filterable
                      placeholder="សូមជ្រើសរើសតួនាទី"
                      :options="positions"
                      multiple
                    />
                  </div>
                  <Transition name="slide-fade" >
                    <div 
                    v-if="record.organizationPeople != null && record.organizationPeople != undefined && record.organizationPeople.length > 0 "
                    class="w-full border border-gray-200 rounded p-4"
                    >
                      <div class="w-full mb-4" >លេខសម្កាល់មន្ត្រីក្នុងស្ថាប័នស្ថិតនៅ</div>
                      <div class="w-full mb-4" v-for="(organizationPivot, index) in record.organizationPeople" >
                        <div class="w-full " >{{ $toKhmer( index + 1 ) + '. ' +organizationPivot.organization.name }}{{ organizationPivot.organization.code != "" && organizationPivot.organization.code != undefined && organizationPivot.organization.code.length > 0 ? ' - ' + organizationPivot.organization.code : '' }}</div>
                        <div class="w-1/2 p-4" >
                          <n-input v-model:value="organizationPivot.code" placeholder="លេខកូដ" @blur="updatePeopleCodeWithinOrganization(organizationPivot)" />
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </n-tab-pane>
            </n-tabs>
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

import dateFormat from "dateformat";
import { getKhmer } from '../../../plugins/kh/number.js'

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
    } , 
    record: {
      type: Object ,
      required: true ,
      default: () => {
        return reactive({
          id: 0 ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          gender: '' ,
          mobile_phone: '' ,
          office_phone: '' ,
          dob: null ,
          nid: '' ,
          marry_status: null ,
          user: null ,
          orgainzations: [] ,
          positions: []
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
    var store = useStore()
    const message = useMessage()
    const notify = useNotification()

    const selectedOrganizations = ref([])
    const selectedPositions = ref([])
    const selectedCountesies = ref([])

    const organizations = computed( () => 
      store.getters['organizations/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    )
    const positions = computed( () => 
      store.getters['position/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    ) 
    const countesies = computed( () => 
      store.getters['countesy/getRecords'].map( c => ( { label: c.name , value : c.id } ) )
    ) 
    
    const dob = ref( null )
    dob.value = props.record.dob != '' && props.record.dob != undefined
    ? (new Date( props.record.dob )).getTime()
    : (new Date()).getTime()

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
     function clearRecord( actionStatus ){
      props.onClose( actionStatus )
    }

    function maskOrEscClick(){
      props.onClose( 0 )
    }

    function update(){
      if( props.record.mobile_phone == "" && props.record.email == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'សូមបំពេញ លេខទូរស័ព្ទផ្ទាល់ខ្លួន ឬ អ៊ីមែល' ,
          duration: 2000
        })
        return false
      }
      if( props.model === undefined || props.model.name == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration: 2000
        })
        return false
      }
      
      props.record.dob = dob.value != null && parseInt( dob.value ) > 0 ? dateFormat( new Date(dob.value) , "yyyy-mm-dd" ) : dateFormat( new Date() , "yyyy-mm-dd" ) ,

      store.dispatch( props.model.name+'/update',{
        id: props.record.id ,
        firstname: props.record.firstname ,
        lastname: props.record.lastname ,
        gender: props.record.gender ,
        email: props.record.email.toLowerCase() ,
        mobile_phone: props.record.mobile_phone ,
        office_phone: props.record.office_phone ,
        dob: props.record.dob ,
        nid: props.record.nid ,
        marry_status: props.record.marry_status ,
        organizations: selectedOrganizations.value ,
        positions: selectedPositions.value ,
        countesies: selectedCountesies.value
      }).then( res => {
        if( res.data.ok ){
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: res.data.message ,
            duration: 2000
          })
          clearRecord( 1 )
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
      clearRecord( 0 )
    }

    function updatePeopleCodeWithinOrganization(organizationPivot){
      if( organizationPivot.code != "" && organizationPivot.code.length > 0 ){
        if( props.model === undefined || props.model.name == "" ){
          notify.warning({
            title: 'ពិនិត្យព័ត៌មាន' ,
            description: 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
            duration: 2000
          })
          return false
        }
        store.dispatch( props.model.name+'/updateOrganizationCode',{
          people_id: organizationPivot.people_id ,
          organization_id : organizationPivot.organization_id ,
          code : organizationPivot.code
        }).then( res => {
          if( res.data.ok ){
            notify.success({
              title: 'រក្សារទុកព័ត៌មាន' ,
              description: res.data.message ,
              duration: 2000
            })
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
    }
  
    function initial(){
      // selectedOrganizations.value = [463]
      selectedOrganizations.value = Array.isArray( props.record.organizations ) ? props.record.organizations.map( o => o.id ) : []
      selectedPositions.value = Array.isArray( props.record.positions ) ? props.record.positions.map( o => o.id ) : []
      selectedCountesies.value = Array.isArray( props.record.countesies ) ? props.record.countesies.map( c => c.id ) : []
    }

    return {
      /**
       * Variables
       */
      rules ,
      selectedOrganizations ,
      organizations ,
      selectedPositions ,
      positions ,
      selectedCountesies ,
      countesies ,
      dob ,
      /**
       * Functions
       */
      update  ,
      initial ,
      clearRecord ,
      maskOrEscClick ,
      updatePeopleCodeWithinOrganization 
    }
  }
}
</script>
<style type="text/css" scoped >
</style>