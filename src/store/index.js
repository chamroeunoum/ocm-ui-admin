import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import countesy from './modules/countesy'
import user from './modules/user'

import people from './modules/people/people'
import certificate from './modules/people/certificate'
import niccertificate from './modules/people/niccertificate'
import passport from './modules/people/passport'
import birthcertificate from './modules/people/birthcertificate'
import achievement from './modules/people/achievement'
import weddingcertificate from './modules/people/weddingcertificate'
import childcertificate from './modules/people/childcertificate'
import spokenlanguage from './modules/people/spokenlanguage'

import officer from './modules/officer'
import officerjobbackground from './modules/officer/officerjobbackground'
import officerrankbycertificate from './modules/officer/officerrankbycertificate'
import officerrankbyworking from './modules/officer/officerrankbyworking'
import officerpendingwork from './modules/officer/officerpendingwork'
import officermedalhistory from './modules/officer/officermedalhistory'
import officerpenaltyhistory from './modules/officer/officerpaneltyhistory'
import rank from './modules/officer/rank'

import room from './modules/room'
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

// Location
import province from './modules/location/province'
import district from './modules/location/district'
import commune from './modules/location/commune'
import village from './modules/location/village'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    // apiServer: 'http://127.0.0.1:8000/api/admin' ,
    // apiServer: 'https://apis.ocm.gov.kh/api/admin' ,
    organization: {
      name: 'អគ្គនាយកដ្ឋានបដិវត្តកម្មឌីជីថល'
    },
    system: {
      name: 'អង្គភាពចំណុះទីស្ដីការគណៈរដ្ឋមន្ត្រី'
    },
    company: {
      name: 'អគ្គនាយកដ្ឋានបដិវត្តកម្មឌីជីថល'
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
    // People
    people,
    certificate ,
    niccertificate ,
    birthcertificate ,
    achievement ,
    passport,
    weddingcertificate ,
    childcertificate ,
    spokenlanguage ,
    // 
    officer,
    officerjobbackground ,
    officerrankbycertificate ,
    officerrankbyworking ,
    officerpendingwork ,
    officermedalhistory ,
    officerpenaltyhistory ,
    rank ,
    // 
    room ,
    folder ,
    role ,
    orgchart ,
    organizations ,
    position ,
    attendant ,
    task ,
    // Province , District , Commune , Village
    province ,
    district ,
    commune ,
    village ,
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
