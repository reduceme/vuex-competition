<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="订单编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="mbName"
        label="公司名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        label="下单时间">
      </el-table-column>
      <el-table-column
        prop="orderComptimeStr"
        label="完成时间">
      </el-table-column>
      <el-table-column prop="orderStatus" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus == 1">购物车</span>
          <span v-else-if="scope.row.orderStatus==2">已生成订单</span>
          <span v-else-if="scope.row.orderStatus==3">商会已确认</span>
          <span v-else-if="scope.row.orderStatus==4">机构已接单</span>
          <span v-else-if="scope.row.orderStatus==5">已完成</span>
          <span v-else-if="scope.row.orderStatus==6">订单已取消</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-select v-model="scope.row.orderStatus" style="width: 130px">
            <el-option :key="item.value" v-for="item in orderStateList" :label="item.state" :value="item.value"></el-option>
          </el-select>
          <el-button
            size="mini"
            type="primary" @click="changeState(scope.row.id,scope.row.orderStatus)" style="width: 60px">保存
          </el-button>
          <el-button
            size="mini"
            type="primary" @click="getDetail(scope.row.id),dialogVisible=true" style="width: 60px">明细
          </el-button>
          <el-button
            size="mini"
            type="primary" @click="deleteItem(scope.row),deleteDialogVisible = true" style="width: 80px">删除
          </el-button>
          <input type="hidden" id="deleteId" value= "">
        </template>
      </el-table-column> -->
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
        <add-or-change-criterion :detailList="detailList" @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :changeCtrl="changeCtrl"></add-or-change-criterion>
    <!-- <audit-member-info @closeAuditModal="changeAuditDialogVisible($event)" :auditDialogVisible="auditDialogVisible" :memberInfoCtrl="memberInfoCtrl"></audit-member-info> -->
  </div>
</template>

<script>
import Axios from 'axios'
import AddOrChangeCriterion from '../../components/orderComponents/AddOrChangeOrder.vue'
import { Message } from 'element-ui'
export default {
  name: 'data-list',
  components: { AddOrChangeCriterion },
  props: ['tableData'],
  data () {
    return {
      changeCtrl: {
        modalTitle: '明细',
        mbName: '',
        createTimeStr: '',
        orderComptimeStr: '',
        orderStatus: '',
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
      deleteDialogVisible: false,
      orderState: '',
      orderStateList : [{
        value: 2,
        state: '已生成订单'
        },{
        value: 3,
        state: '商会已确认'
        },{
        value: 4,
        state: '机构已接单'
        },{
        value: 5,
        state: '已完成'
        },{
        value: 6,
        state: '已取消'
        }
      ],
      detailList: []
    }
  },
  methods: {
    changeDialogVisible (val) {
      this.dialogVisible = val
    },
    deleteData(){
      var id = document.getElementById("deleteId").value
      Axios.get('/type/delete_standard',{
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
    },
    changeState(id,status){
      Axios.get('/order/updateOrderStatus',{
        params: {
          orderId: id,
          status: status
        }
      }).then(response => {
        if(response.data.code == 200){
          if(response.data.message == 'success'){
            Message.success({
              message: "状态修改成功"
            })
          }
          
        }
      })
    },
    getDetail(id){
      Axios.get('/cart/selectOrderDetailsListByOrderId',{
        params: {
          orderId: id
        }
      }).then(response => {
        this.detailList = response.data
      })
    }
  }
}
</script>

<style scoped></style>
