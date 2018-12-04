const mutations = {
  showUserInfo: (state, info) => {
    state.account = info
  },
  showModal: state => {
    state.show = !state.show
  },
  showData: (state, data) => {
    state.data = data
  },
  showScoreModal: state => {
    state.scoreModalShow = !state.scoreModalShow
  },
  showInvoiceModal: state => {
    state.invoiceModalShow = !state.invoiceModalShow
  },
  updateScoreOrderId: (state, data) => {
    state.scoreOrderId = data
  }
}

export default mutations
