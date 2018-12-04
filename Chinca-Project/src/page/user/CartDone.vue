<template>
  <div class="selection-list">
    <div class="user-nav">
      <router-link :to="'/user-cart'">待保存清单</router-link>
      <router-link :to="'/user-cart/user-cart-done'" class="active">已保存清单</router-link>
    </div>
    <div class="operation">
      <span class="delete" @click="deleteDoneList()">清空意向单</span>
      <span>共计<b> {{tableData.length}} </b>条标准</span>
      <span>共计积分：<b>{{totalScore}}</b></span>
      <el-button type="danger" @click="keepDoneInit()">提交清单</el-button>
      <el-button type="success" @click="exportInit()">导出清单</el-button>
    </div>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;">
      <el-table-column
        prop="stNum"
        label="标准号">
      </el-table-column>
      <el-table-column
        prop="stNameZh"
        label="标准名（中）">
      </el-table-column>
      <el-table-column
        prop="stNameF"
        label="标准名（外）">
      </el-table-column>
      <el-table-column
        prop="type"
        label="标准类型">
      </el-table-column>
      <el-table-column
        width="150"
        prop="score"
        label="所需积分">
      </el-table-column>
    </el-table>
    <el-dialog title="确认信息" :visible.sync="dialogFormVisible" class="cart-done">
      <el-form :model="form">
        <el-form-item label="联系人" label-width="120">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="120">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单要求" label-width="120">
          <el-input v-model="form.require" type="textarea"
                    :rows="2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" style="text-align: right;margin-top: 20px">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="keepDoneList()" :disabled="btn.disabled">{{btn.txt}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QS from 'qs'
  export default {
    name: 'Cart',
    data() {
      return {
        account: null,
        page: 1,
        pageSize: 99,
        tableData: [],
        btn: {
          disabled: false,
          txt: '确 定'
        },
        form: {
          name: '',
          phone: '',
          require: ''
        },
        dialogFormVisible: false
      }
    },
    mounted (){
      this.account = JSON.parse(localStorage.getItem('storage_userInfo_'))
      this.account && this.showDoneList()
    },
    computed: {
      totalScore (){
        let total = 0
        this.tableData.forEach(item => {
          total += item.score
        })
        return total
      }
    },
    methods: {
      showDoneList (){
        this.$ajax.get('/cart/list',{
          params: {
            mbId: this.account.id,
            Page: this.page,
            PageSize: this.pageSize
          }
        }).then(res => {
          res.status === 200 && res.data && (this.tableData = res.data)
        })
      },
      deleteDoneList (){
        if(this.tableData.length == 0){
          return
        }
        this.$confirm('确认清空意向清单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get('/cart/clear',{
            params: {
              mbId: this.account.id
            }
          }).then(res => {
            res.status === 200 && this.$message({type: 'success',message: '已删除'}) && (this.tableData = [])
          })
        }).catch(() => {})
      },
      keepDoneInit (){
        this.$ajax.get('/member/info').then(res => {
          if(res.data.mbClass && res.data.mbClass > 0){
            if(this.tableData.length <= 9 ){
              this.$message({
                  message: '至少需要10条标准咨询意向才允许提交清单',
                  type: 'error'
                })
              return
            }
          }else{
            this.$message({
                message: '必须为充值会员，才可以提交咨询清单',
                type: 'error'
              })
            return
          }
          this.dialogFormVisible = true
          this.form.name = this.account.mbName || ''
          this.form.phone = this.account.mbTel || ''
        })
      },
      exportInit(){
        window.location.href = "/type/export/" + this.account.id
      },
      keepDoneList (){
        if(this.account.myScore < this.totalScore){
            this.$message({
                message: '积分不足，请及时充值',
                type: 'error'
              })
              return
        }
        this.btn.disabled = true
        this.btn.txt = '提交中'
        var self = this
        self.$ajax.post('/order/addOrder',QS.stringify({
            contactName: self.form.name,
            contactTel: self.form.phone,
            orderRequ: self.form.require
        })).then(res => {
          if(res.status == 200){
            if(res.data == 0){
              this.$message({
                message: '积分不足，请及时充值',
                type: 'error'
              })
              return;
            }
            self.$message({type: 'success', message: '提交成功'})
            window.setTimeout(() => {
              self.$router.push('/user-application')
            },1000)
          }
          self.btn.disabled = false
          self.btn.txt = '确 认'
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../style/user-nav";
  @import "../../style/selection";
</style>
<style lang="scss" scoped>
  .el-form-item{margin-bottom: 0}
</style>
