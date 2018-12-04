<template>
  <div>
    <el-dialog
      :title="modalCtrl.modalTitle"
      :visible.sync="dialogVisible"
      width="580px"
      :show-close="false"
      :close-on-click-modal="false">
      <el-form ref="formData" :model="formData" label-width="100px">
        <el-form-item class="require-content" label="邮箱：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请输入邮箱"
            v-model="popoverFlag.phoneFlag">
            <el-autocomplete
              style="width: 100%"
              slot="reference"
              class="inline-input"
              v-model="formData.email"
              :fetch-suggestions="getEmailInfo"
              placeholder="请输入邮箱"
              :trigger-on-focus="false"
              @select="handleSelect"
              :disabled="modalCtrl.notAllowedPhone"
            ></el-autocomplete>
          </el-popover>
        </el-form-item>
        <el-form-item label="会员名称：">
          <el-input :disabled="modalCtrl.notAllowedName" placeholder="请输入会员名称" v-model="formData.memberName"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-input :disabled="modalCtrl.notAllowedCompany" placeholder="请输入公司名称"
                    v-model="formData.companyName"></el-input>
        </el-form-item>
        <el-form-item class="require-content" label="转账账号：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请填写转账账号"
            v-model="popoverFlag.account">
            <el-input slot="reference" @keyup.native="popoverHide" placeholder="请输入转账账号"
                      v-model="formData.account"></el-input>
          </el-popover>
        </el-form-item>
        <el-form-item class="require-content" label="增加积分：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请填写积分"
            v-model="popoverFlag.integral">
            <el-input slot="reference" @keyup.native="popoverHide" placeholder="请输入积分"
                      v-model="formData.integral"></el-input>
          </el-popover>
        </el-form-item>
        <el-form-item class="require-content" label="充值金额：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请填写金额"
            v-model="popoverFlag.money">
            <!-- <el-input slot="reference" @keyup.native="popoverHide" placeholder="请输入金额" v-model="formData.money">
            </el-input> -->
          </el-popover>
            <el-select v-model="formData.money" clearable placeholder="选择金额：" style="width:95%" @change="formData.integral=formData.money/10">
              <el-option :key="item.money" v-for="item in moneyList" :label="item.count" :value="item.money"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="require-content" label="备注：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请填写备注"
            v-model="popoverFlag.remark">
            <el-input slot="reference" @keyup.native="popoverHide" type="textarea" placeholder="请输入内容……"
                      v-model="formData.remark"></el-input>
          </el-popover>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="closeModal">取 消</el-button>
        <el-button type="primary" @click.native="addNewMember">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from 'axios'
import QS from 'qs'
import { Message } from 'element-ui'
export default {
  name: 'add-member-or-integral',
  props: {
    dialogVisible: Boolean,
    modalCtrl: Object
  },
  data () {
    return {
      popoverFlag: {
        phoneFlag: false,
        integral: false,
        money: false,
        remark: false,
        account: false
      },
      localDialogVisible: this.dialogVisible,
      formData: {
        phoneNumber: '',
        memberName: '',
        companyName: '',
        integral: '',
        money: '',
        remark: '',
        email: '',
        id: '',
        account: ''
      },
      loadAll: [],
      moneyList: [
        {
          money: 50000,
          count: "五万元"
        },
        {
          money: 80000,
          count: "八万元"
        },
        {
          money: 100000,
          count: "十万元"
        }
      ]
    }
  },
  methods: {
    addNewMember () {
      if (this.formData.email === '') {
        this.popoverFlag.phoneFlag = true
        return
      }
      if (this.formData.integral === '') {
        this.popoverFlag.integral = true
        return
      }
      if (this.formData.money === '') {
        this.popoverFlag.money = true
        return
      }
      if (this.formData.remark === '') {
        this.popoverFlag.remark = true
        return
      }
      if (this.formData.account === '') {
        this.popoverFlag.account = true
        return
      }
      this.addScoreOrMember()
    },
    closeModal () {
      this.popoverFlag.email = false
      this.popoverFlag.integral = false
      this.popoverFlag.money = false
      this.popoverFlag.remark = false
      this.localDialogVisible = false
      this.popoverFlag.account = false
      this.$emit('closeModal', this.localDialogVisible)
    },
    popoverHide () {
      this.popoverFlag.email = false
      this.popoverFlag.integral = false
      this.popoverFlag.money = false
      this.popoverFlag.remark = false
      this.popoverFlag.account = false
    },
    handleSelect (item) {
      this.formData.memberName = item.mbName
      this.formData.companyName = item.mbCompanyName
      this.formData.email = item.mbMail
    },
    getEmailInfo (queryString, cb) {
      Axios.get('/member/get_member_by_mail', {
        params: {
          email: this.formData.email,
          pageNo: 1,
          pageSize: 6
        }
      }).then((response) => {
        if (response.status === 200) {
          let loadAll = this.loadAll
          response.data.list.forEach(function (item) {
            item.value = item.mbMail
          })
          let results = (response.data.list !== []) ? response.data.list : loadAll
          // 调用 callback 返回建议列表的数据
          cb(results)
        }
      }).catch((response) => {
      })
    },
    addScoreOrMember () {
      Axios.post('/system/add_score', QS.stringify({
        account: this.formData.email,
        money: this.formData.money,
        score: this.formData.integral,
        card: this.formData.account,
        remark: this.formData.remark
      })).then(response => {
        if (response.status === 200) {
          if (response.data.message === 'success') {
            Message.success({
              message: '充值成功'
            })
            this.$parent.$parent.getTableList()
            this.closeModal()
          } else {
            Message.error({
              message: '充值失败'
            })
          }
        } else {
          Message.error({
            message: '充值失败'
          })
        }
      }).catch(response => {
        Message.error({
          message: '网络连接失败'
        })
      })
    }
  },
  mounted () {
  },
  watch: {
    // 如果 `modalCtrl` 发生改变，这个函数就会运行
    modalCtrl: {
      handler (newModalCtrl, oldModalCtrl) {
        this.formData.phoneNumber = newModalCtrl.phoneNumber
        this.formData.memberName = newModalCtrl.memberName
        this.formData.companyName = newModalCtrl.companyName
        this.formData.email = newModalCtrl.email
        this.formData.id = newModalCtrl.id
      },
      deep: true
    }
  }
}
</script>

<style>
  @import "../style/style.scss";

  .el-dialog__body .el-input {
    width: 95%;
  }
</style>
