<template>
  <div>
    <el-dialog
      title="会员信息编辑"
      :visible.sync="auditDialogVisible"
      width="580px"
      :show-close="false"
      :close-on-click-modal="false">
      <el-form ref="formData" :model="memberInfo" label-width="125px">
        <el-form-item class="require-content" label="姓名：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请输入姓名"
            v-model="auditPopoverFlag.memberName">
            <el-input @keyup.native="auditPopoverHide" slot="reference"
                      placeholder="请输入姓名" v-model="memberInfo.memberName"></el-input>
          </el-popover>
        </el-form-item>
        <el-form-item class="require-content" label="单位名称：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请输入单位名称"
            v-model="auditPopoverFlag.companyName">
            <el-input @keyup.native="auditPopoverHide" slot="reference"
                      placeholder="请输入单位名称" v-model="memberInfo.companyName"></el-input>
          </el-popover>
        </el-form-item>
        <!--<el-form-item label="单位电话：">
          <el-input placeholder="请输入单位电话" v-model="memberInfo.companyPhoneNumber"></el-input>
        </el-form-item>-->
        <el-form-item label="所在区域：">
          <v-distpicker :province="memberInfo.province" :city="memberInfo.city" :area="memberInfo.area"
                        @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
        </el-form-item>
        <el-form-item class="require-content" label="联系电话：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请输入联系电话"
            v-model="auditPopoverFlag.phoneNumber">
            <el-input @keyup.native="auditPopoverHide" slot="reference"
                      placeholder="请输入手机号码" v-model="memberInfo.phoneNumber"></el-input>
          </el-popover>
        </el-form-item>
        <!--<el-form-item class="require-content" label="邮箱地址：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请输入邮箱地址"
            v-model="auditPopoverFlag.email">
            <el-input @keyup.native="auditPopoverHide" slot="reference"
                      placeholder="请输入邮箱地址" v-model="memberInfo.email"></el-input>
          </el-popover>
        </el-form-item>-->
        <!--<el-form-item class="require-content" label="会员到期日期：">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="manual"
            content="请输入会员到期日期"
            v-model="auditPopoverFlag.endTime">
            <el-date-picker
              slot="reference"
              :editable="false"
              v-model="memberInfo.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              @click.native="auditPopoverHide">
            </el-date-picker>
          </el-popover>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="closeAuditModal">取 消</el-button>
        <el-button type="primary" @click.native="addAuditInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from 'axios'
import QS from 'qs'
import VDistpicker from 'v-distpicker'
import { Message } from 'element-ui'
export default {
  name: 'audit-member-info',
  components: {VDistpicker},
  props: {
    auditDialogVisible: Boolean,
    memberInfoCtrl: Object
  },
  data () {
    return {
      memberInfo: {
        memberName: '',
        companyName: '',
        // companyPhoneNumber: '',
        province: '',
        city: '',
        area: '',
        phoneNumber: '',
        email: '',
        // date: '',
        memberId: ''
      },
      localAuditDialogVisible: this.auditDialogVisible,
      auditPopoverFlag: {
        memberName: false,
        companyName: false,
        phoneNumber: false,
        // eMail: false,
        // endTime: false
      }
    }
  },
  methods: {
    auditPopoverHide () {
      this.auditPopoverFlag.memberName = false
      this.auditPopoverFlag.companyName = false
      this.auditPopoverFlag.phoneNumber = false
      // this.auditPopoverFlag.email = false
      // this.auditPopoverFlag.endTime = false
    },
    closeAuditModal () {
      this.auditPopoverFlag.memberName = false
      this.auditPopoverFlag.companyName = false
      this.auditPopoverFlag.phoneNumber = false
      // this.auditPopoverFlag.email = false
      // this.auditPopoverFlag.endTime = false
      this.localAuditDialogVisible = false
      this.$emit('closeAuditModal', this.localAuditDialogVisible)
    },
    addAuditInfo () {
      if (this.memberInfo.memberName === '' || this.memberInfo.memberName === null) {
        this.auditPopoverFlag.memberName = true
        return
      }

      if (this.memberInfo.companyName === '' || this.memberInfo.companyName === null) {
        this.auditPopoverFlag.companyName = true
        return
      }

      if (this.memberInfo.phoneNumber === '' || this.memberInfo.phoneNumber === null) {
        this.auditPopoverFlag.phoneNumber = true
        return
      }
      console.log(this.memberInfoCtrl)
      this.updateMember()
      /* if (this.memberInfo.email === '' || this.memberInfo.email === null) {
        this.auditPopoverFlag.email = true
        return
      }

      if (this.memberInfo.date === '' || this.memberInfo.date === null) {
        this.auditPopoverFlag.endTime = true
        return
      } */
    },
    onChangeProvince (val) {
      this.memberInfo.province = val.value
    },
    onChangeCity (val) {
      this.memberInfo.city = val.value
    },
    onChangeArea (val) {
      this.memberInfo.area = val.value
    },
    updateMember () {
      Axios.put('/member/update', QS.stringify({
        mbName: this.memberInfo.memberName,
        mbCompanyName: this.memberInfo.companyName,
        province: this.memberInfo.province,
        city: this.memberInfo.city,
        area: this.memberInfo.area,
        mbTel: this.memberInfo.phoneNumber,
        mbMail: this.memberInfo.email,
        id: this.memberInfo.memberId,
        mbPs: '1'
      })).then(response => {
        let data = response.data
        if (data.message === 'success') {
          Message.success({
            message: '修改成功'
          })
          this.$parent.$parent.getTableList()
          this.closeAuditModal()
        } else {
          Message.error({
            message: '修改失败'
          })
        }
      }).catch(response => {
        Message.error({
          message: '网络连接失败'
        })
      })
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    memberInfoCtrl: {
      handler (member, oldQuestion) {
        this.memberInfo.memberName = member.memberName
        this.memberInfo.companyName = member.companyName
        // this.memberInfo.companyPhoneNumber = member.companyPhoneNumber
        this.memberInfo.province = member.province
        this.memberInfo.city = member.city
        this.memberInfo.area = member.area
        this.memberInfo.phoneNumber = member.phoneNumber
        this.memberInfo.email = member.email
        this.memberInfo.date = member.date
        this.memberInfo.memberId = member.memberId
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
  @import "../style/style.scss";

  .distpicker-address-wrapper select {
    width: 30%;
  }
</style>
