<template >
  <Transition name="slide-fade" >
    <n-form v-if="show" class="w-1/2" >
      <n-form-item label="ថ្នាក់ដឹកនាំ" path="leader" class="w-4/5 mr-8" >
        <n-select
          v-model:value="leader"
          filterable
          placeholder="សូមជ្រើសរើសថ្នាក់ដឹកនាំស្ថាប័ន"
          :options="optionPeople"
          @update:value="setLeader"
        />
      </n-form-item>
      <n-form-item label="ឈ្មោះ" path="name" class="w-4/5 mr-8" >
        <n-input placeholder="សូមបញ្ចូលឈ្មោះ" v-model:value="record.name" @blur="update()" />
      </n-form-item>
      <n-form-item label="ទំម្រង់កូដសម្គាល់អង្គភាព" path="name" class="w-4/5 mr-8" >
        <n-input placeholder="ទំម្រង់កូដសម្គាល់អង្គភាព" v-model:value="record.code" @blur="update()" />
      </n-form-item>
      <n-form-item label="ព័ត៌មានអំពីអង្គភាព" path="description" class="w-4/5 mr-8" >
        <n-input type="textarea" v-model:value="record.desp" placeholder="ព័ត៌មានអំពីអង្គភាព" @blur="update()" />
      </n-form-item>
    </n-form>
  </Transition>
</template>
<script >
import { ref ,reactive , onMounted , defineComponent, h, computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage , useNotification , NAvatar, NText, NTag } from 'naive-ui'

export default {
  name : 'OrganizationChartCreate' ,
  components: {

  } ,
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
    leader: {
      type: Number ,
      required: false ,
      default: () => {
        return null ;
      }
    },
    record: {
      type: Object ,
      required: false ,
      default: () => {
        return reactive({
          id: 0 ,
          parentId: "" ,
          name: "" ,
          code: "" ,
          image: "https://picsum.photos/200/300" ,
          desp: ""
        })
      }
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
    const notify = useNotification()
    const message = useMessage()

    const childOrganizationLeader = ref(null)
    const parentOrganizationLeader = ref(null)
    const peopleSearch = ref('')
    const people = ref([])
    const leader = ref(null)

    const optionPeople = computed( () => {
      let result = people.value.map( ( p ) => {
        return { label : (
          ( p.countesies != undefined && p.countesies.length > 0 ? p.countesies.map( (c) => c.name ).join(' ') + " " : '' ) 
          + p.lastname + " " + p.firstname
        ) , value : p.id }
      })
      result.unshift({ label: 'សូមជ្រើសរើសថ្នាក់ដឹកនាំ' , value : null })
      return result
    })

    function getPeople(){
      store.dispatch( 'people/list',{
        search : peopleSearch.value ,
        perPage : 3000 ,
        page : 1
      }).then( res => {
        if( res.data.records.length > 0 ){
          people.value = res.data.records
        }else{
          notify.warning({
            'title' : 'សមាជិកប្រជុំ' ,
            'description' : 'មិនមានសមាជិកប្រជុំ។' ,
            duration : 3000
          })
        }
        
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'សមាជិកប្រជុំ' ,
          'description' : 'មានបញ្ហាក្នុងពេលស្វែងរកសមាជិកប្រជុំ។' ,
          duration : 3000
        })
      })
    }
    function setLeader(){
      store.dispatch('organizations/setLeader',{
        'organization_id' : props.record.id ,
        'people_id' : leader.value > 0 ? leader.value : 0
      }).then( res => {
        if( res.data.ok ){
          props.record.leader = res.data.record.leader
        }else{
          notify.error({
            title: 'ព័ត៌មានក្រសួង ស្ថាប័ន' ,
            content: res.data.message ,
            description: res.data.message ,
            duration: 3000
          })
        }
      }).catch( err => {
        console.log( err )
      });
    }
    function update(){
      store.dispatch('organizations/update',{
        id: props.record.id ,
        name: props.record.name ,
        code: props.record.code ,
        // document_id : 0 , // Id of the document that this record despribe
        pid : props.record.parentId > 0 ? props.record.parentId : 0 , // Id of the parent record
        desp: props.record.desp ,
        image: props.record.image ,
      }).then( res => {
        if( res.data.ok ){
        }else{
          notify.error({
            title: 'ព័ត៌មានក្រសួង ស្ថាប័ន' ,
            content: res.data.message ,
            description: res.data.message ,
            duration: 3000
          })
        }
        props.record = {
          id: 0 ,
          name: "" ,
          parentId : 0 ,
          desp: "" ,
          image: "" ,
          leader: []
        }
      }).catch( err => {
        console.log( err )
      });
    }

    onMounted(() => {
      leader.value = props.record.leader != undefined && props.record.leader[0] != null ? props.record.leader[0].id : null
      getPeople()
    })

    return {
      childOrganizationLeader ,
      parentOrganizationLeader ,
      peopleSearch ,
      people ,
      optionPeople ,
      update ,
      setLeader ,
      leader
    }
  }
}
</script>