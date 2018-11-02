<template>
  <div class="out-content">
    <div class="person-content">
      <div class="blue-line"></div>
      <div class="blue-line line-right"></div>
      <div class="head-img-content">
        <div class="img-parent">
          <img src="../images/head.png" height="160" width="160"/></div>
      </div>
      <p class="login-status">登录状态：已审核</p>
      <div class="user-info-content">
        <div class="content-same-style content-left">
          <p>&nbsp;&nbsp;真实姓名：</p>
          <el-input class="special-input" readonly placeholder="请输入姓名"></el-input>
        </div>
        <div class="content-same-style content-right">
          <p>&nbsp;&nbsp;手机号：</p>
          <el-input readonly placeholder="请输入联系方式"></el-input>
        </div>
      </div>
      <div class="user-info-content">
        <div class="content-same-style content-left">
          <p>&nbsp;&nbsp;性别：</p>
          <el-input readonly placeholder="请输入性别"></el-input>
        </div>
        <div class="content-same-style content-right">
          <p>&nbsp;&nbsp;邮箱：</p>
          <el-input readonly placeholder="请输入邮箱"></el-input>
        </div>
      </div>
      <div class="user-info-content" style="margin-left: 25px;width: calc(100% - 25px)">
        <div class="content-same-style content-left" style="float: left; display: block">
          <p>&nbsp;&nbsp;工作单位：</p>
          <el-input readonly placeholder="请输入工作单位"></el-input>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div class="user-document">
        <h1>相关资料</h1>
        <div class="download-content">
          <div class="download-inline download-left">
            <div class="download-btn download-title">
              <p class="large-title">单位推荐函扫描件</p>
            </div>
            <div class="download-btn download-icon"></div>
          </div>
          <div class="download-inline download-center">
            <div class="download-btn download-title">
              <p class="large-title have-two-line">复赛演讲稿</p>
              <p>（中英文对照电子版）</p>
            </div>
            <div class="download-btn download-icon"></div>
          </div>
          <div class="download-inline download-right">
            <div class="download-btn download-title">
              <p class="large-title have-two-line">决赛演讲稿</p>
              <p>（中英文对照电子版）</p>
            </div>
            <div class="download-btn download-icon"></div>
          </div>
        </div>
      </div>
      <div class="user-document">
        <h1>我的动态</h1>
        <div class="my-dynamic-content"></div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
  .out-content {
    position: relative;
    width: 100%;
    height: 1400px;
  }

  .person-content {
    border: solid 1px #D7D6D7;
    box-shadow: darkgrey 0px 0px 10px 0px;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 70%;
    height: 1200px;
    transform: translate(-50%, -50%);
    background: white;
  }

  .blue-line {
    margin-top: 120px;
    border: solid 1px #0393F6;
    position: absolute;
    width: calc(50% - 81px);
  }

  .line-right {
    margin-left: calc(50% + 79px);
  }

  .head-img-content {
    margin-top: 40px;
    text-align: center;
  }

  .img-parent {
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }

  .img-parent img {
    border-radius: 50%;
  }

  .login-status {
    font-size: 20px;
    color: #2E9400;
  }

  .user-info-content {
    width: 100%;
  }

  .content-same-style {
    width: calc(48% - 120px);
    height: 80px;
    display: inline-block;
    padding: 10px 60px;
  }

  .content-same-style p {
    margin: 0;
    font-size: 14px;
    color: #888;
    text-align: left;
    padding: 10px;
  }

  .user-document{
    width: calc(100% - 120px);
    height: 180px;
    padding: 20px 60px;
  }

  .user-document h1{
    text-align: left;
  }

  .download-inline{
    display: inline-block;
    width: 31.5%;
    height: 180px;
  }

  .download-left{
    text-align: left;
  }

  .download-center{
    text-align: center;
  }

  .download-right{
    text-align: center;
    width: 34%;
  }

  .download-btn{
    display: block;
    float: left;
    height: 70px;
    margin-top: 30px;
    cursor: pointer;
  }

  .download-title{
    width: 60%;
    background: #0691FA;
    color: white;
    min-width: 160px;
  }

  .download-icon{
    width: 20%;
    background: #2E9400;
    color: white;
  }

  .download-btn p{
    margin: 0;
  }

  .large-title{
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 20px;
  }

  .have-two-line{
    height: 40px;
    line-height: 40px;
  }

  .user-document h1{
    margin-bottom: 40px;
  }

  .my-dynamic-content{
    width: 100%;
    height: 80px;
    border-top: solid 1px #CCCCCC;
  }
</style>
