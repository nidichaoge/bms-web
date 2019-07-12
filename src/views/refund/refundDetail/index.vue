<template>
  <div>
    <el-card class="user" >
      <div slot="header">
        <span>详细信息</span>
      </div>
      <el-row type="flex" align="bottom">
        <el-col :span="4" :offset="2">顾客id：{{ data.buyerDO.buyerId }}</el-col>
        <el-col :span="6">手机号：{{ data.buyerDO.telephone }}</el-col>
        <el-col :span="9">购物时间：{{ data.shipTime }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">原价：{{ data.priceDO.originPrice }}</el-col>
        <el-col :span="6">当前价格：{{ data.priceDO.originPrice }}</el-col>
        <el-col :span="9">邮费：{{ data.priceDO.postage }}</el-col>
      </el-row>
      <el-row>
       <el-col :span="4" :offset="2">促销金额：{{ data.priceDO.promotionAmount }}</el-col>
        <el-col :span="6">总价格：{{ data.priceDO.totalPrice }}</el-col>
        <el-col :span="9">备注：{{ data.remark }}</el-col>
      </el-row>
      <el-row>
       <el-col :span="8" :offset="2">创建时间：{{ data.createdTime }}</el-col>
        <el-col :span="8">关闭时间：{{ data.closedTime }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">收到时间：{{ data.receiveTime }}</el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { refundDetail } from '@/api/refundOrder'
export default {
  data() {
    return {
      customerId: '',
      user: {},
      data: {}
    }
  },
  mounted() {
    const list = this.$route.params
    refundDetail(list).then(res => {
      this.data = res.data
      console.log(res.data)
    })
  },
  methods: {
  }
}
</script>
<style scoped>
.el-card {
  margin: 20px;
}
.el-select {
  margin-bottom: 10px;
}
.user {
  font-size: 14px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-tag {
  margin-left: 20px;
}
.browse img {
  max-width: 200px;
  max-height: 200px;
  background: black;
}
.browse .el-row {
  margin: 10px;
}
.bought .el-row {
  margin-top: 10px;
}
.bought img {
  max-width: 200px;
  max-height: 200px;
}
.trade .el-row {
  margin-top: 10px;
}
.trade-desc {
  text-align: center;
}
.trade-info {
  text-align: center;
  font-size: 20px;
  color: #409EFF;
}
</style>

