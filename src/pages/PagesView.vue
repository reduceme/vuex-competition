<template>
  <div class="pages-view">
    <top-bar></top-bar>
    <router-view></router-view>
    <font-bar></font-bar>
  </div>
</template>

<script>
import TopBar from '../components/TopBar'
import FontBar from '../components/FontBar'

export default {
  components: { FontBar, TopBar },
  name: 'pages-view',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
  .pages-view {
    min-height: 100%;
    position: relative;
  }
</style>
