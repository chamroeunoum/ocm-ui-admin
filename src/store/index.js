import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import countesy from './modules/countesy'
import user from './modules/user'
import people from './modules/people'
import folder from './modules/folder'
import error from './modules/error'
import role from './modules/role'
import regulator from './modules/regulator'
import orgchart from './modules/orgchart'
import organizations from './modules/organization'
import position from './modules/position'
import regulatorType from './modules/law/type'
import regulatorOrganization from './modules/law/organization'
import regulatorSignature from './modules/law/signature'
import attendant from './modules/attendant'
import task from './modules/task'
/**
 * Law
 */
import law from './modules/law/book'
import kunty from './modules/law/kunty'
import matika from './modules/law/matika'
import chapter from './modules/law/chapter'
import part from './modules/law/part'
import section from './modules/law/section'
import matra from './modules/law/matra'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  // state: {
  //   apiServer: 'https://edoc.onetechcambodia.com/api/admin' ,
  //   organization: {
  //     name: 'បច្ចេកវិទ្យាតែមួយនៃកម្ពុជា'
  //   },
  //   system: {
  //     name: 'ផ្នែករដ្ឋបាលប្រព័ន្ធ'
  //   },
  //   company: {
  //     name: 'បច្ចេកវិទ្យាតែមួយនៃកម្ពុជា'
  //   }
  // },
  state: {
    apiServer: 'http://127.0.0.1:8000/api/admin' ,
    // apiServer: 'https://apis.ocm.gov.kh/api/admin' ,
    organization: {
      name: 'អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ'
    },
    system: {
      name: 'អង្គភាពចំណុះទីស្ដីការគណៈរដ្ឋមន្ត្រី'
    },
    company: {
      name: 'អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ'
    }
  },
  modules: {
    // product ,
    auth,
    // Law modules 
    law,
    kunty ,
    matika ,
    chapter ,
    part ,
    section ,
    matra ,
    // End law modules
    countesy ,
    user,
    people,
    folder ,
    role ,
    orgchart ,
    organizations ,
    position ,
    attendant ,
    task ,
    /**
     * Regulator Section
     */
    regulator,
    "regulatorType" : regulatorType ,
    "regulatorOrganization" : regulatorOrganization ,
    "regulatorSignature" : regulatorSignature ,
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
