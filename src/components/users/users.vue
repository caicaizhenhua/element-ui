<template>
  <el-card class="box-card">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--form表单，搜索添加-->
    <el-row>
      <el-col class="search-row">
        <el-input placeholder="请输入内容" class="input-search" v-model="queryInput" clearable @clear="clearInputVal">
          <el-button slot="append" icon="el-icon-search" @click="seaechBtnEvent"></el-button>
        </el-input>
        <el-button type="success" class="add-btn" @click="showDialogUser">添加用户</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :data="tableData" border>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="create_time" label="创建日期">
        <template slot-scope="scope">{{scope.row.create_tim | fmtdate}}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            inactive-color="red"
            @click.native="stateUserForm(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row)"></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" circle @click="showRoleDialog(scope.row)"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="sizes, prev, pager, next, total"
      :total="totalnum"
    ></el-pagination>
    <!--对话框中的添加用户的表单-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="200px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="200px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="200px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="200px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUserForm">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑用户对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="200px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="200px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="200px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUserForm">确 定</el-button>
      </div>
    </el-dialog>
    <!--用户角色菜单的对话框-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="200">
          {{role_name}}
        </el-form-item>
        <el-form-item label="活动区域" label-width="200">
          <el-select v-model="role_now_id" placeholder="请选择活动区域">
            <el-option label="请选择" value="0"></el-option>
            <el-option :label="item.roleName" :value="item.id" v-for="item in role" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="roleUserForm">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      queryInput: '', // 输入查询的信息
      tableData: [], // 绑定表格相关的数据
      pagenum: 1, // 当前表格页码,第几页   分页
      pagesize: 2, // 当前表格需要展示的条数 分页
      pagesizes: [2, 4, 6, 8, 10], // 当前表格显示数据条数 分页
      totalnum: 0, // 表格数据的总数量 分页
      dialogFormVisibleAdd: false, // 添加用户名
      dialogFormVisibleEdit: false, // 编辑用户名
      dialogFormVisibleRole: false, // 设置用的角色菜单
      form: { // 添加用户民的表单信息
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      role_now_id: 0,
      current_user_id: '',
      role_name: '',
      role: ''
    }
  },
  created () {
    this.queryTableData()
  },
  methods: {
    async roleUserForm () { // 角色菜单   点击确定事件
      const res = await this.$axios.put(`users/${this.current_user_id}/role`,{
        // id: this.role_now_id,
        rid: this.role_now_id
      })
      console.log(res)
      this.dialogFormVisibleRole = false
    },
    async showRoleDialog (user) { // 角色菜单  获取角色列表，与
      this.dialogFormVisibleRole = true
      this.role_name = user.username // 用户名
      this.current_user_id = user.id
      // 获取 用户信息
      const res1 = await this.$axios.get(`users/${user.id}`)
      this.role_now_id = res1.data.data.rid
      // 获取角色列表数据
      const res = await this.$axios.get('roles')
      this.role = res.data.data
     // console.log(this.role)
    },
    async stateUserForm (user) { // 用户状态发生改变 发送请求
      const res = await this.$axios.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
    },
    async editUserForm () { // 编辑用户对话框确定事件  发送请求
      this.dialogFormVisibleEdit = false
      // 发送请求
      const res = await this.$axios.put(`users/${this.form.id}`)
      console.log(res)
    },
    showEditDialog (row) { // 编辑用户事件，显示弹框
      this.dialogFormVisibleEdit = true
      this.form = row
      console.log(row)
    },
    async addUserForm () { // 添加用户信息确定事件
      const res = await this.$axios.post('users', this.form)
      console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 201) {
        this.$message.success(msg)
        this.queryTableData()
        this.form = {}
      } else {
        this.$message.warning(msg)
      }
      this.dialogFormVisibleAdd = false
    },
    showDialogUser () { // 点击添加用户名按钮 展示弹框
      this.dialogFormVisibleAdd = true
    },
    clearInputVal () { // 清空input的事件
      this.queryTableData()
    },
    seaechBtnEvent () { // 查询重新渲染表格
      this.queryTableData()
    },
    async queryTableData () { // 请求表格数据
      const res = await this.$axios.get(
        `users?query=${this.queryInput}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      const {
        data: { users, total },
        meta: { msg, status }
      } = res.data
      console.log(res)
      if (status === 200) {
        this.tableData = users // 表格数据源
        this.$message.success(msg)
        this.totalnum = total
        // console.log(this.totalnum)
      } else {
        this.$message.warning(msg)
      }
    },
    changeSwitch (v) {
      // 用户状态的开关
      console.log(v)
    },
    handleSizeChange (v) {
      // 选择每页条数的事件
      console.log(`每页条数: ${v}`)
      this.pagenum = 1
      this.pagesize = v
      this.queryTableData()
    },
    handleCurrentChange (v) {
      // 点击当前页码
      console.log(`当前页：${v}`)
      this.pagenum = v
      this.queryTableData()
    }
  }
}
</script>

<style lang="" scoped>
.search-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.input-search {
  width: 400px;
}
.add-btn {
}
</style>
