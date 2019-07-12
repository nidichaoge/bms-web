<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="goAddPage">添加商品</el-button>
      </el-col>
      <el-col :span="3" :offset="15">
        <el-select v-model="list.status" @change="getStatusChange" placeholder="请选择">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"></el-table-column>
      <el-table-column
        label="图片"
        min-width="120">
          <template slot-scope="scope">
            <img class="image" :src="scope.row.image" alt="图片" />
          </template>
        </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="120"></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        min-width="80"></el-table-column>
      <el-table-column
        prop="count"
        label="数量"
        min-width="80"></el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        min-width="120"></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        min-width="120"></el-table-column>
      <el-table-column
        label="修改"
        min-width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="goEditPage(scope.$index, scope.row)">编辑</el-button>
            <el-popover
          title="标题"
          width="200"
          trigger="click">
          <el-select v-model="changeStatus" filterable placeholder="更换状态">
            <el-option
              v-for="(item, index) in status"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="handleChangeStatus(scope.$index)">确定</el-button>
          <el-button size="mini" slot="reference">修改状态</el-button>
        </el-popover>
          
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="2">
        <el-popover
          title="标题"
          width="200"
          trigger="click">
          <el-select v-model="changeStatus" filterable placeholder="更换状态">
            <el-option
              v-for="(item, index) in status"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="handleBatchChangeStatus">确定</el-button>
          <el-button slot="reference" size="mini">修改商品状态</el-button>
        </el-popover>
      </el-col>
      <el-col :span="5" :offset="15">
        <span>当前 {{ tableData.length }} 条 / 共 {{ count }} 条</span>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center">
      <el-pagination
        :page-size="20"
        :pager-count="11"
        :total="100"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { getProductCount, getProductList, updateStatus, updateBatchStatus } from '@/api/product'
export default {
  data() {
    return {
      list: {
        businessId: 1,
        page: 1,
        pageSize: 10,
        status: '0'
      },
      count: '',
      tableData: [],
      selectGoods: [],
      status: [
        {
          name: '上架',
          value: '0'
        },
        {
          name: '预售',
          value: '1'
        },
        {
          name: '下架',
          value: '2'
        }
      ],
      changeStatus: ''
    }
  },
  mounted() {
    this.getList(this.list)
  },
  methods: {
    getList(list) {
      getProductList(JSON.stringify(list)).then(res => {
        console.log(res)
        const data = res.data
        const images = [
          'https://resource.smartisan.com/resource/daa975651d6d700c0f886718c520ee19.jpg',
          'https://resource.smartisan.com/resource/406eddef8808fa5a9be9594d07ef8643.jpg',
          'https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg',
          'https://resource.smartisan.com/resource/2f9a0f5f3dedf0ed813622003f1b287b.jpg',
          'https://resource.smartisan.com/resource/3a7522290397a9444d7355298248f197.jpg',
          'http://image.smartisanos.cn/resource/0540778097a009364f2dcbb8c5286451.jpg',
          'http://image.smartisanos.cn/resource/c79a73ffc6f8e782160d978f49f543dc.jpg',
          'http://image.smartisanos.cn/resource/41cb562a47d4831e199ed7e2057f3b61.jpg'
        ]
        const prices = ['￥123', '￥299', '￥58', '￥199', '￥3999', '￥130', '￥15', '￥799']
        data.forEach((v, i)=> {
          v.image = images[i]
          v.price = prices[i]
        });
        this.tableData = data
      })
      getProductCount({ status: this.list.status }).then(res => {
        this.count = res.data
      })
    },
    goAddPage() {
      this.$router.push({
        name: 'UpdateGoods'
      })
    },
    getStatusChange(i) {
      this.getList(this.list)
    },
    goEditPage(index, row) {
      const goods = {
        productId: row.productId
      }
      this.$router.push({
        name: 'UpdateGoods',
        params: goods
      })
    },
    handleSelectionChange(e) {
      this.selectGoods = e
    },
    handleChangeStatus(i) {
      const list = {
        productId: this.tableData[i].productId,
        status: this.changeStatus
      }
      this.changeStatus = ''
      console.log(list)
      updateStatus(list).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.getList(this.list)
      })
      
    },
    handleBatchChangeStatus() {
      const list = {
        businessId: 1,
        productIds: [],
        status: this.changeStatus
      }
      console.log(this.selectGoods)
      for (let i = 0; i < this.selectGoods.length; i++) {
        list.productIds.push(this.selectGoods[i].productId)
      }
      this.changeStatus = ''
      updateBatchStatus(list).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.getList(this.list)
      })
    },
    handleCurrentChange(e) {
      this.list.page = e
      this.getList(this.list)
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
.image {
  width: 50px;
  height: 50px;
}
</style>

