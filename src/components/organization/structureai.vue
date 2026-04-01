<template>
  <div class="absolute left-0 top-0 right-0 bottom-0">
    <div class="absolute left-0 top-0 bottom-0 w-72 bg-gray-800 abslute border-r border-gray-600" >
      <div class="w-full relative p-1 border-b border-gray-300 " >
        <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-800 px-2 h-8 my-1 w-full mx-auto rounded-full text-gray-50 border border-gray-300 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
        <svg class="absolute w-6 right-5 top-3 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
      </div>
      <div class="absolute left-0 top-12 bottom-12 w-full overflow-auto " >
        <n-scrollbar >
          <div v-for="(o,oIndex) in table.records.matched" :key="oIndex" 
            class="w-full text-left p-2 border-b border-gray-600 mb-1 flex text-gray-50" 
            >
            <div class="flex-none min-w-10 text-center font-btb-black">{{ o.id }}</div>
            <div class="flex-grow truncate" @click="addChild(o)" >
              <n-tooltip trigger="hover" >
                <template #trigger>
                  {{  o.name }}
                </template>
                {{  o.name }}
              </n-tooltip>
            </div>
          </div>
        </n-scrollbar>
      </div>
      <!-- Pagination of crud -->
      <div class="absolute left-0 right-0 bottom-1 flex flex-wrap" >
        <!-- This pagination is for the media side with from Medium up -->
        <div class="vcb-table-pagination mx-auto ">
          <!-- Information -->
          <!-- <div class="vcb-table-pagination-info" >{{ table.pagination.totalRecords > 0 ? $toKhmer( table.pagination.totalRecords ) + " អង្គភាព" : "" }}</div>
          <div class="vcb-table-pagination-info" >{{ table.pagination.totalPages > 0 ? " ចែកជា " + $toKhmer ( table.pagination.totalPages ) + " ទំព័រ" : "" }}</div> -->
          <!-- First -->
          <!-- Pages (7) -->
          <div v-for="(page, index) in table.pagination.buttons" :key="index" :class=" (table.pagination.page == page ? ' vcb-pagination-page-active ' : ' vcb-pagination-page ' )" @click="table.pagination.page == page ? false : goTo(page) " >{{ $toKhmer( page ) }}</div>
          <!-- Previous -->          
          <div v-if="table.pagination.page > 1 " class="vcb-pagination-page " v-html='"<"' @click="previous()" ></div>
          <n-tooltip v-if="table.pagination.page <= 1 " trigger="hover">
            <template #trigger>
              <div class="vcb-pagination-page border-gray-200 text-gray-200 " v-html='"<"' ></div>
            </template>
           ទំព័រដើម
          </n-tooltip>
          <!-- Next -->
          <div v-if="table.pagination.page < table.pagination.totalPages " class="vcb-pagination-page " v-html='">"' @click="next()" ></div>
          <n-tooltip v-if="table.pagination.page >= table.pagination.totalPages " trigger="hover">
            <template #trigger>
              <div class="vcb-pagination-page border-gray-200 text-gray-200 " v-html='">"' ></div>
            </template>
            ទំព័រចុងក្រោយ
          </n-tooltip>
          <!-- Last -->
          <!-- Go to -->
          <!-- Total per page -->
        </div>
      </div>
    </div>
    <div class="absolute left-72 top-0 right-0 bottom-0 bg-gray-800" >
      <Transition name="slide-fade" >
        <!-- <div v-if="dataFlattened" class="chart-container border " > </div> -->
        <OrgChartCanvas :treeData="treeData" />
      </Transition>
    </div>
  </div>
</template>

<script>

