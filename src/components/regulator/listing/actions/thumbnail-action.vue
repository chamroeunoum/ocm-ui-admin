<template>
  <div class="actions" >
    <Transition name="slide-fade" >
      <div v-if="show" class="panel" >

        <n-tooltip trigger="hover">
          <template #trigger>
            <!-- <svg class="action text-blue-500" @click="showDetailModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M15 11.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 3.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm-4.5-3.25a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0zM7 14.5h5a1 1 0 0 1 1 1v.5s-.5 2.5-3.5 2.5S6 16 6 16v-.5a1 1 0 0 1 1-1zM2.004 6.75A2.75 2.75 0 0 1 4.754 4H23.25A2.75 2.75 0 0 1 26 6.75v14.5A2.75 2.75 0 0 1 23.25 24H4.755a2.75 2.75 0 0 1-2.75-2.75V6.75zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H23.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25H4.755z" fill="currentColor"></path></g></svg> -->
            <svg class="action text-blue-500" @click="showShareRegulatorModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1A1.5 1.5 0 0 1 6 3.5v1A1.5 1.5 0 0 1 4.5 6h-1A1.5 1.5 0 0 1 2 4.5v-1zM3.5 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM2 9.5A1.5 1.5 0 0 1 3.5 8h1A1.5 1.5 0 0 1 6 9.5v1A1.5 1.5 0 0 1 4.5 12h-1A1.5 1.5 0 0 1 2 10.5v-1zM3.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM2 15.5A1.5 1.5 0 0 1 3.5 14h1A1.5 1.5 0 0 1 6 15.5v1A1.5 1.5 0 0 1 4.5 18h-1A1.5 1.5 0 0 1 2 16.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM8 4.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
          </template>ព័ត៌មានលម្អិត
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500 " @click="showEditModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 15h5.986c-.227.3-.4.639-.51 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5.232c-.326.14-.631.343-.897.609L15 9.944V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1zm8-9.5a.5.5 0 0 1 1 0v6.444l-.88.88A.498.498 0 0 1 12 12.5v-7zm-7 2a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zM9 9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3A.5.5 0 0 0 9 9zm1.98 6.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498c.096-.386.296-.74.578-1.02z" fill="currentColor"></path></g></svg>
          </template>កែប្រែ
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <svg 
            :class="'action text-gray-300 ' + ( parseInt( record.publish ) > 0 ? ' text-green-500 ' : ' text-gray-500 ') " @click="publishRegulator(record)" version="1.1" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M13 9.125v1.625h.75a.625.625 0 1 1 0 1.25H12.5a.615.615 0 0 1-.063-.003a.625.625 0 0 1-.688-.622v-2.25a.625.625 0 1 1 1.251 0zm-.625-3.12a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5zm-3.5 4.75a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0zM6.5 2A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h13.25a.75.75 0 0 0 0-1.5H6.5a1 1 0 0 1-1-1h14.25a.75.75 0 0 0 .75-.75V4.5A2.5 2.5 0 0 0 18 2H6.5zM19 18H5.5V4.5a1 1 0 0 1 1-1H18a1 1 0 0 1 1 1V18z" fill="currentColor"></path></g></svg>
          </template>{{ parseInt( record.publish ) > 0  ? 'ឯកសារកំពុងចេញផ្សាយ' : 'ឯកសារនេះកំពុងត្រូវបានបិទផ្សាយ' }}
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <svg 
            :class="'action text-gray-300 ' + ( parseInt( record.active ) > 0 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateRegulator(record)" version="1.1" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" fill="currentColor"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z" fill="currentColor"></path></svg>
          </template>{{ parseInt( record.active ) > 0  ? 'ឯកសារនេះកំពុងបើកតំណើរការ' : 'ឯកសារនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' }}
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-red-500" @click="destroy(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>              
          </template>លុបព័ត៌មាននេះ
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <svg 
            :class=" 'action ' + ( record.accessibility == 0 ? ' text-gray-500 ' : ' text-blue-500 ' ) " 
            @click="showAccessibilityModal(record)" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M22 14a8 8 0 1 0 8 8a8.01 8.01 0 0 0-8-8zm5.91 7h-1.954a12.03 12.03 0 0 0-1.218-4.332A6.01 6.01 0 0 1 27.91 21zm-7.854 0A10.014 10.014 0 0 1 22 16.015A10.012 10.012 0 0 1 23.945 21zm3.89 2A10.01 10.01 0 0 1 22 27.985A10.012 10.012 0 0 1 20.055 23zm-4.684-6.332A12.027 12.027 0 0 0 18.044 21H16.09a6.01 6.01 0 0 1 3.172-4.332zM16.09 23h1.953a12.027 12.027 0 0 0 1.218 4.332A6.01 6.01 0 0 1 16.09 23zm8.648 4.332A12.024 12.024 0 0 0 25.956 23h1.954a6.009 6.009 0 0 1-3.172 4.332z" fill="currentColor"></path><path d="M6 14h6v2H6z" fill="currentColor"></path><path d="M6 6h12v2H6z" fill="currentColor"></path><path d="M6 10h12v2H6z" fill="currentColor"></path><path d="M6 24h6v2H6z" fill="currentColor"></path><path d="M12 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h16a2.002 2.002 0 0 1 2 2v8h-2V4H4v24h8z" fill="currentColor"></path></svg>
          </template>
          <div class="leading-8 text-center" v-html=" 'កំណត់វិសាលភាពនៃការប្រើប្រាស់' " ></div>
        </n-tooltip>

        <!-- <n-tooltip trigger="hover">
          <template #trigger>
              <svg class="action text-blue-600" 
              @click="showFolderModalPopup(record)" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M17.06 9c.833 0 1.64.277 2.295.784l.175.144l2.586 2.263c.19.166.425.27.673.3l.15.009H40.25a3.75 3.75 0 0 1 3.745 3.55l.005.2v19a3.75 3.75 0 0 1-3.55 3.745l-.2.005H7.75a3.75 3.75 0 0 1-3.745-3.55L4 35.25v-22.5a3.75 3.75 0 0 1 3.55-3.745L7.75 9h9.31zm5.787 5.999l-2.127 2.616a3.75 3.75 0 0 1-2.685 1.378L17.81 19L6.5 18.999V35.25c0 .647.492 1.18 1.122 1.243l.128.007h32.5a1.25 1.25 0 0 0 1.243-1.122l.007-.128v-19a1.25 1.25 0 0 0-1.122-1.243L40.25 15l-17.403-.001zM17.061 11.5H7.75a1.25 1.25 0 0 0-1.244 1.122l-.006.128v3.749l11.31.001c.33 0 .643-.13.876-.358l.094-.104l1.635-2.013l-2.531-2.216a1.25 1.25 0 0 0-.673-.3l-.15-.009z" fill="currentColor"></path></g></svg>
          </template>បញ្ចូលឯកសារចូលថត
        </n-tooltip> -->

        <!-- <n-tooltip trigger="hover">
          <template #trigger>
              <svg class="action text-yellow-500" 
              @click="$router.push('/regulator/child/'+record.id)"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M28 12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h11v4H9a2 2 0 0 0-2 2v4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H9v-4h14v4h-3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3v-4a2 2 0 0 0-2-2h-6v-4zM12 28H4v-4h8zm16 0h-8v-4h8zM4 4h24v6H4z" fill="currentColor"></path></svg>
          </template>ខ្លឹមសារឯកសារយោង
        </n-tooltip> -->

      </div>
    </Transition>
    <n-tooltip v-if="record.pdf==true" trigger="hover">
      <template #trigger>
        <div class="action-pdf" >
          <svg class="text-red-600 mr-2" 
          @click="showPdfPreviewModal(record)" 
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5c-17.2-10.5-28.7-25-36.8-46.3c3.9-16.1 10.1-40.6 5.4-56c-4.2-26.2-37.8-23.6-42.6-5.9c-4.4 16.1-.4 38.5 7 67.1c-10 23.9-24.9 56-35.4 74.4c-20 10.3-47 26.2-51 46.2c-3.3 15.8 26 55.2 76.1-31.2c22.4-7.4 46.8-16.5 68.4-20.1c18.9 10.2 41 17 55.8 17c25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35c-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8c-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7c8.3 15.1 18.9 27.2 30.1 35.5c-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" fill="currentColor"></path></svg>
        </div>
      </template>មើលឯកសារយោង
    </n-tooltip>
    <n-tooltip v-if="!show" trigger="hover">
      <template #trigger>
        <div class="action-toggle bg-gray-200 hover:bg-blue-500 duration-500 hover:text-gray-50" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z" fill="currentColor"></path></svg>
        </div>
      </template>មុខងារផ្សេងៗ
    </n-tooltip>
    <n-tooltip v-if="show" trigger="hover">
      <template #trigger>
        <div class="action-toggle bg-blue-500 text-gray-50" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0z" fill="currentColor"></path></svg>
        </div>
      </template>បិទមុខងារផ្សេងៗ
    </n-tooltip>
    <!-- Form update account -->
    <update-form v-bind:model="model" v-bind:record="record" v-bind:show="editModal.show" :onClose="closeEditModal"/>
    <!-- Form Action Menu -->
    <add-remove-reader-form v-bind:model="model" v-bind:record="regulatorRecord" v-bind:show="regulatorModal.show" :onClose="closeShareRegulatorModal"/>
    <!-- Form Accessibility -->
    <accessibility-form v-bind:model="model" v-bind:record="accessibilityRecord" v-bind:show="accessibilityModal.show" :onClose="closeAccessibilityModal"/>
    <!-- PDF Dialog -->
    <pdf-preview-form v-bind:model="model" v-bind:record="pdfPreviewRecord" v-bind:show="pdfPreviewModal.show" :onClose="closePdfPreviewModal"/>
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import UpdateForm from './../../widgets/update.vue'
import AddRemoveReaderForm from './addremovereader.vue'
import AccessibilityForm from './accessibility.vue'
import PdfPreviewForm from './../../widgets/pdfpreview.vue'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'

import { Switcher, Filter, DataStructured , ParentChild} from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular, DocumentPdf24Regular, AppsList20Regular } from '@vicons/fluent'
/**
 * CRUD component form
 */
