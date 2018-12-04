<template>
  <div class="search-content">
    <div class="search-display-method search-left-content">
      <div class="demo-input-suffix">
        <span class="search-title">名称：</span>
        <el-input v-model="localInfo.tyName"></el-input>
      </div>

      <div class="demo-input-suffix">
        <span class="search-title">编号：</span>
        <el-input v-model="localInfo.tyNum"></el-input>
      </div>

      <div class="demo-input-suffix status-select">
        <span class="search-title">状态：</span>
        <el-select v-model="localInfo.incomeType" placeholder="请选择">
          <el-option
            v-for="item in optionsForStatus"
            :key="item.key"
            :label="item.status"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="line-content"></div>

      <div class="content-search-button">
        <el-button type="primary" @click.native="getSearchData">搜索</el-button>
      </div>
    </div>
    <div class="search-display-method search-right-content">
      <div class="add-member-content">
        <el-button type="primary" @click.native="dialogVisible = true">新增类型</el-button>
      </div>
         <el-dialog
      :title="modalCtrl.modalTitle"
      :visible.sync="dialogVisible"
      width="580px"
      :show-close="false"
      :close-on-click-modal="false">
      <el-form ref="formData" :model="formData" label-width="100px">
        <el-form-item label="名称：">
          <el-input placeholder="请输入名称" v-model="formData.tyName"></el-input>
        </el-form-item>
        <el-form-item label="编号：">
          <el-input placeholder="请输入编号"
                    v-model="formData.tyNum" maxlength ='6'></el-input>
        </el-form-item>
        <el-form-item label="标准类型：">
          <el-select v-model="formData.ext1" clearable placeholder="选择语言：" style="display:block;margin-left: 10px;">
            <el-option :key="item.id" v-for="item in typeList" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="require-content" label="备注：">
          <el-popover>
            <el-input slot="reference" type="textarea" placeholder="请输入内容……"
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
    
    <!-- <add-member-or-integral @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :modalCtrl="modalCtrl"></add-member-or-integral> -->
  </div>
</template>

<script>
import Axios from 'axios'
import QS from 'qs'
import { Message } from 'element-ui'
// import AddMemberOrIntegral from '../../components/AddMemberOrIntegral'
export default {
  name: 'criterion-type-search',
  // components: { AddMemberOrIntegral },
  props: {
    pageInfo: Object
  },
  data () {
    return {
      modalCtrl: {
        modalTitle: '新增标准',
        notAllowedPhone: false,
        notAllowedName: true,
        notAllowedCompany: true,
        tyName: '',
        tyNum: '',
      },
      formData: {
        tyName: '',
        tyNum: '',
        ext1: '',
        remark: ''
      },
      dialogVisible: false,
      localInfo: {
        incomeType: this.pageInfo.incomeType,
        tyName: this.pageInfo.tyName,
        ext1: this.pageInfo.ext1,
        tyNum: this.pageInfo.tyNum,
      },
      optionsForStatus: [{
        status: '请选择',
        value: '',
        key: 'select'
      }, {
        status: '有效',
        value: '1',
        key: 'valid'
      }, {
        status: '无效',
        value: '0',
        key: 'invalid'
      }],
      test: this.$parent.username,
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
    /* *
     * 改变父组件Statistic的值
     * */
    getSearchData (val) {
      this.$emit('changeSearchData', this.localInfo)
    },
    changeDialogVisible (val) {
      this.dialogVisible = val
    },
    closeModal () {
      this.formData.tyName = ''
      this.formData.tyNum = ''
      this.formData.remark = ''
      this.formData.ext1 = ''
      this.dialogVisible = false
    },
    addNewMember(){
      if(this.formData.tyNum == "" || this.formData.tyNum == "" || this.formData.ext1 == "") {
        Message.error({
              message: '请正确填写'
        })
        return
      }
      Axios.post('/type/add_type',QS.stringify({
          name: this.formData.tyName,
          num: this.formData.tyNum,
          ext1: this.formData.ext1,
          remark: this.formData.remark
      })).then(response => {
        if(response.status == 200){
          if(response.data == 0){
            Message.error({
              message: '该名称已存在'
            })
            return
          }
          if (response.data.message === 'success') {
            Message.success({
              message: '添加成功'
            })
          }
          this.formData.tyName = ''
          this.formData.tyNum = ''
          this.formData.ext1 = ''
          this.formData.remark = ''
          this.dialogVisible = false
          this.$parent.getScoreList()
        }else{
          Message.success({
              message: '添加失败'
            })
        }
      })
    }
  }
}
</script>

<style scoped>
  @import "../../style/style.scss";
  @import "../../style/searchBarStyle.scss";

  .search-left-content {
    width: 86%;
  }

  .search-right-content {
    margin-left: 1%;
    width: 12%;
  }

  .demo-input-suffix {
    width: 27%;
  }

  .content-search-button {
    width: 17%;
  }

  .search-title {
    width: 100px;
  }

  .status-select .el-select .el-input {
    width: 100%;
  }

  .add-member-content {
    display: block;
    float: left;
    width: 100%;
    height: 100px;
    margin: 30PX auto;
  }
</style>
