<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" :on-after-enter="initial" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" :title="'កែប្រែ ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" :disabled="btnSavingLoadingRef" @click="update" :loading="btnSavingLoadingRef" >
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
                  <!-- <n-form-item label="បិទ ឬ បើកឯកសារ" path="active" class="w-4/5 mr-8" >
                    <n-radio
                      :checked="parseInt(record.active) === 1"
                      name="documentStatus"
                      @change="handleDocumentStatus(1)"
                    >បើកការប្រើប្រាស់</n-radio>
                    <n-radio
                      :checked="parseInt(record.active) === 0"
                      name="documentStatus"
                      @change="handleDocumentStatus(0)"
                    >បិទការប្រើប្រាស់</n-radio>
                  </n-form-item> -->
                  <n-form-item label="ឯកសារយោង" path="pdfs" class="w-4/5 mr-8" >
                    <input type="file" placeholder="ឯកសារយោង" @change="fileChange" class="hidden " id="referenceDocument" />
                    <div class="border rounded border-gray-200 w-full text-sm text-center cursor-pointer hover:border-green-500" @click="clickUpload" >
                      <div class="no-files-upload h-full w-full p-4">
                        <n-icon size="40" class="text-red-600" >
                          <DocumentPdf24Regular />
                        </n-icon>
                        <br/>បញ្ចូលឯកសារយោង ដើម្បីជំនួសឯកសារដែលមានរួចហើយ។
                        <br/>
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
          publish: 0 ,
          types: [] ,
          signatures: [] ,
          organizations: []
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
    const selectedType = ref(null)
    const selectedOrganizations = ref([])
    const selectedOwnOrganizations = ref([])
    const selectedRelatedOrganizations = ref([])
    const selectedSignatures = ref([])

    const regulatorDate = reactive({
      year: parseInt( dateFormat( props.record.year , 'yyyy') ),
      month: parseInt( dateFormat( props.record.year , 'mm') ),
      day: parseInt( dateFormat( props.record.year , 'dd') )
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
          { label: type.id + ". " + type.name , value : type.id }
        )
      )
    })
    const organizations = computed(()=>{
      return store.getters['regulatorOrganization/getRecords'].map( 
        organization => (
          { label: organization.id + ". " + organization.name , value : organization.id }
        )
      )
    })
    const ownOrganizations = computed(()=>{
      return store.getters['regulatorOrganization/getRecords'].map( 
        organization => (
          { label: organization.id + ". " + organization.name , value : organization.id }
        )
      )
    })
    const relatedOrganizations = computed(()=>{
      return store.getters['regulatorOrganization/getRecords'].map( 
        organization => (
          { label: organization.id + ". " + organization.name , value : organization.id }
        )
      )
    })
    const signatures = computed(()=>{
      return store.getters['regulatorSignature/getRecords'].map( 
        signature => (
          { label: signature.id + ". " + signature.name , value : signature.id }
        )
      )
    })

    const publish = ref(false)

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


        // let reader = new FileReader();
        // reader.onerror = function(e) {
        //   console.log('On error');
        // };
        // reader.onprogress = function(e) {
        //   console.log('On progress');
        // };
        // reader.onabort = function(e) {
        //   console.log('On abort');
        // };
        // reader.onloadstart = function(e) {
        //   console.log( "On load start" )
        // };
        // reader.onload = function(e) {
        //   // Ensure that the progress bar displays 100% at the end.
        //   console.log( 'On load' )
        //   /**
        //    * Read binary string from 'e.target.result' and convert to base64
        //    */
        //   props.record.pdfs.push( btoa( e.target.result ) );
        //   // formData.append('files', btoa( e.target.result ) )
        // }
        // // // // Read in the image file as base64 type
        // // // reader.readAsDataURL(file);
        // reader.readAsBinaryString(file);

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
      // notify.info({
      //   title: 'រក្សារទុកព័ត៌មាន' ,
      //   description: 'កំពុងបញ្ចូលឯកសារយោង។' ,
      //   duration: 3000
      // })
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

    function update(){
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
      let year = new Date(props.record.year) 
      // notify.info({
      //   title: 'រក្សារទុកព័ត៌មាន' ,
      //   description: 'កំពុងរក្សារទុកព័ត៌មាន។' ,
      //   duration: 3000
      // })
      btnSavingLoadingRef.value = true
      store.dispatch( props.model.name+'/update',{
        id: props.record.id ,
        number: props.record.number.toString().padStart(4,'0') ,
        title: props.record.title ,
        objective: props.record.objective ,
        // year: year.getFullYear().toString().padStart(4, '0') + "-" + (year.getMonth() + 1).toString().padStart(2, '0') + "-" + year.getDate().toString().padStart(2, '0') ,
        year: regulatorDate.year.toString().padStart(4,0) + "-" + regulatorDate.month.toString().padStart(2,0) + "-" + regulatorDate.day.toString().padStart(2,0)  ,
        active: parseInt( props.record.active ) > 0 ? 1 : 0 ,
        types: selectedTypes.value ,
        organizations: selectedOrganizations.value ,
        ownOrganizations: selectedOwnOrganizations.value ,
        relatedOrganizations: selectedRelatedOrganizations.value ,
        signatures: selectedSignatures.value ,
      }).then( res => {
        switch( res.status ){
          case 200 : 
            document.getElementById('referenceDocument').value = ''     
            if( res.data.ok ){
              // notify.success({
              //   title: 'រក្សារទុកព័ត៌មាន' ,
              //   description: 'រក្សារទុកព័ត៌មានរបស់ឯកសាររួចរាល់។' ,
              //   duration: 3000
              // })
              /**
               * Start uploading reference document of this regulator
               */
              if( res.data.record.id > 0 && props.record.pdfs.length > 0 ){
                uploadFiles()
              }else{
                props.record.pdfs = []
                btnSavingLoadingRef.value = false
              }
            }else{
              props.record.pdfs = []
              btnSavingLoadingRef.value = false
              notify.warning({
                title: 'រក្សារទុកព័ត៌មាន' ,
                description: res.data.message ,
                duration: 3000
              })
            }
          break;
        }
      }).catch( err => {
        document.getElementById('referenceDocument').value = ''
        props.record.pdfs = []
        btnSavingLoadingRef.value = false
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
    
    function handleDocumentStatus(val){
      props.record.active = parseInt( val )
    }

    function initial(){
      // selectedTypes.value = Array.isArray( props.record.types ) ? props.record.types.map( s => s.id ) : []
      selectedTypes.value = Array.isArray( props.record.types ) && props.record.types.length > 0 ? props.record.types[0].id : null
      selectedOrganizations.value = Array.isArray( props.record.organizations ) ? props.record.organizations.map( o => o.id ) : []
      selectedOwnOrganizations.value = Array.isArray( props.record.ownOrganizations ) ? props.record.ownOrganizations.map( s => s.id ) : []
      selectedRelatedOrganizations.value = Array.isArray( props.record.relatedOrganizations ) ? props.record.relatedOrganizations.map( s => s.id ) : []
      selectedSignatures.value = Array.isArray( props.record.signatures ) ? props.record.signatures.map( s => s.id ) : []
      regulatorDate.year = parseInt( dateFormat( props.record.year , 'yyyy') )
      regulatorDate.month = parseInt( dateFormat( props.record.year , 'mm') )
      regulatorDate.day = parseInt( dateFormat( props.record.year , 'dd') )
    }

    return {
      /**
       * Computed
       */
      /**
       * Variables
       */
      rules ,
      btnSavingLoadingRef ,
      publish ,
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
      update ,
      checkPhone ,
      handleDocumentStatus ,
      /**
       * File upload
       */
      fileChange , 
      clickUpload ,
      uploadFiles ,
      initial ,
      regulatorDate
    }
  }
}
</script>