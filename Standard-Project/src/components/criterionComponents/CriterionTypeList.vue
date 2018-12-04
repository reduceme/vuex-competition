<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="类型ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="tyName"
        label="类型名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tyNum"
        label="类型编号">
      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        label="添加时间">
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
import AddOrChangeCriterion from '../../components/criterionComponents/AddOrChangeCriterion'
export default {
  name: 'member-search-list',
  components: { AddOrChangeCriterion },
  props: ['tableData'],
  data () {
    return {
      changeCtrl: {
        modalTitle: '修改',
        tyName: '',
        tyNum: '',
        ext1:'',
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
      this.changeCtrl.tyName = item.tyName
      this.changeCtrl.tyNum = item.tyNum
      this.changeCtrl.ext1 = item.ext1
      this.changeCtrl.id = item.id
      this.dialogVisible = true
    },
    deleteData(){
      var id = document.getElementById("deleteId").value
      Axios.get('/type/delete_type',{
        params:{
          id: id
        }
      }).then(response => {
        this.deleteDialogVisible = false
        this.$parent.getScoreList()
      })
    },
    deleteItem(e){
      document.getElementById("deleteId").value = e.id
    }
  }
}
</script>

<style scoped></style>
