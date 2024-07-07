<template>
  <div class="actions" >
    <Transition name="slide-fade" >
      <div v-if="show" class="panel" >
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500" @click="showDetailModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M15 11.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 3.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm-4.5-3.25a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0zM7 14.5h5a1 1 0 0 1 1 1v.5s-.5 2.5-3.5 2.5S6 16 6 16v-.5a1 1 0 0 1 1-1zM2.004 6.75A2.75 2.75 0 0 1 4.754 4H23.25A2.75 2.75 0 0 1 26 6.75v14.5A2.75 2.75 0 0 1 23.25 24H4.755a2.75 2.75 0 0 1-2.75-2.75V6.75zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H23.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25H4.755z" fill="currentColor"></path></g></svg>
          </template>
          ព័ត៌មានលម្អិត
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500 " @click="showEditModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 15h5.986c-.227.3-.4.639-.51 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5.232c-.326.14-.631.343-.897.609L15 9.944V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1zm8-9.5a.5.5 0 0 1 1 0v6.444l-.88.88A.498.498 0 0 1 12 12.5v-7zm-7 2a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zM9 9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3A.5.5 0 0 0 9 9zm1.98 6.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498c.096-.386.296-.74.578-1.02z" fill="currentColor"></path></g></svg>
          </template>
          កែប្រែ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-600" @click="showPreviewCardModal(record)" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect x="96" y="32" width="320" height="448" rx="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M208 80h96"></path><path d="M333.48 284.51A39.65 39.65 0 0 0 304 272c-11.6 0-22.09 4.41-29.54 12.43s-11.2 19.12-10.34 31C265.83 338.91 283.72 358 304 358s38.14-19.09 39.87-42.55c.88-11.78-2.82-22.77-10.39-30.94z" fill="currentColor"></path><path d="M371.69 448H236.31a12.05 12.05 0 0 1-9.31-4.17a13 13 0 0 1-2.76-10.92c3.25-17.56 13.38-32.31 29.3-42.66C267.68 381.06 285.6 376 304 376s36.32 5.06 50.46 14.25c15.92 10.35 26.05 25.1 29.3 42.66a13 13 0 0 1-2.76 10.92a12.05 12.05 0 0 1-9.31 4.17z" fill="currentColor"></path></svg>
          </template>
          មើលកាតសម្គាល់ខ្លួន
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-red-500" @click="deleteAccount(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>              
          </template>
          លុបព័ត៌មាននេះ
        </n-tooltip>
      </div>
    </Transition>
    <n-tooltip v-if="!show" trigger="hover">
      <template #trigger>
        <div class="action-toggle bg-gray-200 hover:bg-blue-500 duration-500 hover:text-gray-50" @click="toggleActions" >
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
    <update-form v-bind:model="model" v-bind:record="record" v-bind:show="editModal.show" :onClose="closeUpdate"/>
    <!-- Form update account -->
    <detail-form v-bind:model="model" v-bind:record="record" v-bind:show="detailModal.show" :onClose="closeDetail"/>
    <!-- Form update account -->
    <preview-card-form v-bind:model="model" v-bind:record="previewCardRecord" v-bind:show="previewCardModal.show" :onClose="closePreviewCard"/>
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import UpdateForm from './../../widgets/update.vue'
import DetailForm from './../../widgets/detail.vue'
import PreviewCardForm from './../../widgets/card1.vue'
/**
 * CRUD component form
 */
export default {
  name: "ThumbnailActions" ,
  components: {
    UpdateForm ,
    DetailForm ,
    PreviewCardForm
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

    function closeDetail(actionStatus){
      detailModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closeUpdate(actionStatus){
      editModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closePreviewCard(actionStatus){
      previewCardModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closeActions(actionStatus){
      show.value = false
      if( parseInt( actionStatus ) > 0 ) props.onClose( actionStatus )
    }

    var editModal = reactive({show:false})
    var editRecord = reactive({
      id: 0 ,
      dob: "" ,
      gender: '' ,
      nid: '' ,
      marry_status: '' ,
      firstname: "" ,
      lastname: "" ,
      phone: "" ,
      email: "" ,
      person: null ,
      image: null ,
      organizationPeople: [] ,
      organizations: [] ,
      positions: [] ,
      countesies: []
    })
    function showEditModal(record){
      editRecord.id = record.id
      editRecord.dob = record.dob
      editRecord.nid = record.nid
      editRecord.gender = record.gender
      editRecord.firstname = record.firstname
      editRecord.lastname = record.lastname
      editRecord.mobile_phone = record.mobile_phone
      editRecord.office_phone = record.office_phone
      editRecord.email = record.email
      editRecord.image = record.image
      editRecord.marry_status = record.marry_status
      editRecord.user = record.user
      editRecord.organizationPeople = record.organizationPeople
      editRecord.organizations = record.organizations
      editRecord.positions = record.positions
      editRecord.countesies = record.countesies
      editModal.show = true
      show.value = false
    }

    var previewCardModal = reactive({show:false})
    var previewCardRecord = reactive({
      id: 0 ,
      dob: "" ,
      gender: '' ,
      nid: '' ,
      marry_status: '' ,
      firstname: "" ,
      lastname: "" ,
      phone: "" ,
      email: "" ,
      person: null ,
      image: null ,
      organizationPeople: [] ,
      organizations: [] ,
      positions: [] ,
      countesies: []
    })
    function showPreviewCardModal(record){
      previewCardRecord.id = record.id
      previewCardRecord.dob = record.dob
      previewCardRecord.nid = record.nid
      previewCardRecord.gender = record.gender
      previewCardRecord.firstname = record.firstname
      previewCardRecord.lastname = record.lastname
      previewCardRecord.image = record.image
      previewCardRecord.mobile_phone = record.mobile_phone
      previewCardRecord.office_phone = record.office_phone
      previewCardRecord.email = record.email
      previewCardRecord.marry_status = record.marry_status
      previewCardRecord.user = record.user
      previewCardRecord.organizations = record.organizations
      previewCardRecord.organizationPeople = record.organizationPeople
      previewCardRecord.positions = record.positions
      previewCardRecord.countesies = record.countesies
      previewCardModal.show = true
      show.value = false
    }

    var detailModal = reactive({show:false})
    function showDetailModal(record){
      editRecord.id = record.id
      editRecord.dob = record.dob
      editRecord.nid = record.nid
      editRecord.gender = record.gender
      editRecord.firstname = record.firstname
      editRecord.lastname = record.lastname
      editRecord.mobile_phone = record.mobile_phone
      editRecord.office_phone = record.office_phone
      editRecord.email = record.email
      editRecord.image = record.image
      editRecord.marry_status = record.marry_status
      editRecord.user = record.user
      editRecord.organizationPeople = record.organizationPeople
      editRecord.organizations = record.organizations
      editRecord.positions = record.positions
      editRecord.countesies = record.countesies
      detailModal.show = true
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
      showDetailModal ,
      detailModal ,
      /**
       * Functions
       */
      deleteAccount ,
      toggleActions ,
      show ,
      closeActions ,
      closeUpdate ,
      closeDetail ,
      //
      showPreviewCardModal ,
      closePreviewCard,
      previewCardModal ,
      previewCardRecord
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