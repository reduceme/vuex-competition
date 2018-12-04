<template>
  <div>
    <el-dialog
      :title="changeCtrl.modalTitle"
      :visible.sync="dialogVisible"
      width="580px"
      :show-close="false"
      :close-on-click-modal="false">
      <el-form ref="formData" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="编号：" prop="stNum">
          <el-input placeholder="请输入编号：" v-model="formData.orgNum"></el-input>
        </el-form-item>
        <el-form-item label="机构名称：" prop="orgName">
          <el-input placeholder="请输入机构名称：" v-model="formData.orgName"></el-input>
        </el-form-item>
        <el-form-item label="机构介绍：">
          <el-input placeholder="请输入机构介绍" v-model="formData.orgIntro"></el-input>
        </el-form-item>
        <el-form-item label="机构联系人：" prop="orgLink">
          <el-input placeholder="请输入联系人" v-model="formData.orgLink"></el-input>
        </el-form-item>
        <el-form-item label="机构电话：" prop="orgTel">
          <el-input placeholder="请输入电话" v-model="formData.orgTel"></el-input>
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
        orgNum: this.changeCtrl.orgNum,
        orgName: this.changeCtrl.orgName,
        orgIntro: this.changeCtrl.orgIntro,
        orgLink: this.changeCtrl.orgLink,
        orgTel: this.changeCtrl.orgTel,
        remark:this.changeCtrl.remark,
        id: this.changeCtrl.id
      },
       rules: {
          orgName: [
            { required: true, message: '请选择机构', trigger: 'change' }
          ],
          orgTel: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ],
          orgLink: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ]
        },
        projectState: [
          {
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }
        ]
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
      this.$refs.formData.validate((valid) => {
        if (valid) {
              Axios.post(
            "/org/edit_type",
            QS.stringify({
              orgNum: this.formData.orgNum,
              orgName: this.formData.orgName,
              orgIntro: this.formData.orgIntro,
              orgLink: this.formData.orgLink,
              orgTel: this.formData.orgTel,
              remark: this.formData.remark,
              id: this.formData.id
            })
          ).then(response => {
            if (response.status === 200) {
              if (response.data.message === "success") {
                Message.success({
                  message: "修改成功"
                });
                this.$parent.$parent.getScoreList();
                this.closeModal();
              }
            }
          });
        }else{
          Message.error({
                  message: "请确认信息"
                });
        }
      })
     
    }
  },
  mounted() {
  },
  watch: {
    // 如果 `changeCtrl` 发生改变，这个函数就会运行
    changeCtrl: {
      handler(newchangeCtrl, oldchangeCtrl) {
        this.formData.orgNum = newchangeCtrl.orgNum;
        this.formData.orgName = newchangeCtrl.orgName;
        this.formData.orgIntro = newchangeCtrl.orgIntro;
        this.formData.orgLink = newchangeCtrl.orgLink;
        this.formData.orgTel = newchangeCtrl.orgTel;
        this.formData.remark = newchangeCtrl.remark;
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
.el-select {
  width: 95%;
}
</style>
