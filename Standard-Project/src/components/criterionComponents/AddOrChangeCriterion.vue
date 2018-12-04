<template>
  <div>
    <el-dialog
      :title="changeCtrl.modalTitle"
      :visible.sync="dialogVisible"
      width="580px"
      :show-close="false"
      :close-on-click-modal="false">
      <el-form ref="formData" :model="formData" label-width="100px">
        <el-form-item label="名称：">
          <el-input :disabled="changeCtrl.notAllowedName" placeholder="请输入名称" v-model="formData.tyName"></el-input>
        </el-form-item>
        <el-form-item label="编号：">
          <el-input :disabled="changeCtrl.notAllowedCompany" placeholder="请输入编号"
                    v-model="formData.tyNum" maxlength ='6'></el-input>
        </el-form-item>
        <el-form-item label="标准类型：">
          <el-select v-model="formData.ext1" clearable placeholder="选择语言：" style="display:block;margin-left: 10px;">
            <el-option :key="item.id" v-for="item in typeList" :label="item.label" :value="item.value"></el-option>
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
  name: 'add-or-change-criterion',
  props: {
    dialogVisible: Boolean,
    changeCtrl: Object
  },
  data () {
    return {
      popoverFlag: {
        remark: false,
      },
      localDialogVisible: this.dialogVisible,
      formData: {
        tyName: '',
        tyNum: '',
        ext1:'',
        id: '',
      },
      loadAll: [],
      typeList: [
        {
          value: "1",
          id: 1,
          label: "国际标准"
        },{
          value: "2",
          id: 2,
          label: "国外标准"
        },{
          value: "3",
          id: 3,
          label: "中国标准"
        }
      ]
    }
  },
  methods: {
    addNewMember () {
      this.addScoreOrMember()
    },
    closeModal () {
      this.popoverFlag.remark = false
      this.localDialogVisible = false
      this.$emit('closeModal', this.localDialogVisible)
    },
    popoverHide () {
      this.popoverFlag.remark = false

    },
    addScoreOrMember () {
      if(this.formData.tyName == "" || this.formData.tyNum == "" || this.formData.ext1 == "") {
        Message.error({
              message: '请正确填写'
        })
        return
      }
      Axios.post('/type/edit_type',QS.stringify({
        id: this.formData.id,
        remark: this.formData.remark,
        name: this.formData.tyName,
        ext1: this.formData.ext1,
        num: this.formData.tyNum
      })).then(response => {
        if(response.status === 200){
          if(response.data == 0){
            Message.error({
              message: '该名称已存在'
            })
            return
          }
          if (response.data.message === 'success') {
            Message.success({
              message: '修改成功'
            })
            this.$parent.$parent.getScoreList()
            this.closeModal()
          }
        }
      })
    }
  },
  mounted () {
  },
  watch: {
    // 如果 `changeCtrl` 发生改变，这个函数就会运行
    changeCtrl: {
      handler (newchangeCtrl, oldchangeCtrl) {
        this.formData.tyName = newchangeCtrl.tyName
        this.formData.tyNum = newchangeCtrl.tyNum
        this.formData.id = newchangeCtrl.id
        this.formData.ext1 = newchangeCtrl.ext1
      },
      deep: true
    }
  }
}
</script>

<style>
  @import "../../style/style.scss";

  .el-dialog__body .el-input {
    width: 95%;
  }
</style>
