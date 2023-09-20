import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import folder from './modules/folder'
import error from './modules/error'
import role from './modules/role'
import regulator from './modules/regulator/regulator'
import orgchart from './modules/orgchart'
import organizations from './modules/organization'
import position from './modules/position'
import regulatorType from './modules/regulator/type'
import regulatorOrganization from './modules/regulator/organization'
import regulatorSignature from './modules/regulator/signature'
// import client from './modules/client'
// import staff from './modules/staff'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {

    apiServer: 'http://127.0.0.1:8000/api/admin' ,
    // apiServer: 'http://192.168.200.101:8000/api/admin' ,
    // apiServer: 'http://edocservice.sctthaicambodia.com/api/admin'
    // apiServer: 'https://ns2.ocm.gov.kh/api/admin' ,
    // apiServer: 'http://192.168.31.89:8000/api/admin' ,
    organization: {
      name: 'អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ'
    },
    system: {
      name: 'ប្រព័ន្ធគ្រប់គ្រងអង្គភាព ចំណុះទីស្ដីការគណៈរដ្ឋមន្ត្រី'
    }

  },
  modules: {
    // product ,
    auth,
    user,
    folder ,
    role ,
    orgchart ,
    organizations ,
    position ,
    /**
     * Regulator Section
     */
    regulator,
    "regulatorType" : regulatorType ,
    "regulatorOrganization" : regulatorOrganization ,
    "regulatorSignature" : regulatorSignature ,
    // client,
    // staff
    error
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})
