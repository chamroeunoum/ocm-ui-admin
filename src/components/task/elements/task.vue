<template>
    <div class="task-board relative border border-gray-200 bg-gray-100 rounded flex flex-wrap p-4 pb-14 " >
        <n-tooltip trigger="hover">
            <template #trigger>
                <div class="task-objective text-xs w-full text-left leading-6 mb-4" ><pre class="truncate" >{{ record.objective }}</pre></div>
            </template>
            <pre class="leading-7" >{{ record.objective }}</pre>
        </n-tooltip>
        <div v-if="record.start" class="task-start text-xs w-full mb-1 text-left" >ចាប់ផ្ដើម ៖ {{ record.start }}</div>
        <div v-if="record.end" class="task-end text-xs w-full mb-1 text-left" >បញ្ចប់ ៖ {{ record.end }}</div>
        <div v-if="record.minutes" class="task-end w-full text-xs text-left mb-1" >រយះពេលបំពេញការងារ ៖ {{ record.minutes }} នាទី</div>
        <n-tooltip v-if="record.creator" trigger="hover">
        <template #trigger>
            <div class="creator w-8 h-8 bg-cover bg-center border border-gray-300 rounded-full -right-2 -top-2 absolute bg-white " :style=" 'background-image: url(' + record.creator.avatar_url + ');' " ></div>
        </template>
        ម្ចាស់ការងារ {{ record.creator.lastname + " " + record.creator.firstname }}
        </n-tooltip>
        <div class="task-actions-panel text-right w-40 absolute bottom-4 left-4 flex justify-start" >
        <n-tooltip trigger="hover">
            <template #trigger>
            <svg class="w-6 mr-2 cursor-pointer text-red-500" @click="deleteAccount(record)" title="លុបគណនីនេះចោល" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>
            </template>
            លុប
        </n-tooltip>
        <n-tooltip trigger="hover">
            <template #trigger>
            <svg class="w-6 mr-2 cursor-pointer text-blue-500" @click="showEditModal(record)" title="កែប្រែព័ត៌មាន" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M13.245 2.817a2.783 2.783 0 0 1 4.066 3.796l-.13.14l-9.606 9.606a2.001 2.001 0 0 1-.723.462l-.165.053l-4.055 1.106a.5.5 0 0 1-.63-.535l.016-.08l1.106-4.054c.076-.28.212-.54.398-.76l.117-.128l9.606-9.606zm-.86 2.275L4.346 13.13a1 1 0 0 0-.215.321l-.042.123l-.877 3.21l3.212-.875a1 1 0 0 0 .239-.1l.107-.072l.098-.085l8.038-8.04l-2.521-2.52zm4.089-1.568a1.783 1.783 0 0 0-2.402-.11l-.12.11l-.86.86l2.52 2.522l.862-.86a1.783 1.783 0 0 0 .11-2.402l-.11-.12z" fill="currentColor"></path></g></svg>
            </template>
            កែប្រែ
        </n-tooltip>
        <n-tooltip trigger="hover">
            <template #trigger>
            <svg class="cursor-pointer text-blue-500 w-6 mr-2" @click="showAssigneeModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 512"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" fill="currentColor"></path></svg>
            <!-- <svg class="cursor-pointer text-blue-500 w-6 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path opacity=".3" d="M8.07 16c.09-.23.13-.39.91-.69c.97-.38 1.99-.56 3.02-.56s2.05.18 3.02.56c.77.3.81.46.91.69H8.07zM12 8c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1" fill="currentColor"></path><path d="M4 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1c-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1c.4.68.63 1.46.63 2.29V18H24v-1.57zm-7.76-2.78c-1.17-.52-2.61-.9-4.24-.9c-1.63 0-3.07.39-4.24.9A2.988 2.988 0 0 0 6 16.39V18h12v-1.61c0-1.18-.68-2.26-1.76-2.74zM8.07 16c.09-.23.13-.39.91-.69c.97-.38 1.99-.56 3.02-.56s2.05.18 3.02.56c.77.3.81.46.91.69H8.07zM12 8c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z" fill="currentColor"></path></svg> -->
            </template>
            អ្នកទទួលការងារ{{ record.assignees != null && record.assignees != undefined && record.assignees.length > 0 ? "មាន " + record.assignees.length + " នាក់": '' }}
        </n-tooltip>
        <!-- <n-tooltip v-if="Array.isArray( record.assignors )" trigger="hover">
            <template #trigger>
            <div class="creator w-8 h-8 bg-contain border border-gray-300 rounded-full -right-2 -top-2 absolute" :style=" 'background-image: url(' + record.creator.avatar_url + ');' " ></div>
            <svg class="assignor w-6 h-6 mr-2 text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136l32-56h-96l32 56l-32 136l-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" fill="currentColor"></path></svg>
            </template>
            អ្នកប្រគល់ការងារ {{ record.assignors.map( (assignor) => { return assignor.lastname + ' ' + assignor.firstname }).join( ' ' ) }}
        </n-tooltip> -->
        <n-tooltip trigger="hover">
            <template #trigger>
            <svg class="cursor-pointer w-6 mr-2 text-blue-500" @click="showChildTaskModal(record)" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
            </template>
            {{ record.childrenAllLevels != null && record.childrenAllLevels != undefined && record.childrenAllLevels.length > 0 ? 'មានអនុការងារ ' + record.childrenAllLevels.length + ' ផ្សេងទៀត' : 'បញ្ចូលអនុការងារ' }}
        </n-tooltip>
        </div>
        <!-- Pop select of Task status -->
        <div class="task-actions-status-panel text-right absolute bottom-4 right-4 flex justify-start" >
            <n-popselect
                class="text-xs"
                v-model:value="selectedTaskStatus"
                @update:value="updateTaskStatus(record)"
                :options="getTaskStatusOptions(record)"
                size="small"
                scrollable
                trigger="click"
            >
                <n-button >{{ getLocalTaskStatus( record ).label }}</n-button>
            </n-popselect>
        </div>
        <!-- Form update account -->
        <update-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="editModal.show" :onClose="closeEditModal"/>
        <!-- Form select assignee -->
        <select-assignee-form v-bind:model="model" v-bind:record="assignneeModalRecord" v-bind:show="assigneeModal.show" :onClose="closeAssigneeModal"/>
        <!-- Form child task -->
        <child-task-form v-bind:model="model" v-bind:parent="editRecord" v-bind:show="childTaskModal.show" :onClose="closeChildTaskModal"/>
    </div>
