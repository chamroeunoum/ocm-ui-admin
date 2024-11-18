import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "rooms" ,
    title: "បន្ទប់" 
  },
  records: [] ,
  record: null ,

})

// getters
const getters = {
  getRecords (state, getters, rootState) {
    return state.records
  },
  getRecord (state, getters, rootState) {
    return state.record
  }
}

// actions
const actions = {
  async list ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+'/read')
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/create",params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/update",params)
  },
  async activate({state, commit, rootState}, params){
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/activate",params)
  },
  async upload({ state, commit, rootState },formData) {    
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/upload",formData)
  },
  async toggleActive({state, commit, rootState}, params){
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/toggleactive",params)
  },
  async uploadPicture({ state, commit, rootState },formData) {
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/upload/picture",formData)
  },
  async uploadPdf({ state, commit, rootState },formData) {
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/upload/pdf",formData)
  },
  async pdf ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/pdf?id="+params.id)
  },
}

// mutations
const mutations = {
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}