<script setup>
import { useDialog, useMessage, useNotification } from 'naive-ui'
</script>
<template>
  <header class="vcb-sastra-topmenu bg-white border-b border-gray-200 flex p-8 h-30" >
    <!-- Logo -->
    <div class="flex-none w-40 h-14 relative ">
      <img
        alt="Sastra Logo"
        class="inline-block mr-3 w-14 h-14 "
        src="@/assets/img/logo.png"
      />
      <div class="inline-block module-title font-moul text-lg text-gray-800 h-14">សាស្ត្រា</div>
    </div>
    <!-- Search box -->
    <div class="relative grow  h-14 " >
      <div class="w-2/5 relative p-2">
        <input v-model="searching" @keypress.enter="search()" type="text" class="bg-gray-100 pl-5 pr-10 h-9 rounded-full  border border-gray-200 focus:border-blue-600 hover:border-blue-600 duration-300 w-full" placeholder="ស្វែងរក..." />
        <svg class="absolute right-4 top-3 text-gray-400 hover:text-blue-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
      </div>
    </div>
    <!-- Authentication section -->
    <div v-if="false" class="flex-none w-60 text-right  h-14" >
      <div class="inline-block w-14 h-14 text-center align-middle ">
        <svg class=" hover:text-blue-500 transition duration-300 cursor-pointer m-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M1.91 7.383a8.491 8.491 0 0 1 1.78-3.08a.5.5 0 0 1 .54-.135l1.918.686a1 1 0 0 0 1.32-.762l.366-2.006a.5.5 0 0 1 .388-.4a8.532 8.532 0 0 1 3.555 0a.5.5 0 0 1 .387.4l.367 2.006a1 1 0 0 0 1.32.762l1.918-.686a.5.5 0 0 1 .54.136a8.491 8.491 0 0 1 1.78 3.079a.5.5 0 0 1-.152.535l-1.555 1.32a1 1 0 0 0 0 1.524l1.555 1.32a.5.5 0 0 1 .152.535a8.491 8.491 0 0 1-1.78 3.08a.5.5 0 0 1-.54.135l-1.918-.686a1 1 0 0 0-1.32.762l-.367 2.007a.5.5 0 0 1-.387.399a8.53 8.53 0 0 1-3.555 0a.5.5 0 0 1-.388-.4l-.365-2.006a1 1 0 0 0-1.32-.762l-1.919.686a.5.5 0 0 1-.54-.136a8.49 8.49 0 0 1-1.78-3.079a.5.5 0 0 1 .153-.535l1.554-1.32a1 1 0 0 0 0-1.524l-1.554-1.32a.5.5 0 0 1-.153-.535zm1.061-.006l1.294 1.098a2 2 0 0 1 0 3.05L2.97 12.623c.292.782.714 1.51 1.245 2.152l1.596-.57a2 2 0 0 1 2.64 1.525l.305 1.668a7.556 7.556 0 0 0 2.485 0l.305-1.67a1.998 1.998 0 0 1 2.64-1.524l1.597.571a7.492 7.492 0 0 0 1.245-2.152l-1.294-1.098a1.998 1.998 0 0 1 0-3.05l1.294-1.098a7.491 7.491 0 0 0-1.245-2.152l-1.596.57a2 2 0 0 1-2.64-1.524l-.306-1.669a7.555 7.555 0 0 0-2.485 0l-.304 1.669a2 2 0 0 1-2.641 1.525l-1.596-.571a7.491 7.491 0 0 0-1.245 2.152zM7.5 10a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0z" fill="currentColor"></path></g></svg>
      </div>
      <div class="inline-block w-14 h-14 text-center align-middle ">
        <svg class=" hover:text-blue-500 transition duration-300 cursor-pointer m-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5zm0 1.5H6.25A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .966.784 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75V6.25a1.75 1.75 0 0 0-1.75-1.75zM9.369 15.254l-.51.872a.75.75 0 0 1-1.34-.665l.045-.091l.067-.116h1.738zm3.924-5.23l1.719 2.98h1.74a.75.75 0 0 1 .743.65l.007.1a.75.75 0 0 1-.648.744l-.102.007h-.875l.502.87a.75.75 0 0 1-1.243.834l-.056-.085l-2.658-4.608l.87-1.492zm-.03-2.923a.75.75 0 0 1 .315.935l-.046.091l-2.85 4.877h1.732l.865 1.5H7.252a.75.75 0 0 1-.102-1.492l.102-.007h1.694l2.18-3.734l-.662-1.147a.75.75 0 0 1 .19-.968l.085-.057a.75.75 0 0 1 .968.19l.056.085l.233.406l.241-.41a.75.75 0 0 1 1.026-.269z" fill="currentColor"></path></g></svg>
      </div>
      <div class="inline-block ml-5 w-14 h-14 text-center align-middle ">
        <svg class=" hover:text-blue-500 transition duration-300 cursor-pointer m-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>
      </div>
    </div>
  </header>
  <div class="flex flex-wrap justify-between px-24">
    <div class="mx-auto py-6 border-b border-gray-100 text-left w-full">លទ្ធផលនៃការស្វែងរកមានចំនួន ៖ {{ pagination.totalRecords }}</div>
    <div class="my-6 pb-2 w-full flex flex-wrap">
      <div class="grid grid-cols-4 gap-0" >
        <div class="col-span-3" >
          <div v-for="(item, index) in records" :key="index" class="mb-12 " >
            <!-- Ads -->
            <!-- <div v-if="index%5==0" class="pkc-ads-panel" >
              <a href="#" ><img src="https://picsum.photos/1024/200" /></a>
            </div> -->
            <!-- End ads -->
            <div class="regulator mr-4 my-1 text-bold text-blue-600">{{ item.number }}</div>
            <div class="chapter mr-4 my-1 text-sm text-bold text-blue-600" v-html="applyTagMark(item.title)"></div>
            <div class="w-full mt-4 my-1 text-sm leading-7 text-gray-800 text-justify" v-html="applyTagMark(item.meaning)" ></div>
            <div class="w-full mt-4 text-sm leading-7 text-gray-500 flex flex-wrap" >
              <!-- <div v-if="item.regulator" class="mr-2 text-xs">{{ item.regulator.year }}</div> -->
              <div v-if="item.book" class="mr-2 my-1 text-xs">{{ item.book.title }}</div>
              <div v-if="item.kunty" class="mr-2 my-1 text-xs">{{ ' > ' + item.kunty.number + ' ៖  ' + item.kunty.title }}</div>
              <div v-if="item.matika" class="mr-2 my-1 text-xs">{{ ' > ' + item.matika.number + ' ៖  ' + item.matika.title }}</div>
              <div v-if="item.chapter" class="mr-2 my-1 text-xs">{{ ' > ' + item.chapter.number + ' ៖  ' + item.chapter.title }}</div>
              <div v-if="item.part" class="mr-2 my-1 text-xs">{{ ' > ' + item.part.number + ' ៖  ' + item.part.title }}</div>
              <div v-if="item.section" class="mr-2 my-1 text-xs">{{ ' > ' + item.section.number + ' ៖  ' + item.section.title }}</div>
            </div>
          </div>
          <div v-if="pagination.totalPages > 0" class="flex flex-wrap justify-center pagination my-12">
            <div v-if="pagination.page > 1 " class="first w-12 h-8 text-center align-middle" @click="goTo(pagination.first)">
              <svg class="text-gray-800 align-middle text-center hover:text-blue-500 transition duration-300 cursor-pointer m-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12h10"></path><path d="M10 12l4 4"></path><path d="M10 12l4-4"></path><path d="M4 4v16"></path></g></svg>
            </div>
          </div>
        </div>
        <div class=" ml-12" >
          <!-- <div class="mb-8">
            <a href="#" ><img src="https://picsum.photos/1024" /></a>
          </div>
          <div class="mb-8">
            <a href="#" ><img src="https://picsum.photos/1024" /></a>
          </div>
          <div class="mb-8">
            <a href="#" ><img src="https://picsum.photos/1024" /></a>
          </div>
          <div class="mb-8">
            <a href="#" ><img src="https://picsum.photos/1024" /></a>
          </div>
          <div class="mb-8">
            <a href="#" ><img src="https://picsum.photos/1024" /></a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-if="adsFullShower" class="pkc-ads-panel-full relative" >
    <a href="#" ><img src="https://picsum.photos/768/1024" /></a>
    <div class="absolute right-5 top-5 " @click="adsFullShower=!adsFullShower">
      <Icon size="40" class="bg-white rounded-full hover:text-red-500 transition duration-300 cursor-pointer m-4" >
        <CloseCircleOutline />
      </Icon>
    </div>
  </div> -->
