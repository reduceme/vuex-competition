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
      <span class="search-title">收支类型：</span>
      <el-select v-model="localInfo.incomeType">
        <el-option
          v-for="item in optionsForIncome"
          :key="item.key"
          :label="item.status"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="demo-input-suffix time-input-suffix">
      <span class="search-title">时间：</span>
      <el-date-picker
        v-model="localInfo.startTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :editable="false"
        format="yyyy-MM-dd hh:mm"
        value-format="yyyy-MM-dd hh:mm">
      </el-date-picker>
    </div>
    <div class="line-content"></div>
    <div class="search-btn-content">
      <el-button type="primary" @click.native="getSearchData">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'integral-search-bar',
  props: {
    integralPageInfo: Object
  },
  data () {
    return {
      localInfo: {
        memberName: this.integralPageInfo.memberName,
        phoneNumber: this.integralPageInfo.phoneNumber,
        incomeType: this.integralPageInfo.incomeType,
        startTime: this.integralPageInfo.startTime,
        endTime: this.integralPageInfo.endTime
      },
      optionsForIncome: [{
        status: '全部',
        value: '',
        key: 'select'
      }, {
        status: '收入',
        value: '1',
        key: 'valid'
      }, {
        status: '支出',
        value: '0',
        key: 'invalid'
      }]
    }
  },
  methods: {
    /* *
     * 改变父组件Statistic的值
     * */
    getSearchData (val) {
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

  .status-select .el-select .el-input {
    width: 100%;
  }

  .el-date-range-picker__editor {
    width: 100%;
  }

  .el-date-range-picker__time-picker-wrap .el-input {
    width: 100%;
  }

  .demo-input-suffix {
    width: 20%;
  }

  .time-input-suffix {
    width: 30%;
  }

  .el-date-editor {
    width: 80%;
  }

  .search-btn-content {
    display: block;
    float: left;
    width: 9%;
    height: 70px;
    padding-top: 30px;
  }
</style>
