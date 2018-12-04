<template>
  <div class="out-content">
    <div class="img-content"></div>
    <div class="login-content">
      <div class="login-title">
        <span>工程技术标准数据库管理平台</span>
      </div>
      <div class="login-input-content">
        <div class="login-input-parent">
          <el-input
            placeholder="请输入用户名称"
            v-model="userInfo.username">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </div>
        <div class="login-input-parent">
          <el-input
            placeholder="请输入登录密码"
            type="password"
            v-model="userInfo.password"
            name="password"
            auto-complete="off">
            <i slot="prefix" class="el-input__icon el-icon-view"></i>
          </el-input>
        </div>
        <div class="login-input-parent">
          <el-button type="primary" @click.native="login()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { Message } from 'element-ui'
import QS from 'qs'
export default {
  name: 'login-view',
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      Axios.post('/login', QS.stringify(this.userInfo)).then((response) => {
        let data = response.data
        if (data.status === 'success') {
          this.$router.push({
            path: '/'
          })
        } else {
          Message.error({
            message: data.msg
          })
        }
      }).catch(function (response) {
        Message.error({
          message: '网络连接失败'
        })
      })
    }
  }
}
</script>

<style scoped>
  .out-content {
    position: relative;
    width: 100%;
    height: 800px;
  }

  .login-content {
    border: solid 1px #D7D6D7;
    box-shadow: darkgrey 0px 0px 10px 0px;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 420px;
    height: 480px;
    transform: translate(-50%, -50%);
    background: white;
  }

  .login-title {
    height: 150px;
  }

  .login-title span {
    display: block;
    height: 150px;
    line-height: 150px;
    font-size: 30px;
    font-weight: 700;
  }

  .login-input-content {
    height: calc(100% - 150px);
  }

  .login-input-parent {
    width: calc(100% - 80px);
    padding: 20px 40px;
    height: 40px;
  }

  .el-button--primary {
    width: 100%;
  }

  .img-content {
    position: absolute;
    top: 35%;
    width: 100%;
    height: 220px;
    background-image: url("../assets/背景图.png");
    background-repeat: repeat-x;
  }
</style>
