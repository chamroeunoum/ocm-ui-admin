<template>
  <n-modal v-model:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick"  :on-after-enter="initial" transform-origin="center" class="relative" >
    <div class="w-11/12 font-pvh min-h-screen text-xl bg-white" >
      <!-- Form edit account -->
      <div class="w-full relative ">
        <div v-if="book!=null&&book.title!=undefined" class="relative book-title text-left text-lg p-4 w-full font-moul leading-5 border-b border-gray-200" >
          {{ book.title }}
          <div class="book-action-panel absolute right-2 top-3 flex justify-end mb-4 pb-2" >
              <!-- <n-select 
                v-model:value="startOfContent" 
                :options="[
                  // { label: 'គ្មានគ្រោង' , value : null } ,
                  // { label: 'ចាប់ផ្ដើមពី គន្ថី' , value : 'kunty' } ,
                  { label: 'ចាប់ផ្ដើមពី គន្ថី' , value : null } ,
                  { label: 'ចាប់ផ្ដើមពី មាតិកា' , value : 'matika' } ,
                  { label: 'ចាប់ផ្ដើមពី ជំពូក' , value : 'chapter' }
                ]" 
                placeholder="សូមជ្រើសរើស គ្រោងមាតិកា" 
                class="w-48 mx-4"
              /> -->
              <n-tooltip trigger="hover" >
                <template #trigger>
                  <div @click="openCreateKunty({
                    id: 0 ,
                    number: '' ,
                    title: '' ,
                    meaning: '' ,
                    active: 1 ,
                    book_id: book.id ,
                    kunty_id: 0 ,
                    matika_id: 0 ,
                    chapter_id: 0 ,
                    part_id: 0 ,
                    section_id: 0
                  })" class="font-pvh text-center text-blue-500 border rounded-md border-blue-400 px-1 w-28 h-8 mx-2 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលគន្ថី</div>
                </template>
                បញ្ចូលគន្ថី សម្រាប់ច្បាប់នេះ
              </n-tooltip>
              <n-tooltip trigger="hover" >
                <template #trigger>
                  <div @click="openCreateMatika({
                    id: 0 ,
                    number: '' ,
                    title: '' ,
                    meaning: '' ,
                    active: 1 ,
                    book_id: book.id ,
                    kunty_id: 0 ,
                    matika_id: 0 ,
                    chapter_id: 0 ,
                    part_id: 0 ,
                    section_id: 0
                  })" class="font-pvh text-center text-blue-500 border rounded-md border-blue-400 px-1 w-28 h-8 mx-2 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលមាតិកា</div>
                </template>
                បញ្ចូលមាតិកា សម្រាប់ច្បាប់នេះ
              </n-tooltip>
              <n-tooltip trigger="hover" >
                <template #trigger>
                  <div @click="openCreateChapter({
                    id: 0 ,
                    number: '' ,
                    title: '' ,
                    meaning: '' ,
                    active: 1 ,
                    book_id: book.id ,
                    kunty_id: 0 ,
                    matika_id: 0 ,
                    chapter_id: 0 ,
                    part_id: 0 ,
                    section_id: 0
                  })" class="font-pvh text-center text-blue-500 border rounded-md border-blue-400 px-1 w-28 h-8 mx-2 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលជំពូក</div>
                </template>
                បញ្ចូលជំពូក សម្រាប់ច្បាប់នេះ
              </n-tooltip>
              <n-tooltip trigger="hover" >
                <template #trigger>
                  <div @click="openCreateMatra({
                    id: 0 ,
                    number: '' ,
                    title: '' ,
                    meaning: '' ,
                    active: 1 ,
                    book_id: book.id ,
                    kunty_id: 0 ,
                    matika_id: 0 ,
                    chapter_id: 0 ,
                    part_id: 0 ,
                    section_id: 0
                  })" class="text-center font-pvh border rounded-md border-blue-400 text-blue-500 px-1 w-24 h-8 mx-2 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលមាត្រា</div>
                </template>
                បញ្ចូលមាត្រា សម្រាប់ច្បាប់នេះ
              </n-tooltip>
            </div>
        </div>
        <div class="book flex flex-initial" >
          <!-- Column 1 - Content of the book -->
          <div 
            v-if="
            structure!=null &&
            ( 
              ( Array.isArray( structure.kunties)&&structure.kunties.length>0 ) ||
              ( Array.isArray( structure.matikas)&&structure.matikas.length>0 ) ||
              ( Array.isArray( structure.chapters)&&structure.chapters.length>0 )
            )
            "
            class="book-content flex-none border-r border-gray-200 w-80 px-4 overflow-hidden" 
          >
            <n-tooltip trigger="hover" placement="right">
              <template #trigger>
                <div class="book font-moul truncate leading-5 py-1 my-1 cursor-pointer text-blue-600 duration-300 transform hover:scale-105 " @click="setBook()" >{{ book.title }}</div>
              </template>
              {{ book.title }}
            </n-tooltip>
            <!-- In case, the book start with kunty -->
            <div v-if="Array.isArray( structure.kunties)&&structure.kunties.length>0" class="book-contents book-kunties" >
              <!-- Kunties -->
              <div v-for="(kunty,kindex) in structure.kunties" :index="kindex" class="book-kunty  relative" >
                <n-tooltip trigger="hover" placement="right">
                  <template #trigger>
                    <div @click="setMatras( kunty )" class="book-kunty-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-blue-600 duration-300 transform hover:scale-105 " >{{ kunty.number + " ៖ " + kunty.title }}</div>
                  </template>
                  {{ kunty.title }}
                </n-tooltip>
                <!-- Matikas -->
                <div v-if="kunty.matikas" class="book-kunty-matikas border-l border-blue-500 pl-4 " >
                  <div v-for="(matika,mindex) in kunty.matikas" :index="mindex" class=" relative" >
                    <n-tooltip trigger="hover" placement="right">
                      <template #trigger>
                        <div @click="setMatras( matika )" class="book-kunty-matika-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-green-600 duration-300 transform hover:scale-105 " >{{ matika.number + " ៖ " + matika.title }}</div>
                      </template>
                      {{ matika.title }}
                    </n-tooltip>
                    <!-- Chapters -->
                    <div v-if="matika.chapters" class="book-kunty-matika-chapters border-l border-yellow-500 pl-4 " >
                      <div v-for="(chapter,cindex) in matika.chapters" :index="cindex" class=" relative" >
                        <n-tooltip trigger="hover" placement="right">
                          <template #trigger>
                            <div @click="setMatras( chapter )" class="book-kunty-matika-chapter-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-yellow-600 duration-300 transform hover:scale-105 " >{{ chapter.number + " ៖ " + chapter.title }}</div>
                          </template>
                          {{ chapter.title }}
                        </n-tooltip>
                        <!-- Parts -->
                        <div v-if="chapter.parts" class="book-kunty-matika-chapter-parts border-l border-purple-500 pl-4" >
                          <div v-for="(part,pindex) in chapter.parts" :index="pindex" class=" relative" >
                            <n-tooltip trigger="hover" placement="right">
                              <template #trigger>
                                <div @click="setMatras( part )" class="book-kunty-matika-chapter-part-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-purple-600 duration-300 transform hover:scale-105 " >{{ part.number + " ៖ " + part.title }}</div>
                              </template>
                              {{ part.title }}
                            </n-tooltip>
                            <!-- Sections -->
                            <div v-if="part.sections" class="book-kunty-matika-chapter-part-sections border-l border-pink-500 pl-4" >
                              <div v-for="(section,sindex) in part.sections" :index="sindex" class=" " >
                                <n-tooltip trigger="hover" placement="right">
                                  <template #trigger>
                                    <div @click="setMatras( section )" class="book-kunty-matika-chapter-part-section-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-pink-600 duration-300 transform hover:scale-105 " >{{ section.number + " ៖ " + section.title }}</div>
                                  </template>
                                  {{ section.title }}
                                </n-tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Chapters -->
                <div v-if="kunty.chapters" class="book-kunty-matika-chapters border-l border-yellow-500 pl-4 " >
                  <div v-for="(chapter,cindex) in kunty.chapters" :index="cindex" class=" relative" >
                    <n-tooltip trigger="hover" placement="right">
                      <template #trigger>
                        <div @click="setMatras( chapter )" class="book-kunty-matika-chapter-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-yellow-600 duration-300 transform hover:scale-105 " >{{ chapter.number + " ៖ " + chapter.title }}</div>
                      </template>
                      {{ chapter.title }}
                    </n-tooltip>
                    <!-- Parts -->
                    <div v-if="chapter.parts" class="book-kunty-matika-chapter-parts border-l border-purple-500 pl-4" >
                      <div v-for="(part,pindex) in chapter.parts" :index="pindex" class=" relative" >
                        <n-tooltip trigger="hover" placement="right">
                          <template #trigger>
                            <div @click="setMatras( part )" class="book-kunty-matika-chapter-part-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-purple-600 duration-300 transform hover:scale-105 " >{{ part.number + " ៖ " + part.title }}</div>
                          </template>
                          {{ part.title }}
                        </n-tooltip>
                        <!-- Sections -->
                        <div v-if="part.sections" class="book-kunty-matika-chapter-part-sections border-l border-pink-500 pl-4" >
                          <div v-for="(section,sindex) in part.sections" :index="sindex" class=" " >
                            <n-tooltip trigger="hover" placement="right">
                              <template #trigger>
                                <div @click="setMatras( section )" class="book-kunty-matika-chapter-part-section-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-pink-600 duration-300 transform hover:scale-105 " >{{ section.number + " ៖ " + section.title }}</div>
                              </template>
                              {{ section.title }}
                            </n-tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End the book start with kunty -->
            <!-- In case, the book start with matika -->
            <div v-if="Array.isArray( structure.matikas)&&structure.matikas.length>0" class="book-contents book-matikas" >
              <!-- Matikas -->
              <div v-for="(matika,mindex) in structure.matikas" :index="mindex" class=" relative" >
                <n-tooltip trigger="hover" placement="right">
                  <template #trigger>
                    <div @click="setMatras( matika )" class="book-kunty-matika-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-green-600 duration-300 transform hover:scale-105 " >{{ matika.number + " ៖ " + matika.title }}</div>
                  </template>
                  {{ matika.title }}
                </n-tooltip>
                <!-- Chapters -->
                <div v-if="matika.chapters" class="book-kunty-matika-chapters border-l border-yellow-500 pl-4 " >
                  <div v-for="(chapter,cindex) in matika.chapters" :index="cindex" class=" relative" >
                    <n-tooltip trigger="hover" placement="right">
                      <template #trigger>
                        <div @click="setMatras( chapter )" class="book-kunty-matika-chapter-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-yellow-600 duration-300 transform hover:scale-105 " >{{ chapter.number + " ៖ " + chapter.title }}</div>
                      </template>
                      {{ chapter.title }}
                    </n-tooltip>
                    <!-- Parts -->
                    <div v-if="chapter.parts" class="book-kunty-matika-chapter-parts border-l border-purple-500 pl-4" >
                      <div v-for="(part,pindex) in chapter.parts" :index="pindex" class=" relative" >
                        <n-tooltip trigger="hover" placement="right">
                          <template #trigger>
                            <div @click="setMatras( part )" class="book-kunty-matika-chapter-part-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-purple-600 duration-300 transform hover:scale-105 " >{{ part.number + " ៖ " + part.title }}</div>
                          </template>
                          {{ part.title }}
                        </n-tooltip>
                        <!-- Sections -->
                        <div v-if="part.sections" class="book-kunty-matika-chapter-part-sections border-l border-pink-500 pl-4" >
                          <div v-for="(section,sindex) in part.sections" :index="sindex" class=" " >
                            <n-tooltip trigger="hover" placement="right">
                              <template #trigger>
                                <div @click="setMatras( section )" class="book-kunty-matika-chapter-part-section-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-pink-600 duration-300 transform hover:scale-105 " >{{ section.number + " ៖ " + section.title }}</div>
                              </template>
                              {{ section.title }}
                            </n-tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End the book start with matika -->
            <!-- In case, the book start with Chapter -->
            <div v-if="Array.isArray( structure.chapters)&&structure.chapters.length>0" class="book-contents book-matikas" >
              <!-- Chapters -->
              <div v-for="(chapter,cindex) in structure.chapters" :index="cindex" class=" relative" >
                <n-tooltip trigger="hover" placement="right">
                  <template #trigger>
                    <div @click="setMatras( chapter )" class="book-kunty-matika-chapter-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-yellow-600 duration-300 transform hover:scale-105 " >{{ chapter.number + " ៖ " + chapter.title }}</div>
                  </template>
                  {{ chapter.title }}
                </n-tooltip>
                <!-- Parts -->
                <div v-if="chapter.parts" class="book-kunty-matika-chapter-parts border-l border-purple-500 pl-4" >
                  <div v-for="(part,pindex) in chapter.parts" :index="pindex" class=" relative" >
                    <n-tooltip trigger="hover" placement="right">
                      <template #trigger>
                        <div @click="setMatras( part )" class="book-kunty-matika-chapter-part-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-purple-600 duration-300 transform hover:scale-105 " >{{ part.number + " ៖ " + part.title }}</div>
                      </template>
                      {{ part.title }}
                    </n-tooltip>
                    <!-- Sections -->
                    <div v-if="part.sections" class="book-kunty-matika-chapter-part-sections border-l border-pink-500 pl-4" >
                      <div v-for="(section,sindex) in part.sections" :index="sindex" class=" " >
                        <n-tooltip trigger="hover" placement="right">
                          <template #trigger>
                            <div @click="setMatras( section )" class="book-kunty-matika-chapter-part-section-title font-pvh truncate leading-5 py-1 my-1 cursor-pointer text-pink-600 duration-300 transform hover:scale-105 " >{{ section.number + " ៖ " + section.title }}</div>
                          </template>
                          {{ section.title }}
                        </n-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End the book start with matika -->
          </div>
          <!-- Column 2 - List of matras -->
          <div class="relative flex-grow px-4 py-1 content-matras flex flex-wrap " >
            <Transition name="slide-fade" >
              <div class="book list-matras w-full mt-4" >
                <div v-if="currentSelectedRecord != null" class="relative w-full h-12 text-blue-700 mb-2 py-2 border-b border-gray-200 font-pvh leading-7" >
                  > {{ ( currentSelectedRecord.number != undefined ? currentSelectedRecord.number + " ៖ " : '' ) + currentSelectedRecord.title }}
                  <div v-if="currentSelectedRecord.type == 'kunty'" @click="openCreateMatika(currentSelectedRecord)" class="text-center font-pvh absolute right-28 top-1 text-blue-500 border rounded-md border-blue-400 px-1 w-28 h-8 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលមាតិកា</div>
                  <div v-if="currentSelectedRecord.type == 'matika'" @click="openCreateChapter(currentSelectedRecord)" class="text-center font-pvh absolute right-28 top-1 text-blue-500 border rounded-md border-blue-400 px-1 w-28 h-8 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលជំពូក</div>
                  <div v-if="currentSelectedRecord.type == 'chapter'" @click="openCreatePart(currentSelectedRecord)" class="text-center font-pvh absolute right-28 top-1 text-blue-500 border rounded-md border-blue-400 px-1 w-28 h-8 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលផ្នែក</div>
                  <div v-if="currentSelectedRecord.type == 'part'" @click="openCreateSection(currentSelectedRecord)" class="text-center font-pvh absolute right-28 top-1 text-blue-500 border rounded-md border-blue-400 px-1 w-28 h-8 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលកថាភាគ</div>
                  <div @click="openCreateMatra(currentSelectedRecord)" class="text-center font-pvh absolute right-0 top-1 border rounded-md border-blue-400 text-blue-500 px-1 w-24 h-8 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលមាត្រា</div>
                </div>
                <div v-if="currentSelectedRecord == null && book != null " class="relative w-full h-12 text-blue-700 mb-2 py-2 border-b border-gray-200 font-pvh leading-7" >
                  > {{ book.title }}
                  <div @click="openCreateMatra({
                    id: 0 ,
                    number: '' ,
                    title: '' ,
                    meaning: '' ,
                    active: 1 ,
                    book_id: book.id ,
                    kunty_id: 0 ,
                    matika_id: 0 ,
                    chapter_id: 0 ,
                    part_id: 0 ,
                    section_id: 0
                  })" class="text-center font-pvh absolute right-0 top-1 border rounded-md border-blue-400 text-blue-500 px-1 w-24 h-8 leading-8 cursor-pointer hover:border-green-500 hover:text-green-500 duration-300" >បញ្ចូលមាត្រា</div>
                </div>
                <!-- Pagination of crud -->
                <Transition name="slide-fade" >
                  <div v-if="table.pagination.totalPages>1" class="w-full flex justify-end mb-4" >
                    <!-- This pagination is for the media side with from Medium up -->
                    <div class="vcb-table-pagination ">
                      <!-- Information -->
                      <div class="vcb-table-pagination-info font-pvh text-blue-600 leading-7 p-1 mx-2" >{{ table.pagination.totalRecords > 0 ? table.pagination.totalRecords + " មាត្រា" : "" }}</div>
                      <div class="vcb-table-pagination-info font-pvh text-blue-600 leading-7 p-1 mx-2" >{{ table.pagination.totalPages > 0 ? table.pagination.totalPages + " ទំព័រ" : "" }}</div>
                      <!-- First -->
                      <!-- Pages (7) -->
                      <div v-for="(page, index) in table.pagination.buttons" :key="index" :class=" (table.pagination.page == page ? ' vcb-pagination-page-active ' : ' vcb-pagination-page ' )" @click="table.pagination.page == page ? false : goTo(page) " >{{ page }}</div>
                      <!-- Previous -->
                      <Transition name="slide-fade" >
                        <div v-if="table.pagination.page > 1 " class="vcb-pagination-page " v-html='"<"' @click="previous()" ></div>
                      </Transition>
                      <!-- Next -->
                      <Transition name="slide-fade" >
                        <div v-if="table.pagination.page < table.pagination.totalPages " class="vcb-pagination-page " v-html='">"' @click="next()" ></div>
                      </Transition>
                      <!-- Last -->
                      <!-- Go to -->
                      <!-- Total per page -->
                    </div>
                  </div>
                </Transition>
                <div v-if="table.records.matched.length" class="list-matras " >
                  <div v-for="(matra,index) in table.records.matched" :index="index" class="w-full border-b border-gray-200 pt-1 pb-4 mb-8 relative" >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <svg @click="openUpdateMatra(matra)" class="absolute right-1 top-1 w-6 h-6 p-1 border rounded-full border-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-500 duration-300 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M13.416 2.584c.778.778.778 2.039 0 2.817L6.058 12.76c-.319.32-.719.546-1.156.655l-2.283.57a.498.498 0 0 1-.604-.603l.57-2.283a2.49 2.49 0 0 1 .656-1.156l7.358-7.358a1.992 1.992 0 0 1 2.817 0zM9.894 4.697l-5.949 5.949a1.495 1.495 0 0 0-.393.694l-.369 1.477l1.477-.37c.263-.065.503-.2.694-.392l5.949-5.95l-1.409-1.408zm1.41-1.41l-.705.705l1.408 1.409l.705-.704a.996.996 0 0 0-1.409-1.41z" fill="currentColor"></path></g></svg>
                      </template>
                      កែប្រែមាត្រា
                    </n-tooltip>
                    <div class="mb-4 tracking-wide font-pvh text-blue-500" >{{ ( !matra.number.includes("មាត្រា") ? ( 'មាត្រា ' + matra.number + " ៖ " ) : matra.number + " ៖ " ) + matra.title }}</div>
                    <pre 
                      class="w-full mt-4 my-1 text-xs leading-6 text-gray-800 text-justify tracking-wide" 
                      style="white-space: pre-wrap;" 
                    >{{ matra.meaning.replace(/(<([^>]+)>)/gi, '') }}</pre>
                  </div>
                </div>
              </div>
            </Transition>
            <!-- Loading -->
            <Transition name="slide-fade" >
              <div v-if="table.loading" class="table-loading absolute flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-90 z-50">
                <div class="flex mx-auto items-center">
                  <div class="spinner">
                    <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
                    <br/><br/>កំពុងអាន...
                  </div>
                </div>
                <div class="absolute top-2 right-2 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
                  <svg class="w-10 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <!-- Kunty -->
      <kunty-update-form v-bind:id="editKuntyId" v-bind:show="updateKuntyModal.show"  :onClose="closeUpdateKunty" />
      <kunty-create-form v-bind:record="createKuntyRecord" v-bind:show="createKuntyModal.show"  :onClose="closeCreateKunty" />
      <!-- Matika -->
      <matika-update-form v-bind:id="editMatikaId" v-bind:show="updateMatikaModal.show"  :onClose="closeUpdateMatika" />
      <matika-create-form v-bind:record="createMatikaRecord" v-bind:show="createMatikaModal.show"  :onClose="closeCreateMatika" />
      <!-- Chapter -->
      <chapter-update-form v-bind:id="editChapterId" v-bind:show="updateChapterModal.show"  :onClose="closeUpdateChapter" />
      <chapter-create-form v-bind:record="createChapterRecord" v-bind:show="createChapterModal.show"  :onClose="closeCreateChapter" />
      <!-- Part -->
      <part-update-form v-bind:id="editPartId" v-bind:show="updatePartModal.show"  :onClose="closeUpdatePart" />
      <part-create-form v-bind:record="createPartRecord" v-bind:show="createPartModal.show"  :onClose="closeCreatePart" />
      <!-- Section -->
      <section-update-form v-bind:id="editSectionId" v-bind:show="updateSectionModal.show"  :onClose="closeUpdateSection" />
      <section-create-form v-bind:record="createSectionRecord" v-bind:show="createSectionModal.show"  :onClose="closeCreateSection" />
      <!-- Matra -->
      <matra-update-form v-bind:id="editMatraId" v-bind:show="updateMatraModal.show"  :onClose="closeUpdateMatra" />
      <matra-create-form v-bind:record="createMatraRecord" v-bind:show="createMatraModal.show"  :onClose="closeCreateMatra" />
    </div>
  </n-modal>