export default {
  name: "ThumbnailActions" ,
  components: {
    ParentChild, 
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    DataStructured,
    Icon,
    IosCheckmarkCircleOutline,
    IosRefresh ,
    CloseCircleOutline ,
    UpdateForm,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    DocumentPdf24Regular ,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular ,
    Filter ,
    AppsList20Regular ,
    AddRemoveReaderForm  ,
    AccessibilityForm ,
    PdfPreviewForm
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
      editRecord.marry_status = record.marry_status
      editRecord.user = record.user
      editRecord.organizations = record.organizations
      editRecord.positions = record.positions
      editRecord.countesies = record.countesies
      editModal.show = true
      show.value = false
    }
    function closeEditModal(){
      editModal.show = false
      closeActions( 1 )
    }

    /**
     * Action Modal
     */
    var regulatorModal = reactive({show:false})
    var regulatorRecord = reactive({
      id: 0 ,
      fid: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 ,
      accessibility: 0 ,
      types: [] ,
      orgainzations: [] ,
      ownOrgainzations: [] ,
      relatedOrgainzations: [] ,
      signatures: []
    })

    function showShareRegulatorModal(record){
      regulatorRecord.id = record.id
      regulatorRecord.fid = record.fid
      regulatorRecord.title = record.title
      regulatorRecord.objective = record.objective
      regulatorRecord.type_id = record.type
      regulatorRecord.year = new Date( record.year ).getTime()
      regulatorRecord.publish = record.publish
      regulatorRecord.active = record.active
      regulatorRecord.accessibility = record.accessibility
      regulatorRecord.types = record.types
      regulatorRecord.organizations = record.organizations
      regulatorRecord.ownOrganizations = record.ownOrganizations
      regulatorRecord.relatedOrganizations = record.relatedOrganizations
      regulatorRecord.signatures = record.signatures
      // actionRecord.pdfs = record.pdf
      regulatorModal.show = true
    }
    function closeShareRegulatorModal(record){
      regulatorModal.show = false
      closeActions( 0 )
    }
  
    function publishRegulator(record){
      // dialog.warning({
      //   title: "បិទ ឬ បើក ឯកសារ" ,
      //   content: "តើអ្នកចង់ " + ( record.publish > 0 ? "បិទ" : "បើក" )+ " ឯកសារនេះមែនទេ ?" ,
      //   positiveText: 'បាទ / ចាស',
      //   negativeText: 'ទេ',
      //   onPositiveClick: () => {
          store.dispatch( props.model.name+(parseInt(record.publish)>0?'/unpublish':'/publish'),{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'ស្ថានភាពឯកសារ' ,
                description: 'ស្ថានភាពឯកសារបានកែប្រែជោគជ័យ។' ,
                duration: 3000
              })
              closeActions(1)
            }else{
              notify.error({
                title: 'ស្ថានភាពគណនី' ,
                description: 'មានបញ្ហាក្នុងពេលកែប្រែស្ថានភាពឯកសារ។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
      //   },
      //   onNegativeClick: () => {
          
      //   }
      // })
    }

    function activateRegulator(record){
      // dialog.warning({
      //   title: "បិទ ឬ បើក ឯកសារ" ,
      //   content: "តើអ្នកចង់ " + ( record.publish > 0 ? "បិទ" : "បើក" )+ " ឯកសារនេះមែនទេ ?" ,
      //   positiveText: 'បាទ / ចាស',
      //   negativeText: 'ទេ',
      //   onPositiveClick: () => {
          store.dispatch( props.model.name+(parseInt(record.active)>0?'/deactivate':'/activate'),{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'ស្ថានភាពឯកសារ' ,
                description: 'ស្ថានភាពឯកសារបានកែប្រែជោគជ័យ។' ,
                duration: 3000
              })
              closeActions(1)
            }else{
              notify.error({
                title: 'ស្ថានភាពគណនី' ,
                description: 'មានបញ្ហាក្នុងពេលកែប្រែស្ថានភាពឯកសារ។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
      //   },
      //   onNegativeClick: () => {
          
      //   }
      // })
    }

    function destroy(record){
      dialog.warning({
        title: "លុបឯកសារ" ,
        content: "តើអ្នកចង់ លុប ឯកសារនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'លុបឯកសារ' ,
                description: 'លុបបានរួចរាល់។' ,
                duration: 3000
              })
              getRecords()
            }else{
              notify.success({
                title: 'លុបឯកសារ' ,
                description: 'មានបញ្ហាក្នុងពេលលុបឯកសារ។' ,
                duration: 3000
              })
            }
        }).catch( err => {
          message.error( err )
        })
        },
        onNegativeClick: () => {
        }
      })
    }

    /**
     * Accessibility Modal
     */
    var accessibilityVairables = ref([
      "បិទការប្រើប្រាស់" ,
      "ប្រើប្រាស់ផ្ទាល់ខ្លួន និង អ្នកដែលបានចែករំលែកទៅ" ,
      "ប្រើប្រាស់ទូទៅក្នុងប្រព័ន្ធ" ,
      "ប្រើប្រាស់ជាសកល"
    ])
    var accessibilityModal = reactive({show:false})
    var accessibilityRecord = reactive({
      id: 0 ,
      fid: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 ,
      accessibility : 0
    })
    function showAccessibilityModal(record){
      accessibilityRecord.id = record.id
      accessibilityRecord.fid = record.fid
      accessibilityRecord.title = record.title
      accessibilityRecord.objective = record.objective
      accessibilityRecord.type_id = record.type
      accessibilityRecord.year = new Date( record.year ).getTime()
      accessibilityRecord.publish = record.publish
      accessibilityRecord.active = record.active
      accessibilityRecord.accessibility = record.accessibility
      // actionRecord.pdfs = record.pdf
      accessibilityModal.show = true
    }
    function closeAccessibilityModal(record){
      accessibilityModal.show = false
      closeActions(1)
    }

    // const listFolders = ref([])
    // function getFolders(){
    //   store.dispatch('folder/listRegulatorWithValidation',{
    //     search: '' ,
    //     page: 1 ,
    //     perPage: 50 ,
    //     document_id : selectedRegulatorId.value
    //   }).then( res => {
    //     listFolders.value = res.data.records
    //   }).catch( err => {
    //     console.log( err.response )
    //   })
    // }

    // const showFolderModal = ref(false)
    // function showFolderModalPopup(document){
    //   showFolderModal.value = true
    //   /**
    //    * Mark the selected document
    //    */
    //   selectedRegulatorId.value = document.id
    //   getFolders()
    // }

    // function closeFolderModalPopup(){
    //   showFolderModal.value = false
    //   listFolders.value = []
    //   selectedRegulatorId.value = 0
    // }

    // function addRegulatorToFolder(folder){
    //   store.dispatch('folder/addRegulator',{
    //     id: folder.id ,
    //     document_id : selectedRegulatorId.value
    //   }).then( res => {
    //     notify.success({
    //       title: "ដាក់ឯកសារចូលថត" ,
    //       content: res.data.message ,
    //       duration: 3000
    //     })
    //     getFolders()
    //   }).catch( err => {
    //     console.log( err.response.data )
    //     notify.error({
    //       title: "ដាក់ឯកសារចូលថត" ,
    //       content: res.response.data.message ,
    //       duration: 3000
    //     })
    //   })
    // }

    // function removeRegulatorFromFolder(folder){
    //   store.dispatch('folder/removeRegulator',{
    //     id: folder.id ,
    //     document_id : selectedRegulatorId.value
    //   }).then( res => {
    //     notify.success({
    //       title: "ដកឯកសារចេញពីថត" ,
    //       content: res.data.message ,
    //       duration: 3000
    //     })
    //     getFolders( )
    //   }).catch( err => {
    //     console.log( err.response.data )
    //     notify.error({
    //       title: "ដកឯកសារចេញពីថត" ,
    //       content: res.response.data.message ,
    //       duration: 3000
    //     })
    //   })
    // }

    /**
     * Pdf Preview Modal
     */
    var pdfPreviewModal = reactive({show:false})
    var pdfPreviewRecord = reactive({
      id: 0 ,
      fid: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 ,
      accessibility: 0 ,
      types: [] ,
      orgainzations: [] ,
      ownOrgainzations: [] ,
      relatedOrgainzations: [] ,
      signatures: []
    })

    function showPdfPreviewModal(record){
      pdfPreviewRecord.id = record.id
      pdfPreviewRecord.fid = record.fid
      pdfPreviewRecord.title = record.title
      pdfPreviewRecord.objective = record.objective
      pdfPreviewRecord.type_id = record.type
      pdfPreviewRecord.year = new Date( record.year ).getTime()
      pdfPreviewRecord.publish = record.publish
      pdfPreviewRecord.pdf = record.pdf
      pdfPreviewRecord.active = record.active
      pdfPreviewRecord.accessibility = record.accessibility
      pdfPreviewRecord.types = record.types
      pdfPreviewRecord.organizations = record.organizations
      pdfPreviewRecord.ownOrganizations = record.ownOrganizations
      pdfPreviewRecord.relatedOrganizations = record.relatedOrganizations
      pdfPreviewRecord.signatures = record.signatures
      pdfPreviewModal.show = true
    }
    function closePdfPreviewModal(record){
      pdfPreviewModal.show = false
      closeActions( 0 )
    }

    return {
      /**
       * Variables
       */
      
      /**
       * Editing
       */
      editModal ,
      editRecord ,
      showEditModal ,
      closeEditModal ,
      /**
       * Functions
       */
      toggleActions ,
      show ,
      closeActions ,
      // Add or Remove modal
      regulatorModal ,
      regulatorRecord ,
      showShareRegulatorModal ,
      closeShareRegulatorModal ,
      // 
      publishRegulator ,
      activateRegulator ,
      destroy ,
      accessibilityVairables ,
      accessibilityModal ,
      accessibilityRecord ,
      showAccessibilityModal ,
      closeAccessibilityModal ,
      pdfPreviewRecord ,
      pdfPreviewModal,
      showPdfPreviewModal ,
      closePdfPreviewModal ,
      // getFolders ,
      // showFolderModal ,
      // showFolderModalPopup ,
      // closeFolderModalPopup ,
      // addRegulatorToFolder ,
      // removeRegulatorFromFolder
    }
  }
}

</script>
<style type="text/css" scoped >
.vcb-thumbnail .actions {
  @apply flex flex-wrap justify-center absolute left-0 top-0 right-0 bottom-0;
}
.vcb-thumbnail .actions .action-toggle {
  @apply absolute top-1 right-1 w-6 h-6 p-1 rounded-full cursor-pointer ;
}
.vcb-thumbnail .actions .action-pdf {
  @apply absolute top-1 right-8 w-6 h-6 rounded-full cursor-pointer ;
}
.vcb-thumbnail .actions .panel {
  @apply bg-white bg-opacity-90 absolute w-full top-0 bottom-0 flex flex-wrap content-center justify-center p-4 ;
}
.vcb-thumbnail .actions .action {
  @apply cursor-pointer w-10 m-1 p-1 bg-white border border-gray-200 rounded-sm hover:border-gray-500 transform-gpu hover:scale-110 duration-500 ;
}
</style>