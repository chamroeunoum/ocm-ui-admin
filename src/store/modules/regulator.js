import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "regulators" ,
    title: "លិខិតបទដ្ឋានគតិយុត្ត" 
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
    return await crud.list(rootState.apiServer+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        signatures: params.signatures ,
        types: params.types ,
        organizations: params.organizations
      }).toString()
    )
  },
  async childList ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name + "/child?" + new URLSearchParams({
        // unit: params.unit ,
        // date: params.date ,
        // number: params.number ,
        // type: params.type ,
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        parent_id : params.parent_id
      }).toString()
    )
  },
  async matras ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name +"/"+params.regulator_id + "/matras?" + new URLSearchParams(params).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id)
  },
  async kunty ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/kunties")
  },
  async matika ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/matikas")
  },
  async matikasByKunty ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/kunties/"+params.id+"/matikas")
  },
  async chaptersByMatika ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/matikas/"+params.id+"/chapters")
  },
  async chaptersByKunty ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/kunties/"+params.id+"/chapters")
  },
  async partsByChapter ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/chapters/"+params.id+"/parts")
  },
  async sectionsByPart ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/parts/"+params.id+"/sections")
  },
  async structure ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/structure")
  },
  async compact ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name + "/compact" + ( params !== undefined ? "?" + new URLSearchParams({
      page: params.page ,
      perPage : params.perPage ,
      search: params.search ,
    }).toString(): ""))
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name,params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name,params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(rootState.apiServer+"/"+state.model.name,params)
  },
  async activate ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+'/'+params.id+'/activate',{})
  },
  async deactivate ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+'/'+params.id+'/deactivate',{})
  },
  async publish ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+'/'+params.id+'/publish',{})
  },
  async unpublish ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+'/'+params.id+'/unpublish',{})
  },
  async updateAccessibility ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+'/'+params.id+'/accessibility',{mode: params.mode})
  },
  async childDocument ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/orgchart",{
      parent_id : params.parent_id ,
      document_id : params.document_id ,
      name: params.name ,
      document_parent_id : params.document_parent_id ,
      desc: params.desc ,
      image: params.image
    })
  },
  async getChildDocument ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/orgchart")
  },
  async updateDocument ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/orgchart",{
      id : params.id ,
      parent_id : params.parent_id ,
      document_id : params.document_id ,
      name: params.name ,
      document_parent_id : params.document_parent_id ,
      desc: params.desc ,
      image: params.image
    })
  },
  // async updateDocument ({ state, commit, rootState },params) {
  //   return await crud.update(rootState.apiServer+"/orgchart/linkdocument",{
  //     id : params.id ,
  //     document_id : params.document_id 
  //   })
  // },
  async pdf ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/pdf?id="+params.id)
  },
  async upload({ state, commit, rootState },formData) {
    // return await crud.upload(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/upload",{pdfs: params.pdfs})
    return await crud.upload(rootState.apiServer+"/"+state.model.name+"/upload",formData)
  },
  async addReader ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/addreader",{
      user_id : params.user_id ,
      document_id : params.document_id 
    })
  },
  async removeReader ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/removereader",{
      user_id : params.user_id ,
      document_id : params.document_id 
    })
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