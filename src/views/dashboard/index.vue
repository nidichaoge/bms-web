<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">你好，管理员</div> -->
    <el-card class="user" >
      <div slot="header">
        <span>今日销售情况</span>
      </div>
      <el-row type="flex" align="bottom">
        <el-col :span="5" class="title" :offset="2">交易成功订单</el-col>
        <el-col :span="4" class="price">{{ cornerOrder }}</el-col>
        <el-col :span="5" class="title">待付款订单</el-col>
        <el-col :span="4" class="price">{{ pendingOrder }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="title" :offset="2">今日订单：</el-col>
        <el-col :span="4" class="price">{{ todayOrder }}</el-col>
        <el-col :span="5" class="title">今日销量：</el-col>
        <el-col :span="4" class="price">{{ todaySale }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="title" :offset="2">本周订单：</el-col>
        <el-col :span="4" class="price">{{ weekOrder }}</el-col>
        <el-col :span="5" class="title">本周销量：</el-col>
        <el-col :span="4" class="price">{{ weekSale }}</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { cornerOrder, pendingOrder, todayOrder, todaySale, weekOrder, weekSale } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  data() {
    return {
      cornerOrder: 140,
      pendingOrder: 12,
      todayOrder: 5,
      todaySale: 15,
      weekOrder: 78,
      weekSale: 60
    }
  },
  mounted() {
    // cornerOrder().then(res => {
    //   this.cornerOrder = res.data
    // })
    // pendingOrder().then(res => {
    //   this.pendingOrder = res.data
    // })
    // todayOrder().then(res => {
    //   this.todayOrder = res.data
    // })
    // todaySale().then(res => {
    //   this.todaySale = res.data
    // })
    // weekOrder().then(res => {
    //   this.weekOrder = res.data
    // })
    // weekSale().then(res => {
    //   this.weekSale = res.data
    // })
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-row {
  margin-bottom: 40px;
}
.title {
  font-size: 20px;
}
.price {
  font-size: 36px;
  color: #409EFF;
  font-weight: bold;
}
.dashboard {
  &-container {
    margin: 30px;
    
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
