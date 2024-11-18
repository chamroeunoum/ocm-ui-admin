import crud from '../../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "books" ,
    title: "សៀវភៅច្បាប់" 
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
    return await crud.list(import.meta.env.VITE_API_SERVER+'/law/'+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+"/"+params.id+"/read")
  },
  async content ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+"/"+params.id+'/content')
  },
  async matika ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+"/"+params.id+"/matikas")
  },
  async chapter ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+"/"+params.id+"/chapters")
  },
  async compact ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name + "/compact" + ( params !== undefined ? "?" + new URLSearchParams({
      page: params.page ,
      perPage : params.perPage ,
      search: params.search ,
      regulator_id: params.regulator_id
    }).toString(): ""))
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name,params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name,params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+"/"+params.id)
  },
  async upload({ state, commit, rootState },formData) {
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+"/upload",formData)
  },
  async pdf ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/pdf?id="+params.id)
  },
  async activate ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+'/'+params.id+'/activate')
  },
  async deactivate ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+'/'+params.id+'/deactivate')
  },
  async complete ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+'/'+params.id+'/complete')
  },
  async uncomplete ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+'/'+params.id+'/uncomplete')
  },
  async toggleReferences ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name+'/references',params)
  },
  async getRegulators ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/law/"+state.model.name + "/regulators?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        signatures: params.signatures ,
        types: params.types ,
        organizations: params.organizations
      }).toString()
    )
  },
}

// mutations
const mutations = {
  // increment (state) {
  //   // `state` is the local module state
  //   state.count++
  // }
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}