<template>
  <div>
    <div class="notice-info-content">
      <h1>账号注册完成</h1>
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;资料待审核中……</h1>
      <p>（5秒后自动登录进入个人中心）</p>
    </div>
    <div class="font-btn-content">
      <el-button class="submit-btn" type="primary">
        <router-link class="little-title" :to="{path: 'about'}">返回首页</router-link>
      </el-button>
    </div>
  </div>
</template>

<script>
export default{
  name: 'complete-registered-component'
}
</script>

<style scoped>
  .notice-info-content{
    padding: 140px 0 0 0;
    width: 100%;
  }

  .notice-info-content h1{
    font-size: 18px;
    height: 28px;
    line-height: 28px;
  }

  .notice-info-content p{
    font-size: 14px;
    color: #999;
  }

  .font-btn-content{
    width: 100%;
    height: 70px;
    text-align: center;
    margin-top: 90px;
  }

  .submit-btn{
    width: 250px;
    background: #2E9400;
    border: solid 1px #2E9400;
  }

  .little-title{
    font-size: 14px;
    text-decoration: none;
    color: white;
  }
</style>
