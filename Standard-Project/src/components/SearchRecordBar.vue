<template>
  <div class="search-content">
    <div class="demo-input-suffix">
      <span class="search-title">名称：</span>
      <el-input v-model="localInfo.memberName"></el-input>
    </div>
    <div class="demo-input-suffix">
      <span class="search-title">手机号：</span>
      <el-input v-model="localInfo.phoneNumber"></el-input>
    </div>
    <div class="demo-input-suffix status-select">
      <span class="search-title">用户类型：</span>
      <el-select v-model="localInfo.memberType">
        <el-option
          v-for="item in optionsForMember"
          :key="item.key"
          :label="item.status"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="demo-input-suffix">
      <span class="search-title">公司名称：</span>
      <el-input v-model="localInfo.companyName"></el-input>
    </div>
    <div class="demo-input-suffix status-select">
      <span class="search-title">结果数：</span>
      <el-select v-model="localInfo.resultCount">
        <el-option
          v-for="item in optionsForResult"
          :key="item.key"
          :label="item.status"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="line-content"></div>
    <div class="search-btn-content">
      <el-button type="primary" @click.native="getSearchData">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-record-bar',
  props: {
    recordPageInfo: Object
  },
  data () {
    return {
      localInfo: {
        memberName: this.recordPageInfo.memberName,
        phoneNumber: this.recordPageInfo.phoneNumber,
        memberType: this.recordPageInfo.memberType,
        companyName: this.recordPageInfo.companyName,
        resultCount: this.recordPageInfo.resultCount
      },
      optionsForMember: [{
        status: '全部',
        value: '',
        key: 'select'
      }, {
        status: '普通用户',
        value: '1',
        key: 'valid'
      }, {
        status: '会员',
        value: '0',
        key: 'invalid'
      }],
      optionsForResult: [{
        status: '全部',
        value: '',
        key: 'select'
      }, {
        status: '0',
        value: '1',
        key: 'valid'
      }, {
        status: '非0',
        value: '0',
        key: 'invalid'
      }]
    }
  },
  methods: {
    getSearchData () {
      console.log(this.localInfo)
      this.$emit('changeSearchData', this.localInfo)
    }
  }
}
</script>

<style scoped>
  @import "../style/style.scss";
  @import "../style/searchBarStyle.scss";

  .search-content {
    background: #EEEEEE;
  }

  .demo-input-suffix{
    width: 18%;
  }

  .search-btn-content {
    display: block;
    float: left;
    width: 9%;
    height: 70px;
    padding-top: 30px;
  }
</style>
