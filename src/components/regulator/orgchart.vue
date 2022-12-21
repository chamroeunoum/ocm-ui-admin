<template>
  <div class="w-full h-min-screen bg-gray-200">
    <!-- Buttons -->
    <div v-if="chart!==null" class="action-buttons" style="margin:0 100px">
      <button @click='chart.setExpanded("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Expand 1</button>

      <button @click='chart.setExpanded("1",false).render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Collapse 1</button>
     

      <button @click='chart.addNode({id:"5",parentId:"1",name:"ក្រសួងថ្មី",imageUrl:"https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-1/272989966_243037994668044_1336394919081446684_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=c6021c&_nc_ohc=YFBkZNzaqLkAX-WexVW&_nc_ht=scontent.fpnh11-1.fna&oh=00_AfBWCY8Gms9RVLWbKvQlJsdtlOZvVFjs32HHnQlFRixw3g&oe=639809C4"})' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Add node as roots' child</button>
      
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
    <div class="chart-container" style=" padding-top:10px;  height:1200px ;background-color:white"> </div>
  </div>
</template>

<script>

import * as d3 from 'd3'
import { OrgChart } from 'd3-org-chart'
import jspdf from 'jspdf'
import { useNotification } from 'naive-ui'

/**
 * CRUD component form
 */

export default {
  name: "RegulatorOrgchart" ,
  components: {  },
  setup(){  
    return {
      
    }
  },
  mounted() {
    var notify = useNotification()
    d3.csv('/src/misc/government.csv')
      .then(dataFlattened => {
        this.chart = new OrgChart()
          .container('.chart-container')
          .data(dataFlattened)
          .svgHeight(window.innerHeight)
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
          .onNodeClick(d => { 
            console.log(d.id + ' onNodeClick')
            notify.info({
              title: "ដំណឹង" ,
              content: "លេខសម្គាល់របស់ក្រសួង ៖ " + d.id ,
              duration: 2000
            })
          })
          .linkUpdate(function (d3Node, i, arr) {
              const link = this;
              d3.select(link)
                  .attr('stroke-dasharray', !i ? '2 2' : 'none')
                  .attr('stroke-width', 3)
          })
          .nodeUpdate(function (data, i, arr) {
              d3.select(this).on('click.node', (event, d, i) => {
                console.log(d.id + " nodeUpdate" )
                notify.info({
                  title: "ដំណឹង" ,
                  content: "លេខសម្គាល់របស់ក្រសួង ៖ " + d.id ,
                  duration: 2000
                })
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
              
              <img src="${d.data.imageUrl}"  style="border-radius:100px;width:60px;height:60px;" />
              ID: ${d.data.id} <br>
              Children Direct:${d.data._directSubordinates}<br>
              Children Total:${d.data._totalSubordinates}
            </div>`;
          })
          // Commentable

          .nodeHeight(d => 85)
          .nodeWidth(d => {
              return 220
          })
          .childrenMargin(d => 50)
          .onNodeClick(d=> {
            // alert('បានចុចវា')
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
                        <img src=" ${d.data.imageUrl}" style="position:absolute;margin-top:-20px;margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />  
                        <!-- Menu icon -->
                        <!-- <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div> -->
                        <!-- Name of the shape -->
                        <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:32px"> ${d.data.name} </div>
                        <!-- Position of the shape -->
                        <!-- <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${d.data.positionName} </div> -->
                      </div>
                      `;
          }).render()
      }) // Finish building chart
  },
  methods: {
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
    }
  },
  data() {
    return {
      index : 0 ,
      chart : null
    };
  },
  created() {
    d3.csv(
      'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    ).then(d => {
      console.log('fetched data');
      this.data = d;
    });
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