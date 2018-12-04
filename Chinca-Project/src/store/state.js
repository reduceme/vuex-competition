const state = {
  show: false,
  account: null,
  data: [],
  orderId: null,
  scoreModalShow: false,
  scoreOrderId: null,
  invoiceModalShow: false,
  ordinaryInvoiceInfo: {
    invoice: '',
    tax: '',
    commodity: '',
    name: '',
    phoneNum: '',
    province: '',
    city: '',
    area: '',
    detailArea: ''
  },
  specialInvoiceInfo: {
    invoice: '',
    tax: '',
    registeredLocal: '',
    registeredTel: '',
    bankNum: '',
    commodity: '',
    name: '',
    province: '',
    city: '',
    area: '',
    detailArea: ''
  }
}

export default state
