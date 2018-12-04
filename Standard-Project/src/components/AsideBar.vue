<template>
  <div class="bar">
    <el-container>
      <el-header>
        <div class="header-title">工程技术标准数据库管理平台</div>
        <div class="header-icon" @click="logout" style="margin-right: 50px">
          <img class="header-image" src="../assets/icon-08.png"/>
          <span class="header-operating">退出</span>
        </div>
        <div class="header-icon">
          <img class="header-image" src="../assets/icon-07.png"/>
          <span class="header-operating">{{loginUser}}</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router :default-active="$route.path">
            <el-submenu  :key="item.key" :index="''+ index" v-for="(item, index) in menuList">
              <template slot="title">{{item.name}}</template>
              <el-menu-item :key="subItem.path" :index="subItem.path"
                            v-for="subItem in item['children']"
                            :class="$route.path===subItem.path?'is-active':''">{{subItem.name}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view :loginUser="loginUser"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Axios from 'axios'
import { Message } from 'element-ui'
export default {
  name: 'aside-bar',
  data () {
    return {
      loginUser: '',
      menuList:this.$router.options.routes[0].children
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    logout () {
      Axios.get('/logout').then((response) => {
        let data = response.data
        if (data.status === 'success') {
          this.$router.push({
            path: '/login/'
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
    },
    getUserInfo () {
      Axios.get('/member/get_user_info').then(response => {
        if (response.status === 200) {
          this.loginUser = response.data.mbName
        }
      })
    }
  },

}
</script>

<style lang="scss">
  .bar {
    height: 100%;
  }
  .bar{
    .el-container {
      height: 100%;
    }

    .el-header {
      background: #031337;
      height: 85px !important;
    }

    .header-title {
      color: #FFFFFF;
      float: left;
      height: 85px;
      padding-left: 50px;
      line-height: 85px;
      font-size: 25px;
    }

    .header-icon {
      float: right;
      height: 85px;
      line-height: 85px;
      display: block;
      margin-left: 80px;
      cursor: pointer;
    }

    .header-image {
      width: 25px;
      height: 25px;
      vertical-align: middle
    }

    .header-operating {
      color: white;
      font-size: 14px;
    }

    .el-submenu__title {
      background: #031337 !important;
      margin-top: 1px;
      color: white;
      font-size: 16px;
      width: 200px;
      height: 50px;
      line-height: 50px;
    }

    .el-submenu__title i {
      color: white;
      font-size: 16px;
    }

    .el-menu {
      height: 100%;
    }

    .el-menu-item {
      margin-top: 1px;
      background: #E5E5E5;
    }

    .el-menu-item.is-active {
      background: #4286DC;
      color: white;
    }
    /* .el-menu-item.is-active:after {
      content: '';
      position: absolute;
      right: -7px;
      top: 15px;
      border: 7px solid #00a0e9;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-right: none;
    } */
  }
</style>
