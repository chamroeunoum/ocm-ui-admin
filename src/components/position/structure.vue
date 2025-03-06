<template>
  <div class="absolute left-0 top-0 right-0 bottom-0">
    <!-- Organization -->
    <div class="absolute left-0 top-0 bottom-0 w-72 bg-gray-800 abslute border-r border-gray-600" >
      <div class="relative w-full h-12 p-1 border-b border-gray-300 " >
        <input type="text" 
          @keypress.enter="filterRecords(false)" 
          v-model="table.search" 
          class="absolute left-1 top-2 right-10 bottom-1 h-8 bg-gray-800 px-2 rounded-full text-gray-50 border border-gray-300 focus:border-blue-600 hover:border-blue-600 " 
          placeholder="ស្វែងរក" />
        <svg 
          class="absolute w-6 right-11 top-3 text-gray-400 hover:text-blue-700 cursor-pointer" 
          @click="filterRecords(false)" 
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
        <svg class="absolute w-6 h-6 right-2 top-3 text-white cursor-pointer" 
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
      </div>
      <div class="absolute left-0 top-14 bottom-12 w-full overflow-auto " >
        <n-scrollbar >
          <div v-for="(o,oIndex) in table.records.matched" :key="oIndex" 
            class="relative w-full text-left h-14 p-1 border-b border-gray-600 my-1 flex text-gray-50 cursor-pointer hover:bg-gray-700 duration-300 " 
            >
            <!-- <div 
              @click="addChild(o)"
              class="flex-none min-w-6 p-1 h-8 leading-7 text-center text-md font-btb-black">{{ o.id }}</div> -->
            <div 
              @click="addChild(o)"
              class="flex-grow truncate h-8 leading-7 relative" >
              <n-tooltip trigger="hover" >
                <template #trigger>
                  <div class=" h-8 leading-7 truncate" style="font-size: 0.9rem; " >{{  o.name }}</div>
                </template>
                {{  o.name }}
              </n-tooltip>
            </div>
            <svg 
              class="absolute bottom-0 right-10 p-1 w-6 rounded-full text-gray-400 hover:bg-gray-600 duration-500 cursor-pointer" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M21.03 2.97a3.578 3.578 0 0 1 0 5.06L9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L15.97 2.97a3.578 3.578 0 0 1 5.06 0zM15 6.06L5.062 16a.75.75 0 0 0-.193.333l-1.05 3.85l3.85-1.05A.75.75 0 0 0 8 18.938L17.94 9L15 6.06zm2.03-2.03l-.97.97L19 7.94l.97-.97a2.079 2.079 0 0 0-2.94-2.94z" fill="currentColor"></path></g></svg>
            <svg 
              class="absolute bottom-0 right-2 p-1 w-6 rounded-full text-gray-400 hover:bg-gray-600 duration-500 cursor-pointer" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M12 12h2v12h-2z" fill="currentColor"></path><path d="M18 12h2v12h-2z" fill="currentColor"></path><path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path><path d="M12 2h8v2h-8z" fill="currentColor"></path></svg>
          </div>
        </n-scrollbar>
      </div>
      <!-- Pagination of crud -->
      <div class="absolute left-0 right-0 bottom-1 flex flex-wrap" >
        <!-- This pagination is for the media side with from Medium up -->
        <div class="vcb-table-pagination mx-auto " >
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
    <!-- Organization list -->
    <div class="absolute left-72 top-0 right-0 bottom-0 bg-gray-800" >
      <Transition name="slide-fade" >
        <div v-if="dataFlattened" class="chart-container" > </div>
      </Transition>
      <div v-show="selectedNode != null && chartNodeFunctionsToggler" class="absolute right-14 top-0 p-2 bg-gray-100/25 rounded-bl-lg text-white" >កំពុងស្ថិតនៅ ៖ {{ selectedNode != null ? selectedNode.id + ". " + selectedNode.name : '' }}</div>
      <Transition name="slide-fade" >
        <div
          v-show="selectedNode != null && chartNodeFunctionsToggler"
          id="drawer-target"
          class=" absolute top-0 right-0 bottom-0 bg-gray-200/25 w-14 "
        >
          <n-scrollbar >
            <!-- Set center -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.setCentered(selectedNode.id+'').render()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M4 15c-.55 0-1 .45-1 1v3c0 1.1.9 2 2 2h3c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1zm1-9c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V6zm14-3h-3c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V5c0-1.1-.9-2-2-2zm0 15c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c1.1 0 2-.9 2-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z" fill="currentColor"></path></svg>
              </template>
              ផ្ដោតទៅ<br/>{{ selectedNode.name }}
            </n-tooltip>
            <!-- Set center -->
            <!-- Remove -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="removeNode(selectedNode)"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336 256H176"></path></svg>
              </template>
              លុបស្ថាប័ន<br/>{{ selectedNode.name }}
            </n-tooltip>
            <!-- Remove -->
            <!-- Move -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="moveNode(selectedNode)"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="18" r="2"></circle><circle cx="19" cy="6" r="2"></circle><path d="M19 8v5a5 5 0 0 1-5 5h-3l3-3m0 6l-3-3"></path><path d="M5 16v-5a5 5 0 0 1 5-5h3l-3-3m0 6l3-3"></path></g></svg>
              </template>
              ផ្លាស់ប្ដូរស្ថាប័នមេរបស់<br/>{{ selectedNode.name }}
            </n-tooltip>
            <!-- Move -->
            <!-- Align left -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.layout('left').render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M6.5 5.25a1.25 1.25 0 1 1 2.5 0v37.5a1.25 1.25 0 1 1-2.5 0V5.25zM15.75 26a4.25 4.25 0 0 0-4.25 4.25v5.5A4.25 4.25 0 0 0 15.75 40h15A4.25 4.25 0 0 0 35 35.75v-5.5A4.25 4.25 0 0 0 30.75 26h-15zM14 30.25c0-.966.784-1.75 1.75-1.75h15c.966 0 1.75.784 1.75 1.75v5.5a1.75 1.75 0 0 1-1.75 1.75h-15A1.75 1.75 0 0 1 14 35.75v-5.5zm-2.5-18v5.5A4.25 4.25 0 0 0 15.75 22H38a4.25 4.25 0 0 0 4.25-4.25v-5.5A4.25 4.25 0 0 0 38 8H15.75a4.25 4.25 0 0 0-4.25 4.25zm2.5 5.5v-5.5c0-.966.784-1.75 1.75-1.75H38c.967 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 38 19.5H15.75A1.75 1.75 0 0 1 14 17.75z" fill="currentColor"></path></g></svg>
              </template>
              ឋនានុក្រុមពីឆ្វេងទៅស្ដាំ
            </n-tooltip>
            <!-- Align left -->
            <!-- Align top -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.layout('top').render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M2.75 3a.75.75 0 0 0 0 1.5h22.5a.75.75 0 0 0 0-1.5H2.75zM5 8.75A2.75 2.75 0 0 1 7.75 6h2.5A2.75 2.75 0 0 1 13 8.75v13.5A2.75 2.75 0 0 1 10.25 25h-2.5A2.75 2.75 0 0 1 5 22.25V8.75zM7.75 7.5c-.69 0-1.25.56-1.25 1.25v13.5c0 .69.56 1.25 1.25 1.25h2.5c.69 0 1.25-.56 1.25-1.25V8.75c0-.69-.56-1.25-1.25-1.25h-2.5zM15 8.75A2.75 2.75 0 0 1 17.75 6h2.5A2.75 2.75 0 0 1 23 8.75v8a2.75 2.75 0 0 1-2.75 2.75h-2.5A2.75 2.75 0 0 1 15 16.75v-8zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h2.5c.69 0 1.25-.56 1.25-1.25v-8c0-.69-.56-1.25-1.25-1.25h-2.5z" fill="currentColor"></path></g></svg>
              </template>
              ឋនានុក្រុមពីលើមកក្រោម
            </n-tooltip>
            <!-- Align top -->
            <!-- Align right -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.layout('right').render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M29 4a1 1 0 1 0-2 0v24a1 1 0 1 0 2 0V4zm-7.5 1A3.5 3.5 0 0 1 25 8.5v3a3.5 3.5 0 0 1-3.5 3.5h-15A3.5 3.5 0 0 1 3 11.5v-3A3.5 3.5 0 0 1 6.5 5h15zM23 8.5A1.5 1.5 0 0 0 21.5 7h-15A1.5 1.5 0 0 0 5 8.5v3A1.5 1.5 0 0 0 6.5 13h15a1.5 1.5 0 0 0 1.5-1.5v-3zM21.5 17a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 9 23.5v-3a3.5 3.5 0 0 1 3.5-3.5h9zm1.5 3.5a1.5 1.5 0 0 0-1.5-1.5h-9a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-3z" fill="currentColor"></path></g></svg>
              </template>
              ឋនានុក្រុមពីស្ដាំទៅឆ្វេង
            </n-tooltip>
            <!-- Align right -->
            <!-- Align bottom -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.layout('bottom').render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M5.25 41.5a1.25 1.25 0 1 1 0-2.5h37.5a1.25 1.25 0 1 1 0 2.5H5.25zM26 32.25a4.25 4.25 0 0 0 4.25 4.25h5.5A4.25 4.25 0 0 0 40 32.25v-15A4.25 4.25 0 0 0 35.75 13h-5.5A4.25 4.25 0 0 0 26 17.25v15zM30.25 34a1.75 1.75 0 0 1-1.75-1.75v-15c0-.966.784-1.75 1.75-1.75h5.5c.967 0 1.75.784 1.75 1.75v15A1.75 1.75 0 0 1 35.75 34h-5.5zm-18 2.5h5.5A4.25 4.25 0 0 0 22 32.25V10a4.25 4.25 0 0 0-4.25-4.25h-5.5A4.25 4.25 0 0 0 8 10v22.25a4.25 4.25 0 0 0 4.25 4.25zm5.5-2.5h-5.5a1.75 1.75 0 0 1-1.75-1.75V10c0-.966.784-1.75 1.75-1.75h5.5c.966 0 1.75.784 1.75 1.75v22.25A1.75 1.75 0 0 1 17.75 34z" fill="currentColor"></path></g></svg>
              </template>
              ឋនានុក្រុមពីក្រោមទៅលើ
            </n-tooltip>
            <!-- Aligh bottom -->
            <!-- Stregth to screen -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M11 10l1.41 1.41L15 8.83v14.34l-2.59-2.58L11 22l5 5l5-5l-1.41-1.41L17 23.17V8.83l2.59 2.58L21 10l-5-5l-5 5z" fill="currentColor"></path><path d="M28 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h24a2.002 2.002 0 0 1 2 2v24a2.002 2.002 0 0 1-2 2zM4 4v24h24V4z" fill="currentColor"></path></svg>
              </template>
              បង្រួមអោយពេញអេក្រង់
            </n-tooltip>
            <!-- Streght to screen -->
            <!-- Stregth to screen -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.setUpToTheRootHighlighted( selectedNode.id + '' ).render()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 14L6 24l1.4 1.4l8.6-8.6l8.6 8.6L26 24z" fill="currentColor"></path><path d="M4 8h24v2H4z" fill="currentColor"></path></svg>
              </template>
              បង្ហាញផ្លូវទៅថ្នាក់កំពូល
            </n-tooltip>
            <!-- Streght to screen -->
            <!-- Fullscreen -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.fullscreen()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h1.865a.75.75 0 1 1 0 1.5H5.25a.75.75 0 0 0-.75.75v1.865a.75.75 0 1 1-1.5 0V5.25zm9.135-1.5a.75.75 0 0 1 .75-.75h1.865A2.25 2.25 0 0 1 17 5.25v1.865a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 0-.75-.75h-1.865a.75.75 0 0 1-.75-.75zM3.75 12.135a.75.75 0 0 1 .75.75v1.865c0 .414.336.75.75.75h1.865a.75.75 0 0 1 0 1.5H5.25A2.25 2.25 0 0 1 3 14.75v-1.865a.75.75 0 0 1 .75-.75zm12.5 0a.75.75 0 0 1 .75.75v1.865A2.25 2.25 0 0 1 14.75 17h-1.865a.75.75 0 0 1 0-1.5h1.865a.75.75 0 0 0 .75-.75v-1.865a.75.75 0 0 1 .75-.75z" fill="currentColor"></path></g></svg>
              </template>
              បង្ហាញពេញអេក្រង់
            </n-tooltip>
            <!-- Fullscreen -->
            <!-- Zoom in -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.zoomIn()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 12h-4V8h-2v4H8v2h4v4h2v-4h4v-2z" fill="currentColor"></path><path d="M21.448 20A10.856 10.856 0 0 0 24 13a11 11 0 1 0-11 11a10.856 10.856 0 0 0 7-2.552L27.586 29L29 27.586zM13 22a9 9 0 1 1 9-9a9.01 9.01 0 0 1-9 9z" fill="currentColor"></path></svg>
              </template>
              ពង្រីកឋនានុក្រម
            </n-tooltip>
            <!-- Zoom in -->
            <!-- Zoom out -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.zoomOut()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M8 12h10v2H8z" fill="currentColor"></path><path d="M21.448 20A10.856 10.856 0 0 0 24 13a11 11 0 1 0-11 11a10.856 10.856 0 0 0 7-2.552L27.586 29L29 27.586zM13 22a9 9 0 1 1 9-9a9.01 9.01 0 0 1-9 9z" fill="currentColor"></path></svg>
              </template>
              បង្រួមឋនានុក្រម
            </n-tooltip>
            <!-- Zoom out -->
            <!-- Export Image -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.exportImg()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M19 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1z" fill="currentColor"></path><path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 22H6v-6l5-5l5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5zm0-4.83l-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20z" fill="currentColor"></path></svg>
              </template>
              រក្សារទុកជារូបភាព
            </n-tooltip>
            <!-- Export Image -->
            <!-- Export SVG -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.exportSvg()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30 23h-6a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2h6v2h-6v10h4v-4h-2v-2h4z" fill="currentColor"></path><path d="M18 9l-2 13l-2-13h-2l2.52 14h2.96L20 9h-2z" fill="currentColor"></path><path d="M8 23H2v-2h6v-4H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6v2H4v4h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z" fill="currentColor"></path></svg>
              </template>
              រក្សារទុកជា SVG
            </n-tooltip>
            <!-- Export SVG -->
            <!-- Export PDF -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="downloadPdf()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path></svg>
              </template>
              រក្សារទុកជា PDF
            </n-tooltip>
            <!-- Export PDF -->
            <!-- Connector -->
            <!-- <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.connections([{from:'401',to:'2',label:'ខ្សែទំនាក់ទំនង'}]).render()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 10l-1.414 1.414L26.172 15H11.899A5.014 5.014 0 0 0 8 11.101V2H6v9.101A5 5 0 0 0 6 20.9V30h2v-9.101A5.014 5.014 0 0 0 11.899 17h14.273l-3.586 3.586L24 22l6-6zM7 19a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path></svg>
              </template>
              រក្សារទុកជា PDF
            </n-tooltip> -->
            <!-- Connector -->
            <!-- Attach Position -->
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="$router.push('/organization/structure/'+selectedNode.id+'/position')"
                  class="m-2 w-10 h-10 p-1 cursor-pointer text-gray-100" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.658 4.527a.5.5 0 0 0-.316.948l1.158.386v1.14a.5.5 0 0 0 1 0V5.86l1.158-.386a.5.5 0 1 0-.316-.948L10 4.974l-1.342-.447zm1.77-2.46a1.5 1.5 0 0 0-.855 0l-2.865.85a.99.99 0 0 0-.708.95v4.26a1 1 0 0 0 .715.96l2.792.829A.503.503 0 0 0 9.5 10v1H8a2 2 0 0 0-2 2v.05a2.5 2.5 0 1 0 1 0V13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.05a2.5 2.5 0 1 0 1 0V13a2 2 0 0 0-2-2h-1.5v-1a.506.506 0 0 0-.007-.085l2.792-.83A1 1 0 0 0 14 8.128V3.874a1 1 0 0 0-.715-.959l-2.858-.849zm-.57.958a.5.5 0 0 1 .284 0L13 3.874v4.254l-2.858.849a.5.5 0 0 1-.284 0L7 8.127V3.875l2.858-.85zM5 15.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0zm8.5-1.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3z" fill="currentColor"></path></g></svg>
              </template>
              ភ្ជាប់តួនាទី
            </n-tooltip>
            <!-- Attach Position -->
          </n-scrollbar>
        </div>
      </Transition>
      <n-drawer
        :width="200"
        :height="200"
        placement="right"
        :trap-focus="false"
        to="#drawer-target"
      >
        <n-drawer-content title="Stoner">
          Stoner is a 1965 novel by the American writer John Williams.
        </n-drawer-content>
      </n-drawer>
    
    </div>
  </div>
