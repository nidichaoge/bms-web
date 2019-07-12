<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="1">
        <el-button type="primary" @click="goAddPage">添加用户</el-button>
      </el-col>
      <el-col :span="6" :offset="8">
        <el-input v-model="mobile" placeholder="输入手机号"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="primary" @click="filterData">查询</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"></el-table-column>
      <el-table-column
        prop="nickName"
        label="姓名"
        min-width="80"></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        min-width="120"></el-table-column>
      <el-table-column
        prop="credit"
        label="信用"
        sortable="custom"
        min-width="100"></el-table-column>
      <el-table-column
        prop="tradeCount"
        label="总账户"
        sortable="custom"
        min-width="100"></el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        min-width="120"></el-table-column>
      <el-table-column
        prop="lastTradeTime"
        label="最后交易时间"
        min-width="120"></el-table-column>
      <el-table-column
        label="修改"
        min-width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="goEditPage(scope.$index)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="goDetailPage(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="2">
        <el-popover
          v-model="visible"
          title="标题"
          width="200"
          trigger="click">
          <el-select v-model="updateTag" filterable placeholder="选择标签">
            <el-option
              v-for="item in tagNames"
              :key="item.tagId"
              :label="item.name"
              :value="item.tagId">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="handleAddTags">确定</el-button>
          <el-button slot="reference" size="mini" @click="visible = true">批量添加标签</el-button>
        </el-popover>
      </el-col>
      <el-col :span="2">
        <el-popover
          v-model="visible2"
          title="标题"
          width="200"
          trigger="click">
          <el-select v-model="updateTag" filterable placeholder="选择标签">
            <el-option
              v-for="item in tagNames"
              :key="item.tagId"
              :label="item.name"
              :value="item.tagId">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="handleDeleteTags">确定</el-button>
          <el-button slot="reference" type="danger" size="mini" @click="visible2 = true">批量删除标签</el-button>
        </el-popover>
      </el-col>
      <el-col :span="5" :offset="12">
        <span>当前 {{ tableData.length }} 条 / 共 {{ allList }} 条</span>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center">
      <el-pagination
        :page-size="10"
        :total="allList"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { getCustomerCount, getCustomerList, searchByMobile } from '@/api/customer'
import { getTagList } from '@/api/tag'
import { addBatch, removeBatch } from '@/api/tagCustomer'
import axios from 'axios'
export default {
  data() {
    return {
      list: {
        businessId: 1,
        page: 0,
        pageSize: 10,
        order: '',
        orderBy: '',
      },
      tableData: [
      ],
      mobile: '',
      allList: 0,
      customerIds: [],
      visible: false,
      visible2: false,
      tagNames: [],
      updateTag: ''
    }
  },
  mounted() {
    const tagList = {
        businessId: 1,
        page: 1,
        pageSize: 1000,
        isAuto: ''
      }
      getTagList(JSON.stringify(tagList)).then(res => {
        this.tagNames = res.data
      })
    getCustomerCount().then(res => {
      this.allList = res.data
    })
    this.getList(this.list)
  },
  methods: {
    getList(list) {
      getCustomerList(JSON.stringify(list)).then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    getCustomerCount() {
      getCustomerCount()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    filterData() {
      let mobile = this.mobile
      let list = this.list
      list.keyword = mobile
      this.getList(list)
      // if (mobile) {
      //   let list = {
      //     mobile: mobile
      //   }
      //   searchByMobile(list).then(res => {
      //     console.log(res)
      //     console.log([res.data])
      //     this.tableData = [res.data]
      //   })
      // }
      // else {
      //   this.getList(this.list)
      // }
    },
    goAddPage() {
      this.$router.push({
        name: 'UpdateUser'
      })
    },
    formatter(row, column) {
      return row.address
    },
    goEditPage(index) {
      console.log(this.tableData[index])
      this.$router.push({
        name: 'UpdateUser',
        params: {
          customerId: this.tableData[index].customerId
        }
      })
    },
    goDetailPage(index) {
      this.$router.push({
        name: 'UserDetail',
        params: {
          customerId: this.tableData[index].customerId
        }
      })
    },
    handleSelectionChange(e) {
      this.customerIds = []
      for (let i = 0; i < e.length; i++) {
        this.customerIds.push(e[i].customerId)
      }
    },
    handleAddTags() {
      if (this.customerIds.length > 0) {
        this.visible = false
        let list = {
          businessId: 1,
          customerIds: this.customerIds,
          tagId: this.updateTag,
          tagSource: 0
        }
        addBatch(list).then(res => {
          console.log(res)
          this.$message({
                message: '操作成功',
                type: 'success'
              });
        })
        this.updateTag = ''
      }
    },
    handleDeleteTags() {
      if (this.customerIds.length > 0) {
        this.visible2 = false
        let list = {
          businessId: 1,
          customerIds: this.customerIds,
          tagId: this.updateTag
        }
        removeBatch(list)
          .then(res => {
               this.$message({
                message: '操作成功',
                type: 'success'
              });
            }).catch(err => {
              this.$message({
                message: `失败,${err}`,
                type: 'error'
              });
            })
        this.updateTag = ''
      }
    },
    handleCurrentChange(e) {
      console.log(e)
      this.list.page = e
      this.getList(this.list)
    },
    handleSortChange(e) {
      console.log(e) // 请求
    }
  }
}
</script>
<style>
.el-row {
  margin-top: 30px;
}
.el-select {
margin-bottom: 10px;
}
</style>

