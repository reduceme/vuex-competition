<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="mbName"
        label="会员名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mbTel"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="mbMail"
        label="邮箱地址"
        width="200">
      </el-table-column>
      <el-table-column
        prop="mbClass"
        label="会员类别">
      </el-table-column>
      <el-table-column
        prop="sumRecharge"
        label="充值总计">
      </el-table-column>
      <el-table-column
        prop="myScore"
        label="剩余积分">
      </el-table-column>
      <el-table-column
        prop="apprStat"
        label="是否有效">
      </el-table-column>
      <el-table-column
        prop="mbEndTimeStr"
        label="到期日期">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary" @click.native="getAuditInfo(scope.row)" style="width: 60px">编辑
          </el-button>
          <el-button
            size="mini"
            type="primary" @click.native="getUserInfoItem(scope.row)" style="width: 100px">增加积分
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-member-or-integral @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :modalCtrl="modalCtrl"></add-member-or-integral>
    <audit-member-info @closeAuditModal="changeAuditDialogVisible($event)" :auditDialogVisible="auditDialogVisible" :memberInfoCtrl="memberInfoCtrl"></audit-member-info>
  </div>
</template>

<script>
import Axios from 'axios'
import AddMemberOrIntegral from '../components/AddMemberOrIntegral'
import AuditMemberInfo from '../components/AuditMemberInfo'
export default {
  name: 'member-search-list',
  components: { AddMemberOrIntegral, AuditMemberInfo },
  props: ['tableData'],
  data () {
    return {
      modalCtrl: {
        modalTitle: '增加积分',
        notAllowedPhone: true,
        notAllowedName: true,
        notAllowedCompany: true,
        memberName: '',
        phoneNumber: '',
        companyName: '',
        email: '',
        id: ''
      },
      memberInfoCtrl: {
        memberName: '',
        companyName: '',
        companyPhoneNumber: '',
        area: '',
        city: '',
        province: '',
        phoneNumber: '',
        email: '',
        date: '',
        memberId: ''
      },
      userId:'',
      auditDialogVisible: false,
      dialogVisible: false
    }
  },
  methods: {
    changeDialogVisible (val) {
      this.dialogVisible = val
    },
    changeAuditDialogVisible (val) {
      this.auditDialogVisible = val
    },
    getUserInfoItem (item) {
      if(this.userId != 1){
        this.$message({
          message: '无权限操作此项！',
          type: 'error'
        })
        return
      }
      this.modalCtrl.memberName = item.mbName
      this.modalCtrl.phoneNumber = item.mbTel
      this.modalCtrl.companyName = item.mbCompanyName
      this.modalCtrl.email = item.mbMail
      this.modalCtrl.id = item.id
      this.dialogVisible = true
    },
    getAuditInfo (item) {
      if(this.userId != 1){
        this.$message({
          message: '无权限操作此项！',
          type: 'error'
        })
        return
      }
      this.memberInfoCtrl.memberName = item.mbName
      this.memberInfoCtrl.companyName = item.mbCompanyName
      this.memberInfoCtrl.province = item.province
      this.memberInfoCtrl.city = item.city
      this.memberInfoCtrl.area = item.area
      this.memberInfoCtrl.phoneNumber = item.mbTel
      this.memberInfoCtrl.email = item.mbMail
      this.memberInfoCtrl.date = item.mbEndTime
      this.memberInfoCtrl.memberId = item.id
      this.auditDialogVisible = true
    }
  },
  mounted() {
      // 身份信息
      Axios.get("/member/get_user_details").then( res => {
        this.userId = res.data.roleId
      })
    },
}
</script>
