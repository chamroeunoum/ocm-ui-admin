import crud from '../../api/crud'

// initial state
const state = () => ({
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
    return await crud.list(import.meta.env.VITE_API_SERVER+"/package",params)
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/package/"+params.id)
  },
  async get ({ state, commit, rootState },params) {
    return await crud.get(import.meta.env.VITE_API_SERVER+"/package/"+params.id+'/public')
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/package/create",params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/package/update",params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/package/"+params.id)
  }
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