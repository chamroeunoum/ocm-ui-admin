<template>
  <!-- Form edit account -->
    <div class="vcb-pop-update font-ktr">
      <n-modal v-bind:show="show" :on-mask-click="closeModal" transform-origin="center" :on-after-enter="initial" >
        <n-card class="w-1/2 font-pvh text-xl" :title="'បន្ថែម ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" :disabled="btnSavingLoadingRef" @click="update()" :loading="btnSavingLoadingRef" >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6 2a2 2 0 0 0-2 2v5h1V4a1 1 0 0 1 1-1h4v3.5A1.5 1.5 0 0 0 11.5 8H15v8a1 1 0 0 1-1 1h-3v1h3a2 2 0 0 0 2-2V7.414a1.5 1.5 0 0 0-.44-1.06l-3.914-3.915A1.5 1.5 0 0 0 10.586 2H6zm8.793 5H11.5a.5.5 0 0 1-.5-.5V3.207L14.793 7zM4 10h3v2H4v-2zm-2 0h1v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-2.41a1 1 0 0 1 .293.203l1.414 1.414a1 1 0 0 1 .293.707V18a1 1 0 0 1-1 1v-4.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V19a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zm6 5v4H3v-4h5z" fill="currentColor"></path></g></svg>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-update-form w-full border-t">
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
                  <n-form-item label="បរិយាយពីការងារ" path="objective" class="w-4/5 mr-8" >
                    <n-input type="textarea" v-model:value="record.objective" placeholder="បរិយាយពីការងារ" />
                  </n-form-item>
                  <n-form-item label="រយះពេលកណត់បញ្ចប់ការងារ" path="minutes" class="w-4/5 mr-8" >
                    <n-input-number v-model:value="record.minutes" placeholder="រយះពេលកណត់បញ្ចប់ការងារ" />
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
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat";

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
          objective: '' ,
          minutes : 0 ,
          amount: 0.0 ,
          amount_type: 0 ,
          start: '' ,
          end: '' ,
        })
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
    const notify = useNotification()
    const btnSavingLoadingRef = ref(false)

    const today = ref( new Date() )
    const meetingDateTime = reactive({
      year: parseInt( dateFormat( today.value , 'yyyy') ) ,
      month: parseInt( dateFormat( today.value , 'mm') ) ,
      day: parseInt( dateFormat( today.value , 'dd') ) ,
      start: {
        hour : parseInt( dateFormat( today.value , 'H') ) ,
        minutes : parseInt( dateFormat( today.value , 'MM') )
      },
      end: {
        hour: parseInt( dateFormat( today.value , 'H') ) ,
        minutes: parseInt( dateFormat( today.value , 'MM') )
      }
    })

    /**
     * Variables
     */    
    const rules = {
        objective: {
          required: true,
          message: 'សូមបំពេញខ្លឹមសារនៃការងារ។',
          trigger: [ 'blur']
        }
    }

    function clearForm(){
      props.record.id = 0
      
      today.value = new Date()

      meetingDateTime.year = parseInt( dateFormat( today.value , 'yyyy') )
      meetingDateTime.month = parseInt( dateFormat( today.value , 'mm') )
      meetingDateTime.day = parseInt( dateFormat( today.value , 'dd') )
      meetingDateTime.start = {
        hour : parseInt( dateFormat( today.value , 'H') ) ,
        minutes : parseInt( dateFormat( today.value , 'MM') )
      }
      meetingDateTime.end = {
        hour: parseInt( dateFormat( today.value , 'H') ) ,
        minutes: parseInt( dateFormat( today.value , 'MM') )
      }

      if( props.show == true ){
        props.onClose()
      }
    }

    function update(){
      if( props.record.objective == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ កម្មវត្ថុ' ,
          duration : 3000
        })
        return false
      }

      // Check date time
      // year: parseInt( dateFormat( new Date() , 'yyyy') ),
      // month: parseInt( dateFormat( new Date() , 'mm') ),
      // day: parseInt( dateFormat( new Date() , 'dd') )

      if( props.model === undefined || props.model.name == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration : 3000
        })
        return false
      }

      /**
       * Saving information of the regulator
       */
      // let year = new Date(props.record.year) 
      // notify.info({
      //   title: 'រក្សារទុកព័ត៌មាន' ,
      //   description: 'កំពុងរក្សារទុកព័ត៌មាន។' ,
      //   duration: 3000
      // })

      // props.record.date = [meetingDateTime.year,meetingDateTime.month,meetingDateTime.day].join('-')
      // props.record.start = [meetingDateTime.start.hour,meetingDateTime.start.minutes].join(':')
      // props.record.end = [meetingDateTime.end.hour,meetingDateTime.end.minutes].join(':')
      // props.record.type_id = selectedType.value > 0 ? selectedType.value : 0 

      btnSavingLoadingRef.value = true
      store.dispatch( props.model.name+'/update',{
        id: props.record.id ,
        objective: props.record.objective ,
        minutes: props.record.minutes ,
        start: props.record.start ,
        end: props.record.end ,
        amount: props.record.amount ,
        amount_type : props.record.amount_type ,
      }).then( res => {
        switch( res.status ){
          case 200 : 
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: 'រក្សារទុកព័ត៌មានរបស់ឯកសាររួចរាល់។' ,
            duration: 3000
          })
          props.record.id = res.data.record.id
          clearForm()
          btnSavingLoadingRef.value = false
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
          duration : 3000
        })
      })
    }

    function closeModal(){
      console.log( props.show )
      if( props.show == true ){
        props.onClose()
      }
    }

    function initial(){
      today.value = props.record.date ? new Date( props.record.date ) : new Date()
      meetingDateTime.year = parseInt( dateFormat( today.value , 'yyyy') ) ,
      meetingDateTime.month = parseInt( dateFormat( today.value , 'mm') ) ,
      meetingDateTime.day = parseInt( dateFormat( today.value , 'dd') ) ,
      meetingDateTime.start = props.record.start == null 
        ? { hour : parseInt( dateFormat( today.value , 'HH') ) , minutes : parseInt( dateFormat( today.value , 'MM') ) }
        : { hour : parseInt( props.record.start.split(":")[0] ) , minutes : parseInt( props.record.start.split(":")[1] ) }

      meetingDateTime.end = props.record.start == null 
        ? { hour : parseInt( dateFormat( today.value , 'HH') ) , minutes : parseInt( dateFormat( today.value , 'MM') ) }
        : { hour : parseInt( props.record.end.split(":")[0] ) , minutes : parseInt( props.record.end.split(":")[1] ) }
    }

    return {
      /**
       * Variables
       */
      rules ,
      btnSavingLoadingRef ,
      meetingDateTime ,
      /**
       * Functions
       */
      initial ,
      update ,
      closeModal
    }
  }
}
</script>