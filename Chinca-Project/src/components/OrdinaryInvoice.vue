<template>
  <div class="ordinary-invoice-content">
    <div class="line">
      <span class="title">发票抬头：</span>
      <el-input v-model.trim="info.invoiceHead" placeholder="请输入发票抬头"></el-input>
    </div>
    <div class="line">
      <span class="title">税号：</span>
      <el-input v-model.trim="info.taxNumber" placeholder="请输入税号"></el-input>
    </div>
    <div class="line">
      <span class="title">开票商品名称：</span>
      <el-radio v-model="info.commodityName" label="咨询服务">咨询服务</el-radio>
      <el-radio v-model="info.commodityName" label="技术咨询服务">技术咨询服务</el-radio>
    </div>
    <div class="line">
      <span class="title">收件人：</span>
      <el-input v-model.trim="info.receiveUser" placeholder="请输入收件人"></el-input>
    </div>
    <div class="line">
      <span class="title">联系电话：</span>
      <el-input v-model="info.telephone" placeholder="请输入联系电话" type="number"></el-input>
    </div>
    <div class="line">
      <span class="title">地址：</span>
      <v-distpicker @selected="onSelected" :province="info.province" :city="info.city" :area="info.area"></v-distpicker>
    </div>
    <div class="line">
      <span class="title"></span>
      <el-input placeholder="请输入详细地址" v-model="info.addressDetails"></el-input>
    </div>
    <div class="el-dialog__body" style="text-align: right">
      <el-button type="primary" @click.native="addInvoice">确 定</el-button>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import QS from 'qs'
export default {
  name: 'OrdinaryInvoice',
  components: { VDistpicker },
  data () {
    return {
      info: {
        invoiceHead: '',
        taxNumber: '',
        commodityName: '',
        receiveUser: '',
        telephone: '',
        province: '',
        city: '',
        area: '',
        addressDetails: ''
      },
      invoiceId: ''
    }
  },
  methods: {
    onSelected (data) {
      this.info.province = data.province.value
      this.info.city = data.city.value
      this.info.area = data.area.value
    },
    addInvoice () {
      let flag = true
      for (let i in this.info) {
        if (this.info[i] === '') {
          flag = false
          break
        }
      }
      let account = JSON.parse(localStorage.getItem('storage_userInfo_')).mbAccount
      let url = this.invoiceId === '' ? '/member/add_invoice' : '/member/update_invoice'
      if (flag) {
        this.$ajax.post(url, QS.stringify({
          invoiceHead: this.info.invoiceHead,
          taxNumber: this.info.taxNumber,
          commodityName: this.info.commodityName,
          receiveUser: this.info.receiveUser,
          telephone: this.info.telephone,
          province: this.info.province,
          city: this.info.city,
          area: this.info.area,
          addressDetails: this.info.addressDetails,
          mbAccount: account,
          id: this.invoiceId
        })).then(response => {
          if (response.data.message === 'success') {
            this.$message({
              message: '添加增值税普通发票信息成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '添加增值税普通发票信息失败',
              type: 'error'
            })
          }
        }).catch(response => {
          this.$message({
            message: '添加增值税普通发票信息失败',
            type: 'error'
          })
        })
      } else {
        this.$message({
          message: '请完善增值税普通发票信息后再提交',
          type: 'error'
        })
      }
    },
    getInvoice () {
      this.$ajax.get('/member/get_invoice_info').then(response => {
        this.invoiceId = (response.data.id || '')
        for (let i in this.info) {
          this.info[i] = response.data[i]
        }
      }).catch(response => {
      })
    }
  },
  mounted () {
    this.getInvoice()
  }
}
</script>

<style lang="scss">
.ordinary-invoice-content{
  .line {
    height: 50px;
    line-height: 50px;
  }
  .title {
    display: inline-block;
    width: 120px;
  }
  .el-input{
    width: 75%;
  }
  .distpicker-address-wrapper{
    display: inline-block;
    width: 75%;
  }
  .distpicker-address-wrapper select{
    width: 32%;
  }
}
</style>
