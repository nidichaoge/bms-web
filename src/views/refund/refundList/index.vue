<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-left: 20px;">
      <el-table-column
        prop="id"
        label="ID"
        min-width="80"></el-table-column>
      <el-table-column
        prop="closedTime"
        label="关闭时间"
        min-width="100"></el-table-column>
        <el-table-column
        prop="remark"
        label="备注"
        min-width="150"></el-table-column>
      <el-table-column
        label="修改"
        min-width="200">
        <template slot-scope="scope">
          <el-button
            type="error"
            size="mini"
            @click="handlePlus(scope.$index)">退货</el-button>
          <el-button
            size="mini"
            @click="goDetailPage(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="5" :offset="14">
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
import { refundList, refundPlus } from '@/api/refundOrder'
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
      tagNames: [],
      updateTag: ''
    }
  },
  mounted() {
    this.getList(this.list)
  },
  methods: {
    getList(list) {
      refundList(JSON.stringify(list)).then(res => {
        console.log(res)
        this.tableData = res.data
      }).catch(res => {
        console.log(res)
      })
    },
    goDetailPage(index) {
      this.$router.push({
        name: 'OrderDetail',
        params: {
          orderNo: this.tableData[index].orderNo
        }
      })
    },
    handlePlus(e) {
      const list = {
        orderNo: this.tableData[e].orderNo
      }
      refundPlus(list).then(res => {
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

