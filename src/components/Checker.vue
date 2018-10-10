<template>
    <el-row :gutter="20">
        <el-col v-for="item in checkerList" :xs="8" :sm="4" :md="3" :key="item.key">
            <el-button class="check-button" :type="item.checked?'primary':''" @click="checkTask(item.name)">
                {{item.name}}
            </el-button>
        </el-col>
        <el-col :xs="8" :sm="4" :md="3">
            <el-button class="check-button" type="" @click="createDialogVisible = true">
                <i class="el-icon-plus"></i>
            </el-button>
        </el-col>
        <el-dialog
                title="创建新项目"
                :visible.sync="createDialogVisible"
                width="30%">
            <el-input v-model="createTaskName" placeholder="请输入项目名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createTask">确 定</el-button>
              </span>
        </el-dialog>
    </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Checker',
    data () {
      return {
        checkerList: [],
        createDialogVisible: false,
        createTaskName: ''
      }
    },
    created () {
      this.refreshTask()
    },
    methods: {
      refreshTask () {
        axios
          .get('/api/tasks', {
            params: {
              date: this.getDate()
            }
          })
          .then(response => {
            if (response.status === 200) {
              this.checkerList = response.data.data
            } else console.log(response.data)
          })
      },
      createTask () {
        axios
          .post('/api/tasks', {
            name: this.createTaskName
          })
          .then(response => {
            if (response.status === 200) {
              this.createDialogVisible = false
              this.createTaskName = ''
              this.refreshTask()
            } else console.log(response.data)
          })
      },
      checkTask (taskName) {
        console.log(taskName)
        axios
          .post(`/api/check/${taskName}`, {
            date: this.getDate(),
            checkTime: this.getTime()
          })
          .then(response => {
            if (response.status === 200) {
              this.refreshTask()
            } else console.log(response.data)
          })
      },
      getDate () {
        let date = new Date()
        return (
          date.getFullYear() +
          '/' +
          ('0' + date.getMonth()).slice(-2) +
          '/' +
          ('0' + date.getDay()).slice(-2)
        )
      },
      getTime () {
        let date = new Date()
        return (
          '0' +
          date.getHours() +
          ('0' + date.getMinutes()).slice(-2) +
          ('0' + date.getSeconds()).slice(-2)
        )
      }
    }
  }
</script>

<style scoped>
    .check-button {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