</template>
<script >
import { reactive , ref , computed , h } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import UpdateForm from './../update.vue'
import SelectAssigneeForm from './../actions/selectassignee.vue'
import ChildTaskForm from './../actions/child.vue'

export default {
    name: '' ,
    components: {
        UpdateForm ,
        SelectAssigneeForm ,
        ChildTaskForm
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
        record: {
            type: Object ,
            required: true
            // default: () => {
            //     return reactive({
            //     id: 0 ,
            //     objective: '' ,
            //     minutes: 0 ,
            //     pid: 0 
            //     })
            // }
        },
        callback: {
            type: Function ,
            required: true
        }
    },
    setup(props){
        var store = useStore()
        const dialog = useDialog()
        const message = useMessage()
        const notify = useNotification()

        var taskStatuses = ref([
            { value : null , label: 'សូមជ្រើសរើស' 
                , icon : '' 
            } ,
            { value : 0 , label: 'ថ្មី'
                , icon : '<svg class="cursor-pointer text-indigo-500 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M5.745 3.064A.5.5 0 0 0 5 3.5v9a.5.5 0 0 0 .745.436l8-4.5a.5.5 0 0 0 0-.871l-8-4.5zM4 3.5a1.5 1.5 0 0 1 2.235-1.307l8 4.5a1.5 1.5 0 0 1 0 2.615l-8 4.5A1.5 1.5 0 0 1 4 12.5v-9z" fill="currentColor"></path></g></svg>' 
            } ,
            { value : 1 , label: 'ដំណើរការ' 
                , icon : '<svg class="cursor-pointer text-blue-500 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M5.745 3.064A.5.5 0 0 0 5 3.5v9a.5.5 0 0 0 .745.436l8-4.5a.5.5 0 0 0 0-.871l-8-4.5zM4 3.5a1.5 1.5 0 0 1 2.235-1.307l8 4.5a1.5 1.5 0 0 1 0 2.615l-8 4.5A1.5 1.5 0 0 1 4 12.5v-9z" fill="currentColor"></path></g></svg>' 
            } ,
            { value : 2 , label: 'ចប់' 
                , icon : '<svg class="cursor-pointer text-green-500 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M5.745 3.064A.5.5 0 0 0 5 3.5v9a.5.5 0 0 0 .745.436l8-4.5a.5.5 0 0 0 0-.871l-8-4.5zM4 3.5a1.5 1.5 0 0 1 2.235-1.307l8 4.5a1.5 1.5 0 0 1 0 2.615l-8 4.5A1.5 1.5 0 0 1 4 12.5v-9z" fill="currentColor"></path></g></svg>' 
            } ,
            { value : 4 , label: 'ផ្អាក' 
                , icon : '<svg class="cursor-pointer text-yellow-700 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M5.745 3.064A.5.5 0 0 0 5 3.5v9a.5.5 0 0 0 .745.436l8-4.5a.5.5 0 0 0 0-.871l-8-4.5zM4 3.5a1.5 1.5 0 0 1 2.235-1.307l8 4.5a1.5 1.5 0 0 1 0 2.615l-8 4.5A1.5 1.5 0 0 1 4 12.5v-9z" fill="currentColor"></path></g></svg>' 
            } ,
            { value : 8 , label: 'បដិសេធ៍' 
                , icon : '<svg class="cursor-pointer text-red-500 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M5.745 3.064A.5.5 0 0 0 5 3.5v9a.5.5 0 0 0 .745.436l8-4.5a.5.5 0 0 0 0-.871l-8-4.5zM4 3.5a1.5 1.5 0 0 1 2.235-1.307l8 4.5a1.5 1.5 0 0 1 0 2.615l-8 4.5A1.5 1.5 0 0 1 4 12.5v-9z" fill="currentColor"></path></g></svg>' 
            } ,
            { value : 16 , label: 'បិទ' 
                , icon : '<svg class="cursor-pointer text-red-500 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M5.745 3.064A.5.5 0 0 0 5 3.5v9a.5.5 0 0 0 .745.436l8-4.5a.5.5 0 0 0 0-.871l-8-4.5zM4 3.5a1.5 1.5 0 0 1 2.235-1.307l8 4.5a1.5 1.5 0 0 1 0 2.615l-8 4.5A1.5 1.5 0 0 1 4 12.5v-9z" fill="currentColor"></path></g></svg>' 
            }
        ])
        var selectedTaskStatus = ref( props.record.status >= 0 ? props.record.status : null )
        let selectedTaskStatusLabel = computed( () => {
            let task = taskStatuses.value.find( (ts) => ts.value == selectedTaskStatus.value )
            return task != null ? task.label : 'NA' 
        })
        
        function getTaskStatusOptions(task){
            let statuses = ref([])
            switch( task.status ){
                case 0 :
                statuses.value = taskStatuses.value.filter( (s) => s.value == 0 || s.value == 1 || s.value == 8 || s.value == 16 )
                break;
                case 1 :
                statuses.value = taskStatuses.value.filter( (s) => s.value == 1 || s.value == 4 || s.value == 2 || s.value == 16 )
                break;
                case 2 :
                statuses.value = taskStatuses.value.filter( (s) => s.value == 2 || s.value == 0 )
                break;
                case 4 :
                statuses.value = taskStatuses.value.filter( (s) => s.value == 4 || s.value == 1 || s.value == 16 )
                break;
                case 8 :
                statuses.value = taskStatuses.value.filter( (s) => s.value == 8 || s.value == 1 )
                break;
                case 16 :
                statuses.value = taskStatuses.value.filter( (s) => s.value == 16 || s.value == 0 )
                break;
                default: 
                statuses.value = taskStatuses.value
                break;
            }
            return statuses.value
        }
        function getLocalTaskStatus(task){
            return taskStatuses.value.find( (s) => {
                return parseInt( s.value ) === parseInt( task.status )
            } )
        }

        function updateTaskStatus(task){
            let taskFunction = null
            switch(selectedTaskStatus.value){
                case 0 :
                taskFunction = "markAsNew"
                break;
                case 1 :
                taskFunction = "markAsContinue"
                break;
                case 2 :
                taskFunction = "markAsEnd"
                break;
                case 4 :
                taskFunction = "markAsPending"
                break;
                case 8 :
                taskFunction = "markAsCancel"
                break;
                case 16 :
                taskFunction = "markAsClose"
                break;    
            }
            if( taskFunction.length > 0 ){
                store.dispatch('task/'+taskFunction ,{id:task.id}).then( res => {
                    props.callback()
                }).catch( err => {
                    console.log( err )
                })
            }
        }
        function renderOptionLabel(task){
            let option = taskStatuses.value.find( (s) => {
                return parseInt( s.value ) === parseInt( task.status )
            } )
            return option.icon + " " + option.label
        }

        var editModal = reactive({show:false})
        var editRecord = reactive({
            objective: '' ,
            start: '' ,
            end: '' ,
            amount: '' ,
            minutes: 0 ,
            amount_type: '' ,
            active: ''
        })
        function showEditModal(record){
            editRecord.id = record.id
            editRecord.objective = record.objective
            editRecord.start = record.start
            editRecord.end = record.end
            editRecord.minutes = parseInt( record.minutes )
            editRecord.amount = parseFloat( record.amount )
            editRecord.amount_type = parseInt( record.amount_type )
            editRecord.active = parseInt( record.active )
            editModal.show = true
        }
        function closeEditModal(record){
            editModal.show = false
            props.callback()
        }

        var assigneeModal = reactive({show:false})
        var assignneeModalRecord = reactive({
            id: 0 ,
            assignees: []
        })
        function showAssigneeModal(record){
            assignneeModalRecord.id = record.id
            assignneeModalRecord.assignees = record.assignees
            assigneeModal.show = true
        }
        function closeAssigneeModal(){
            assigneeModal.show = false
            props.callback()
        }

        function deleteAccount(record){
            dialog.warning({
                title: "លុបការងារ" ,
                content: "តើអ្នកចង់ លុប ការងារនេះមែនទេ ?" ,
                positiveText: 'បាទ / ចាស',
                negativeText: 'ទេ',
                onPositiveClick: () => {
                store.dispatch(model.name+'/delete',{id:record.id}).then( res => {
                    if( res.data.ok ){
                    notify.success({
                        title: 'លុបការងារ' ,
                        description: 'លុបបានរួចរាល់។' ,
                        duration: 3000
                    })
                    props.callback()
                    }else{
                    notify.success({
                        title: 'លុបការងារ' ,
                        description: 'មានបញ្ហាក្នុងពេលលុបការងារ។' ,
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
         * Child meeting modal handle
         */

        var childTaskModal = reactive({show:false})
        function showChildTaskModal(record){
            childTaskModal.show = true
            editRecord.id = record.id
            editRecord.objective = record.objective
            editRecord.minutes = parseInt( record.minutes )
            editRecord.pid = record.pid
        }

        function closeChildTaskModal( ){
            childTaskModal.show = false
            props.callback()
        }

        return {
            /**
             * Editing
             */
            editModal ,
            showEditModal ,
            closeEditModal , 
            editRecord ,
            /**
             * Child task modal
             */
            childTaskModal ,
            showChildTaskModal ,
            closeChildTaskModal ,
            /**
             * Select assignee modal
             */
            assigneeModal ,
            assignneeModalRecord, 
            showAssigneeModal ,
            closeAssigneeModal ,
            /**
             * Functions
             */
            deleteAccount ,
            /**
             * Task status
             */
            taskStatuses ,
            selectedTaskStatus ,
            selectedTaskStatusLabel ,
            getLocalTaskStatus ,
            getTaskStatusOptions ,
            updateTaskStatus ,
            renderOptionLabel
        }
    }
}
</script>