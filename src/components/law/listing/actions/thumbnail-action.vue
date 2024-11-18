<template>
  <div class="actions" >
    <Transition name="slide-fade" >
      <div v-if="show" class="panel" >
        <n-tooltip 
        trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500" @click="showContent(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M23 9.005h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1H11v-1a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h4v20a2.002 2.002 0 0 0 2 2h4v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1h-4v-9h4v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1h-4v-9h4v1a2 2 0 0 0 2 2zm0-6h6v4h-6zm-14 4H3v-4h6zm14 18h6v4h-6zm0-11h6v4h-6z" fill="currentColor"></path></svg>
          </template>
          មាតិកានៃសៀវភៅ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500 " @click="showEditModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 15h5.986c-.227.3-.4.639-.51 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5.232c-.326.14-.631.343-.897.609L15 9.944V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1zm8-9.5a.5.5 0 0 1 1 0v6.444l-.88.88A.498.498 0 0 1 12 12.5v-7zm-7 2a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zM9 9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3A.5.5 0 0 0 9 9zm1.98 6.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498c.096-.386.296-.74.578-1.02z" fill="currentColor"></path></g></svg>
          </template>
          កែប្រែ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-red-500" @click="deleteAccount(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>              
          </template>
          លុបព័ត៌មាននេះ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg :class="'action ' + ( parseInt( record.active ) == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateAccount(record)" :title="record.active == 1 ? 'សៀវភៅនេះកំពុងបើកតំណើរការ' : 'សៀវភៅនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' "  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z" fill="currentColor"></path></svg>
          </template>
          បិទ និង បើក ការប្រើប្រាស់សៀវភៅ
        </n-tooltip>  
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg :class="'action ' + ( parseInt( record.complete ) == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="completeBook(record)" :title="record.complete == 1 ? 'បានបញ្ចប់' : 'មិនទាន់បញ្ចប់' "  
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64c-30.37-38-80-64-208-64c-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 160v288"></path></svg>
          </template>
          ដាក់ឯកសារនេះក្នុងស្ថានភាព បញ្ចប់ ឬ មិនទាន់បញ្ចប់
        </n-tooltip>  
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500" @click="showReferenceModal(record)"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 4a2 2 0 0 1 2-2h4.586a1.5 1.5 0 0 1 1.06.44l3.915 3.914A1.5 1.5 0 0 1 16 7.414V16a2 2 0 0 1-2 2h-3.337c.148-.31.251-.647.302-1H14a1 1 0 0 0 1-1V8h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v9H4V4zm7.5 3h3.293L11 3.207V6.5a.5.5 0 0 0 .5.5zm2 8h-2.837a3.511 3.511 0 0 0-.714-1H13.5a.5.5 0 0 1 0 1zm0-2h-7a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm-7-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm-3 4a2.5 2.5 0 0 0 0 5H4a.5.5 0 0 0 0-1h-.5a1.5 1.5 0 0 1 0-3H4a.5.5 0 0 0 0-1h-.5zM7 14a.5.5 0 0 0 0 1h.5a1.5 1.5 0 0 1 0 3H7a.5.5 0 0 0 0 1h.5a2.5 2.5 0 0 0 0-5H7zm-4 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
          </template>
          ភ្ចាប់ឯកសារយោង
        </n-tooltip>  
      </div>
    </Transition>
    <n-tooltip v-if="!show" trigger="hover">
      <template #trigger>
        <div class="action-toggle w-8 h-8 bg-gray-200 hover:bg-blue-500 duration-500 hover:text-gray-50" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z" fill="currentColor"></path></svg>
        </div>
      </template>
      មុខងារផ្សេងៗ
    </n-tooltip>
    <n-tooltip v-if="show" trigger="hover">
      <template #trigger>
        <div class="action-toggle bg-blue-500 text-gray-50" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0z" fill="currentColor"></path></svg>
        </div>
      </template>
      បិទមុខងារផ្សេងៗ
    </n-tooltip>
    <!-- Form update account -->
    <update-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="editModal.show" :onClose="closeUpdate"/>
    <!-- Form update account -->
    <content-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="contentModal.show" :onClose="closeContent"/>
    <!-- Form reference modal -->
    <reference-content-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="referenceModal.show" :onClose="closeReferenceModal"/>
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import UpdateForm from './../../widgets/book/update.vue'
import ContentForm from './../../widgets/content.vue'
import ReferenceContentForm from './../../widgets/reference/content.vue'
/**
 * CRUD component form
 */
export default {
  name: "ThumbnailActions" ,
  components: {
    UpdateForm ,
    ContentForm ,
    ReferenceContentForm
  } ,
  props: {
    model: {
      type: Object
    },
    record: {
      type: Object
    },
    onClose: {
      type: Function
    }
  },
  setup(props){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    
    const show = ref(false)
    function toggleActions(){
      show.value = !show.value
    }

    function closeContent(actionStatus){
      contentModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closeUpdate(actionStatus){
      editModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closeActions(actionStatus){
      show.value = false
      if( parseInt( actionStatus ) > 0 ) props.onClose( actionStatus )
    }

    var editModal = reactive({show:false})
    var editRecord = reactive({
      'title' : '' ,
			'description' : '' ,
			'color' : '' ,
			'cover' : '' ,
			'complete' : '' ,
			'active' : '' ,
  		'created_by' : '' ,
			'updated_by' : '' ,
			'pdf' : '' 
    })
    function showEditModal(record){
      editRecord.id = record.id
      editRecord.title = record.title
      editRecord.description = record.description
      editRecord.color = record.color
      editRecord.cover = record.cover
      editRecord.complete = record.complete
      editRecord.active = record.active
      editRecord.pdf = record.pdf
      editModal.show = true
      show.value = false
    }

    var contentModal = reactive({show:false})
    function showContent(record){
      editRecord.id = record.id
      contentModal.show = true
      show.value = false
    }

    function deleteAccount(record){
      show.value = false
      dialog.warning({
        title: "លុបគណនី" ,
        content: "តើអ្នកចង់ លុប គណនីនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(props.model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'លុបទិន្នន័យ' ,
                description: 'លុបបានរួចរាល់។' ,
                duration: 3000
              })
              closeActions(1)
            }else{
              notify.success({
                title: 'លុបទិន្នន័យ' ,
                description: 'មានបញ្ហាក្នុងពេលលុបទិន្នន័យ។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
          closeActions( 0 )
        },
        onNegativeClick: () => {
        }
      })
    }

    function activateAccount(record){
      show.value = false
      dialog.warning({
        title: "បិទ ឬ បើក គណនី" ,
        content: "តើអ្នកចង់ " + ( record.active == 1 ? "បិទ" : "បើក" )+ " ការប្រើប្រាស់សៀវភៅនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch( props.model.name+'/'+(parseInt( record.active ) == 1 ? 'deactivate' : 'activate' ),{
            id: record.id ,
            active: parseInt( record.active ) == 1 ? 0 : 1
          }).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'សៀវភៅច្បាប់' ,
                description: 'ជោគជ័យ។' ,
                duration: 3000
              })
              closeActions( 1 )
            }else{
              notify.error({
                title: 'សៀវភៅច្បាប់' ,
                description: 'មានបញ្ហា។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
          closeActions( 0 )
        },
        onNegativeClick: () => {
          
        }
      })
    }

    function completeBook(record){
      show.value = false
      dialog.warning({
        title: "ប្ដូរស្ថានភាពនៃឯកសារ" ,
        content: "តើអ្នកចង់ដាក់ឯកសារនេះក្នុងស្ថានភាព " + ( record.complete == 1 ? "មិនទាន់បញ្ចប់" : "បានបញ្ចប់" )+ " មែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch( props.model.name+'/'+(parseInt( record.complete ) == 1 ? 'uncomplete' : 'complete' ),{
            id: record.id ,
            active: parseInt( record.active ) == 1 ? 0 : 1
          }).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'ឯកសារ' ,
                description: 'ជោគជ័យ។' ,
                duration: 3000
              })
              closeActions( 1 )
            }else{
              notify.error({
                title: 'ឯកសារ' ,
                description: 'មានបញ្ហា។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
          closeActions( 0 )
        },
        onNegativeClick: () => {
          
        }
      })
    }

    /**
     * Add reference
     */
    const referenceModal = reactive({
      show : false 
    })
    function showReferenceModal(record){
      editRecord.id = record.id
      editRecord.title = record.title
      editRecord.description = record.description
      editRecord.color = record.color
      editRecord.cover = record.cover
      editRecord.complete = record.complete
      editRecord.active = record.active
      editRecord.pdf = record.pdf
      referenceModal.show = true
    }
    function closeReferenceModal(){
      referenceModal.show = false
    }

    return {
      /**
       * Variables
       */
      
      /**
       * Editing
       */
      editModal ,
      showEditModal ,
      editRecord ,
      /**
       * Detail modal
       */
      showContent ,
      contentModal ,
      activateAccount ,
      completeBook ,
      /**
       * Functions
       */
      deleteAccount ,
      toggleActions ,
      show ,
      closeActions ,
      closeUpdate ,
      closeContent ,
      /**
       * Reference Modal
       */
      showReferenceModal ,
      closeReferenceModal ,
      referenceModal 
    }
  }
}

</script>
<style type="text/css" scoped >
.vcb-thumbnail .actions {
  @apply flex flex-wrap justify-center absolute left-0 top-0 right-0 bottom-0;
}
.vcb-thumbnail .actions .action-toggle {
  @apply absolute top-1 right-1 w-8 h-8 p-1 rounded-full cursor-pointer ;
}
.vcb-thumbnail .actions .panel {
  @apply bg-white bg-opacity-90 absolute w-full top-0 bottom-0 flex flex-wrap content-center justify-center p-4 ;
}
.vcb-thumbnail .actions .action {
  @apply cursor-pointer w-10 m-1 p-1 bg-white border border-gray-200 rounded-sm ;
}
</style>