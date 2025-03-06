import path from 'path'
// export default {
//   install(app, options = {}) {
//     const baseUrl = import.meta.url 
//     app.config.globalProperties.$assets = ( pathToFile ) => {
//       return new URL(pathToFile, baseUrl).pathname
//     }
//   }
// }
export default {
  install(app, options = {}) {
    const baseUrl = import.meta.url 
    app.config.globalProperties.$getImageUrl = ( pathToFile ) => {
      return path.resolve(__dirname, '../images/') + pathToFile
    }
  }
}