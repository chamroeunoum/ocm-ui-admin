<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" :title="'បន្ថែម ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" :disabled="btnSavingLoadingRef" @click="create()" :loading="btnSavingLoadingRef" >
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
                  <n-form-item label="ប្រភេទ" path="type" class="w-4/5 mr-8" >
                    <n-select
                      v-model:value="selectedTypes"
                      filterable
                      placeholder="សូមជ្រើសរើសប្រភេទឯកសារ"
                      :options="types"
                    />
                  </n-form-item>
                  <n-form-item label="លេខ" path="number" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.number" placeholder="លេខ" />
                  </n-form-item>
                  <n-form-item label="ចំណងជើង" path="title" class="w-4/5 mr-8" >
                    <n-input v-model:value="record.title" placeholder="ចំណងជើង" />
                  </n-form-item>
                  <n-form-item label="កម្មវត្ថុ" path="objective" class="w-4/5 mr-8" >
                    <n-input type="textarea" v-model:value="record.objective" placeholder="កម្មវត្ថុ" />
                  </n-form-item>
                  <n-form-item label="កាលបរិច្ឆែក" path="year" class="w-4/5 mr-8" >
                    <!-- <n-date-picker v-model:value="record.year" placeholder="កាលបរិច្ឆែក" type="date" clearable class="w-full" /> -->
                    <n-input-number v-model:value="regulatorDate.year" :step="1" :min="1" clearable ><template #prefix>ឆ្នាំ</template></n-input-number>
                    <n-input-number v-model:value="regulatorDate.month" :step="1" :min="1" :max="12" clearable ><template #prefix>ខែ</template></n-input-number>
                    <n-input-number v-model:value="regulatorDate.day" :step="1" :min="1" :max="31" clearable ><template #prefix>ថ្ងៃ</template></n-input-number>
                  </n-form-item>
                  
                  <n-form-item label="ហត្ថលេខា" path="email" class="w-4/5 mr-8" >
                    <n-select
                      v-model:value="selectedSignatures"
                      filterable
                      placeholder="សូមជ្រើសរើសហត្ថលេខា"
                      :options="signatures"
                      multiple
                    />
                  </n-form-item>
                  <n-form-item label="ក្រសួងស្ថាប័ន" path="organization" class="w-4/5 mr-8" >
                    <n-select
                      v-model:value="selectedOrganizations"
                      filterable
                      placeholder="សូមជ្រើសរើសក្រសួងស្ថាប័ន"
                      :options="organizations"
                      multiple
                    />
                  </n-form-item>
                  <n-form-item label="ក្រសួងស្ថាប័នសមី" path="ownOrganization" class="w-4/5 mr-8" >
                    <n-select
                      v-model:value="selectedOwnOrganizations"
                      filterable
                      placeholder="សូមជ្រើសរើសក្រសួងស្ថាប័នសាមី"
                      :options="ownOrganizations"
                      multiple
                    />
                  </n-form-item>
                  <!-- <n-form-item label="ក្រសួងស្ថាប័នពាក់ព័ន្ធ" path="relatedOrganization" class="w-4/5 mr-8" >
                    <n-select
                      v-model:value="selectedRelatedOrganizations"
                      filterable
                      placeholder="សូមជ្រើសរើសក្រសួងស្ថាប័នពាក់ព័ន្ធ"
                      :options="relatedOrganizations"
                      multiple
                    />
                  </n-form-item> -->
                  <n-form-item label="ឯកសារយោង" path="pdfs" class="w-4/5 mr-8" >
                    <input type="file" placeholder="ឯកសារយោង" @change="fileChange" class="hidden " id="referenceDocument" />
                    <div class="border rounded border-gray-200 w-full text-sm text-center cursor-pointer hover:border-green-500" @click="clickUpload" >
                      <div class="no-files-upload h-full w-full p-4">
                        <svg class="no-files-upload h-full w-20 mx-auto p-4 text-red-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M7.503 13.002a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-.5H8.5a1.5 1.5 0 0 0 0-3h-.997zm.997 2h-.497v-1H8.5a.5.5 0 1 1 0 1zm6.498-1.5a.5.5 0 0 1 .5-.5h1.505a.5.5 0 1 1 0 1h-1.006l-.001 1.002h1.007a.5.5 0 0 1 0 1h-1.007l.002.497a.5.5 0 0 1-1 .002l-.003-.998v-.002l.003-2.002zm-3.498-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h.498a2 2 0 0 0 0-4H11.5zm.5 3v-2a1 1 0 0 1 0 2zM20 20v-1.164c.591-.281 1-.884 1-1.582V12.75c0-.698-.409-1.3-1-1.582v-1.34a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7.168c-.591.281-1 .884-1 1.582v4.504c0 .698.409 1.3 1 1.582V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-2 .5H6a.5.5 0 0 1-.5-.5v-.996h13V20a.5.5 0 0 1-.5.5zm.5-10.5v1h-13V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5zm-1.122-1.5H14a.5.5 0 0 1-.5-.5V4.621L17.378 8.5zm-12.628 4h14.5a.25.25 0 0 1 .25.25v4.504a.25.25 0 0 1-.25.25H4.75a.25.25 0 0 1-.25-.25V12.75a.25.25 0 0 1 .25-.25z" fill="currentColor"></path></g></svg>
                        <br/>សូមបញ្ចូលឯកសារយោង។
                      </div>
                      <div class="list-files-upload w-full p-4" >
                        <div class="selectedFiles w-full m-2" v-for="(pdf,index) in record.pdfs" :key="index" v-html="'ឯកសារយោងមានឈ្មោះ៖ ' + pdf.name + ' , ទំហំ៖ ' + (pdf.size/1024/1024).toFixed(2) + ' មេកាបៃ (MB)' " ></div>
                      </div>
                    </div>
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
import { Save20Regular } from '@vicons/fluent'
import { DocumentPdf24Regular } from '@vicons/fluent'
import dateFormat from "dateformat";