</template>

<script>

import { useNotification , useDialog, selectDark, useMessage } from 'naive-ui'
import * as d3 from 'd3'
import { jsPDF } from 'jspdf'
import { OrgChart } from 'd3-org-chart'
import { reactive ,ref , onMounted , watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import ocmLogoUrl from './../../assets/logo.svg'
import { repeat } from "seemly";

/**
 * CRUD component form
 */

export default {
  name: "PositionStructure" ,
  components: {
    OrgChart 
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const router = useRouter()
    const route = useRoute()
    const notify = useNotification()
    console.log( route.params.id )
    const currentOrganizationId = ref(
      route.params.id != undefined && parseInt( route.params.id ) > 0
        ? parseInt( route.params.id )
        : null // 163
    )
    const organization = ref( null )
    
    console.log( currentOrganizationId.value )
    // watch(currentOrganizationId, async ( newVal , oldVal ) => {
    //   console.log( parseInt( newVal ) )
    //   if ( parseInt( newVal ) > 0 ) {
    //     getRecords()
    //   }
    // })

    /**
     * Variables
     */    
    var model = reactive({
      name: "position" ,
      title: "តួនាទី"
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
        if( dataFlattened.value.length ){
          table.records.matched = []
          table.records.matched = res.data.records.filter( ( o ) => dataFlattened.value.find( ( dfItem ) => dfItem.id == o.id ) == undefined )
        }
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

    const columns = ref('id,name,image,parentId,desp')
    const dataFlattened = ref([])
    const chart = ref(null)
    const chartNodeFunctionsToggler = ref( false )
    const selectedNode = ref({
      id: 0 ,
      parentId: "" ,
      name: "" ,
      image: "https://picsum.photos/200/300" ,
      desp: "" ,
      leader: []
    })
    function drawingOrgchart(data){
      dataFlattened.value = Array.isArray( data ) ? data : []
      dataFlattened.value.columns = columns.value
      chart.value = new OrgChart()
      .container('.chart-container')
      .data( 
        dataFlattened.value
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
      .siblingsMargin(d3Node => 20)
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
            selectedNode.value.id = d.data.id
            selectedNode.value.parentId = d.data.parentId
            selectedNode.value.name = d.data.name
            selectedNode.value.image = d.data.image
            selectedNode.value.desp = d.data.desp
            chartNodeFunctionsToggler.value = true
            chart.value.setCentered( d.data.id +'' ).render()
            table.search = ''
            getRecords()
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
      .childrenMargin(d => 100)
      .onNodeClick( d => {})
      .compactMarginBetween(d => 50)
      .compactMarginPair(d => 30)
      .buttonContent(({ node, state }) => {
        return `
          <div class="border border-gray-300 bg-white rounded-md flex flex-row h-6 font-bold text-blue-500" >
            <div class="" style="margin: 3px 5px auto 5px; " >${ node.data._directSubordinates }</div>
          </div>
          `
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
          const color = "#278B8D"
          
          /**
           * Node Builder
           */
          let nodeContent = document.createElement( 'div' );
          nodeContent.style = 
            `position:absolute;
            margin-top:-1px; 
            margin-left:-1px;
            width:${d.width}px;
            height:${d.height}px;`

          nodeContent.className = 'text-white bg-blue-500 text-center text-lg place-content-center rounded-lg border border-gray-100 '
          nodeContent.innerText = d.data.name

          let img = document.createElement('img');
          img.className = ' absolute left-0 top-0 bottom-0 w-auto rounded-l-lg'
          img.style = `height:${d.height}px;`
          img.src = d.data.image==null || d.data.image==undefined ? ocmLogoUrl : 'https://marketplace.canva.com/EAFXS8-cvyQ/1/0/100w/canva-B-A8A3LCS0Y.jpg'

          nodeContent.appendChild( img )

          return nodeContent.outerHTML


          // return `<div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9;">
          //           <div class="border overflow-hidden border-gray-200" style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" >
          //           <!-- Picture -->` 
          //           +
          //           (
          //             d.data.image==null || d.data.image==undefined
          //             ? `<img src="`+ocmLogoUrl+`" class="w-8 mt-1 mx-auto" />`
          //             : `<svg class='w-8 h-8 m-2' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>`
          //           )
          //           + 
          //           `</div><!-- Menu icon -->
          //           <!-- <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div> -->
          //           <!-- Name of the shape -->
          //           <div style="" class="text-center text-gray-600 p-4 pt-6 font-moul leading-7" > ${d.data.name} </div>
          //           <!-- Position of the shape -->
          //           <div style="color:#716E7B;margin: 3px 10px 5px 10px;font-size:12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;  text-align: center; ">${ 
          //             '' // d.data.leader != undefined && d.data.leader.length > 0 ? ( d.data.leader[0].countesies.map( (c) => c.name ).join(' , ') + "" + d.data.leader[0].lastname + " " + d.data.leader[0].firstname + " " + d.data.leader[0].positions.map( (p) => p.name ).join(' , ') ) : 'មិនមានអ្នកគ្រប់គ្រង' 
          //           }</div>
          //           <!-- Total staffs within the organization -->
          //           <div style="position: absolute; right: 5px; bottom: -4px; border: 1px solid #CCC; background-color: #FFF; color:#716E7B; border-radius: 5px; height: 22px; padding: 2px; float: left;" >
          //             <svg class="text-blue-600" style=" float: left; width: 12px; height: 12px; margin: 1px 5px auto 5px; display: inline-block; font-size: 12px ;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136l32-56h-96l32 56l-32 136l-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" fill="currentColor"></path></svg>
          //             <div class="text-blue-600" style=" float: right; font-size: 12px ; margin: auto 5px; " >` + ( d.data.staffs != null && d.data.staffs.length > 0 ? d.data.staffs.length : 0 ) + `</div>
          //           </div>
          //         </div>
          //         `;
      })
      .render()
    }

    function addChild(o){
      if( dataFlattened.value.length <= 0 ){
        selectedNode.value.id = o.id
        selectedNode.value.parentId = o.parentId
        selectedNode.value.name = o.name
        selectedNode.value.image = o.image
        selectedNode.value.desp = o.desp
        chart.value = null
        drawingOrgchart([{
          id: o.id,
          parentId: null ,
          name: o.name ,
          image: o.image != "" && o.image != undefined ? o.image : ocmLogoUrl ,
          desp: o.desp ,
          _centered: true  
        }])
        if( dataFlattened.value.length ){
          table.records.matched = []
          table.records.matched = table.records.all.filter( ( o ) => dataFlattened.value.find( ( dfItem ) => dfItem.id == o.id ) == undefined )
          table.search = ''
          getRecords()
        }
      }else{
        if( chart.value != null && selectedNode.value != null && selectedNode.value.id > 0 ){
          chart.value.addNode({
            id: o.id,
            parentId: selectedNode.value.id ,
            name: o.name ,
            image: o.image != "" && o.image != undefined ? o.image : ocmLogoUrl ,
            desp: o.desp ,
            _centered: true
          })
          if( dataFlattened.value.length ){
            table.records.matched = []
            table.records.matched = table.records.all.filter( ( o ) => dataFlattened.value.find( ( dfItem ) => dfItem.id == o.id ) == undefined )
            table.search = ''
            getRecords()
          }
        }else{
          notify.warning({
            title: 'ឋានានុក្រុមស្ថាប័ន' , 
            content: 'សូមជ្រើសអង្គភាពមេជាមុនសិន'
          })
        }
      }
    }

    function removeNode(node){ 
      // Case the deleting node is the root
      if( node.parentId == null ){
        dialog.warning({
          title: 'ឋានានុក្រម',
          content: 'អ្នកនឹងលុបស្ថាប័នមេកំពូលដែលនិងធ្វើអោយរាល់ស្ថាប័នក្រោមទាំងអស់ត្រូវបាត់បងដែរ។ តើអ្នកប្រាកដដែរ ឬ ទេ?',
          positiveText: 'ខ្ញុំច្បាស់ហើយ',
          negativeText: 'ទេ',
          draggable: true,
          onPositiveClick: () => {
            dataFlattened.value = []
            table.records.matched = table.records.all
            drawingOrgchart()
            message.warning('ឋានុក្រមត្រូវបានលុបរួចរាល់។')
          },
          onNegativeClick: () => {
            message.warning('')
          }
        })
      }
      // Case the deleting node is the not the root
      else if( parseInt( node.parentId ) > 0 ){
        let temp = []
        for(let i in dataFlattened.value ){
          if( parseInt( i ) >= 0 && dataFlattened.value[i].id != node.id ) temp.push(dataFlattened.value[i])
        }
        dataFlattened.value = []
        dataFlattened.value = temp 
        dataFlattened.value.columns = columns.value
        console.log( dataFlattened.value )
        chart.value.removeNode(node.id+'')
        console.log( dataFlattened.value )
        if( dataFlattened.value.length ){
          table.records.matched = []
          table.records.matched = table.records.all.filter( ( o ) => dataFlattened.value.find( ( dfItem ) => dfItem.id == o.id ) == undefined )
        }
      }
    }

    onMounted(() => {
      drawingOrgchart()
    })

    function getOrganizationPositions(){
      /**
       * Clear time interval after calling
       */
      store.dispatch(model.name+'/positions',{
        search: '' ,
        perPage: 1000 ,
        page: 1 ,
        id: parseInt( currentOrganizationId.value ) > 0 ? parseInt( currentOrganizationId.value ) : null
        // search: table.search ,
        // perPage: table.pagination.perPage ,
        // page: table.pagination.page ,
        // id: parseInt( currentOrganizationId.value ) > 0 ? parseInt( currentOrganizationId.value ) : null
      }).then(res => {
        organization.value = res.data.organization
        positions.value = res.data.records
      }).catch( err => {
        console.log( err )
      })
    }

    getRecords()
    // getOrganizationPositions()

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
      closeTableLoading ,
      addChild ,
      dataFlattened ,
      selectedNode ,
      chartNodeFunctionsToggler ,
      chart ,
      removeNode
    }
  }
}

</script>

<style scoped>
  .vcb-table-pagination {
    @apply flex flex-row bg-gray-700 text-gray-50 right-1 bottom-1 left-1 border-none z-40 justify-center p-1 px-2 mx-auto rounded-full h-10 ;
  }
  .vcb-pagination-page {
    @apply rounded-full border border-gray-100/25 w-auto px-2 h-8 truncate mx-1 font-bold cursor-pointer text-center hover:text-blue-500 hover:border-blue-500 duration-300 transform hover:scale-110;
  }
  .vcb-pagination-page-active {
    @apply rounded-full border border-blue-500 w-auto px-2 h-8 truncate mx-1 font-bold cursor-pointer text-center hover:text-blue-500 duration-300 text-blue-500;
  }
</style>