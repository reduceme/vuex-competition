<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  height: 100%;
  min-width: 1200px;
  min-height: 800px;
}

body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.el-button--primary {
  background: #4286DC;
}

.el-table {
  margin-top: 10px;
}

.el-table th {
  background: #99BFEE;
  color: #000;
  font-weight: 700;
}
</style>
