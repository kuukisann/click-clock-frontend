<template>
    <el-row :gutter="40">
        <el-col v-for="chartData in chartList" :xs="24" :sm="12" :md="12" :key="chartData.key">
            <h3 style="text-align: center">{{chartData.taskName}}</h3>
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </el-col>
    </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'History',
    created () {
      this.refreshHistory()
    },
    data () {
      this.chartSettings = {
        metrics: ['checkTime'],
        dimension: ['date'],
        yAxisType: ['000000'],
        max: [240000],
        labelMap: {
          checkTime: '打卡时间'
        },
        scale: [true, false]
      }
      return {
        chartList: []
      }
    },
    methods: {
      refreshHistory () {
        axios.get('/api/history').then(response => {
          if (response.status === 200) {
            this.chartList = response.data.data
          } else console.log(response.data)
        })
      }
    }
  }
</script>

<style scoped>
</style>
