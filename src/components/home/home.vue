<template>
  <div class="home">
    <el-container class="container">
      <!--头部部分-->
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">123</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">
              <h3 class="middle">后台管理系统</h3>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <a href="#" class="loginout" @click="loginout">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!--菜单栏左侧-->
        <el-aside class="aside">
          <el-menu
          class="el-menu-vertical-demo"
          default-active="users"
          :unique-opened="isUnique"
          :router='isRouter'>
            <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="users">
                  <i class="el-icon-phone"></i>
                  <span>用户列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item index="2-1">
                  <i class="el-icon-phone"></i>
                  <span>角色列表</span>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <i class="el-icon-phone"></i>
                  <span>权限列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="1-1">
                  <i class="el-icon-phone"></i>
                  <span>商品列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item index="1-1">
                  <i class="el-icon-phone"></i>
                  <span>订单管理</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item index="5-1">
                  <i class="el-icon-phone"></i>
                  <span>商品列表</span>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--主体内容右侧-->
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// el-submenu是子菜单有子级菜单时包含的，templete是带有图标的，表示下面包含菜单的 el-menu-item-group是包含每个可以点击的下拉选项  el-menu-item是当前可以点击的下拉选项
export default {
  data () {
    return {
      isUnique: true,
      isRouter: true
    }
  },
  created () {
    // this.handleOpen()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect () {
      console.log(arguments)
    },
    loginout () { // 退出登录操作
      this.$router.push({name: 'login'})
      localStorage.removeItem('tocken')
      this.$message.success('退出成功')
    }
  }
}
</script>

<style lang="" scoped>
.home {
  height: 100%;
}
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
  width: 200px;
}
.main {
  background-color: #e9eef3;
}
.middle {
  line-height: 60px;
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
