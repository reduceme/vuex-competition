<template>
  <div class="app-score-content">
    <el-dialog
      title="设置完成"
      top="3vh"
      :visible.sync="$store.state.scoreModalShow"
      :close-on-click-modal="false"
      width="30%">
      <span>欢迎你使用标准翻译服务，为本次服务打个分吧！</span>
      <div class="line">
        <p class="title">评分：</p>
        <el-rate
          v-model="scoreData.score"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </div>
      <div>
        <p class="title" style="vertical-align: top;">评价：</p>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入评价内容"
          v-model="scoreData.appraise">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="addScore">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppScore',
  props: {
    orderid: Number
  },
  data () {
    return {
      scoreData: {
        score: 5,
        appraise: ''
      }
    }
  },
  methods: {
    addScore () {
      this.$ajax.post('/order/addcomment', this.$qs.stringify({
        grade: this.scoreData.score,
        comment: this.scoreData.appraise,
        orderid: this.orderid
      })).then(res => {
        if (res.data.message === 'success') {
          this.$message({
            message: '评价成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: '评价失败！',
            type: 'error'
          })
        }
      }).catch(res => {
        this.$message({
          message: '评价失败！',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.app-score-content{
  .line{
    height: 60px;
    line-height: 60px;
  }
  .title{
    margin: 0;
    height: 20px;
    line-height: 20px;
    font-weight: 700;
  }
  .el-rate, .title {
    display: inline-block;
  }
  .el-textarea{
    width: 90%;
    resize: none;
  }
}
</style>
