<template>
  <div class="w-full relative">
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg class="text-gray-700 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>
        <div class="leading-8 font-muol mt-1" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2">
        </div>
        <div class="w-2/5 relative" >
          <!-- <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <Icon size="27" class="absolute right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" >
            <n-icon>
              <Search20Regular />
            </n-icon>
          </Icon> -->
        </div>
        
      </div>
    </div>
    <!-- Buttons -->
    <div v-if="chart!==null" class="action-buttons hidden" style="margin:0 100px" >
      <button @click='chart.setExpanded("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Expand 1</button>

      <button @click='chart.setExpanded("1",false).render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Collapse 1</button>

      <button @click='chart.addNode({id:"5",parentId:"1",name:"ក្រសួងថ្មី",image:"https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-1/272989966_243037994668044_1336394919081446684_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=c6021c&_nc_ohc=YFBkZNzaqLkAX-WexVW&_nc_ht=scontent.fpnh11-1.fna&oh=00_AfBWCY8Gms9RVLWbKvQlJsdtlOZvVFjs32HHnQlFRixw3g&oe=639809C4"})' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Add node as roots' child</button>
      
      <button @click='chart.addNode({id:"6",parentId:"1",name:"ក្រសួងថ្មី ១",_centered:true})' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Insert node at 5-th to 1</button>

      <button @click='chart.removeNode("2")' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Remove 2</button>

      <button @click='chart.fit()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Fit</button>

      <button @click='changeLayout()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Swap Layouts</button>

      <button @click='chart.setCentered("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Center O-6162 </button>

      <button @click='chart.setHighlighted("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Highlight O-6162 </button>

      <button @click='chart.setUpToTheRootHighlighted("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Highlight O-6162 to root </button> 

      <button @click='chart.clearHighlighting()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Clear highlighting </button>

      <button @click='chart.fullscreen()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Full Screen </button>

      <button @click='chart.zoomIn()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Zoom In </button>

      <button @click='chart.zoomOut()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Zoom Out</button>

      <button @click='chart.exportImg()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Expo Current Image</button>

      <button @click='chart.exportSvg()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Export SVG</button>

      <button @click='chart.expandAll()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Expand All</button>

      <button @click='chart.connections([{from:"O-6067",to:"O-6070",label:"Conflicts of interest"}]).render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Multi Node Connections</button>
      
      <button @click='downloadPdf()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Download PDF</button>

    </div>

    <!-- <a href="https://github.com/bumbeishvili/d3-organization-chart">
    <img style="position:fixed;top:0;right:0;border:0;z-index:2;" width="149" height="149"
        src="https://bumbeishvili.github.io/d3-tooltip/forkme.png" alt="Fork me on GitHub">
    </a> -->
    <!-- Chart -->
    <div class="chart-container border " > </div>
    <!-- Naive Drawer for child creation -->
    <n-drawer v-model:show="drawerHelper" :width="480" :resizable="true" placement="right" >
      <n-drawer-content closable>
        <template #header>បន្ថែមព័ត៌មាន</template>
        <template #footer>
        </template>
        <!-- Update node information -->
        <div class="border-b border-gray-200 my-4 " >ព័ត៌មានអង្គភាព (ជាមេ)</div>
        <div class="my-4 " >ឈ្មោះ</div>
        <n-input v-model:value="selectedNode.name" />
        <div class="my-4 " >ព័ត៌មានអំពីអង្គភាព</div>
        <n-input type="textarea" v-model:value="selectedNode.desp" placeholder="ព័ត៌មានអំពីអង្គភាព" />
        <n-button class="mt-4"  @click="update()" >កែប្រែព័ត៌មាន</n-button>
        <!-- <div class="border-b border-gray-200 my-8  "></div>
        <div class="border-b border-gray-200 my-4 " >ឯកសារគតិយុត្តរបស់អង្គភាព (ជាមេ)</div>
        <div class="my-4 " >សូមជ្រើសរើសឯកសារគតិយុត្ត</div>
        <n-input v-model:value="selectedNode.name" />
        <n-button class="mt-4"  @click="linkRegulator()" >ភ្ជាប់ឯកសារ</n-button> -->
        <div class="border-b border-gray-200 my-8  "></div>
        <!-- Input of the name of the node -->
        <div class="border-b border-gray-200 my-4 " >បញ្ចូលអង្គភាពក្រោម</div>
        <n-input placeholder="សូមបញ្ចូលឈ្មោះ" v-model:value="childNode.name" />
        <div class="my-4 " >ព័ត៌មានអំពីអង្គភាព</div>
        <n-input type="textarea" v-model:value="childNode.desp" placeholder="ព័ត៌មានអំពីអង្គភាព" />
        <n-button class="mt-4" @click="addChild()" >បន្ថែមកូន</n-button>
        <!-- Input of the image of the node -->
        <div class="w-full my-4" > 
          <!-- <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            @before-upload="beforeUpload"
          >
          <div class="" >សូមជ្រើសរើសរូបភាព<n-button class="ml-8">បញ្ចូលរូបភាព</n-button></div>
        </n-upload>
         -->
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script>