</template>
<script>
export default{
  data(){
    return {
      records: [] ,
      pagination: {
        page : 1 ,
        perPage : 20 ,
        first: 1 ,
        last: 1 ,
        previous: 1 ,
        next: 1 ,
        totalPages: 1 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons:[]
      },
      searching: '' ,
      adsFullShower: true 
    }
  },
  setup(){
    const notify = useNotification();
  },
  mounted(){
    this.getRecords()
  },
  methods: {
    /**
     * Mark the matched text with in search box
     */
    applyTagMark(str){
      // Split the string by whitespace
      if( this.searching.trim() != "" ){
        var arrStrSearch = this.searching.split(/(\s+)/).filter( e => e.trim().length > 0).map( e => e.replaceAll(" ","") )
        for( var i in arrStrSearch ){
          if( str.includes( arrStrSearch[i] ) ) str = str.replaceAll( arrStrSearch[i] , '<mark>' + arrStrSearch[i] + '</mark>' ) 
        }
      }
      return str
    },
    getRecords(){
      this.$store.dispatch('matra/list',{
        search: this.searching ,
        perPage: this.pagination.perPage ,
        page: this.pagination.page
      }).then(res => {        
        if( res.data.ok ){
          this.records = res.data.records
          this.pagination.first = res.data.pagination.first
          this.pagination.last = res.data.pagination.last
          this.pagination.previous = res.data.pagination.previous
          this.pagination.next = res.data.pagination.next
          this.pagination.page = res.data.pagination.page
          this.pagination.totalPages = res.data.pagination.totalPages
          this.pagination.totalRecords = res.data.pagination.totalRecords

          var paginationNumberList = 5
          if( ( this.pagination.page - ( paginationNumberList - 1 ) ) < 1 ){
            this.pagination.start = 1
            this.pagination.end = this.pagination.totalPages > 9 ? 9 : this.pagination.totalPages
          }
          else{
            this.pagination.start = this.pagination.page  - ( paginationNumberList - 1 )
            this.pagination.end = this.pagination.page + 4 >= this.pagination.totalPages ? this.pagination.totalPages : this.pagination.page + 4
          }
          /**
           * Create pagination buttons
           */
          this.pagination.buttons = []
          for(var i=this.pagination.start;i<=this.pagination.end;i++){
            this.pagination.buttons.push(i)
          }
          console.log( this.pagination.buttons )
        }else{
          
        }
      }).catch(err => {
        console.log( err );
      });
    } ,
    /**
     * Search function
     */
    search(){
      this.pagination.page = 1 
      this.getRecords()
    },
    /**
     * Pagination
     */
    /**
     * Go to page
     */
    goTo(page){
      this.pagination.page = page
      this.getRecords()
    }
  }
}
</script>

<style scoped >
  .pkc-ads-panel {
    @apply mb-8 w-full text-center ;
  }
  .pkc-ads-panel > a , .pkc-ads-panel > a > img {
    @apply m-auto;
  }
  .pkc-ads-panel-full {
    @apply fixed left-0 top-0 right-0 bottom-0 backdrop-opacity-10 bg-gray-600/50 p-10 text-center ;
  }
  .pkc-ads-panel-full > a , .pkc-ads-panel-full > a > img {
    @apply m-auto inline-block;
  }
</style>