import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import folder from './modules/folder'
import role from './modules/role'
import regulator from './modules/regulator/regulator'
import orgchart from './modules/orgchart'
import regulatorType from './modules/regulator/type'
// import client from './modules/client'
// import staff from './modules/staff'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    // apiServer: 'http://127.0.0.1:8000/api/admin' ,
    apiServer: 'http://edocservice.sctthaicambodia.com/api/admin'
  },
  modules: {
    // product ,
    auth,
    user,
    folder ,
    role ,
    orgchart,
    /**
     * Regulator Section
     */
    regulator,
    "regulatorType" : regulatorType ,
    // client,
    // staff
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})
