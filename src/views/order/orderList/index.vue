<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"></el-table-column>
      <el-table-column
        prop="orderNo"
        label="订单编号"
        min-width="200"></el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        min-width="100"></el-table-column>
      <el-table-column
        prop="payType"
        label="是否支付"
        min-width="100"></el-table-column>
      <el-table-column
        prop="payWayType"
        label="支付方式"
        min-width="100"></el-table-column>
        <el-table-column
        prop="createdAt"
        label="创建时间"
        min-width="200"></el-table-column>
      <el-table-column
        label="修改"
        min-width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handlePlus(scope.$index)">发货</el-button>
          <el-button
            size="mini"
            @click="goDetailPage(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="handlePlusBatch">批量发货</el-button>
      </el-col>
      <el-col :span="5" :offset="12">
        <span>当前 {{ tableData.length }} 条</span>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center">
      <el-pagination
        :page-size="20"
        :pager-count="11"
        :total="500"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { orderList, orderPlus, orderPlusBatch } from '@/api/order'
import axios from 'axios'
export default {
  data() {
    return {
      list: {
        businessId: 1,
        page: 0,
        pageSize: 10,
        order: 'desc',
        orderBy: 'createdTime'
      },
      tableData: [
      ],
      allList: '',
      orderNos: [],
      tagNames: [],
      updateTag: ''
    }
  },
  mounted() {
    this.getList(this.list)
  },
  methods: {
    getList(list) {
      orderList(JSON.stringify(list)).then(res => {
        this.tableData = res.data
      })
    },
    goDetailPage(index) {
      this.$router.push({
        name: 'OrderDetail',
        params: {
        }
      })
    },
    handleSelectionChange(e) {
      this.orderNos = []
      for (let i = 0; i < e.length; i++) {
        this.orderNos.push(e[i].orderNo)
      }
      console.log(this.orderNos)
    },
    handlePlus(e) {
      const list = {
        orderNo: this.tableData[e].orderNo
      }
      orderPlus(list).then(res => {
        this.$message({
          message: '发货成功',
          type: 'success'
        });
      })
      .catch(err => {
        this.$message({
          message: `失败,${err}`,
          type: 'error'
        });
      })
    this.getList(this.list)

    },
    handleCurrentChange(e) {
      this.list.page = +e - 1
      this.getList(this.list)
    },
    handlePlusBatch() {
      console.log(this.orderNos)
      const list = {
        orderNos: this.orderNos
      }
      orderPlusBatch(list).then(res => {
        this.$message({
          message: '批量发货成功',
          type: 'success'
        });
        console.log(res)
      })
      .catch(err => {
        this.$message({
          message: `失败,${err}`,
          type: 'error'
        });
      })
    this.getList(this.list)
    },
    goDetailPage(e) {
      this.$router.push({
        name: 'OrderDetail',
        params: {
          orderNo: this.tableData[e].orderNo
        }
      })
    }
  }
}
</script>
<style>
.el-table {
  margin-top: 30px;
}
.el-row {
  margin-top: 30px;
}
.el-select {
margin-bottom: 10px;
}
</style>

