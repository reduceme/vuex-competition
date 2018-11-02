<template>
  <div>
    <p class="to-login">
      <router-link class="has-account" :to="{path: '/hkjyyds/login'}">已有账号？前往登录>>></router-link>
    </p>
    <div class="head-img-content">
      <div class="img-parent">
        <img src="../images/head.png" height="60" width="60"/>
      </div>
    </div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!--<div class="content-parent">
      <div class="notice">
        <i class="el-icon-warning" style="color: #E5383C"></i>
        <router-link class="little-title" :to="{path: 'notice'}">注册须知</router-link>
      </div>
    </div>-->
    <!--<div class="content-parent">
      <div class="content-inline content-left">
        <el-input placeholder="姓名"></el-input>
      </div>
      <div class="content-inline content-right">
        <el-input placeholder="单位"></el-input>
      </div>
    </div>
    <div class="content-parent">
      <div class="content-inline content-left">
        <el-select placeholder="请选择性别">
          <el-option
            v-for="item in sex"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="content-inline content-right">
        <el-input placeholder="手机号码"></el-input>
      </div>
    </div>
    <div class="content-parent">
      <div class="content-inline content-left">
        <el-input placeholder="邮箱"></el-input>
      </div>
      <div class="content-inline content-right">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button class="upload-btn" size="small" type="primary">上传附件</el-button>
          <div slot="tip" class="el-upload__tip">（支持jpg、word格式文件）</div>
        </el-upload>
      </div>
    </div>
    <div class="font-btn-content">
      <el-button class="submit-btn" type="primary">立即注册</el-button>
    </div>-->
  </div>
</template>

<script>
export default{
  name: 'registered-child-view',
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
  .to-login {
    text-align: right;
    margin-right: 50px;
  }

  .has-account {
    font-size: 14px;
    color: #999;
    text-decoration: none;
  }

  .head-img-content {
    height: 70px;
  }

  .img-parent {
    width: 70px;
    height: 70px;
    margin: 0 auto;
  }

  .img-parent img {
    border-radius: 50%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
