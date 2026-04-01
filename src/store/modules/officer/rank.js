import crud from '../../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "ranks" ,
    title: "ឋានន្តរស័ក្កិ និងថ្នាក់" 
  },
  groups: [] ,
  records: [] ,
  record: null ,

})

// getters
const getters = {
  getGroups (state, getters, rootState) {
    return state.groups
  },
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
  }
}

// mutations
const mutations = {
  setGroups (state, records) {
    state.groups = records
  },
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