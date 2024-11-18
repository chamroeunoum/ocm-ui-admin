<template>
  <div class="pk-form-panel" >
    <div class="flex title-bar border-b border-gray-200">
        <!-- Title of crud -->
        <div class="flex-grow h-10 py-1 title relative" >
          <svg class="text-red-600 mr-2 absolute top-2 left-0 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M7.503 13.002a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-.5H8.5a1.5 1.5 0 0 0 0-3h-.997zm.997 2h-.497v-1H8.5a.5.5 0 1 1 0 1zm6.498-1.5a.5.5 0 0 1 .5-.5h1.505a.5.5 0 1 1 0 1h-1.006l-.001 1.002h1.007a.5.5 0 0 1 0 1h-1.007l.002.497a.5.5 0 0 1-1 .002l-.003-.998v-.002l.003-2.002zm-3.498-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h.498a2 2 0 0 0 0-4H11.5zm.5 3v-2a1 1 0 0 1 0 2zM20 20v-1.164c.591-.281 1-.884 1-1.582V12.75c0-.698-.409-1.3-1-1.582v-1.34a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7.168c-.591.281-1 .884-1 1.582v4.504c0 .698.409 1.3 1 1.582V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-2 .5H6a.5.5 0 0 1-.5-.5v-.996h13V20a.5.5 0 0 1-.5.5zm.5-10.5v1h-13V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5zm-1.122-1.5H14a.5.5 0 0 1-.5-.5V4.621L17.378 8.5zm-12.628 4h14.5a.25.25 0 0 1 .25.25v4.504a.25.25 0 0 1-.25.25H4.75a.25.25 0 0 1-.25-.25V12.75a.25.25 0 0 1 .25-.25z" fill="currentColor"></path></g></svg>
          <div class="leading-10 font-bold ml-8 text-left" >Title</div>
        </div>
      </div>
    <n-card class="w-1/2 mx-auto font-pvh text-xl" :title="'បន្ថែម ' + model.title" :bordered="false" size="small">
      <template #header-extra>
        <n-button type="success" :disabled="btnSavingLoadingRef" @click="create()" :loading="btnSavingLoadingRef" >
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
              <n-form-item label="លេខ" path="number" class="w-4/5 mr-8" >
                <n-input v-model:value="record.number" placeholder="លេខ" />
              </n-form-item>
              <n-form-item label="ចំណងជើង" path="title" class="w-4/5 mr-8" >
                <n-input v-model:value="record.title" placeholder="ចំណងជើង" />
              </n-form-item>
              <n-form-item label="អត្ថន័យ" path="meaning" class="w-4/5 mr-8" >
                <n-input type="textarea" v-model:value="record.meaning" placeholder="អត្ថន័យ" />
              </n-form-item>
              <n-form-item v-if="kunties" label="គន្ថី" path="kunthy" class="w-4/5 mr-8" >
                <n-select
                  v-model:value="record.kunty_id"
                  filterable
                  placeholder="សូមជ្រើសរើសគន្ថី"
                  :options="kunties"
                  @update:value="kuntyChange"
                  @search="handleSearchKunty"  
                  clearable
                />
              </n-form-item>
              <n-form-item v-if="matikas.length" label="មាតិកា" path="matika" class="w-4/5 mr-8" >
                <n-select
                  v-model:value="record.matika_id"
                  filterable
                  placeholder="សូមជ្រើសរើសមាតិកា"
                  :options="matikas"
                  @update:value="matikaChange"
                  @search="handleSearchMatika"  
                  clearable
                />
              </n-form-item>
              <n-form-item v-if="chapters.length" label="ជំពូក" path="chapter" class="w-4/5 mr-8" >
                <n-select
                  v-model:value="record.chapter_id"
                  filterable
                  placeholder="សូមជ្រើសរើសជំពូក"
                  :options="chapters"
                  @update:value="chapterChange"
                  @search="handleSearchChapter"  
                />
              </n-form-item>
              <n-form-item v-if="parts.length" label="ផ្នែក" path="part" class="w-4/5 mr-8" >
                <n-select
                  v-model:value="record.part_id"
                  filterable
                  placeholder="សូមជ្រើសរើសផ្នែក"
                  :options="parts"
                  @update:value="partChange"
                  @search="handleSearchPart"  
                />
              </n-form-item>
              <n-form-item v-if="sections.length" label="កថាភាគ" path="section" class="w-4/5 mr-8" >
                <n-select
                  v-model:value="record.section_id"
                  filterable
                  placeholder="សូមជ្រើសរើសកថាភាគ"
                  :options="sections"
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
  </div>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useDialog, useMessage, useNotification } from 'naive-ui'

