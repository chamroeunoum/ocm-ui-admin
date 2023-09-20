import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "organizations" ,
    title: "អង្គភាព" 
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
    return await crud.list(rootState.apiServer+"/"+state.model.name 
    + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        id: params.id
      }).toString()
    )
  },
  async compact ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name + "/compact" + ( params !== undefined ? "?" + new URLSearchParams({
      search: params.search ,
    }).toString(): ""))
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/read')
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/create",params)
  },
  async addchild ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/addchild",params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/update",params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/delete")
  },
  async activate({state, commit, rootState}, params){
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/activate",params)
  },
  async regulators ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/regulators"+ "?" + new URLSearchParams({
      folder_id: params.id ,
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  async users ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/staffs"+ "?" + new URLSearchParams({
      folder_id: params.id ,
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  
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