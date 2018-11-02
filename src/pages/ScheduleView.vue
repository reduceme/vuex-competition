<template>
  <div class="content">
    <div class="title-content">
      <h1 class="line-info-title">大赛预定赛程</h1>
      <p class="line-info-title line-p">（详细赛程待更新）</p>
    </div>
    <div class="competition-content">
      <div class="inline-div competition-left">
        <h1>01</h1>
        <p>单位初赛及选拔</p>
      </div>
      <div class="inline-div competition-center">
        <p class="time-content">时间：2019年2月28日前</p>
        <p class="context-content">由各单位自行组织初选，推荐选拔1-3名优秀者进入复赛。被推荐选拔的选手应同时准备参加复赛和决赛的中英文对照演讲稿备赛。</p>
      </div>
      <div class="inline-div competition-right"></div>
      <div style="clear:both;"></div>
      <div class="triangle"></div>
    </div>
    <div class="competition-content has-no-margin">
      <div class="inline-div competition-left">
        <h1>02</h1>
        <p>复赛</p>
      </div>
      <div class="inline-div competition-center">
        <p class="time-content">时间（暂定）：2019年5月20日（星期一）</p>
        <p class="context-content">地点：四川乐山，成都理工大学工程技术学院</p>
      </div>
      <div class="inline-div competition-right"></div>
      <div style="clear:both;"></div>
      <div class="triangle"></div>
    </div>
    <div class="competition-content has-no-margin">
      <div class="inline-div competition-left">
        <h1>03</h1>
        <p>决赛</p>
      </div>
      <div class="inline-div competition-center">
        <p class="time-content">时间(暂定)：2019年5月21日（星期二）</p>
        <p class="context-content">地点：四川成都，成都理工大学</p>
      </div>
      <div class="inline-div competition-right"></div>
      <div style="clear:both;"></div>
      <div class="triangle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule-view'
}
</script>

<style scoped>
  .content {
    width: 70%;
    margin-left: 15%;
    padding: 50px 0;
  }

  .line-info-title {
    display: inline-block;
  }

  .title-content{
    text-align: center;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .line-p {
    margin-top: 16px;
    color: #949494;
  }

  .inline-div{
    display: block;
    float: left;
  }

  .competition-content{
    height: 225px;
    margin-top: 50px;
  }

  .competition-left{
    width: 100px;
    height: 125px;
    background: #0691FA;
    color: white;
  }

  .competition-left h1{
    margin-top: 20px;
  }

  .competition-left p{
    font-size: 21px;
  }

  .competition-center{
    width: calc(100% - 150px);
    background: #EEEEEE;
    height: 125px;
  }

  .competition-right{
    width: 50px;
    height: 125px;
    background: #2E9400;
  }

  .triangle{
    width: 0;
    height: 0;
    border-width: 50px;
    border-style: solid;
    border-color: #0691FA transparent transparent transparent;
  }

  .time-content{
    text-align: left;
    margin-left: 100px;
    margin-top: 30px;
  }

  .context-content{
    text-align: left;
    margin: 15px 100px 0 100px;
    line-height: 25px;
  }

  .has-no-margin{
    margin-top: 0;
  }
</style>
