<template>
  <div>
    <el-collapse v-model="activeListIndex" accordion @change="getSecondList">
      <el-collapse-item :name="index" v-for="(list, index) in data" v-bind:key="list.categoryId">
        <template slot="title">
          
          <span style="margin-left: 20px;">分组名：{{list.name}}</span>
          <span style="margin-left: 20px;">二级分组数：{{ list.secondCategoryNum }}</span>
            <span style="margin-left: 20px;">商品数量：{{ list.productNum }}</span>
          <el-button type="text" size="mini" @click="handleEdit(index)">编辑</el-button>
          <el-button type="text" size="mini" @click="handleDelete(index)">删除</el-button>
          <el-button type="text" size="mini" @click="goAddSecondGroup(index)">创建二级分组</el-button>
        </template>
        <el-row v-for="(item, i) in secondData" v-bind:key="i">
          <el-col :span="5" style="margin-left: 20px;">二级分组名：{{ item.name }}</el-col>
          <el-col :span="5" style="margin-left: 20px;">商品数量：{{ item.productNum }}</el-col>

          <el-col :span="1">
            <el-button type="text" size="mini" @click="handleSecondEdit(index, i)">编辑</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="text" size="mini" @click="handleSecondDelete(index, i)">删除</el-button>
          </el-col>
          <el-col :span="1" v-if="isVisible">
            <el-button type="text" size="mini" @click="getGroup(index, i)">选择</el-button>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          justify="center">
          <el-pagination
            :page-size="20"
            :pager-count="11"
            :total="1000"
            layout="prev, pager, next"
            @current-change="handleSecondCurrentChange"></el-pagination>
        </el-row>
      </el-collapse-item>
    </el-collapse>
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
import { getGroupList, getSecondGroupList, deleteGroup } from '@/api/category'
export default {
  name: 'group',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeListIndex: '',
      list: {
        businessId: 1,
        page: 1,
        pageSize: 10,
      },
      secondList: {
        businessId: 1,
        page: 1,
        pageSize: 10,
        categoryId: 1
      },
      secondListPage: '',
      data: [],
      secondData: []
    }
  },
  mounted() {
    this.getList(this.list)
  },
  methods: {
    getList(list) {
      getGroupList(JSON.stringify(list)).then(res => {
        console.log(res.data)
        this.data = res.data
      })
    },
    getSecondList(e) {
      this.secondListPage = e
      if (e !== '') {
        this.secondList.categoryId = this.data[e].categoryId
        this.secondList.page = 1
        getSecondGroupList(JSON.stringify(this.secondList)).then(res => {
          this.secondData = res.data
          console.log(res)
        })
      }
    },
    handleDelete(index) {
      console.log(index)
      const list = {
        categoryId: this.data[index].categoryId,
        isHeader: true
      }
      deleteGroup(list).then(res => {
        this.$message({
          message: '删除分组成功',
          type: 'success'
        });
        this.getList(this.list)
      })
    },
    handleSecondDelete(index, i) {
      const list = {
        categoryId: this.secondData[i].category2Id,
        isHeader: false,
      }
      deleteGroup(list).then(res => {
        this.$message({
                message: '删除二级分组成功',
                type: 'success'
              });
        this.getSecondList(this.secondListPage)
      })

    },
    goAddSecondGroup(index) {
      this.$router.push({
        name: 'UpdateGroup',
        params: {
          businessId: 1,
          categoryId: this.data[index].categoryId,
          name: '',
          firstname: this.data[index].name,
          description: ''
        }
      })
    },
    handleEdit(index) {
      this.$router.push({
        name: 'UpdateGroup',
        params: {
          businessId: 1,
          categoryId: this.data[index].categoryId,
          name: this.data[index].name,
          description: this.data[index].description
        }
      })
    },
    handleSecondEdit(index, i) {
      this.$router.push({
        name: 'UpdateGroup',
        params: {
          businessId: 1,
          categoryId: this.data[index].categoryId,
          secondCategoryId: this.secondData[i].category2Id,
          name: this.secondData[i].name,
          firstname: this.data[index].name,
          description: this.secondData[i].description
        }
      })
    },
    getGroup(index, i) {
      const data = {
        categoryId: this.data[index].categoryId,
        secondCategoryId: this.secondData[i].category2Id,
        category: this.data[index].name,
        secondCategory: this.secondData[i].name
      }
      this.$emit('getGroup', data)
    },
    handleCurrentChange(e) {
      this.list.page = e
      this.getList(this.list)
    },
    handleSecondCurrentChange(e) {
      this.secondList.page = e
      getSecondGroupList(JSON.stringify(this.secondList)).then(res => {
          this.secondData = res.data
        })
    }
  }
}
</script>
<style scoped>
  .create {
    margin: 20px;
  }
  .el-collapse {
    margin: 20px;
  }
  .el-button {
    margin-left: 30px;
  }
</style>

