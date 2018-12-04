<template>
  <div class="search-content">
    <div class="search-display-method search-left-content">
      <div class="demo-input-suffix">
        <span class="search-title">名称：</span>
        <el-input v-model="localInfo.memberName"></el-input>
      </div>

      <div class="demo-input-suffix">
        <span class="search-title">手机号：</span>
        <el-input v-model="localInfo.phoneNumber"></el-input>
      </div>

      <div class="demo-input-suffix status-select">
        <span class="search-title">状态：</span>
        <el-select v-model="localInfo.memberStatus" placeholder="请选择">
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
        <el-button type="primary" @click.native="dialogVisible = true">新增会员</el-button>
      </div>
    </div>
    <add-member-or-integral @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :modalCtrl="modalCtrl"></add-member-or-integral>
  </div>
</template>

<script>
import AddMemberOrIntegral from '../components/AddMemberOrIntegral'
export default {
  name: 'member-search-bar',
  components: { AddMemberOrIntegral },
  props: {
    pageInfo: Object
  },
  data () {
    return {
      modalCtrl: {
        modalTitle: '新增会员',
        notAllowedPhone: false,
        notAllowedName: true,
        notAllowedCompany: true,
        memberName: '',
        phoneNumber: '',
        companyName: ''
      },
      dialogVisible: false,
      localInfo: {
        memberName: this.pageInfo.memberName,
        phoneNumber: this.pageInfo.phoneNumber,
        memberStatus: this.pageInfo.memberStatus
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
      test: this.$parent.username
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
    }
  }
}
</script>

<style scoped>
  @import "../style/style.scss";
  @import "../style/searchBarStyle.scss";

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
