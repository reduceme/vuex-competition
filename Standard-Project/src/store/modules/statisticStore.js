const state = {
  pageInfo: {
    pageSize: 20,
    currentPage: 1,
    memberName: '',
    phoneNumber: '',
    memberStatus: '1'
  }
}

const mutations = {
  getPageInfo (state, payload) {
    state.pageInfo.pageSize = payload.pageSize
    state.pageInfo.currentPage = payload.currentPage
    state.pageInfo.memberName = payload.memberName
    state.pageInfo.phoneNumber = payload.phoneNumber
    state.pageInfo.memberStatus = payload.memberStatus
  }
}

export default {
  state,
  mutations
}
