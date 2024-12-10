<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr ">
      <n-modal 
      v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick"  :on-after-enter="initial" transform-origin="center" 
      class=" bg-white" >
        <!-- Form edit account -->
        <div class="card relative border border-gray-300 rounded mx-auto overflow-visible" >
          <!-- <div class="absolute left-0 top-0 right-0 bottom-0 bg-center bg-cover bg-no-repeat " :style=" 'background-image: url(' + blurBackgroundZ + '); background-position: 100% auto; transform: scaleX(-1); '"  ></div> -->
          <!-- Start design artwork -->
          <!-- <div class="absolute -left-20 top-0 -right-20 h-60 bg-opacity-100 bg-blue-700 rounded-br-full rounded-bl-full" ></div>
          <div class="absolute -left-20 bottom-0 -right-20 h-4/6 bg-opacity-90 bg-blue-700 rounded-tr-full rounded-tl-full " ></div>
          <div class="absolute -left-20 bottom-0 -right-20 h-full bg-opacity-90 bg-blue-700 " ></div>
          <div class="absolute left-0 bottom-0 right-0 h-full bg-opacity-80 bg-white " ></div> -->
          <!-- End design artwork -->
          <div v-if="record != undefined " id="official-card" class="flex relative official-card" >
            <div class="flex flex-wrap" style="height: 5.5cm; width: 8.5cm; padding: 6px; " > 
              <table class="w-full " style="border-spacing: 1px; " >
                <tbody>
                  <tr >
                    <td class="text-center font-btb-bold" style="width: 2.8cm; vertical-align: middle; padding: 2px; font-size: 0.45rem;" >
                      <img :src="(record.image!=''? record.image:ocmLogoUrl)" class="mx-auto rounded border-gray-100 " />
                      លេខ <span class="font-btb-black " >{{ $toKhmer( record.id ) }}</span>-គរម
                      <!-- <div class="w-full text-center font-bold  font-btb-bold" style="font-size: 0.45rem;" >
                        លេខ <span class="font-extrabold font-btb-bold ">{{ $toKhmer( record.id ) }}</span>-គរម
                      </div> -->
                    </td>
                    <td style="width: 5.7cm; vertical-align: top;" colspan="2" >
                      <table style="width: 6cm; border-spacing: 0px; ">
                        <tbody>
                          <tr>
                            <td class="text-left font-moul align-top" style="width: 0.05cm; " >គោត្តនាម-នាម<span style="float: right; font-size: 0.55rem; " >៖</span></td>
                            <td colspan="2" class="flex flex-wrap"  >
                              <div class="font-moul " style="font-size: 0.6rem; height: 13px; line-height: 13px; " >{{ record.people.lastname + " " + record.people.firstname }}</div>
                              <div class="font-bold leading-4" style="font-size: 0.5rem; height: 13px; line-height: 13px; ">{{ 
                                  ( record.people.enlastname != undefined && record.people.enlastname != null ? record.people.enlastname : '' ) + 
                                  ( record.people.enfirstname != undefined && record.people.enfirstname != null ? ' ' + record.people.enfirstname : '' )
                                }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left font-moul align-top" style="width: 2cm;"  >ថ្ងៃខែឆ្នាំកំណើត<span style="float: right; font-size: 0.55rem;" >៖</span></td>
                            <td class="leading-3  font-btb-bold" style=" font-size: 0.55rem; "  >{{ $toKhmer( dateFormat( new Date( record.people.dob ) , 'dd-mm-yyyy' ) ) }}</td>
                            <td class="leading-3  font-btb-bold" style=" font-size: 0.55rem; " ><span class="font-moul" style="font-size: 0.55rem;" >ភេទ</span>&nbsp;&nbsp;&nbsp;៖&nbsp;&nbsp;&nbsp;{{ record.people.gender == 1 ? "ប្រុស" : "ស្រី" }}</td>
                          </tr>
                          <tr>
                            <td class="text-left font-moul align-top" style="width: 2cm; "  >អាសយដ្ឋាន<span style="float: right; font-size: 0.55rem; " >៖</span>៖</td>
                            <td  colspan="2" class="leading-3 font-btb-bold" style=" font-size: 0.55rem; line-height: 0.8rem; ">{{ $toKhmer( record.people.address ) }}</td>
                          </tr>
                          <tr>
                            <td class="text-left font-moul align-top" style="width: 2cm; "  >អង្គភាព<span style="float: right; font-size: 0.55rem; " >៖</span></td>
                            <td  colspan="2" class="leading-3  font-btb-bold" style=" font-size: 0.55rem; line-height: 0.8rem; ">{{ record.organization.name }}</td>
                          </tr>
                          <tr>
                            <td class="text-left font-moul align-top" style="width: 2cm; "  >មុខងារ<span style="float: right; font-size: 0.55rem; " >៖</span></td>
                            <td  colspan="2" class="leading-3  font-btb-bold" style=" font-size: 0.55rem; line-height: 0.8rem; " >{{ record.position.name }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td class=" font-btb-bold" style="width: 3cm; text-align: center; vertical-align: top; font-size: 0.41rem; line-height: 0.7rem; " >បណ្ណសម្គាល់ខ្លួននេះផុតកំណត់នៅ ថ្ងៃទី០១ ខែកញ្ញា ឆ្នាំ២០២៦</td>
                    <td style="width: 2cm; padding-bottom: 0.1cm; ">
                      <a :href="'https://hr.ocm.gov.kh/#/officer/card/'+record.public_key" target="_blank" >
                      <!-- <a :href="'http://127.0.0.1:3006/#/officer/card/'+record.public_key" target="_blank" > -->
                        <qrcode-vue :value=" 'https://hr.ocm.gov.kh/#/officer/card/'+record.public_key " :size="50" level="H" :render-as="'canvas'" style="padding: 2px; margin: auto ;" />
                      </a>
                    </td>
                    <td class="relative" style="width: 3.5cm; text-align: center; vertical-align: top; " >
                      <!-- <img class="absolute top-1 right-3 bg-cover bg-no-repeat bg-center" style="width: 1.4cm; height: 1.4cm; " :src="royalstamp" />
                      <div class="" >រាជធានីភ្នំពេញ ថ្ងៃទី{{ "០១" }} ខែ{{ "មករា" }} ឆ្នាំ{{ "២០២៣" }}<br/>ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> 
          </div>
          <!-- <img v-if="savedOfficialCardBase64 != null " :src="savedOfficialCardBase64" class="w-full"/> -->
          <div class="absolute -right-6 -top-6 bg-white rounded-md" >
            <svg class="w-6 h-6 p-1 " 
            @click="saveOfficialCard" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.964a3.25 3.25 0 0 1 2.299.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25V5.75zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5H5.75zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25h9zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5h-6z" fill="currentColor"></path></g></svg>
          </div>
          <!-- <Frame4Corner /> -->
        </div>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useMessage, useNotification } from 'naive-ui'
import Frame4Corner from '@components/widgets/frame/corner4.vue'
import QrcodeVue, { QrcodeCanvas, QrcodeSvg } from 'qrcode.vue'
import ocmLogoUrl from '@assets/logo.svg'
import blurBackground from '@assets/bg_stp.png'
import blurBackgroundZ from '@assets/bg_stp_z.png'
import royalstamp from '@assets/st.png'
import dateFormat from 'dateformat'
import html2canvas from 'html2canvas'

export default {
  components: {
    Frame4Corner ,
    QrcodeVue ,
    QrcodeCanvas ,
    QrcodeSvg
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
      required: true
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    } ,
    // onShow: {
    //   type: Function
    // }
  },
  setup(props){
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const message = useMessage()
    const notify = useNotification()

    const selectedOrganizations = ref([])
    const selectedPositions = ref([])

    const organizations = computed( () => 
      store.getters['organizations/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    )
    const positions = computed( () => 
      store.getters['position/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    ) 

    const userCountesies = computed( () => {
      return props.record != undefined && Array.isArray( props.record.countesies ) ? props.record.countesies.map( ( c ) => c.name ).join(', ') : ''
    })
    
    const officerCode = computed( () => {
      return ( props.record.organization != undefined && props.record.organization.prefix != undefined && props.record.organization.prefix.length > 0 ? props.record.organization.prefix : 'OCM' ) + '-' + props.record.id
    })

    /**
     * Variables
     */    
    var rules = {
        firstname: {
          required: true,
          message: 'សូមបញ្ចូលឈ្មោះ',
          trigger: [ 'blur']
        },
        lastname: {
          required: true,
          message: 'សូមបញ្ចូលត្រកូល',
          trigger: [ 'blur']
        }
    }
    /**
     * Functions
     */
    function clearRecord( actionStatus ){
      props.onClose( actionStatus )
    }
  
    function maskOrEscClick(){
      props.onClose( 0 )
    }
    
    function getPublicCardUrl(record){
      return window.location.origin+'/#/officer/card/'+record.id
    }

    const savedOfficialCardBase64 = ref(null)
    const scaling = ref(8) ; // The number 3 is the most clear for printing with envolis printer
    function saveOfficialCard(){
      // html2canvas(document.getElementById('official-card')).then(function(canvas) {
      //   document.body.appendChild(canvas);
      // });

      html2canvas(document.querySelector("#official-card"),{
        imageTimeout: 15000 , // 15s
        scale: scaling.value ,
        useCORS: true , // Try to load image from server side with cors
      }).then(canvas => {
        // savedOfficialCardBase64.value = canvas.toDataURL('image/png')
        // document.body.appendChild(canvas)
        const link = document.createElement('a')
        //link to the uploaded image
        //  in your local storage
        link.href = canvas.toDataURL('image/png')
        link.download = props.record.id+'-'+props.record.people.enlastname+'-'+props.record.people.enfirstname+'-'+scaling.value+'.png'
        document.body.appendChild(link)
        link.click()
        // document.body.removeChild(link)
      });
    }

    function initial(){
      // selectedOrganizations.value = [463]
    }

    return {
      /**
       * Variables
       */
      rules ,
      organizations ,
      positions , 
      userCountesies ,
      getPublicCardUrl ,
      /**
       * Functions
       */
      initial ,
      clearRecord ,
      maskOrEscClick ,
      ocmLogoUrl ,
      blurBackground ,
      blurBackgroundZ  ,
      officerCode ,
      dateFormat ,
      royalstamp ,
      saveOfficialCard ,
      savedOfficialCardBase64
    }
  }
}
</script>
<style scoped >
  .official-card * {
    font-size: 0.5rem;
  }
</style>