import { useNotification , useDialog, selectDark, useMessage } from 'naive-ui'
import * as d3 from 'd3'
import { OrgChart } from 'd3-org-chart'
import { reactive ,ref , computed , watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import ocmLogoUrl from './../../assets/logo.svg'
import { repeat } from "seemly";
import OrgChartCanvas from './OrgChartCanvas.vue';

/**
 * CRUD component form
 */

export default {
  name: "OrganizationStructure" ,
  components: {
    OrgChart ,
    OrgChartCanvas
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const router = useRouter()
    const route = useRoute()
    const notify = useNotification()
    const currentOrganizationId = ref(
      route.params.rootId != undefined && parseInt( route.params.rootId ) > 0
        ? parseInt( route.params.rootId )
        : null // 163
    )
    /**
     * Variables
     */    
    var model = reactive( {
      name: "organizations" ,
      title: "ក្រសួងស្ថាប័ន"
    })
    var table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          name: '' ,
          desp : ''
        },
        format: {
          name: '' ,
          deap: ''
        }
      } ,
      pagination: {
        perPage: 100 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })

    function filterRecords(helper=true){
      if( helper ){
        table.records.matched = []
        if( table.search != "" ) {
          for(var index in table.records.all ){
            for(var field in table.records.all[index] ){
              if( (""+table.records.all[index][field]).includes( table.search ) !== false ) {
                table.records.matched.push( table.records.all[index] )
                break;
              }
            }
          }
        }
        if( table.records.matched.length <= 0 ) {
          table.records.matched = table.records.all
        }
      }else{
        setTimeout( goTo(1) , 500 )
      }
    }

    /**
     * Functions
     */
    function getRecords(){

      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page ,
        id: parseInt( currentOrganizationId.value ) > 0 ? parseInt( currentOrganizationId.value ) : null
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination

        var paginationNumberList = 5
        if( ( table.pagination.page - ( paginationNumberList - 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > 9 ? 9 : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page  - ( paginationNumberList - 1 )
          table.pagination.end = table.pagination.page + 4 >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 4
        }
        /**
         * Create pagination buttons
         */
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){
          table.pagination.buttons.push(i)
        }
        closeTableLoading()
      }).catch( err => {
        console.log( err )
      })
    }
    function closeTableLoading(){
      table.loading = false
    }
    /**
     * Pagination functions
     */
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getRecords()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getRecords()
    }

    getRecords()

    // Example data (e.g., in App.vue)
    const treeData = {
      id: 1,
      name: "CEO",
      title: "អគ្គនាយក",
      children: [
        {
          id: 2,
          name: "CTO",
          title: "នាយកបច្ចេកទេស",
          children: [
            {
              id: 3,
              name: "Dev Manager",
              title: "ថ្នាក់គ្រប់គ្រងការអភិវឌ្ឍ",
              children: [
                { id: 4, name: "Frontend Team", title: "អ្នករចនាទំព័រទំនាក់ទំនង" },
                { id: 5, name: "Backend Team", title: "អ្នកអភិវឌ្ឍមុខងារប្រព័ន្ធ" },
              ],
            },
          ],
        },
        {
          id: 6,
          name: "CFO",
          title: "នាយកហិរញ្ញវត្ថុ",
          children: [{ id: 7, name: "Accounting", title: "ក្រុមគណនេយ្យ" }],
        },
      ],
    };

    return {
      /**
       * Variables
       */
      model ,
      table ,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      /**
       * Loading overlay
       */
      closeTableLoading  ,
      treeData
    }
  },
  data() {
    return {
      ocmLogoUrl ,
      model: {
        name: "organizations" ,
        title: "រចនាសម្ព័ន្ធក្រសួង"
      },
      drawerHelper : false ,
      index : 0 ,
      chart : null ,
      selectedNode: {
        id: 0 ,
        parentId: "" ,
        name: "" ,
        image: "https://picsum.photos/200/300" ,
        desp: "" ,
        leader: []
      } ,
      nodeVal: {
        id: 0 ,
        parentId: "" ,
        name: "" ,
        image: "https://picsum.photos/200/300" ,
        desp: "" ,
        leader: []
      },
      organizationModal : false ,
      childOrganizationModal : false ,
      dataFlattened: []
    };
  },
  mounted() {
    // this.drawingOrgchartWithServerData()
    this.drawingOrgchart()
  },
  methods: {
    drawingOrgchart(data){
      this.dataFlattened = Array.isArray( data ) ? data : []
      this.dataFlattened.columns = 'id,name,image,parentId,desp'
      this.chart = new OrgChart()
      .container('.chart-container')
      .data( 
        this.dataFlattened
      )
      .svgHeight(window.innerHeight - 55)
      .initialZoom(0.8)
      .nodeWidth((d3Node) => {
        let i = 0;
        if (d3Node.parent) { i = d3Node.parent.children.indexOf(d3Node); }
        if (i && i == d3Node.parent.children.length - 1) { return 600; }
        return (!i || i == d3Node.parent.children.length - 1) ? 300 : 100
      })
      .nodeHeight((d3Node) => {
        let i = 0;
        if (d3Node.parent) { i = d3Node.parent.children.indexOf(d3Node); }
        if (i && i == d3Node.parent.children.length - 1) { return 300; }
        return (!i || i == d3Node.parent.children.length - 1) ? 200 : 100
      })
      .siblingsMargin(d3Node => 0)
      .childrenMargin(d3Node => 50)
      // .neightbourMargin((n1, n2) => 50)
      .compactMarginPair(d3Node => 70)
      .compactMarginBetween(d3Node => 30)
      .setActiveNodeCentered(true)
      // .layout(new URLSearchParams(new URL(document.location.href).search).get('layout') || "top")
      .layout("top")
      .linkUpdate(function (d3Node, i, arr) {
          const link = this;
          d3.select(link)
              .attr('stroke-dasharray', !i ? '2 2' : 'none')
              .attr('stroke-width', 3)
      })
      .nodeUpdate(function (node, i, arr) {
          d3.select(this).on('click.node', (event, d, i) => {
          })
      })
      // .connections(
      //   [
      //       { id: 1, from: "O-6067", to: "O-6068", label: "Directly Reports To" },
      //       { id: 2, from: "O-6070", to: "O-6066", label: "Reports To" },
      //       { id: 3, from: "O-6088", to: "O-6069", label: "They were coworkers once" },
      //       { id: 3, from: "O-6164", to: "O-6070", label: "Possible conflicts of interest" }
      //   ],
      // )
      // .nodeContent(function (d, i, arr, state) {
      //   return `<div style="padding:0px">
          
      //     ${state.layout == 'top' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-left:${-(d.flexCompactDim[0] / 2 - d.width) / 2 + state.compactMarginPair(d) / 4}px;width:${d.flexCompactDim[0]}px;height:${d.flexCompactDim[1]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
      //     ${state.layout == 'bottom' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-top:${-d.flexCompactDim[1] + d.height}px;margin-left:${-(d.flexCompactDim[0] / 2 - d.width) / 2 + state.compactMarginPair(d) / 4}px;width:${d.flexCompactDim[0]}px;height:${d.flexCompactDim[1]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
      //     ${state.layout == 'left' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-top:${-(d.flexCompactDim[0]/2-d.height)/2+ state.compactMarginPair(d) / 4}px;margin-left:${0}px;width:${d.flexCompactDim[1]}px;height:${d.flexCompactDim[0]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
      //     ${state.layout == 'right' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5; margin-top:${-(d.flexCompactDim[0]/2-d.height)/2+ state.compactMarginPair(d) / 4}px;margin-left:${d.width-d.flexCompactDim[1]}px;width:${d.flexCompactDim[1]}px;height:${d.flexCompactDim[0]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
          
      //     <img src="${d.data.image}"  style="border-radius:100px;width:60px;height:60px;" />
      //     ID: ${d.data.id} <br>
      //     Children Direct:${d.data._directSubordinates}<br>
      //     Children Total:${d.data._totalSubordinates}
      //   </div>`;
      // })
      // Commentable
      .nodeHeight(d => 100)
      .nodeWidth(d => {
          return 400
      })
      .childrenMargin(d => 50)
      .onNodeClick( d => {
        console.log( "YOU" )
        this.selectedNode = this.dataFlattened.find( node => node.id == d )
        this.organizationModal = true
        // this.selectedNode = {
        //   id: node.data.id ,
        //   name: node.data.name ,
        //   image: node.data.image ,
        //   pid: node.data.pid
        // }
        /**
         * Show drawer for adding
         */
        this.nodeVal.pid = this.selectedNode.id 
        this.drawerHelper = true 
      })
      .compactMarginBetween(d => 35)
      .compactMarginPair(d => 30)
      // .neightbourMargin((a, b) => 20)
      .buttonContent(({ node, state }) => {
        return `<div class="border border-gray-300 bg-white rounded-md flex flex-row h-6 font-bold text-blue-500" >
          <svg class="w-4" style="margin: 2px 5px auto 5px; " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>
          <div class="" style="margin: 3px 5px auto 5px; " >${ ( node.data._directSubordinates ) }</div>
          </div>`
      })
      .linkUpdate(function (d, i, arr) {
          d3.select(this)
              .attr("stroke", d => d.data._upToTheRootHighlighted ? '#152785' : '#E4E2E9')
              .attr("stroke-width", d => d.data._upToTheRootHighlighted ? 5 : 1)

          if (d.data._upToTheRootHighlighted) {
              d3.select(this).raise()
          }
      })
      .nodeContent(function (d, i, arr, state) {
          const colors = ['#278B8D', '#404040', '#0C5C73', '#33C6CB'];
          const color = "#FFFFFF"
          return `<div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9;">
                    <div class="border overflow-hidden border-gray-200" style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" >
                    <!-- Picture -->` +
                    (
                      d.data.image==null || d.data.image==undefined
                      ? `<img src="`+ocmLogoUrl+`" class="w-8 mt-1 mx-auto" />`
                      : `<svg class='w-8 h-8 m-2' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>`
                    )
                    + `</div><!-- Menu icon -->
                    <!-- <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div> -->
                    <!-- Name of the shape -->
                    <div style="" class="text-center text-gray-600 p-4 pt-6 font-moul leading-7" > ${d.data.name} </div>
                    <!-- Position of the shape -->
                    <div style="color:#716E7B;margin: 3px 10px 5px 10px;font-size:12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;  text-align: center; ">${ 
                      '' // d.data.leader != undefined && d.data.leader.length > 0 ? ( d.data.leader[0].countesies.map( (c) => c.name ).join(' , ') + "" + d.data.leader[0].lastname + " " + d.data.leader[0].firstname + " " + d.data.leader[0].positions.map( (p) => p.name ).join(' , ') ) : 'មិនមានអ្នកគ្រប់គ្រង' 
                    }</div>
                    <!-- Total staffs within the organization -->
                    <div style="position: absolute; right: 5px; bottom: -4px; border: 1px solid #CCC; background-color: #FFF; color:#716E7B; border-radius: 5px; height: 22px; padding: 2px; float: left;" >
                      <svg class="text-blue-600" style=" float: left; width: 12px; height: 12px; margin: 1px 5px auto 5px; display: inline-block; font-size: 12px ;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136l32-56h-96l32 56l-32 136l-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" fill="currentColor"></path></svg>
                      <div class="text-blue-600" style=" float: right; font-size: 12px ; margin: auto 5px; " >` + ( d.data.staffs != null && d.data.staffs.length > 0 ? d.data.staffs.length : 0 ) + `</div>
                    </div>
                  </div>
                  `;
      })
      .render()
    },
    drawingOrgchartWithServerData(){
      // this.$store.dispatch('regulator/getChildDocument').then( res => {
      //   console.log( res.data );
      // });
      /**
       * Get CSV
       */
      this.$store.dispatch('organizations/listByParent',{
        search: '' ,
        perPage: 1000 , 
        page: 1 ,
        id: 2
      }).then( res => {
          let _this = this 
          this.dataFlattened = res.data.records
          this.dataFlattened.columns = 'id,name,image,parentId,desp'
          this.chart = new OrgChart()
          .container('.chart-container')
          .data( 
            this.dataFlattened
          )
          .svgHeight(window.innerHeight - 55)
          .initialZoom(0.8)
          .nodeWidth((d3Node) => {
            let i = 0;
            if (d3Node.parent) { i = d3Node.parent.children.indexOf(d3Node); }
            if (i && i == d3Node.parent.children.length - 1) { return 600; }
            return (!i || i == d3Node.parent.children.length - 1) ? 300 : 100
          })
          .nodeHeight((d3Node) => {
            let i = 0;
            if (d3Node.parent) { i = d3Node.parent.children.indexOf(d3Node); }
            if (i && i == d3Node.parent.children.length - 1) { return 300; }
            return (!i || i == d3Node.parent.children.length - 1) ? 200 : 100
          })
          .siblingsMargin(d3Node => 0)
          .childrenMargin(d3Node => 50)
          // .neightbourMargin((n1, n2) => 50)
          .compactMarginPair(d3Node => 70)
          .compactMarginBetween(d3Node => 30)
          .setActiveNodeCentered(true)
          // .layout(new URLSearchParams(new URL(document.location.href).search).get('layout') || "top")
          .layout("top")
          .linkUpdate(function (d3Node, i, arr) {
              const link = this;
              d3.select(link)
                  .attr('stroke-dasharray', !i ? '2 2' : 'none')
                  .attr('stroke-width', 3)
          })
          .nodeUpdate(function (node, i, arr) {
              d3.select(this).on('click.node', (event, d, i) => {
              })
          })
          // .connections(
          //   [
          //       { id: 1, from: "O-6067", to: "O-6068", label: "Directly Reports To" },
          //       { id: 2, from: "O-6070", to: "O-6066", label: "Reports To" },
          //       { id: 3, from: "O-6088", to: "O-6069", label: "They were coworkers once" },
          //       { id: 3, from: "O-6164", to: "O-6070", label: "Possible conflicts of interest" }
          //   ],
          // )
          // .nodeContent(function (d, i, arr, state) {
          //   return `<div style="padding:0px">
              
          //     ${state.layout == 'top' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-left:${-(d.flexCompactDim[0] / 2 - d.width) / 2 + state.compactMarginPair(d) / 4}px;width:${d.flexCompactDim[0]}px;height:${d.flexCompactDim[1]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
          //     ${state.layout == 'bottom' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-top:${-d.flexCompactDim[1] + d.height}px;margin-left:${-(d.flexCompactDim[0] / 2 - d.width) / 2 + state.compactMarginPair(d) / 4}px;width:${d.flexCompactDim[0]}px;height:${d.flexCompactDim[1]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
          //     ${state.layout == 'left' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-top:${-(d.flexCompactDim[0]/2-d.height)/2+ state.compactMarginPair(d) / 4}px;margin-left:${0}px;width:${d.flexCompactDim[1]}px;height:${d.flexCompactDim[0]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
          //     ${state.layout == 'right' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5; margin-top:${-(d.flexCompactDim[0]/2-d.height)/2+ state.compactMarginPair(d) / 4}px;margin-left:${d.width-d.flexCompactDim[1]}px;width:${d.flexCompactDim[1]}px;height:${d.flexCompactDim[0]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
              
          //     <img src="${d.data.image}"  style="border-radius:100px;width:60px;height:60px;" />
          //     ID: ${d.data.id} <br>
          //     Children Direct:${d.data._directSubordinates}<br>
          //     Children Total:${d.data._totalSubordinates}
          //   </div>`;
          // })
          // Commentable
          .nodeHeight(d => 100)
          .nodeWidth(d => {
              return 400
          })
          .childrenMargin(d => 50)
          .onNodeClick( d => {
            console.log( "ME" )
            this.selectedNode = this.dataFlattened.find( node => node.id == d )
            this.organizationModal = true
            // this.selectedNode = {
            //   id: node.data.id ,
            //   name: node.data.name ,
            //   image: node.data.image ,
            //   pid: node.data.pid
            // }
            /**
             * Show drawer for adding
             */
            this.nodeVal.pid = this.selectedNode.id 
            this.drawerHelper = true 
            console.log( "OK" )
          })
          .compactMarginBetween(d => 35)
          .compactMarginPair(d => 30)
          // .neightbourMargin((a, b) => 20)
          .buttonContent(({ node, state }) => {
            return `<div class="border border-gray-300 bg-white rounded-md flex flex-row h-6 font-bold text-blue-500" >
              <svg class="w-4" style="margin: 2px 5px auto 5px; " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>
              <div class="" style="margin: 3px 5px auto 5px; " >${ ( node.data._directSubordinates ) }</div>
              </div>`
          })
          .linkUpdate(function (d, i, arr) {
              d3.select(this)
                  .attr("stroke", d => d.data._upToTheRootHighlighted ? '#152785' : '#E4E2E9')
                  .attr("stroke-width", d => d.data._upToTheRootHighlighted ? 5 : 1)

              if (d.data._upToTheRootHighlighted) {
                  d3.select(this).raise()
              }
          })
          .nodeContent(function (d, i, arr, state) {
              const colors = ['#278B8D', '#404040', '#0C5C73', '#33C6CB'];
              const color = "#FFFFFF"
              return `<div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9;">
                        <div class="border overflow-hidden border-gray-200" style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" >
                        <!-- Picture -->` +
                        (
                          d.data.image==null || d.data.image==undefined
                          ? `<img src="`+ocmLogoUrl+`" class="w-8 mt-1 mx-auto" />`
                          : `<svg class='w-8 h-8 m-2' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>`
                        )
                        + `</div><!-- Menu icon -->
                        <!-- <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div> -->
                        <!-- Name of the shape -->
                        <div style="" class="text-center text-gray-600 p-4 pt-6 font-moul leading-7" > ${d.data.name} </div>
                        <!-- Position of the shape -->
                        <div style="color:#716E7B;margin: 3px 10px 5px 10px;font-size:12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;  text-align: center; ">${ 
                          '' // d.data.leader != undefined && d.data.leader.length > 0 ? ( d.data.leader[0].countesies.map( (c) => c.name ).join(' , ') + "" + d.data.leader[0].lastname + " " + d.data.leader[0].firstname + " " + d.data.leader[0].positions.map( (p) => p.name ).join(' , ') ) : 'មិនមានអ្នកគ្រប់គ្រង' 
                        }</div>
                        <!-- Total staffs within the organization -->
                        <div style="position: absolute; right: 5px; bottom: -4px; border: 1px solid #CCC; background-color: #FFF; color:#716E7B; border-radius: 5px; height: 22px; padding: 2px; float: left;" >
                          <svg class="text-blue-600" style=" float: left; width: 12px; height: 12px; margin: 1px 5px auto 5px; display: inline-block; font-size: 12px ;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136l32-56h-96l32 56l-32 136l-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" fill="currentColor"></path></svg>
                          <div class="text-blue-600" style=" float: right; font-size: 12px ; margin: auto 5px; " >` + ( d.data.staffs != null && d.data.staffs.length > 0 ? d.data.staffs.length : 0 ) + `</div>
                        </div>
                      </div>
                      `;
          })
          .render()
        // }) // Finish building chart
      }).catch( err => { console.log( err ) } );

    },
    downloadPdf() {
      this.chart.exportImg({
          save: false,
          onLoad: (base64 => {
              var pdf = new jspdf.jsPDF();
              var img = new Image()
              img.src = base64;
              img.onload = function () {
                  pdf.addImage(img, 'JPEG', 5, 5, 595 / 3, img.height / img.width * 595 / 3);
                  pdf.save('chart.pdf');
              }
          })
      })
    },
    changeLayout(){
      this.chart.layout(["right","bottom","left","top"][this.index++%4]).render().fit()
    },
    beforeUpload(data){
      if (data.file.file?.type !== "image/png") {
        message.error(
          "Only upload picture files in png format, please re-upload."
        );
      }
      return false;
    }, 
    addChild(o){
      if( this.dataFlattened.length <= 0 ){
        this.drawingOrgchart(
          [{
            id: o.id,
            parentId: null ,
            name: o.name ,
            image: o.image != "" && o.image != undefined ? o.image : ocmLogoUrl ,
            desp: o.desp ,
            _centered: true  
          }]
        )
      }else{
        // this.chart.addNode({
        //   id: o.id,
        //   parentId: o.parentId > 0 ? o.parentId : ( o.pid > 0 ? o.pid : null ) ,
        //   name: o.name ,
        //   image: o.image != "" && o.image != undefined ? o.image : ocmLogoUrl ,
        //   desp: o.desp ,
        //   _centered: true
        // })
      }
      // this.chart.setCentered(o.id).render()
    
      // this.nodeVal = {
      //   id: 0 ,
      //   parentId: 0 ,
      //   name: "" ,
      //   image: "" ,
      //   desp: ''
      // }
      // this.childNode = reactive({
      //   id: 0 ,
      //   parentId: 0 ,
      //   name: "" ,
      //   image: "" ,
      //   desp: ''
      // })
    },
    addChildToServer(){
      this.$store.dispatch( 'organizations/addchild',{
        name: this.childNode.name ,
        // document_id : 0 , // Id of the document that this record despribe
        pid : this.nodeVal.parentId > 0 ? this.nodeVal.parentId : 0 , // Id of the parent record
        desp: this.childNode.desp ,
        image: '' // this.nodeVal.image
      }).then( res => {
        if( res.data.ok ){

          this.chart.addNode({
            id: res.data.record.id,
            parentId: res.data.record.pid ,
            name: res.data.record.name,
            image: res.data.record.image != "" ? res.data.record.image : ocmLogoUrl ,
            desp: res.data.record.desp ,
            _centered: true
          })
          // this.chart.setCentered(res.data.record.id).render()
        
          this.nodeVal = {
            id: 0 ,
            parentId: 0 ,
            name: "" ,
            image: "" ,
            desp: ''
          }
          this.childNode = reactive({
            id: 0 ,
            parentId: 0 ,
            name: "" ,
            image: "" ,
            desp: ''
          })

          // notify.success({
          //   title: 'រក្សារទុកព័ត៌មាន' ,
          //   despription: res.data.message ,
          //   duration: 3000
          // })
          console.log( res.data.message )
        }else{
          // notify.error({
          //   title: 'រក្សារទុកព័ត៌មាន' ,
          //   despription: res.data.message ,
          //   duration: 3000
          // })
          console.log( res.data.message )
        }
      }).catch( err => {
        console.log( err )
      })
      this.drawerHelper = false 
    },
    linkRegulator(){
      this.$store.dispatch('regulator/linkDocument',{
        id: this.selectedNode.id ,
        document_id : 0 , // Id of the document that this record despribe
      }).then( res => {
        console.log( res.data )
        this.drawerHelper = false
        this.drawingOrgchart()
      }).catch( err => {
        console.log( err )
      });
    },
    onCloseChildOrganizationModal(record){
      console.log( "on close child organization modal")
      this.chart.render()
      this.childOrganizationModal = false
    },
    onCloseOrganizationModel(record){
      // this.dataFlattened = res.data.records
      // this.dataFlattened.columns = 'id,name,image,parentId,desp,staffs,leader'

      // console.log( this.dataFlattened.find( node => node.id == record.id ) )
      // this.selectedNode = record
      // this.chart.setExpanded(record.id,false).render()
      // this.chart.setCentered(record.id).render()
      console.log( "Render chart" )
      this.chart.render()
      // this.drawingOrgchart()
      // console.log( res.data )
      // this.drawerHelper = false
      this.organizationModal = false
    },
    openChildOrganization(){
      alert('me')
    }
  },
}

</script>

<style scoped>
  .vcb-table-pagination {
    @apply flex flex-row bg-gray-700 text-gray-50 right-1 bottom-1 left-1 border border-l z-40 justify-center p-1 mx-auto rounded-full h-10 ;
  }
  .vcb-pagination-page {
    @apply rounded-full border border-gray-200 w-auto px-2 h-8 truncate mx-1 font-bold cursor-pointer text-center hover:text-blue-500 hover:border-blue-500 duration-300 transform hover:scale-110;
  }
  .vcb-pagination-page-active {
    @apply rounded-full border border-blue-400 w-auto px-2 h-8 truncate mx-1 font-bold cursor-pointer text-center hover:text-blue-500 duration-300 text-blue-500;
  }
</style>