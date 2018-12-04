<template>
    <div class="invoice-content">
      <el-dialog
        title="发票信息"
        top="3vh"
        :visible.sync="$store.state.invoiceModalShow"
        :close-on-click-modal="false"
        width="800px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="增值税普通发票" name="first">
            <ordinary-invoice ref="ordinary"></ordinary-invoice>
          </el-tab-pane>
          <el-tab-pane label="增值税专用发票" name="second">
            <special-invoice ref="special"></special-invoice>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import OrdinaryInvoice from './OrdinaryInvoice'
import SpecialInvoice from './SpecialInvoice'
export default {
  name: 'InvoiceModal',
  components: {SpecialInvoice, OrdinaryInvoice},
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    ...mapActions([
      'ordinaryInvoiceInfo', 'specialInvoiceInfo'
    ]),
    handleClick (tab, event) {
      if (tab.$options.propsData.label === '增值税专用发票') {
        this.$refs.special.getInvoice()
      } else {
        this.$refs.ordinary.getInvoice()
      }
    },
    getInfo () {
      if ('ordinary' in this.$refs) {
        this.$refs.ordinary.getInvoice()
      }
      if ('special' in this.$refs) {
        this.$refs.special.getInvoice()
      }
    }
  }
}
</script>

<style scoped>

</style>
