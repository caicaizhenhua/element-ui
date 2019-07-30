<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="1000px" :model="formData" class="login-form">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-submit" @click="handleSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit () {
      const res = await this.$axios.post('login', this.formData)
      const {
        data,
        meta: { msg, status }
      } = res.data
      // console.log(res.data)
      if (status === 200) {
        this.$message.success(msg)
        this.$router.push({name: 'home'}) // 跳转到登录页面
        // console.log(data)
        localStorage.setItem('tocken', data.token) // 保存tocken值
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style lang='' scoped>
.login-wrap {
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background: #fff;
  width: 400px;
  padding: 20px;
  border-radius: 5px;
}
.login-wrap .login-submit {
  width: 100%;
}
</style>
