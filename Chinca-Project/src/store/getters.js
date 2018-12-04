const getters = {
  showUserInfo: state => {
    return state.account
  },
  showData: state => {
    return state.data
  },
  scoreData: state => {
    return state.scoreData
  },
  ordinaryInvoiceInfo: state => {
    return state.ordinaryInvoiceInfo
  },
  specialInvoiceInfo: state => {
    return state.specialInvoiceInfo
  }
}

export default getters