</template>
<script>
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import { ReceiptAdd20Regular, Save20Regular } from '@vicons/fluent'
import QrcodeVue from 'qrcode.vue'
import KuntyCreateForm from './kunty/create.vue'
import KuntyUpdateForm from './kunty/update.vue'
import MatikaCreateForm from './matika/create.vue'
import MatikaUpdateForm from './matika/update.vue'
import ChapterUpdateForm from './chapter/update.vue'
import ChapterCreateForm from './chapter/create.vue'
import PartUpdateForm from './part/update.vue'
import PartCreateForm from './part/create.vue'
import SectionUpdateForm from './section/update.vue'
import SectionCreateForm from './section/create.vue'
import MatraUpdateForm from './matra/update.vue'
import MatraCreateForm from './matra/create.vue'


export default {
  components: {
    Save20Regular ,
    QrcodeVue ,
    // Form 
    KuntyCreateForm ,
    KuntyUpdateForm ,
    MatikaCreateForm ,
    MatikaUpdateForm ,
    ChapterCreateForm ,
    ChapterUpdateForm ,
    PartCreateForm ,
    PartUpdateForm ,
    SectionCreateForm ,
    SectionUpdateForm ,
    MatraCreateForm ,
    MatraUpdateForm
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
      required: true ,
      default: () => {
        return reactive({
          id: 0 ,
          
        })
      }
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    }
  },
  setup(props){
    var store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const book = ref(null)
    const structure = ref(null)
    const currentSelectedRecord = ref(null)
    const startOfContent = ref(null)

    /**
     * Functions
     */
    function clearRecord( actionStatus ){
      props.onClose( actionStatus )
    }
  
    function maskOrEscClick(){
      props.onClose( 1 )
    }

    function setBook(){
      startOfContent.value = null
      currentSelectedRecord.value = null
      getMatras()
    }
    function setMatras( record ){
      currentSelectedRecord.value = record
      goTo(1)
    }
    function getContent(){
      store.dispatch('law/content',{id:props.record.id}).then( res => {
        book.value = res.data.book
        structure.value = res.data.structure
        goTo(1)
      }).catch( err => {
        console.log( err )
      })
    }

    /**
     * Kunty Section
     */
    const createKuntyModal = reactive({show:false})
    const createKuntyRecord = reactive({
      id: 0 ,
      number: '' ,
      title: '' ,
      book_id: 0
    })
    
    function closeCreateKunty( createdRecord ){
      console.log( createdRecord )
      if( createdRecord.status > 0 ) {
        if( currentSelectedRecord.value != null ) {
          currentSelectedRecord.value.kunties.push( createdRecord.record )
        }
        getContent()
      }
      createKuntyModal.show = false
    }

    function openCreateKunty( record ){
      createKuntyRecord.book_id = parseInt( record.book_id ) > 0 
        ? parseInt( record.book_id ) 
        : (
          record.type == 'book' ? record.id : 0
        )
      createKuntyRecord.id = 0
      createKuntyRecord.number = "" 
      createKuntyRecord.title = "" 
      createKuntyModal.show = true
    }

    const updateKuntyModal = reactive({show:false})
    const editKuntyId = ref(0)
    function closeUpdateKunty( updatedRecord ){
      console.log( updatedRecord )
      if( updatedRecord.status > 0 ) {
        if( currentSelectedRecord.value != null ) {
          let kunty = currentSelectedRecord.value.kunties.find( (m) =>  {
            return updatedRecord.record.id == m.id
          })
          if( kunty != undefined ){
            kunty.title = updatedRecord.record.title
            kunty.number = updatedRecord.record.number
          }
        }
        getContent()
      }
      updateKuntyModal.show = false
    }
    function openUpdateKunty(kunty){
      editKuntyId.value = kunty.id
      updateKuntyModal.show = true
    } 

    /**
     * Matika Section
     */
    const createMatikaModal = reactive({show:false})
    const createMatikaRecord = reactive({
      id: 0 ,
      number: '' ,
      title: '' ,
      book_id: 0 ,
      kunty_id: 0
    })
    
    function closeCreateMatika( createdRecord ){
      console.log( createdRecord )
      if( createdRecord.status > 0 ) {
        if( currentSelectedRecord.value != null ) {
          currentSelectedRecord.value.matikas.push( createdRecord.record )
        }
        getContent()
      }
      createMatikaModal.show = false
    }

    function openCreateMatika( record ){
      createMatikaRecord.book_id = parseInt( record.book_id ) > 0 
        ? parseInt( record.book_id ) 
        : (
          record.type == 'book' ? record.id : 0
        )
      createMatikaRecord.kunty_id = parseInt( record.kunty_id ) > 0 
        ? parseInt( record.kunty_id ) 
        : (
          record.type == 'kunty' ? record.id : 0
        )
      createMatikaRecord.id = 0
      createMatikaRecord.number = "" 
      createMatikaRecord.title = "" 
      createMatikaModal.show = true
    }

    const updateMatikaModal = reactive({show:false})
    const editMatikaId = ref(0)
    function closeUpdateMatika( updatedRecord ){
      console.log( updatedRecord )
      if( updatedRecord.status > 0 ) {
        if( currentSelectedRecord.value != null ) {
          let matika = currentSelectedRecord.value.matikas.find( (m) =>  {
            return updatedRecord.record.id == m.id
          })
          if( matika != undefined ){
            matika.title = updatedRecord.record.title
            matika.number = updatedRecord.record.number
          }
        }
        getContent()
      }
      updateMatikaModal.show = false
    }
    function openUpdateMatika(matika){
      editMatikaId.value = matika.id
      updateMatikaModal.show = true
    } 
    
    /**
     * Chapter Section
     */
     const createChapterModal = reactive({show:false})
    const createChapterRecord = reactive({
      id: 0 ,
      number: '' ,
      title: '' ,
      meaning: '' ,
      book_id: 0 ,
      kunty_id: 0 ,
      matika_id: 0 
    })
    
    function closeCreateChapter( createdRecord ){
      console.log( createdRecord )
      if( createdRecord.status > 0 ) {
        if( currentSelectedRecord.value != null ) {
          currentSelectedRecord.value.chapters.push( createdRecord.record )
        }
        getContent()
      }
      createChapterModal.show = false
    }

    function openCreateChapter( record ){
      createChapterRecord.book_id = parseInt( record.book_id ) > 0 
        ? parseInt( record.book_id ) 
        : (
          record.type == 'book' ? record.id : 0
        )
      createChapterRecord.kunty_id = parseInt( record.kunty_id ) > 0 
        ? parseInt( record.kunty_id ) 
        : (
          record.type == 'kunty' ? record.id : 0
        )
      createChapterRecord.matika_id = parseInt( record.matika_id ) > 0 
        ? parseInt( record.matika_id ) 
        : (
          record.type == 'matika' ? record.id : 0
        )
      createChapterRecord.id = 0
      createChapterRecord.number = "" 
      createChapterRecord.title = "" 
      createChapterModal.show = true
    }

    const updateChapterModal = reactive({show:false})
    const editChapterId = ref(0)
    function closeUpdateChapter( updatedRecord ){
      console.log( updatedRecord )
      if( updatedRecord.status > 0 ) {
        if( currentSelectedRecord.value != null ) {
          let chapter = currentSelectedRecord.value.chapters.find( (m) =>  {
            return updatedRecord.record.id == m.id
          })
          if( chapter != undefined ){
            chapter.title = updatedRecord.record.title
            chapter.number = updatedRecord.record.number
          }
        }
        getContent()
      }
      updateChapterModal.show = false
    }
    function openUpdateChapter(chapter){
      editChapterId.value = chapter.id
      updateChapterModal.show = true
    } 

    /**
     * Part Section
     */
    const createPartModal = reactive({show:false})
    const createPartRecord = reactive({
      id: 0 ,
      number: '' ,
      title: '' ,
      meaning: '' ,
      book_id: 0 ,
      kunty_id: 0 ,
      matika_id: 0 ,
      chapter_id: 0
    })
    
    function closeCreatePart( createdRecord ){
      console.log( createdRecord )
      if( createdRecord.status > 0 ) {
        getContent()
      }
      createPartModal.show = false
    }

    function openCreatePart( record ){
      createPartRecord.book_id = parseInt( record.book_id ) > 0 
        ? parseInt( record.book_id ) 
        : (
          record.type == 'book' ? record.id : 0
        )
      createPartRecord.kunty_id = parseInt( record.kunty_id ) > 0 
        ? parseInt( record.kunty_id ) 
        : (
          record.type == 'kunty' ? record.id : 0
        )
      createPartRecord.matika_id = parseInt( record.matika_id ) > 0 
        ? parseInt( record.matika_id ) 
        : (
          record.type == 'matika' ? record.id : 0
        )
      createPartRecord.chapter_id = parseInt( record.chapter_id ) > 0 
        ? parseInt( record.chapter_id ) 
        : (
          record.type == 'chapter' ? record.id : 0
        )
      createPartRecord.id = 0
      createPartRecord.number = "" 
      createPartRecord.title = "" 
      createPartRecord.meaning = "" 
      createPartModal.show = true
    }

    const updatePartModal = reactive({show:false})
    const editPartId = ref(0)
    function closeUpdatePart( updatedRecord ){
      console.log( updatedRecord )
      if( updatedRecord.status > 0 ) {
        getContent()
      }
      updatePartModal.show = false
    }
    function openUpdatePart(matra){
      editPartId.value = matra.id
      updatePartModal.show = true
    } 

    /**
     * Section Section
     */
     const createSectionModal = reactive({show:false})
    const createSectionRecord = reactive({
      id: 0 ,
      number: '' ,
      title: '' ,
      meaning: '' ,
      book_id: 0 ,
      kunty_id: 0 ,
      matika_id: 0 ,
      chapter_id: 0 ,
      part_id : 0
    })
    
    function closeCreateSection( createdRecord ){
      console.log( createdRecord )
      if( createdRecord.status > 0 ) {
        getContent()
      }
      createSectionModal.show = false
    }

    function openCreateSection( record ){
      createSectionRecord.book_id = parseInt( record.book_id ) > 0 
        ? parseInt( record.book_id ) 
        : (
          record.type == 'book' ? record.id : 0
        )
      createSectionRecord.kunty_id = parseInt( record.kunty_id ) > 0 
        ? parseInt( record.kunty_id ) 
        : (
          record.type == 'kunty' ? record.id : 0
        )
      createSectionRecord.matika_id = parseInt( record.matika_id ) > 0 
        ? parseInt( record.matika_id ) 
        : (
          record.type == 'matika' ? record.id : 0
        )
      createSectionRecord.chapter_id = parseInt( record.chapter_id ) > 0 
        ? parseInt( record.chapter_id ) 
        : (
          record.type == 'chapter' ? record.id : 0
        )
      createSectionRecord.part_id = parseInt( record.part_id ) > 0 
        ? parseInt( record.part_id ) 
        : (
          record.type == 'part' ? record.id : 0
        )
      createSectionRecord.id = 0
      createSectionRecord.number = "" 
      createSectionRecord.title = "" 
      createSectionRecord.meaning = "" 
      createSectionModal.show = true
    }

    const updateSectionModal = reactive({show:false})
    const editSectionId = ref(0)
    function closeUpdateSection( updatedRecord ){
      if( updatedRecord.status > 0 ) {
        getContent()
      }
      updateSectionModal.show = false
    }
    function openUpdateSection(matra){
      editSectionId.value = matra.id
      updateSectionModal.show = true
    } 

    /**
     * Matra Section
     */
     const createMatraModal = reactive({show:false})
    const createMatraRecord = reactive({
      id: 0 ,
      number: '' ,
      title: '' ,
      meaning: '' ,
      book_id: 0 ,
      kunty_id: 0 ,
      matika_id: 0 ,
      chapter_id: 0 ,
      part_id : 0 ,
      section_id : 0
    })
    
    function closeCreateMatra( createdRecord ){
      console.log( createdRecord )
      if( createdRecord.status > 0 ) {
        getContent()
      }
      createMatraModal.show = false
    }

    function openCreateMatra( record ){
      createMatraRecord.book_id = parseInt( record.book_id ) > 0 
        ? parseInt( record.book_id ) 
        : (
          record.type == 'book' ? record.id : 0
        )
      createMatraRecord.kunty_id = parseInt( record.kunty_id ) > 0 
        ? parseInt( record.kunty_id ) 
        : (
          record.type == 'kunty' ? record.id : 0
        )
      createMatraRecord.matika_id = parseInt( record.matika_id ) > 0 
        ? parseInt( record.matika_id ) 
        : (
          record.type == 'matika' ? record.id : 0
        )
      createMatraRecord.chapter_id = parseInt( record.chapter_id ) > 0 
        ? parseInt( record.chapter_id ) 
        : (
          record.type == 'chapter' ? record.id : 0
        )
      createMatraRecord.part_id = parseInt( record.part_id ) > 0 
        ? parseInt( record.part_id ) 
        : (
          record.type == 'part' ? record.id : 0
        )
      createMatraRecord.section_id = parseInt( record.section_id ) > 0 
        ? parseInt( record.section_id ) 
        : (
          record.type == 'section' ? record.id : 0
        )
      createMatraRecord.id = 0
      createMatraRecord.number = "" 
      createMatraRecord.title = "" 
      createMatraRecord.meaning = "" 
      createMatraModal.show = true
    }

    const updateMatraModal = reactive({show:false})
    const editMatraId = ref(0)
    function closeUpdateMatra( updatedRecord ){
      console.log( updatedRecord )
      if( updatedRecord.status > 0 ) {
        getMatras()
      }
      updateMatraModal.show = false
    }
    function openUpdateMatra(matra){
      editMatraId.value = matra.id
      updateMatraModal.show = true
    } 
    
    /**
     * Matra Retreiving
     */
    const table = reactive( {
      loading: false , 
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          number: '' ,
          title: '' ,
          meaning: ''
        },
        format: {
          id: 0 ,
          number: '' ,
          title: '' ,
          meaning: '' ,
          kunthy: '' ,
          chapter: '' ,
          part: '' ,
          section: ''
        }
      } ,
      pagination: {
        perPage: 20 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })

    const filterPanel = ref(false)

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

    function getMatras(){
      console.log( currentSelectedRecord.value )
      /**
       * Clear time interval after calling
       */
      table.loading = true
      table.records.all = table.records.matched = []
      store.dispatch('matra/list',{
        book_id: book.value.id ,
        kunty_id: 
          currentSelectedRecord.value == null
            ? 0
            : (
              parseInt( currentSelectedRecord.value.kunty_id ) > 0 
                ? parseInt( currentSelectedRecord.value.kunty_id ) 
                : (
                  currentSelectedRecord.value.type == 'kunty'
                    ? currentSelectedRecord.value.id
                    : 0
                )
            ),
        matika_id: 
          currentSelectedRecord.value == null
            ? 0
            : (
              parseInt( currentSelectedRecord.value.matika_id ) > 0 
                ? parseInt( currentSelectedRecord.value.matika_id ) 
                : (
                  currentSelectedRecord.value.type == 'matika'
                    ? currentSelectedRecord.value.id
                    : 0
                )
            ),
        chapter_id:  
          currentSelectedRecord.value == null
            ? 0
            : (
              parseInt( currentSelectedRecord.value.chapter_id ) > 0 
                ? parseInt( currentSelectedRecord.value.chapter_id ) 
                : (
                  currentSelectedRecord.value.type == 'chapter'
                    ? currentSelectedRecord.value.id
                    : 0
                )
            ),
        part_id: 
          currentSelectedRecord.value == null
            ? 0
            : (
              parseInt( currentSelectedRecord.value.part_id ) > 0 
                ? parseInt( currentSelectedRecord.value.part_id ) 
                : (
                  currentSelectedRecord.value.type == 'part'
                    ? currentSelectedRecord.value.id
                    : 0
                )
            ),
        section_id: 
          currentSelectedRecord.value == null
            ? 0
            : (
              parseInt( currentSelectedRecord.value.section_id ) > 0 
                ? parseInt( currentSelectedRecord.value.section_id ) 
                : (
                  currentSelectedRecord.value.type == 'section'
                    ? currentSelectedRecord.value.id
                    : 0
                )
            ),
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
        store.commit('matra/setRecords', res.data.records )
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        
        var paginationNumberList = 10
        if( ( table.pagination.page - ( parseInt( paginationNumberList / 2 ) + 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > paginationNumberList ? paginationNumberList : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page - parseInt( paginationNumberList / 2 )
          table.pagination.end = table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + parseInt( paginationNumberList / 2 )
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
    function first(){
      goTo( table.pagination.page > 0 ? 1 : 0)
    }
    function last(){
      goTo( table.pagination.totalPages > 0 ? table.pagination.totalPages : 1 )
    }
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getMatras()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getMatras()
    }
    const paginationButtons = computed(()=>{
      /**
       * 9 Buttons is recommended
       */
      return table.pagination.totalPages ? table.pagination.totalPages : 0
    })

    /**
     * Initial function of the modal 
     */
    function initial(){
      getContent()
    }

    return {
      /**
       * Variables
       */
      book ,
      structure ,
      currentSelectedRecord ,
      startOfContent ,
      table ,
      /**
       * Functions
       */
      initial ,
      clearRecord ,
      maskOrEscClick ,
      setMatras ,
      setBook ,
      /**
       * Pagination
       */
      filterRecords ,
      goTo ,
      first ,
      previous ,
      last ,
      next ,
      /**
       * Kunty function
       */
      createKuntyRecord ,
      updateKuntyModal ,
      createKuntyModal ,
      editKuntyId ,
      closeUpdateKunty ,
      openUpdateKunty ,
      closeCreateKunty ,
      openCreateKunty ,
      /**
       * Matika function
       */
      createMatikaRecord ,
      updateMatikaModal ,
      createMatikaModal ,
      editMatikaId ,
      closeUpdateMatika ,
      openUpdateMatika ,
      closeCreateMatika ,
      openCreateMatika ,
      /**
       * Chapter function
       */
      createChapterRecord ,
      updateChapterModal ,
      createChapterModal ,
      editChapterId ,
      closeUpdateChapter ,
      openUpdateChapter ,
      closeCreateChapter ,
      openCreateChapter ,
      /**
       * Part function
       */
      createPartRecord ,
      updatePartModal ,
      createPartModal ,
      editPartId ,
      closeUpdatePart ,
      openUpdatePart ,
      closeCreatePart ,
      openCreatePart ,
      /**
       * Section function
       */
      createSectionRecord ,
      updateSectionModal ,
      createSectionModal ,
      editSectionId ,
      closeUpdateSection ,
      openUpdateSection ,
      closeCreateSection ,
      openCreateSection ,
      /**
       * Matra function
       */
       createMatraRecord ,
      updateMatraModal ,
      createMatraModal ,
      editMatraId ,
      closeUpdateMatra ,
      openUpdateMatra ,
      closeCreateMatra ,
      openCreateMatra 
    }
  }
}
</script>
<style type="text/css" scoped >
  .vcb-table-pagination {
    @apply  mr-0 p-0 border-none bg-white;
  }
</style>