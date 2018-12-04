const actions = {
  showUserInfo: ({commit}, info) => {
    commit('showUserInfo', info)
  },
  showModal: ({commit}) => {
    commit('showModal')
  },
  showData: ({commit}, data) => {
    commit('showData', data)
  },
  showScoreModal: ({commit}) => {
    commit('showScoreModal')
  },
  showInvoiceModal: ({commit}) => {
    commit('showInvoiceModal')
  },
  updateScoreOrderId: ({commit}) => {
    commit('updateScoreOrderId')
  }
}

export default actions
