<template>
  <div>
    <el-dialog
      :title="changeCtrl.modalTitle"
      :visible.sync="dialogVisible"
      width="580px"
      :show-close="false"
      :close-on-click-modal="false">
      <el-form ref="formData" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="标准号：" prop="stNum">
          <el-input placeholder="请输入标准号" v-model="formData.stNum"></el-input>
        </el-form-item>
        <el-form-item label="名称中文：" prop="stNameZh">
          <el-input placeholder="请输入名称" v-model="formData.stNameZh"></el-input>
        </el-form-item>
        <el-form-item label="名称外文" prop="stNameF">
          <el-input placeholder="请输入名称" v-model="formData.stNameF"></el-input>
        </el-form-item>
        <el-form-item label="语言：" prop="stLang">
          <el-select v-model="formData.stLang" clearable placeholder="选择语言：">
            <el-option :key="item.id" v-for="item in languageSelect" :label="item.langName" :value="''+item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业领域：" prop="fName">
          <el-input placeholder="请输入领域" v-model="formData.fName"></el-input>
        </el-form-item>
        <el-form-item label="标准类型：" prop="tyName">
          <el-select v-model="formData.tyName" clearable placeholder="选择类型：">
            <el-option :key="item.id" v-for="item in standardType" :label="item.tyName" :value="item.id"></el-option>
          </el-select>
          <!-- <el-input :disabled="changeCtrl.notAllowedCompany" placeholder="请输入编号" v-model="formData.tyName"></el-input> -->
        </el-form-item>
        <el-form-item label="ICS：">
          <el-input placeholder="请输入ICS" v-model="formData.stIcs"></el-input>
        </el-form-item>
        <el-form-item label="国家地区：" prop="countryRegion">
          <el-select v-model="formData.countryRegion" clearable placeholder="选择国家：">
            <el-option :key="item.id" v-for="item in nationalArea" :label="item.nname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构：" prop="stOrgid">
        <el-select v-model="formData.stOrgid" clearable placeholder="选择机构">
          <el-option :key="item.value" v-for="item in stOrgSelect" :label="item.label" :value="item.value"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="积分：" prop="stScore">
          <el-input placeholder="请输入积分" v-model="formData.stScore"></el-input>
        </el-form-item>
        <el-form-item label="项目应用：">
          <el-select v-model="formData.isProject">
            <el-option :key="item.value" v-for="item in projectState" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <!-- <el-input placeholder="请输入名称" v-model="formData.isProject"></el-input> -->
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
        stNameZh: this.changeCtrl.stNameZh,
        stNameF: this.changeCtrl.stNameF,
        stNum: this.changeCtrl.stNum,
        stLang: this.changeCtrl.stLang,
        fName: this.changeCtrl.fName,
        tyName:this.changeCtrl.tyName,
        stIcs: this.changeCtrl.stIcs,
        countryRegion: this.changeCtrl.countryRegion,
        stOrgid: this.changeCtrl.stOrgid,
        stScore: this.changeCtrl.stScore,
        isProject: this.changeCtrl.isProject,
        remark: this.changeCtrl.remark,
        id: this.changeCtrl.id
      },
       rules: {
         stNum: [
           { required: true, message: '请输入标准号', trigger: 'blur' },
           { min: 1, max: 500, message: '长度至少1个字符', trigger: 'blur' }
         ],
          stLang: [
            { required: true, message: '请选择语言', trigger: 'change' }
          ],
          fName: [
            { required: true, message: '请输入领域', trigger: 'change' }
          ],
          tyName: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          countryRegion: [
            { required: true, message: '请选择国家', trigger: 'change' }
          ],
          stOrgid: [
            { required: true, message: '请选择机构', trigger: 'change' }
          ]
      },
      stOrgSelect: [{
          value: 1,
          label: '甲骨易'
        }, {
          value: 2,
          label: '语言桥'
        }],
        languageSelect: [],
        nationalArea: [],
        standardType: [],
        // standardStfield: [],
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
            "/type/edit_standard",
            QS.stringify({
              stNameZh: this.formData.stNameZh,
              stNameF: this.formData.stNameF,
              stNum: this.formData.stNum,
              stLang: this.formData.stLang,
              fName: this.formData.fName,
              tyName:this.formData.tyName,
              stIcs: this.formData.stIcs,
              countryRegion: this.formData.countryRegion,
              stOrgid: this.formData.stOrgid,
              stScore: this.formData.stScore,
              isProject: this.formData.isProject,
              remark: this.formData.remark,
              id: this.formData.id
            })
          ).then(response => {
            if (response.status === 200) {
              console.log(response);
              
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
    Axios.get("/type/get_language").then(response => {
      this.languageSelect = response.data
    })
    Axios.get("/type/get_nationalArea").then(response => {
      this.nationalArea = response.data
    })
    Axios.get("/type/get_standardType").then(response => {
      this.standardType = response.data
    })
    // Axios.get("/type/get_standardStfield").then(response => {
    //   this.standardStfield = response.data
    // })
  },
  watch: {
    // 如果 `changeCtrl` 发生改变，这个函数就会运行
    changeCtrl: {
      handler(newchangeCtrl, oldchangeCtrl) {
        this.formData.stNameZh = newchangeCtrl.stNameZh;
        this.formData.stNameF = newchangeCtrl.stNameF;
        this.formData.stLang = newchangeCtrl.stLang;
        this.formData.fName = newchangeCtrl.fName;
        this.formData.tyName = newchangeCtrl.tyName;
        this.formData.stNum = newchangeCtrl.stNum;
        this.formData.stIcs = newchangeCtrl.stIcs;
        this.formData.countryRegion = newchangeCtrl.countryRegion;
        this.formData.stOrgid = newchangeCtrl.stOrgid;
        this.formData.stScore = newchangeCtrl.stScore;
        this.formData.isProject = newchangeCtrl.isProject;
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