export default {
  components: {
    
  },
  setup(){
    const model = reactive({
      name: 'matra' ,
      title: 'បន្ថែមមាត្រា'
    })
    const store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const route = useRoute()
    const btnSavingLoadingRef = ref(false)

    /**
     * Variables for select
     */
    /**
     * Select value
     */
    const record = reactive({
      number: '' ,
      title: '' ,
      meaning: '' ,
      book_id: 0 ,
      kunty_id: 0 ,
      matika_id: 0 ,
      chapter_id: 0 ,
      part_id: 0 ,
      section_id: 0 ,
      active: 1
    })

    /**
     * Variables
     */    
    const rules = {
        number: {
          required: true,
          message: 'សូមបញ្ចូលលេខ',
          trigger: [ 'blur']
        },
        title: {
          required: true,
          message: 'សូមបញ្ចូលចំណងជើង',
          trigger: [ 'blur']
        },
        meaning: {
          required: true,
          message: 'សូមបញ្ចូលអត្ថន័យ',
          trigger: [ 'blur']
        }
    }

    function create(){
      if( record.number == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបញ្ចូល លេខមាត្រា' ,
          duration : 3000
        })
        return false
      }
      if( record.title == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបញ្ចូល ចំណងជើងមាត្រា' ,
          duration : 3000
        })
        return false
      }
      if( record.meaning == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបញ្ចូល អត្ថន័យមាត្រា' ,
          duration : 3000
        })
        return false
      }
      if( model === undefined || model.name == "" ){
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
      notify.info({
        title: 'រក្សារទុកព័ត៌មាន' ,
        description: 'កំពុងរក្សារទុកមាត្រា។' ,
        duration: 3000
      })
      btnSavingLoadingRef.value = true
      store.dispatch( model.name+'/create',{
        // id: record.id ,
        number: record.number.toString().padStart(4,'0') ,
        title: record.title ,
        meaning: record.meaning ,
        active: 1 ,
        book_id: route.params.id ,
        kunty_id: record.kunty_id ,
        matika_id: record.matika_id ,
        chapter_id: record.chapter_id ,
        part_id: record.part_id ,
        section_id: record.section_id
      }).then( res => {
        switch( res.status ){
          case 200 : 
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: 'រក្សារទុកព័ត៌មានរបស់ឯកសាររួចរាល់។' ,
            duration: 3000
          })
          record.id = res.data.record.id
          break;
        }
        clearVariables()
        onClose()
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
          duration : 3000
        })
      })
    }
    /**
     * Clear any variable from the form
     */
    function clearVariables(){
      matikas.value = []
      chapters.value = []
      parts.value = []
      sections.value = []
      record.number = '' 
      record.title = '' 
      record.meaning = '' 
      record.book_id = 0 
      record.kunty_id = 0
      record.matika_id = 0
      record.chapter_id = 0
      record.part_id = 0
      record.section_id = 0
      record.active = 1
      btnSavingLoadingRef.value = false
    }
    
    /**
     * Load pivot data of this model
     */
    const kunties = ref([])
    const toggleKunty = computed( () => {
      return kunties.value != undefined && kunties.value.length > 0
    })
    const selectedKunty = ref(null)
    const kuntySelectLoading = ref(false)
    
    function kuntyChange(val){
      matikas.value = []
      selectedMatika.value = null
      chapters.value = [] 
      selectedChapter.value = null
      parts.value = [] 
      selectedPart.value = null
      sections.value = [] 
      selectedSection.value = null
      getRecords()
      if( !(val > 0) ) return ;
      store.dispatch('kunty/matika',{id : val }).then( res =>{
        /**
         * Apply the kunty, matika to the dropdownlist
         */
        if( res.data.ok ){
          if( Array.isArray( res.data.records ) && res.data.records.length > 0 ){
            matikas.value = res.data.records.map( record => { return { label: record.number + "៖ " + record.title , value: record.id } } )
          }else{
            store.dispatch('kunty/chapter',{id:val}).then(res => {
              if( Array.isArray( res.data.records ) && res.data.records.length > 0 ){
                chapters.value = res.data.records.map( record => { return { label: record.number + "៖ " + record.title , value: record.id } } )
              }
            }).catch( err => {
              console.log( err )
              notify.error({
                title: "អានជំពូកនៃមាតិកា" ,
                description: "មានបញ្ហាពេលអានជំពូកនៃមាតិកា" ,
                duration: 3000
              })
            })
          }
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          title: "អានមាតិកា" ,
          description: "មានបញ្ហាពេលអានមាតិកា" ,
          duration: 3000
        })
      })
    }

    function handleSearchKunty(query){
      if (!query.length) {
        kunties.value = [];
        return;
      }
      getKunties(query)
    }

    function getKunties(query){
      kunties.value = []
      kuntySelectLoading.value = true 
      store.dispatch('kunty/compact',{
        page: 1 ,
        perPage : 100 ,
        search : query ,
        book_id: record.book_id
      }).then(res=>{
        if(res.data.ok){
          store.commit('kunty/setRecords',res.data.records)
          kunties.value = res.data.records.map( 
            record => { 
              return {
                label: record.title , 
                value: record.id
              } 
            } 
          )
          selectedKunty.value = []
        }else{
          notify.error({
            title: 'អានគន្ថី' ,
            description: 'មានបញ្ហាក្នុងពេលអានគន្ថី។'
          })
        }
      }).catch(err =>{
        notify.error({
          title: 'អានគន្ថី' ,
          description: 'មានបញ្ហាក្នុងពេលអានគន្ថី។'
        })
        console.log( err )
      })
      kuntySelectLoading.value = false
    }

    /**
     * Load pivot data of this model
     */
    const matikas = ref([])
    const toggleMatika = computed( () => {
      return matikas.value != undefined && matikas.value.length > 0
    })
    const selectedMatika = ref(null)
    const matikaSelectLoading = ref(false)

    function matikaChange(val){
      chapters.value = [] 
      selectedChapter.value = null
      parts.value = [] 
      selectedPart.value = null
      sections.value = [] 
      selectedSection.value = null
      getRecords()
      if( !(val > 0) ) return ;
      store.dispatch('matika/chapter',{id : val }).then( res =>{
        /**
         * Apply the kunty, matika to the dropdownlist
         */
        if( res.data.ok ){
          if( Array.isArray( res.data.records ) && res.data.records.length > 0 ){
            chapters.value = res.data.records.map( record => { return { label: record.number + "៖ " + record.title , value: record.id } } )
          }
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          title: "អានជំពូក" ,
          description: "មានបញ្ហាពេលអានជំពូក" ,
          duration: 3000
        })
      })
    }
    
    function handleSearchMatika(query){
      if (!query.length) {
        matikas.value = [];
        return;
      }
      getMatikas(query)
    }

    function getMatikas(query){
      matikas.value = []
      matikaSelectLoading.value = true 
      store.dispatch('matika/compact',{
        page: 1 ,
        perPage : 100 ,
        search : query ,
        bid: record.book_id ,
        kunty_id: selectedKunty.value
      }).then(res=>{
        if(res.data.ok){
          store.commit('matika/setRecords',res.data.records)
          matikas.value = res.data.records.map( 
            record => { 
              return {
                label: record.title , 
                value: record.id
              } 
            } 
          )
          selectedMatika.value = []
        }else{
          notify.error({
            title: 'អានមាតិកា' ,
            description: 'មានបញ្ហាក្នុងពេលអានមាតិកា។'
          })
        }
      }).catch(err =>{
        notify.error({
            title: 'អានមាតិកា' ,
            description: 'មានបញ្ហាក្នុងពេលអានមាតិកា។'
          })
        console.log( err )
      })
      matikaSelectLoading.value = false
    }

    /**
     * Load pivot data of this model
     */
    const chapters = ref([])
    const toggleChapter = computed( () => {
      return chapters.value != undefined && chapters.value.length > 0
    })
    const selectedChapter = ref(null)
    const chapterSelectLoading = ref(false)

    function chapterChange(val){
      parts.value = [] 
      selectedPart.value = null
      sections.value = [] 
      selectedSection.value = null
      getRecords()
      if( !(val > 0) ) return ;
      store.dispatch('chapter/part',{id : val }).then( res =>{
        /**
         * Apply the kunty, matika to the dropdownlist
         */
        if( res.data.ok ){
          if( Array.isArray( res.data.records ) && res.data.records.length > 0 ){
            parts.value = res.data.records.map( record => { return { label: record.number + "៖ " + record.title , value: record.id } } )
          }
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          title: "អានផ្នែក" ,
          description: "មានបញ្ហាពេលអានផ្នែក" ,
          duration: 3000
        })
      })
    }
    
    function handleSearchChapter(query){
      if (!query.length) {
        chapters.value = [];
        return;
      }
    }

    function getChapters(query){
      chapters.value = []
      chapterSelectLoading.value = true 
      store.dispatch('chapter/compact',{
        page: 1 ,
        perPage : 100 ,
        search : query ,
        book_id: record.book_id ,
        kunty_id: selectedKunty.value ,
        matika_id: selectedMatika.value
      }).then(res=>{
        if(res.data.ok){
          store.commit('chapter/setRecords',res.data.records)
          chapters.value = res.data.records.map( 
            record => { 
              return {
                label: record.title , 
                value: record.id
              } 
            } 
          )
          selectedChapter.value = []
        }else{
          notify.error({
            title: 'អានជំពូក' ,
            description: 'មានបញ្ហាក្នុងពេលអានជំពូក។'
          })
        }
      }).catch(err =>{
        notify.error({
            title: 'អានជំពូក' ,
            description: 'មានបញ្ហាក្នុងពេលអានជំពូក។'
          })
        console.log( err )
      })
      chapterSelectLoading.value = false
    }

    /**
     * Load pivot data of this model
     */
    const parts = ref([])
    const selectedPart = ref(null)
    const togglePart = computed( () => {
      return parts.value != undefined && parts.value.length > 0
    })
    const partSelectLoading = ref(false)
    
    function partChange(val){
      sections.value = [] 
      selectedSection.value = null
      getRecords()
      if( !(val > 0) ) return ;
      store.dispatch('part/section',{id : val }).then( res =>{
        /**
         * Apply the kunty, matika to the dropdownlist
         */
        if( res.data.ok ){
          if( Array.isArray( res.data.records ) && res.data.records.length > 0 ){
            sections.value = res.data.records.map( record => { return { label: record.number + "៖ " + record.title , value: record.id } } )
          }
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          title: "អានកថាភាគ" ,
          description: "មានបញ្ហាពេលអានកថាភាគ។" ,
          duration: 3000
        })
      })
    }

    function handleSearchPart(query){
      if (!query.length) {
        parts.value = [];
        return;
      }
      getParts(query)
    }

    function getParts(query){
      parts.value = []
      partSelectLoading.value = true 
      store.dispatch('part/compact',{
        page: 1 ,
        perPage : 100 ,
        search : query ,
        book_id: record.book_id ,
        kunty_id: selectedKunty.value ,
        matika_id: selectedMatika.value ,
        chapter_id: selectedChapter.value
      }).then(res=>{
        if(res.data.ok){
          store.commit('part/setRecords',res.data.records)
          parts.value = res.data.records.map( 
            record => { 
              return {
                label: record.title , 
                value: record.id
              } 
            } 
          )
          selectedPart.value = []
        }else{
          notify.error({
            title: 'អានផ្នែក' ,
            description: 'មានបញ្ហាក្នុងពេលអានផ្នែក។'
          })
        }
      }).catch(err =>{
        notify.error({
            title: 'អានផ្នែក' ,
            description: 'មានបញ្ហាក្នុងពេលអានផ្នែក។'
          })
        console.log( err )
      })
      partSelectLoading.value = false
    }

    /**
     * Load pivot data of this model
     */
    const sections = ref([])
    const selectedSection = ref(null)
    const toggleSection = computed( () => {
      return sections.value != undefined && sections.value.length > 0
    })
    const sectionSelectLoading = ref(false)
    
    function handleSearchSection(query){
      if (!query.length) {
        sections.value = [];
        return;
      }
      getSections(query)
    }

    function getSections(query){
      sections.value = []
      sectionSelectLoading.value = true 
      store.dispatch('section/compact',{
        page: 1 ,
        perPage : 100 ,
        search : query ,
        book_id: record.book_id ,
        kunty_id: selectedKunty.value ,
        matika_id: selectedMatika.value ,
        chapter_id: selectedChapter.value ,
        part_id: selectedPart.value
      }).then(res=>{
        if(res.data.ok){
          store.commit('section/setRecords',res.data.records)
          sections.value = res.data.records.map( 
            record => { 
              return {
                label: record.title , 
                value: record.id
              } 
            } 
          )
          selectedSection.value = []
        }else{
          notify.error({
            title: 'អានកថាភាគ' ,
            description: 'មានបញ្ហាក្នុងពេលអានកថាភាគ។'
          })
        }
      }).catch(err =>{
        notify.error({
            title: 'អានកថាភាគ' ,
            description: 'មានបញ្ហាក្នុងពេលអានកថាភាគ។'
          })
        console.log( err )
      })
      sectionSelectLoading.value = false
    }


    record.book_id = route.params.id > 0 ? route.params.id : 0
    /**
     * Get kunty base on book_id
     */
    getKunties()

    return {
      /**
       * Variables
       */
      model,
      record,
      rules ,
      btnSavingLoadingRef ,
      kunties,
      matikas,
      chapters,
      parts,
      sections,
      /**
       * Computed
       */
      toggleKunty ,
      toggleMatika ,
      toggleChapter ,
      togglePart ,
      toggleSection ,
      /**
       * Functions
       */
      create ,
      clearVariables ,
      kuntyChange ,
      getKunties ,
      matikaChange ,
      getMatikas ,
      chapterChange ,
      getChapters ,
      partChange ,
      getParts ,
      getSections ,
      handleSearchKunty ,
      handleSearchMatika ,
      handleSearchChapter ,
      handleSearchPart ,
      handleSearchSection
    }
  }
}
</script>