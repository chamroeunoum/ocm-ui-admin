<template>
  <div class="w-full">
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
    <Transition name="slide-fade" >
      <div v-if="dataFlattened" class="chart-container border " > </div>
    </Transition>
    <!-- Naive Drawer for child creation -->
    <action-form v-bind:model="model" v-bind:record="selectedNode" v-bind:show="organizationModal" :onClose="onCloseOrganizationModel" />
    <add-child-organization-form v-bind:model="model" v-bind:record="selectedNode" v-bind:show="childOrganizationModal" :onClose="onCloseChildOrganizationModal" />
    <Frame4Corner />
  </div>
</template>

<script>

import * as d3 from 'd3'
import { OrgChart } from 'd3-org-chart'
import jspdf from 'jspdf'
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useNotification , useDialog, selectDark } from 'naive-ui'
import Frame4Corner from './../widgets/frame/corner4.vue'
import { getKhmer } from './../../plugins/kh/number.js'
import ActionForm from './modal/actions.vue'
import AddChildOrganizationForm from './modal/addChild.vue'

/**
 * CRUD component form
 */

export default {
  name: "OrganizationOrgchart" ,
  components: { 
    Frame4Corner ,
    ActionForm ,
    AddChildOrganizationForm
  },
  data() {
    return {
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
      this.$store.dispatch('organizations/listByParent',{
        search: '' ,
        perPage: 1000 , 
        page: 1 ,
        id: 163
      }).then( res => {
        console.log( res.data.records[0] )
        // console.log( res.data.columns )
        // return false 
        // d3
        // .csv( d3.csv.parse('id,name,imageUrl,parentId,desp') )
        // // .json( res.data.records )
        // .then(dataFlattened => {
          // console.log( dataFlattened)
          this.dataFlattened = res.data.records
          this.dataFlattened.columns = 'id,name,imageUrl,parentId,desp,staffs,leader'
          this.chart = new OrgChart()
          .container('.chart-container')
          .data( 
            this.dataFlattened
          //   [
          //   res.data.records[0] ,
          //   res.data.columns
          // ]
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
          .neightbourMargin((a, b) => 20)
          .buttonContent(({ node, state }) => {
            console.log( node )
              return `<div class="border border-gray-300 bg-white rounded-md flex flex-row h-6 font-bold text-blue-500" >
                <svg class="w-4" style="margin: 2px 10px auto 10px; " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>
                <div class="" style="margin: 3px 5px auto 5px; " >${ getKhmer( node.data._directSubordinates ) }</div>
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
                          d.data.image==null
                          ? `<img src="/src/assets/logo.png" class="w-8 mt-1 mx-auto" />`
                          : `<svg class='w-8 h-8 m-2' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>`
                        )
                        + `</div><!-- Menu icon -->
                        <!-- <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div> -->
                        <!-- Name of the shape -->
                        <div style="font-size:12px;color:#08011E;margin: 32px 10px 5px 10px ;white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center; "> ${d.data.name} </div>
                        <!-- Position of the shape -->
                        <div style="color:#716E7B;margin: 3px 10px 5px 10px;font-size:12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;  text-align: center; "> ${ d.data.leader != undefined && d.data.leader.length > 0 ? ( 
                          d.data.leader[0].countesies.map( (c) => c.name ).join(' , ') 
                          + " " + 
                          d.data.leader[0].lastname + " " + d.data.leader[0].firstname 
                          + " " + 
                          d.data.leader[0].positions.map( (p) => p.name ).join(' , ') 
                        ) : 'មិនមានអ្នកគ្រប់គ្រង' } </div>
                        <!-- Total staffs within the organization -->
                        <div style="width: 40px; position: absolute; right: 5px; bottom: -4px; border: 1px solid #CCC; background-color: #FFF; color:#716E7B; border-radius: 5px; height: 22px; padding: 2px; float: left;" >
                          <svg class="text-blue-600" style=" float: left; width: 12px; height: 12px; margin: 1px auto auto 2px; display: inline-block; font-size: 12px ;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136l32-56h-96l32 56l-32 136l-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" fill="currentColor"></path></svg>
                          <div class="text-blue-600" style=" float: right; font-size: 12px ; " >${ getKhmer( d.data.staffs != null && d.data.staffs.length > 0 ? d.data.staffs.length : 0 ) }</div>
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
    addChild(){
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
      // this.dataFlattened.columns = 'id,name,imageUrl,parentId,desp,staffs,leader'

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