export default {
  components: {
    Save20Regular ,
    DocumentPdf24Regular
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
          number: '' ,
          title: '' ,
          objective: '' ,
          active: 1 ,
          year: null ,
          pdfs: [] ,
          types: [] ,
          signatures: [] ,
          orgainzations: [] ,
          ownOrgainzations: [] ,
          relatedOrgainzations: [] ,
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
    const btnSavingLoadingRef = ref(false)

    const selectedTypes = ref([])
    const selectedOrganizations = ref([])
    const selectedOwnOrganizations = ref([])
    const selectedRelatedOrganizations = ref([])
    const selectedSignatures = ref([])

    const regulatorDate = reactive({
      year: parseInt( dateFormat( new Date() , 'yyyy') ),
      month: parseInt( dateFormat( new Date() , 'mm') ),
      day: parseInt( dateFormat( new Date() , 'dd') )
    })
    /**
     * Variables
     */    
    const rules = {
        firstname: {
          required: true,
          message: 'សូមបញ្ចូលនាមខ្លួន',
          trigger: [ 'blur']
        },
        lastname: {
          required: true,
          message: 'សូមបញ្ចូលត្រកូល',
          trigger: [ 'blur']
        },
        password: {
          required: true,
          message: 'សូមបញ្ចូលពាក្យសម្ងាត់',
          trigger: [ 'blur']
        }
    }
    
    const types = computed(()=>{
      return store.getters['regulatorType/getRecords'].map( 
        type => (
          { label: type.name , value : type.id }
        )
      )
    })
    const organizations = computed(()=>{
      return store.getters['regulatorOrganization/getRecords'].map( 
        organization => (
          { label: organization.name , value : organization.id }
        )
      )
    })
    const ownOrganizations = computed(()=>{
      return store.getters['regulatorOrganization/getRecords'].map( 
        organization => (
          { label: organization.name , value : organization.id }
        )
      )
    })
    const relatedOrganizations = computed(()=>{
      return store.getters['regulatorOrganization/getRecords'].map( 
        organization => (
          { label: organization.name , value : organization.id }
        )
      )
    })
    const signatures = computed(()=>{
      return store.getters['regulatorSignature/getRecords'].map( 
        signature => (
          { label: signature.name , value : signature.id }
        )
      )
    })

    /**
     * File upload
     */
    /**
     * On change
     */
    function fileChange(event){
      for(const file of event.target.files ){
        // if( index == 'item' || index == 'length' ) continue;

        // allowed types
        let allowed_mime_types = [ 
          /**
           * Image mime type
           */
          // 'image/jpeg', 'image/png' 
          /**
           * Application file mime type
           */
          "application/pdf"
          ];
        
        // allowed max size in MB
        let allowed_size_mb = 25;

        // Validate file type
        if(allowed_mime_types.indexOf(file.type) == -1) {
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ឯកសារនេះជាប្រភេទ៖ "+ file.type +"។ អនុញ្ញាតតែឯកសារដែលមានប្រភេទជា PDF។" ,
            duration: 3000
          })
          return;
        }

        // Validate file size
        if(file.size > allowed_size_mb*1024*1024) {
          notify.error({
            title: "ឯកសារយោង" ,
            description: "ទំហំនៃឯកសារគឺ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
            duration: 3000
          })
          return;
        }


        let reader = new FileReader();
        reader.onerror = function(e) {
          console.log('On error');
        };
        reader.onprogress = function(e) {
          console.log('On progress');
        };
        reader.onabort = function(e) {
          console.log('On abort');
        };
        reader.onloadstart = function(e) {
          console.log( "On load start" )
        };
        reader.onload = function(e) {
          // Ensure that the progress bar displays 100% at the end.
          console.log( 'On load' )
          /**
           * Read binary string from 'e.target.result' and convert to base64
           */
          props.record.pdfs.push( btoa( e.target.result ) );
          // formData.append('files', btoa( e.target.result ) )
        }
        // // // Read in the image file as base64 type
        // // reader.readAsDataURL(file);
        reader.readAsBinaryString(file);

        // // Read in the image file as base64 type
        // props.record.pdfs.push( window.URL.createObjectURL( file ) )
        props.record.pdfs.push( file )
      }
    }
    /**
     * On click file upload
     */
    function clickUpload(){
      document.getElementById('referenceDocument').click()
    }
    function uploadFiles(){
      // console.log( props.record.pdfs )
      let formData = new FormData();
      formData.append('id', props.record.id )
      formData.append('files', props.record.pdfs[0] )
      notify.info({
        title: 'រក្សារទុកព័ត៌មាន' ,
        description: 'កំពុងបញ្ចូលឯកសារយោង។' ,
        duration: 3000
      })
      store.dispatch('regulator/upload', formData ).then( res => {
        notify.success({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'បានបញ្ចូលឯកសារយោងរួចរាល់។' ,
          duration: 3000
        })
        props.record.pdfs = []
        btnSavingLoadingRef.value = false 
        props.onClose()
      }).catch( err => {
        console.log( err )
        notify.error({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលបញ្ចូលឯកសារយោង។' ,
          duration: 3000
        })
      })
      // props.onClose()
    }

    function create(){
      if( props.record.number == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ លេខឯកសារ' ,
          duration : 3000
        })
        return false
      }
      if( props.record.objective == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ កម្មវត្ថុ' ,
          duration : 3000
        })
        return false
      }
      // if( props.record.year == null ){
      //   notify.warning({
      //     'title' : 'ពិនិត្យព័ត៌មាន' ,
      //     'description' : 'សូមជ្រើសរើស ថ្ងៃចុះឯកសារ' ,
      //     duration : 3000
      //   })
      //   return false
      // }
      if( regulatorDate.year <= 0 || regulatorDate.month <= 0 ||  regulatorDate.day <= 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមជ្រើសរើស ថ្ងៃចុះឯកសារ' ,
          duration : 3000
        })
        return false
      }
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
      notify.info({
        title: 'រក្សារទុកព័ត៌មាន' ,
        description: 'កំពុងរក្សារទុកព័ត៌មាន។' ,
        duration: 3000
      })
      btnSavingLoadingRef.value = true
      store.dispatch( props.model.name+'/create',{
        // id: props.record.id ,
        number: props.record.number.toString().padStart(4,'0') ,
        title: props.record.title ,
        objective: props.record.objective ,
        active: 1 ,
        // year: year.getFullYear().toString().padStart(4, '0') + "-" + (year.getMonth() + 1).toString().padStart(2, '0') + "-" + year.getDate().toString().padStart(2, '0') ,
        year: regulatorDate.year.toString().padStart(4,0) + "-" + regulatorDate.month.toString().padStart(2,0) + "-" + regulatorDate.day.toString().padStart(2,0)  ,
        types: selectedTypes.value ,
        organizations: selectedOrganizations.value ,
        ownOrganizations: selectedOwnOrganizations.value ,
        relatedOrganizations: selectedRelatedOrganizations.value ,
        signatures: selectedSignatures.value ,
      }).then( res => {
        switch( res.status ){
          case 200 : 
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: 'រក្សារទុកព័ត៌មានរបស់ឯកសាររួចរាល់។' ,
            duration: 3000
          })
          document.getElementById('referenceDocument').value = ''
          props.record.id = res.data.record.id
          /**
           * Start uploading reference document of this regulator
           */
          if( res.data.record.id > 0 && props.record.pdfs.length > 0 ){
            uploadFiles()
          }else{
            btnSavingLoadingRef.value = false
          }
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
    
    function checkPhone(){
      if( props.record.phone != "" ){
        store.dispatch('user/checkPhone',{phone: props.record.phone}).then( res => {
          if( res.data.ok ){
            notify.info({
              title: 'ពិនិត្យលេខទូរស័ព្ទ' ,
              description : "លេខទូរស័ព្ទ មានរួចហើយ។" ,
              duration : 3000
            })
          }
        }).catch( err => {
          console.log( err )
          notify.error({
            'title' : 'ពិនិត្យលេខទូរស័ព្ទ' ,
            'description' : 'មានបញ្ហាក្នុងពេលពិនិត្យលេខទូរស័ព្ទ។' ,
            duration : 3000
          })
        })
      }
    }

    return {
      /**
       * Variables
       */
      rules ,
      btnSavingLoadingRef ,
      types ,
      signatures ,
      organizations ,
      ownOrganizations ,
      relatedOrganizations ,
      selectedTypes ,
      selectedOrganizations ,
      selectedOwnOrganizations ,
      selectedRelatedOrganizations ,
      selectedSignatures ,
      /**
       * Functions
       */
      create ,
      /**
       * File upload
       */
      fileChange , 
      clickUpload ,
      uploadFiles ,
      regulatorDate
    }
  }
}
</script>