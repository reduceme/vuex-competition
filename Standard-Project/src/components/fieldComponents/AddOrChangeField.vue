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
          <el-input :disabled="changeCtrl.notAllowedName" placeholder="请输入名称" v-model="formData.fName"></el-input>
        </el-form-item>
        <el-form-item label="编号：">
          <el-input :disabled="changeCtrl.notAllowedCompany" placeholder="请输入编号"
                    v-model="formData.fNum" maxlength ='6'></el-input>
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
import Axios from "axios";
import QS from "qs";
import { Message } from "element-ui";
export default {
  name: "add-or-change-criterion",
  props: {
    dialogVisible: Boolean,
    changeCtrl: Object
  },
  data() {
    return {
      popoverFlag: {
        remark: false
      },
      localDialogVisible: this.dialogVisible,
      formData: {
        fName: "",
        fNum: "",
        id: ""
      },
      loadAll: []
    };
  },
  methods: {
    addNewMember() {
      this.addScoreOrMember();
    },
    closeModal() {
      this.popoverFlag.remark = false;
      this.localDialogVisible = false;
      this.$emit("closeModal", this.localDialogVisible);
    },
    popoverHide() {
      this.popoverFlag.remark = false;
    },
    addScoreOrMember() {
      if(this.formData.fName == "" || this.formData.fNum == "") {
        Message.success({
              message: '请正确填写'
        })
        return
      }
      Axios.post(
        "/type/edit_stfield",
        QS.stringify({
          id: this.formData.id,
          remark: this.formData.remark,
          name: this.formData.fName,
          num: this.formData.fNum
        })
      ).then(response => {
        if (response.status === 200) {
          if(response.data == 0){
            Message.error({
              message: '该名称已存在'
            })
            return
          }
          if (response.data.message === "success") {
            Message.success({
              message: "修改成功"
            });
            this.$parent.$parent.getScoreList();
            this.closeModal();
          }
        }else{
          Message.error({
              message: "修改失败"
            });
        }
      });
    }
  },
  mounted() {
    console.log(this.changeCtrl);
    
  },
  watch: {
    // 如果 `changeCtrl` 发生改变，这个函数就会运行
    changeCtrl: {
      handler(newchangeCtrl, oldchangeCtrl) {
        this.formData.fName = newchangeCtrl.fName;
        this.formData.fNum = newchangeCtrl.fNum;
        this.formData.id = newchangeCtrl.id;
      },
      deep: true
    }
  }
};
</script>

<style>
@import "../../style/style.scss";

.el-dialog__body .el-input {
  width: 95%;
}
</style>
