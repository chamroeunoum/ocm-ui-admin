<template>
  <div class="absolute left-0 top-0 right-0 bottom-0">
    <div class="absolute left-0 top-0 right-0 bottom-0 bg-gray-800" >
      <Transition name="slide-fade" >
        <div v-if="dataFlattened" class="chart-container" > </div>
      </Transition>
      <div v-show="selectedNode != null && chartNodeFunctionsToggler" class="absolute right-0 top-0 p-2 bg-gray-100/25 rounded-bl-lg text-white" >កំពុងស្ថិតនៅ ៖ {{ selectedNode != null ? selectedNode.name : '' }}</div>
      <div v-if="currentOrganizationStructure != undefined " @click="$router.push('/position/'+currentOrganizationStructure.id+'/structure')" class="absolute left-0 top-10 p-2 bg-gray-100/25 rounded-r-lg cursor-pointer text-white" >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" fill="currentColor"></path></svg>
      </div>
      <div v-if="currentOrganizationStructure != undefined " class="absolute left-0 top-0 p-2 bg-gray-100/25 rounded-br-lg text-white" >អង្គភាព ៖ {{ currentOrganizationStructure.name + ( currentOrganizationStructurePosition != undefined && currentOrganizationStructurePosition.position != undefined ? ' , តួនាទី ៖ ' + currentOrganizationStructurePosition.position.name : '' ) }}</div>
      <Transition name="slide-fade" >
        <div
          v-show="selectedNode != null && chartNodeFunctionsToggler"
          id="drawer-target"
          class=" absolute top-0 right-0 bottom-0 bg-gray-200/25 w-14 "
        >
          <n-scrollbar >
            
            <!-- <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.setCentered(selectedNode.id+'').render()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M4 15c-.55 0-1 .45-1 1v3c0 1.1.9 2 2 2h3c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1zm1-9c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V6zm14-3h-3c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V5c0-1.1-.9-2-2-2zm0 15c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c1.1 0 2-.9 2-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z" fill="currentColor"></path></svg>
              </template>
              ផ្ដោតទៅ<br/>{{ selectedNode.name }}
            </n-tooltip> -->
            
            <!-- <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="removeNode(selectedNode)"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336 256H176"></path></svg>
              </template>
              លុបស្ថាប័ន<br/>{{ selectedNode.name }}
            </n-tooltip> -->
            
            <!-- <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="moveNode(selectedNode)"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="18" r="2"></circle><circle cx="19" cy="6" r="2"></circle><path d="M19 8v5a5 5 0 0 1-5 5h-3l3-3m0 6l-3-3"></path><path d="M5 16v-5a5 5 0 0 1 5-5h3l-3-3m0 6l3-3"></path></g></svg>
              </template>
              ផ្លាស់ប្ដូរស្ថាប័នមេរបស់<br/>{{ selectedNode.name }}
            </n-tooltip> -->
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.layout('left').render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M6.5 5.25a1.25 1.25 0 1 1 2.5 0v37.5a1.25 1.25 0 1 1-2.5 0V5.25zM15.75 26a4.25 4.25 0 0 0-4.25 4.25v5.5A4.25 4.25 0 0 0 15.75 40h15A4.25 4.25 0 0 0 35 35.75v-5.5A4.25 4.25 0 0 0 30.75 26h-15zM14 30.25c0-.966.784-1.75 1.75-1.75h15c.966 0 1.75.784 1.75 1.75v5.5a1.75 1.75 0 0 1-1.75 1.75h-15A1.75 1.75 0 0 1 14 35.75v-5.5zm-2.5-18v5.5A4.25 4.25 0 0 0 15.75 22H38a4.25 4.25 0 0 0 4.25-4.25v-5.5A4.25 4.25 0 0 0 38 8H15.75a4.25 4.25 0 0 0-4.25 4.25zm2.5 5.5v-5.5c0-.966.784-1.75 1.75-1.75H38c.967 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 38 19.5H15.75A1.75 1.75 0 0 1 14 17.75z" fill="currentColor"></path></g></svg>
              </template>
              ឋនានុក្រុមពីឆ្វេងទៅស្ដាំ
            </n-tooltip>
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.layout('top').render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M2.75 3a.75.75 0 0 0 0 1.5h22.5a.75.75 0 0 0 0-1.5H2.75zM5 8.75A2.75 2.75 0 0 1 7.75 6h2.5A2.75 2.75 0 0 1 13 8.75v13.5A2.75 2.75 0 0 1 10.25 25h-2.5A2.75 2.75 0 0 1 5 22.25V8.75zM7.75 7.5c-.69 0-1.25.56-1.25 1.25v13.5c0 .69.56 1.25 1.25 1.25h2.5c.69 0 1.25-.56 1.25-1.25V8.75c0-.69-.56-1.25-1.25-1.25h-2.5zM15 8.75A2.75 2.75 0 0 1 17.75 6h2.5A2.75 2.75 0 0 1 23 8.75v8a2.75 2.75 0 0 1-2.75 2.75h-2.5A2.75 2.75 0 0 1 15 16.75v-8zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h2.5c.69 0 1.25-.56 1.25-1.25v-8c0-.69-.56-1.25-1.25-1.25h-2.5z" fill="currentColor"></path></g></svg>
              </template>
              ឋនានុក្រុមពីលើមកក្រោម
            </n-tooltip>
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.layout('right').render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M29 4a1 1 0 1 0-2 0v24a1 1 0 1 0 2 0V4zm-7.5 1A3.5 3.5 0 0 1 25 8.5v3a3.5 3.5 0 0 1-3.5 3.5h-15A3.5 3.5 0 0 1 3 11.5v-3A3.5 3.5 0 0 1 6.5 5h15zM23 8.5A1.5 1.5 0 0 0 21.5 7h-15A1.5 1.5 0 0 0 5 8.5v3A1.5 1.5 0 0 0 6.5 13h15a1.5 1.5 0 0 0 1.5-1.5v-3zM21.5 17a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 9 23.5v-3a3.5 3.5 0 0 1 3.5-3.5h9zm1.5 3.5a1.5 1.5 0 0 0-1.5-1.5h-9a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-3z" fill="currentColor"></path></g></svg>
              </template>
              ឋនានុក្រុមពីស្ដាំទៅឆ្វេង
            </n-tooltip>
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.layout('bottom').render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M5.25 41.5a1.25 1.25 0 1 1 0-2.5h37.5a1.25 1.25 0 1 1 0 2.5H5.25zM26 32.25a4.25 4.25 0 0 0 4.25 4.25h5.5A4.25 4.25 0 0 0 40 32.25v-15A4.25 4.25 0 0 0 35.75 13h-5.5A4.25 4.25 0 0 0 26 17.25v15zM30.25 34a1.75 1.75 0 0 1-1.75-1.75v-15c0-.966.784-1.75 1.75-1.75h5.5c.967 0 1.75.784 1.75 1.75v15A1.75 1.75 0 0 1 35.75 34h-5.5zm-18 2.5h5.5A4.25 4.25 0 0 0 22 32.25V10a4.25 4.25 0 0 0-4.25-4.25h-5.5A4.25 4.25 0 0 0 8 10v22.25a4.25 4.25 0 0 0 4.25 4.25zm5.5-2.5h-5.5a1.75 1.75 0 0 1-1.75-1.75V10c0-.966.784-1.75 1.75-1.75h5.5c.966 0 1.75.784 1.75 1.75v22.25A1.75 1.75 0 0 1 17.75 34z" fill="currentColor"></path></g></svg>
              </template>
              ឋនានុក្រុមពីក្រោមទៅលើ
            </n-tooltip>
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.render().fit()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M11 10l1.41 1.41L15 8.83v14.34l-2.59-2.58L11 22l5 5l5-5l-1.41-1.41L17 23.17V8.83l2.59 2.58L21 10l-5-5l-5 5z" fill="currentColor"></path><path d="M28 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h24a2.002 2.002 0 0 1 2 2v24a2.002 2.002 0 0 1-2 2zM4 4v24h24V4z" fill="currentColor"></path></svg>
              </template>
              បង្រួមអោយពេញអេក្រង់
            </n-tooltip>
            
            <!-- <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.setUpToTheRootHighlighted( selectedNode.id + '' ).render()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 14L6 24l1.4 1.4l8.6-8.6l8.6 8.6L26 24z" fill="currentColor"></path><path d="M4 8h24v2H4z" fill="currentColor"></path></svg>
              </template>
              បង្ហាញផ្លូវទៅថ្នាក់កំពូល
            </n-tooltip> -->
            
            <!-- <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.fullscreen()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h1.865a.75.75 0 1 1 0 1.5H5.25a.75.75 0 0 0-.75.75v1.865a.75.75 0 1 1-1.5 0V5.25zm9.135-1.5a.75.75 0 0 1 .75-.75h1.865A2.25 2.25 0 0 1 17 5.25v1.865a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 0-.75-.75h-1.865a.75.75 0 0 1-.75-.75zM3.75 12.135a.75.75 0 0 1 .75.75v1.865c0 .414.336.75.75.75h1.865a.75.75 0 0 1 0 1.5H5.25A2.25 2.25 0 0 1 3 14.75v-1.865a.75.75 0 0 1 .75-.75zm12.5 0a.75.75 0 0 1 .75.75v1.865A2.25 2.25 0 0 1 14.75 17h-1.865a.75.75 0 0 1 0-1.5h1.865a.75.75 0 0 0 .75-.75v-1.865a.75.75 0 0 1 .75-.75z" fill="currentColor"></path></g></svg>
              </template>
              បង្ហាញពេញអេក្រង់
            </n-tooltip> -->
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.zoomIn()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 12h-4V8h-2v4H8v2h4v4h2v-4h4v-2z" fill="currentColor"></path><path d="M21.448 20A10.856 10.856 0 0 0 24 13a11 11 0 1 0-11 11a10.856 10.856 0 0 0 7-2.552L27.586 29L29 27.586zM13 22a9 9 0 1 1 9-9a9.01 9.01 0 0 1-9 9z" fill="currentColor"></path></svg>
              </template>
              ពង្រីកឋនានុក្រម
            </n-tooltip>
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.zoomOut()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M8 12h10v2H8z" fill="currentColor"></path><path d="M21.448 20A10.856 10.856 0 0 0 24 13a11 11 0 1 0-11 11a10.856 10.856 0 0 0 7-2.552L27.586 29L29 27.586zM13 22a9 9 0 1 1 9-9a9.01 9.01 0 0 1-9 9z" fill="currentColor"></path></svg>
              </template>
              បង្រួមឋនានុក្រម
            </n-tooltip>
            
            <!-- <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.exportImg()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M19 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1z" fill="currentColor"></path><path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 22H6v-6l5-5l5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5zm0-4.83l-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20z" fill="currentColor"></path></svg>
              </template>
              រក្សារទុកជារូបភាព
            </n-tooltip>
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.exportSvg()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30 23h-6a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2h6v2h-6v10h4v-4h-2v-2h4z" fill="currentColor"></path><path d="M18 9l-2 13l-2-13h-2l2.52 14h2.96L20 9h-2z" fill="currentColor"></path><path d="M8 23H2v-2h6v-4H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6v2H4v4h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z" fill="currentColor"></path></svg>
              </template>
              រក្សារទុកជា SVG
            </n-tooltip>
            
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="downloadPdf()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path></svg>
              </template>
              រក្សារទុកជា PDF
            </n-tooltip>
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="chart.connections([{from:'401',to:'2',label:'ខ្សែទំនាក់ទំនង'}]).render()"
                  class="text-gray-100 m-2 w-10 h-10 p-1 cursor-pointer" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 10l-1.414 1.414L26.172 15H11.899A5.014 5.014 0 0 0 8 11.101V2H6v9.101A5 5 0 0 0 6 20.9V30h2v-9.101A5.014 5.014 0 0 0 11.899 17h14.273l-3.586 3.586L24 22l6-6zM7 19a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path></svg>
              </template>
              រក្សារទុកជា PDF
            </n-tooltip>
            <n-tooltip trigger="hover" placement="left" >
              <template #trigger >
                <svg 
                  @click="assignPermissions"
                  class="m-2 w-10 h-10 p-1 cursor-pointer text-gray-100" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.658 4.527a.5.5 0 0 0-.316.948l1.158.386v1.14a.5.5 0 0 0 1 0V5.86l1.158-.386a.5.5 0 1 0-.316-.948L10 4.974l-1.342-.447zm1.77-2.46a1.5 1.5 0 0 0-.855 0l-2.865.85a.99.99 0 0 0-.708.95v4.26a1 1 0 0 0 .715.96l2.792.829A.503.503 0 0 0 9.5 10v1H8a2 2 0 0 0-2 2v.05a2.5 2.5 0 1 0 1 0V13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.05a2.5 2.5 0 1 0 1 0V13a2 2 0 0 0-2-2h-1.5v-1a.506.506 0 0 0-.007-.085l2.792-.83A1 1 0 0 0 14 8.128V3.874a1 1 0 0 0-.715-.959l-2.858-.849zm-.57.958a.5.5 0 0 1 .284 0L13 3.874v4.254l-2.858.849a.5.5 0 0 1-.284 0L7 8.127V3.875l2.858-.85zM5 15.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0zm8.5-1.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3z" fill="currentColor"></path></g></svg>
              </template>
              ភ្ជាប់សិទ្ធិប្រើមុខងារក្នុងប្រព័ន្ធ
            </n-tooltip> -->
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
    const currentOrganizationStructure = reactive({
      id : 0 ,
      parentId : null ,
      name : '' ,
      image : '' ,
      desp : '' ,
      organization: null
    })
    const parentOrganizationStructureList = ref([])
    const parentOrganizationStructureId = ref(
      route.params.pid != undefined && parseInt( route.params.pid ) > 0
        ? parseInt( route.params.pid )
        : null 
    )

    const currentOrganizationStructurePosition = reactive({
      id : 0 ,
      parentId : null ,
      name : '' ,
      image : '' ,
      desp : '' ,
      position: null ,
      permissions: []
    })
    const currentOrganizationStructurePositionList = ref([])
    const currentOrganizationStructurePositionId = ref(
      route.params.id != undefined && parseInt( route.params.id ) > 0
        ? parseInt( route.params.id )
        : null 
    )

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
      pid: 0
    })
    const rootNode = ref({
      id: 0 ,
      parentId: "" ,
      name: "" ,
      image: "https://picsum.photos/200/300" ,
      desp: "" ,
      pid: 0
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
      // .setActiveNodeCentered(true)
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
            selectedNode.value.pid = d.data.pid
            chartNodeFunctionsToggler.value = true
            // chart.value.setCentered( d.data.id +'' ).render()

            togglePermissionOfPosition(selectedNode.value.id)
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

          nodeContent.className = 'text-gray-800 bg-white text-center text-lg place-content-center rounded-lg border border-gray-100 '
          nodeContent.innerText = d.data.name

          // let img = document.createElement('img');
          // img.className = ' absolute left-0 top-0 bottom-0 w-auto rounded-l-lg'
          // img.style = `height:${d.height}px;`
          // img.src = d.data.image==null || d.data.image==undefined ? ocmLogoUrl : 'https://marketplace.canva.com/EAFXS8-cvyQ/1/0/100w/canva-B-A8A3LCS0Y.jpg'
          // nodeContent.appendChild( img )

          if( currentOrganizationStructurePosition.permissions != undefined && currentOrganizationStructurePosition.permissions.length > 0 ){
            if( currentOrganizationStructurePosition.permissions.find( (p) => p.id == d.data.id ) != undefined ){
              let divIcon = document.createElement('div')
              divIcon.className = 'absolute right-1 top-1 w-10 h-10 ' 
              divIcon.innerHTML = '<svg class="text-green-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z" fill="currentColor"></path></svg>'
              nodeContent.appendChild( divIcon )
            }
          }

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
      .render().expandAll().fit()
    }

    onMounted(() => {
      drawingOrgchart()
    })

    function getStructurePositionPermission(id){
      store.dispatch( 'position/getPosition',{
        organization_structure_position_id : id
      } ).then( res => {

        selectedNode.value.id = res.data.permission.id
        selectedNode.value.parentId = res.data.permission.parentId
        selectedNode.value.name = res.data.permission.name
        selectedNode.value.image = res.data.permission.image
        selectedNode.value.desp = res.data.permission.desp
        selectedNode.value.pid = res.data.permission.pid
        
        currentOrganizationStructurePosition.id = res.data.record.id
        currentOrganizationStructurePosition.name = res.data.record.name
        currentOrganizationStructurePosition.desp = res.data.record.desp
        currentOrganizationStructurePosition.image = res.data.record.image
        currentOrganizationStructurePosition.permissions = res.data.record.permissions
        currentOrganizationStructurePosition.position = res.data.record.position
        currentOrganizationStructurePosition.pid = res.data.record.pid
        
        console.log( currentOrganizationStructurePosition )

        const nodes = ref([])
        nodes.value.push( {
          id: res.data.permission.id ,
          parentId: res.data.permission.parentId ,
          name: res.data.permission.name ,
          image: res.data.permission.image != "" && res.data.permission.image != undefined ? res.data.permission.image : ocmLogoUrl ,
          desp: res.data.permission.desp ,
          pid: res.data.permission.pid ,
        } )

        if( res.data.permissions != undefined && res.data.permissions.length > 0 ){
          for(const e of res.data.permissions ){
            nodes.value.push({
              id: e.id ,
              parentId: parseInt( e.pid ) > 0 ? parseInt( e.pid ) : null ,
              name: e.name ,
              image: e.image != "" && e.image != undefined ? e.image : ocmLogoUrl ,
              desp: e.desp ,
              pid: e.pid
            })
          }
        }
        chart.value = null
        drawingOrgchart(nodes.value)
        chartNodeFunctionsToggler.value = true
      }).catch( err => {
        console.log( err )
      })
    }

    function getStructure( id ){
      store.dispatch( 'organizations/getStructure',{
        organization_structure_id : id
      } ).then( res => {
        if( res.data.ok ){
          currentOrganizationStructure.id = res.data.record.id
          currentOrganizationStructure.parentId = parseInt( res.data.record.pid ) > 0 ? parseInt( res.data.record.pid ) : null
          currentOrganizationStructure.name = res.data.record.organization.name
          currentOrganizationStructure.image = res.data.record.organization.image
          currentOrganizationStructure.desp = res.data.record.organization.desp
          currentOrganizationStructure.pid = res.data.record.pid
          currentOrganizationStructure.organization = res.data.record.organization
          
          parentOrganizationStructureList.value = []
          parentOrganizationStructureList.value.push( {
            id: currentOrganizationStructure.id ,
            parentId: currentOrganizationStructure.parentId ,
            pid: currentOrganizationStructure.pid ,
            name: currentOrganizationStructure.name ,
            image: currentOrganizationStructure.image != "" && currentOrganizationStructure.image != undefined ? currentOrganizationStructure.image : ocmLogoUrl ,
            desp: currentOrganizationStructure.desp ,
          } )

          if( res.data.records != undefined && res.data.records.length > 0 ){
            for(const e of res.data.records ){
              parentOrganizationStructureList.value.push({
                id: e.id ,
                parentId: parseInt( e.pid ) > 0 ? parseInt( e.pid ) : null ,
                name: e.organization.name ,
                image: e.organization.image != "" && e.organization.image != undefined ? e.organization.image : ocmLogoUrl ,
                desp: e.organization.desp ,
                pid: e.pid
              })
            }
          }

        }else{
          notify.warning({
            title: 'អានឋានានុក្រម' ,
            content: 'មានបញ្ហាអានឋានានុក្រម។'
          })
        }

      }).catch( err => {
        console.log( err )
      })
    }
    function togglePermissionOfPosition(id){
      store.dispatch( 'organizations/togglePermissionOfPosition',{
        permission_id : id ,
        organization_structure_position_id : currentOrganizationStructurePositionId.value 
      }).then( res => {

        currentOrganizationStructurePosition.id = res.data.record.id
        currentOrganizationStructurePosition.name = res.data.record.name
        currentOrganizationStructurePosition.desp = res.data.record.desp
        currentOrganizationStructurePosition.image = res.data.record.image
        currentOrganizationStructurePosition.permissions = res.data.record.permissions
        currentOrganizationStructurePosition.position = res.data.record.position
        currentOrganizationStructurePosition.pid = res.data.record.pid
        
        selectedNode.value.id = res.data.permission.id
        selectedNode.value.parentId = res.data.permission.parentId
        selectedNode.value.name = res.data.permission.name
        selectedNode.value.image = res.data.permission.image
        selectedNode.value.desp = res.data.permission.desp
        selectedNode.value.pid = res.data.permission.pid
        
        const nodes = ref([])
        nodes.value.push( {
          id: res.data.permission.id ,
          parentId: res.data.permission.pid ,
          name: res.data.permission.name ,
          image: res.data.permission.image != "" && res.data.permission.image != undefined ? res.data.permission.image : ocmLogoUrl ,
          desp: res.data.permission.desp ,
          pid: res.data.permission.pid ,
        } )

        if( res.data.permissions != undefined && res.data.permissions.length > 0 ){
          for(const e of res.data.permissions ){
            nodes.value.push({
              id: e.id ,
              parentId: parseInt( e.pid ) > 0 ? parseInt( e.pid ) : null ,
              name: e.name ,
              image: e.image != "" && e.image != undefined ? e.image : ocmLogoUrl ,
              desp: e.desp ,
              pid: e.pid
            })
          }
        }
        chart.value = null
        drawingOrgchart(nodes.value)
        chartNodeFunctionsToggler.value = true

      })
      .catch( err => {
        console.log( err )
      })
    }

    getStructure( parentOrganizationStructureId.value )
    getStructurePositionPermission( currentOrganizationStructurePositionId.value )

    return {
      /**
       * Variables
       */
      dataFlattened ,
      selectedNode ,
      chartNodeFunctionsToggler ,
      chart ,
      currentOrganizationStructure ,
      currentOrganizationStructurePosition
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