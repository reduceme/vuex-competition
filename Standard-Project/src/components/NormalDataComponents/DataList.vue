<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="标准ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="stNum"
        label="标准号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="stNameF"
        label="外文名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stNameZh"
        label="中文名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="typeDO.tyName"
        label="标准类型">
      </el-table-column>
      <el-table-column
        prop="stCategory"
        label="领域">
      </el-table-column>
      <el-table-column
        prop="stOrgid"
        label="机构">
        <template slot-scope="scope">
          <span v-if="scope.row.stOrgid == 1">甲骨易</span>
          <span v-else-if="scope.row.stOrgid == 2">语言桥</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="stScore"
        label="积分">
      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        label="添加时间"
        width="170">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary" @click.native="getUserInfoItem(scope.row)" style="width: 60px">修改
          </el-button>
          <el-button
            size="mini"
            type="primary" @click="deleteItem(scope.row),deleteDialogVisible = true" style="width: 60px">删除
          </el-button>
          <input type="hidden" id="deleteId" value= "">
        </template>
      </el-table-column>
    </el-table>
<el-dialog
  title="提示"
  :visible.sync="deleteDialogVisible"
  width="30%"
 >
  <span>确定要删除该标准吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteData">确 定</el-button>
  </span>
</el-dialog>
    <!-- <add-criterion @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :changeInfoCtrl="changeInfoCtrl"></add-criterion> -->
        <add-or-change-criterion @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :changeCtrl="changeCtrl"></add-or-change-criterion>
    <!-- <audit-member-info @closeAuditModal="changeAuditDialogVisible($event)" :auditDialogVisible="auditDialogVisible" :memberInfoCtrl="memberInfoCtrl"></audit-member-info> -->
  </div>
</template>

<script>
import Axios from 'axios'
import AddOrChangeCriterion from '../../components/NormalDataComponents/AddOrChangeData.vue'
import { Message } from 'element-ui'
export default {
  name: 'data-list',
  components: { AddOrChangeCriterion },
  props: ['tableData'],
  data () {
    return {
      changeCtrl: {
        modalTitle: '修改',
        stNameZh: '',
        stNameF: '',
        stNum: '',
        stLang: '',
        stNum: '',
        fName: '',
        stIcs: '',
        tyName:'',
        stOrgid: '',
        countryRegion: '',
        stScore: '',
        isProject: '',
        remark: '',
        id: ''
      },
      dialogVisible: false,
      deleteDialogVisible: false
    }
  },
  methods: {
    changeDialogVisible (val) {
      this.dialogVisible = val
    },
    getUserInfoItem (item) {
      this.changeCtrl.stNameZh = item.stNameZh
      this.changeCtrl.stNum = item.stNum
      this.changeCtrl.stNameF = item.stNameF
      this.changeCtrl.stLang = item.stLang
      this.changeCtrl.fName = item.stCategory
      this.changeCtrl.tyName = item.stType
      this.changeCtrl.stOrgid = item.stOrgid
      this.changeCtrl.stIcs = item.stIcs
      this.changeCtrl.countryRegion = item.countryRegion
      this.changeCtrl.stScore = item.stScore
      this.changeCtrl.isProject = item.stIsproject
      this.changeCtrl.remark = item.remark
      this.changeCtrl.id = item.id
      this.dialogVisible = true   
    },
    deleteData(){
      var id = document.getElementById("deleteId").value
      Axios.get('/type/delete_standard',{
        params:{
          id: id
        }
      }).then(response => {
        if(response.status == 200 ){
          Message.success({
              message: '删除成功'
            })
          this.deleteDialogVisible = false
          this.$parent.getScoreList()
        }
      })
    },
    deleteItem(e){
      document.getElementById("deleteId").value = e.id
    }
  }
}
</script>

<style scoped></style>
