import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueQrcodeReader from "vue3-qrcode-reader";
import VueExcelEditor from 'vue3-excel-editor'

import NaiveUI from 'naive-ui'

import KhmerNumber from './plugins/KhmerNumber.js'
import Assets from './plugins/Assets.js'

import App from './App.vue'

import "tailwindcss/tailwind.css"

import "./app.css"

import store from './store'

import router from './router.js'

import HtmlToPaper from "./plugins/htmltopeper.js";

const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in
  console.log( 'App Vue Error Handler' )
  console.log( err )
  console.log( vm )
  console.log( info )
}

window.onerror = function(message, source, lineno, colno, error) {
  // TODO: write any custom logic or logs the error
  console.log( 'Window error : ' )
  console.log( message )
  console.log( source )
  console.log( lineno )
  console.log( colno )
  console.log( error )
};


// app.config.warnHandler = function(msg, vm, trace) {
//   // `trace` is the component hierarchy trace
// }

// app.config.globalProperties.apiServer = 'http://192.168.1.42:8000/api'

app.use(pinia)
app.use(store)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios) 
app.use(VueQrcodeReader)
app.use(router)
app.use(NaiveUI)
app.use(KhmerNumber)
app.use(Assets)
app.use(VueExcelEditor)
app.use(HtmlToPaper)
app.mount('#app')