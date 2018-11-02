<template>
  <div class="out-content">
    <div class="login-content">
      <div class="registered-title">
        <h1>报名注册</h1>
      </div>
      <div class="registered-detail">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'registered-view',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .out-content {
    position: relative;
    width: 100%;
    height: 1000px;
    background: url("../images/6-0选手注册_02.jpg") no-repeat bottom center;
  }

  .login-content {
    border: solid 1px #D7D6D7;
    box-shadow: darkgrey 0px 0px 10px 0px;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 550px;
    height: 770px;
    transform: translate(-50%, -50%);
    background: white;
  }

  .registered-title{
    width: 100%;
    height: 100px;
    background: #2E9400;
  }

  .registered-title h1{
    height: 100px;
    line-height: 100px;
    color: white;
    font-size: 28px;
  }

  .registered-detail{
    width: 100%;
    height: 385px;
  }
</style>