import * as d3 from 'd3'
import { OrgChart } from 'd3-org-chart'
import jspdf from 'jspdf'
import { reactive } from 'vue'
import { useNotification , useDialog, selectDark } from 'naive-ui'

/**
 * CRUD component form
 */

export default {
  name: "RegulatorOrgchart" ,
  components: {  },
  setup(){  
    const childNode = reactive({
      name : '' ,
      desp : ''
    })
    /**
     * Variables
     */    
     const model = reactive( {
      name: "organization" ,
      title: "រចនាសម្ព័ន្ធក្រសួង"
    })

    return {
      model ,
      childNode
    }
  },
  data() {
    return {
      drawerHelper : false ,
      index : 0 ,
      chart : null ,
      selectedNode: {
        id: 0 ,
        parentId: "" ,
        name: "" ,
        image: "https://picsum.photos/200/300" ,
        desc: ""
      } ,
      nodeVal: {
        id: 0 ,
        parentId: "" ,
        name: "" ,
        image: "https://picsum.photos/200/300" ,
        desc: ""
      }
    };
  },
  mounted() {
    this.drawingOrgchart()
  },
  methods: {
    drawingOrgchart(){
      // this.$store.dispatch('regulator/getChildDocument').then( res => {
      //   console.log( res.data );
      // });
      /**
       * Get CSV
       */
      this.$store.dispatch('organizations/list').then( res => {
        // console.log( res.data.records[0] )
        // console.log( res.data.columns )
        // return false 
        d3.csv('/src/misc/government.csv').then(dataFlattened => {
          // console.log( dataFlattened)
          dataFlattened = res.data.records
          dataFlattened.columns = res.data.columns
          this.chart = new OrgChart()
          .container('.chart-container')
          .data(dataFlattened
          //   [
          //   res.data.records[0] ,
          //   res.data.columns
          // ]
          )
          .svgHeight(window.innerHeight - 150)
          .initialZoom(1)
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
          .neightbourMargin((n1, n2) => 50)
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
          .nodeContent(function (d, i, arr, state) {
            return `<div style="padding:0px">
              
              ${state.layout == 'top' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-left:${-(d.flexCompactDim[0] / 2 - d.width) / 2 + state.compactMarginPair(d) / 4}px;width:${d.flexCompactDim[0]}px;height:${d.flexCompactDim[1]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
              ${state.layout == 'bottom' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-top:${-d.flexCompactDim[1] + d.height}px;margin-left:${-(d.flexCompactDim[0] / 2 - d.width) / 2 + state.compactMarginPair(d) / 4}px;width:${d.flexCompactDim[0]}px;height:${d.flexCompactDim[1]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
              ${state.layout == 'left' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-top:${-(d.flexCompactDim[0]/2-d.height)/2+ state.compactMarginPair(d) / 4}px;margin-left:${0}px;width:${d.flexCompactDim[1]}px;height:${d.flexCompactDim[0]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
              ${state.layout == 'right' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5; margin-top:${-(d.flexCompactDim[0]/2-d.height)/2+ state.compactMarginPair(d) / 4}px;margin-left:${d.width-d.flexCompactDim[1]}px;width:${d.flexCompactDim[1]}px;height:${d.flexCompactDim[0]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
              
              <img src="${d.data.image}"  style="border-radius:100px;width:60px;height:60px;" />
              ID: ${d.data.id} <br>
              Children Direct:${d.data._directSubordinates}<br>
              Children Total:${d.data._totalSubordinates}
            </div>`;
          })
          // Commentable

          .nodeHeight(d => 85)
          .nodeWidth(d => {
              return 300
          })
          .childrenMargin(d => 50)
          .onNodeClick( d => {
            this.selectedNode = dataFlattened.find( node => node.id == d )

            // this.selectedNode = {
            //   id: node.data.id ,
            //   name: node.data.name ,
            //   image: node.data.image ,
            //   pid: node.data.pid
            // }
            /**
             * Show drawer for adding
             */
            // this.nodeVal.pid = this.selectedNode.id 
            this.nodeVal.parentId = this.selectedNode.id 
            this.drawerHelper = true 
          })
          .compactMarginBetween(d => 35)
          .compactMarginPair(d => 30)
          .neightbourMargin((a, b) => 20)
          .buttonContent(({ node, state }) => {
              return `<div style="color:#716E7B;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${node.children ? `<i class="fas fa-angle-up"></i>` : `<i class="fas fa-angle-down"></i>`}</span> ${node.data._directSubordinates}  </div>`
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
              return `<div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9">
                        <div style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                        <!-- Picture -->
                        <img src=" ${d.data.image==null ? '/src/assets/logo.svg' : d.data.image }" style="position:absolute;margin-top:-20px;margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />  
                        <!-- Menu icon -->
                        <!-- <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div> -->
                        <!-- Name of the shape -->
                        <div style="font-size:12px;color:#08011E;margin-left:20px;margin-top:32px"> ${d.data.name} </div>
                        <!-- Position of the shape -->
                        <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${d.data.desp} </div>
                      </div>
                      `;
          }).render()
        }) // Finish building chart
      }).catch( err => { console.log( err ) } );

      // d3.csv('https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv')
      // // d3.csv('/src/misc/government.csv')
      // .then(dataFlattened => {
      //   console.log( dataFlattened );
      //   console.log( dataFlattened[0].pid)
      //   this.chart = new OrgChart()
      //     .container('.chart-container')
      //     .data(dataFlattened)
      //     .svgHeight(window.innerHeight)
      //     .initialZoom(1)
      //     .nodeWidth((d3Node) => {
      //       let i = 0;
      //       if (d3Node.parent) { i = d3Node.parent.children.indexOf(d3Node); }
      //       if (i && i == d3Node.parent.children.length - 1) { return 600; }
      //       return (!i || i == d3Node.parent.children.length - 1) ? 300 : 100
      //     })
      //     .nodeHeight((d3Node) => {
      //       let i = 0;
      //       if (d3Node.parent) { i = d3Node.parent.children.indexOf(d3Node); }
      //       if (i && i == d3Node.parent.children.length - 1) { return 300; }
      //       return (!i || i == d3Node.parent.children.length - 1) ? 200 : 100
      //     })
      //     .siblingsMargin(d3Node => 0)
      //     .childrenMargin(d3Node => 50)
      //     .neightbourMargin((n1, n2) => 50)
      //     .compactMarginPair(d3Node => 70)
      //     .compactMarginBetween(d3Node => 30)
      //     .setActiveNodeCentered(true)
      //     // .layout(new URLSearchParams(new URL(document.location.href).search).get('layout') || "top")
      //     .layout("top")
      //     .linkUpdate(function (d3Node, i, arr) {
      //         const link = this;
      //         d3.select(link)
      //             .attr('stroke-dasharray', !i ? '2 2' : 'none')
      //             .attr('stroke-width', 3)
      //     })
      //     .nodeUpdate(function (node, i, arr) {
      //         d3.select(this).on('click.node', (event, d, i) => {
      //         })
      //     })
      //     // .connections(
      //     //   [
      //     //       { id: 1, from: "O-6067", to: "O-6068", label: "Directly Reports To" },
      //     //       { id: 2, from: "O-6070", to: "O-6066", label: "Reports To" },
      //     //       { id: 3, from: "O-6088", to: "O-6069", label: "They were coworkers once" },
      //     //       { id: 3, from: "O-6164", to: "O-6070", label: "Possible conflicts of interest" }
      //     //   ],
      //     // )
      //     .nodeContent(function (d, i, arr, state) {
      //       return `<div style="padding:0px">
              
      //         ${state.layout == 'top' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-left:${-(d.flexCompactDim[0] / 2 - d.width) / 2 + state.compactMarginPair(d) / 4}px;width:${d.flexCompactDim[0]}px;height:${d.flexCompactDim[1]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
      //         ${state.layout == 'bottom' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-top:${-d.flexCompactDim[1] + d.height}px;margin-left:${-(d.flexCompactDim[0] / 2 - d.width) / 2 + state.compactMarginPair(d) / 4}px;width:${d.flexCompactDim[0]}px;height:${d.flexCompactDim[1]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
      //         ${state.layout == 'left' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5;margin-top:${-(d.flexCompactDim[0]/2-d.height)/2+ state.compactMarginPair(d) / 4}px;margin-left:${0}px;width:${d.flexCompactDim[1]}px;height:${d.flexCompactDim[0]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
      //         ${state.layout == 'right' && state.compact && d.flexCompactDim && (d.flexCompactDim[0] || d.flexCompactDim[0] == 1) ? ` <div style="border:1px solid black;opacity:0.5; margin-top:${-(d.flexCompactDim[0]/2-d.height)/2+ state.compactMarginPair(d) / 4}px;margin-left:${d.width-d.flexCompactDim[1]}px;width:${d.flexCompactDim[1]}px;height:${d.flexCompactDim[0]}px;z-index:-1;position:absolute;background-color:red"></div>` : ''}
              
      //         <img src="${d.data.image}"  style="border-radius:100px;width:60px;height:60px;" />
      //         ID: ${d.data.id} <br>
      //         Children Direct:${d.data._directSubordinates}<br>
      //         Children Total:${d.data._totalSubordinates}
      //       </div>`;
      //     })
      //     // Commentable

      //     .nodeHeight(d => 85)
      //     .nodeWidth(d => {
      //         return 300
      //     })
      //     .childrenMargin(d => 50)
      //     .onNodeClick( d => {
      //       this.selectedNode = dataFlattened.find( node => node.id == d )

      //       // this.selectedNode = {
      //       //   id: node.data.id ,
      //       //   name: node.data.name ,
      //       //   image: node.data.image ,
      //       //   pid: node.data.pid
      //       // }
      //       /**
      //        * Show drawer for adding
      //        */
      //       this.nodeVal.pid = this.selectedNode.id 
      //       this.drawerHelper = true 
      //     })
      //     .compactMarginBetween(d => 35)
      //     .compactMarginPair(d => 30)
      //     .neightbourMargin((a, b) => 20)
      //     .buttonContent(({ node, state }) => {
      //         return `<div style="color:#716E7B;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${node.children ? `<i class="fas fa-angle-up"></i>` : `<i class="fas fa-angle-down"></i>`}</span> ${node.data._directSubordinates}  </div>`
      //     })
      //     .linkUpdate(function (d, i, arr) {
      //         d3.select(this)
      //             .attr("stroke", d => d.data._upToTheRootHighlighted ? '#152785' : '#E4E2E9')
      //             .attr("stroke-width", d => d.data._upToTheRootHighlighted ? 5 : 1)

      //         if (d.data._upToTheRootHighlighted) {
      //             d3.select(this).raise()
      //         }
      //     })
      //     .nodeContent(function (d, i, arr, state) {
      //         const colors = ['#278B8D', '#404040', '#0C5C73', '#33C6CB'];
      //         const color = "#FFFFFF"
      //         return `<div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9">
      //                   <div style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
      //                   <!-- Picture -->
      //                   <img src=" ${d.data.image}" style="position:absolute;margin-top:-20px;margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />  
      //                   <!-- Menu icon -->
      //                   <!-- <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div> -->
      //                   <!-- Name of the shape -->
      //                   <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:32px"> ${d.data.name} </div>
      //                   <!-- Position of the shape -->
      //                   <!-- <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${d.data.positionName} </div> -->
      //                 </div>
      //                 `;
      //     }).render()
      // }) // Finish building chart
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
    addChild(){
      this.$store.dispatch( 'organizations/addchild',{
        name: this.childNode.name ,
        // document_id : 0 , // Id of the document that this record describe
        pid : this.nodeVal.parentId > 0 ? this.nodeVal.parentId : 0 , // Id of the parent record
        desp: this.childNode.desp ,
        image: '' // this.nodeVal.image
      }).then( res => {
        if( res.data.ok ){

          this.chart.addNode({
            id: res.data.record.id,
            parentId: res.data.record.pid ,
            name: res.data.record.name,
            image: res.data.record.image != "" ? res.data.record.image : '/src/assets/logo.svg' ,
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
          //   description: res.data.message ,
          //   duration: 3000
          // })
          console.log( res.data.message )
        }else{
          // notify.error({
          //   title: 'រក្សារទុកព័ត៌មាន' ,
          //   description: res.data.message ,
          //   duration: 3000
          // })
          console.log( res.data.message )
        }
      }).catch( err => {
        console.log( err )
      })
      this.drawerHelper = false 
    },
    update(){
      this.$store.dispatch('organizations/update',{
        id: this.selectedNode.id ,
        name: this.selectedNode.name ,
        // document_id : 0 , // Id of the document that this record describe
        pid : this.selectedNode.parentId > 0 ? this.selectedNode.parentId : 0 , // Id of the parent record
        desp: this.selectedNode.desp ,
        image: this.selectedNode.image
      }).then( res => {
        console.log( res.data )
        this.chart.setCentered(res.data.record.id).render()
        this.selectedNode = {
          id: 0 ,
          name: "" ,
          parentId : 0 ,
          desp: "" ,
          image: ""
        }
      }).catch( err => {
        console.log( err )
      });
      this.drawerHelper = false
    },
    linkRegulator(){
      this.$store.dispatch('regulator/linkDocument',{
        id: this.selectedNode.id ,
        document_id : 0 , // Id of the document that this record describe
      }).then( res => {
        console.log( res.data )
        this.drawerHelper = false
        this.drawingOrgchart()
      }).catch( err => {
        console.log( err )
      });
    },
  },
  created() {
    // d3.csv(
    //   'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    // ).then(d => {
    //   console.log('fetched data');
    //   this.data = d;
    // });
  }
}

</script>

<style scoped>
  [data-tooltip]:focus:after {
      display: none;
      border-bottom-color: none !important;
      ;
  }

  [data-tooltip]:focus:before {
      display: none;
      border-bottom-color: none !important;
      ;
  }

  [data-tooltip]:after {
      height: auto !important;
      padding: 11px 11px 11px 11px !important;
      content: attr(data-tooltip);
      white-space: pre;
      line-height: 16px !important;
      text-align: left !important;
  }
</style>