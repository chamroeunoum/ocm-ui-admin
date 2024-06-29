<template>
  <!-- Form edit account -->
    
      <n-modal v-model:show="show" :on-esc="closeModal" :on-mask-click="closeModal" transform-origin="center" :on-after-enter="initial" class=" relative min-h-screen" >
        <n-card class="w-11/12 font-pvh text-xl relative min-h-full">
          <n-tabs
            class="card-tabs"
            default-value="parentOrganization"
            size="large"
            animated
            pane-wrapper-style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
            tab-style=" tab-style"
          >
            <n-tab-pane name="parentOrganization" tab="ស្ថាប័នមេ" class="flex " >
              <update-form v-bind:model="model" v-bind:record="record" :show="true" />
            </n-tab-pane>
            <n-tab-pane name="peopleOrganization" tab="មន្ត្រី" class="flex " >
              <organization-people-form v-bind:model="model" v-bind:record="record" :show="true" />
            </n-tab-pane>
            <n-tab-pane name="childOrganizations" tab="ស្ថាប័នចំណុះ" class="flex " >
              <organization-child-form v-bind:model="model" v-bind:record="record" :show="true" />
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-modal>
    <!-- End of edit account -->
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification, useDialog } from 'naive-ui'
import dateFormat from "dateformat";
import UpdateForm from './updateOrganization.vue'
import OrganizationPeopleForm from './organizationPeople.vue'
import OrganizationChildForm from './organizationChild.vue'

export default {
  components: {
    
    // Forms
    UpdateForm ,
    OrganizationPeopleForm ,
    OrganizationChildForm
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
          name: "" ,
          parentId : 0 ,
          desp: "" ,
          image: "" ,
          leader: []
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
  },
  setup(props){
    const store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const dialog = useDialog()


    function closeModal(){
      console.log( props.record )
      props.onClose()
    }

    function initial(){
      
    }

    return {
      /**
       * Variables
       */
      
      /**
       * Functions
       */
      closeModal ,
      initial
    }
  }
}
</script>
<style type="text/css" scoped >
</style>