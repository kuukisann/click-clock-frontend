<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-menu :default-active="activeMenu" class="el-menu-demo" mode="horizontal" router>
                    <el-menu-item index="/checker">记录</el-menu-item>
                    <el-menu-item index="/history">历史</el-menu-item>
                    <el-menu-item index="/user" class="pull-right" v-if="ifSignIn">用户中心</el-menu-item>
                    <el-menu-item index="/signin" class="pull-right" v-else>登陆</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
    data () {
      return {
        activeMenu: '',
        ifSignIn: false
      }
    },
    created () {
      // console.log(this.$route.path)
      this.activeMenu = this.$route.path
    }
  }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }

#app {
    margin: 0;
    padding: 0;
}

    .pull-right {
        float: right !important;
}
</style>
