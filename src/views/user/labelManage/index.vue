<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4" :offset="1">
        <el-button type="primary" @click="goAddPage">新建标签</el-button>
      </el-col>
      <el-col :span="4" :offset="12">
        <el-select
          v-model="list.isAuto"
          @change="searchTag">
          <el-option
            v-for="(item, index) in tagType"
            :key="index"
            :label="item.name"
            :value="item.value"
            >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table
      :data="tags"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"></el-table-column>
      <el-table-column
        prop="tagId"
        label="标签号"
        min-width="55"></el-table-column>
      <el-table-column
        prop="name"
        label="标签名"
        min-width="80"></el-table-column>
      <el-table-column
        prop="customerNum"
        label="顾客数量"
        min-width="120"></el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建日期"
        min-width="150"></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        min-width="150"></el-table-column>
      <el-table-column
        label="修改"
        min-width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="goEditPage(scope.$index)">编辑</el-button>
          <el-popover
            v-model="visible[scope.$index]"
            title="确定删除标签？"
            width="200"
            trigger="click">
            <el-button size="mini" type="primary" @click="deletedTag(scope.$index)">确定</el-button>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="4">
        <el-button size="mini" @click="dialogVisible = true">批量删除</el-button>
      </el-col>
      <el-dialog
        :visible.sync="dialogVisible"
        title="提示"
        width="50%">
        <span>确定批量删除标签吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteBatch">确 定</el-button>
        </span>
      </el-dialog>
      <el-col :span="5" :offset="12">
        <span>共{{ tags.length }}条</span>
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
        @current-change="handleCurrentChange"></el-pagination>
    </el-row>
  </div>
</template>
<script>
import { getTagList, deleteById, deleteBatch } from '@/api/tag.js'
export default {
  data() {
    return {
      tagType: [
        {
          name: '自动标签',
          value: true
        },
        {
          name: '手动标签',
          value: false
        }
      ],
      list: {
        businessId: 1,
        page: 0,
        pageSize: 10,
        order: 'asc',
        isAuto: false
      },
      tags: [],
      visible: [],
      dialogVisible: false,
      selectedTag: []
    }
  },
  mounted() {
    this.getList(this.list)
  },
  methods: {
    getList(list) {
      console.log(list)
      getTagList(JSON.stringify(list))
      .then(res => {
        this.tags = res.data
      })
    },
    searchTag() {
      this.getList(this.list)      
    },
    handleSelectionChange(e) {
      this.selectedTag = e
      console.log(this.selectedTag)
    },
    handleCurrentChange(e) {
      this.list.page = e
      this.getList(this.list)
    },
    deleteBatch() {
      this.dialogVisible = false
      let tagIds = []
      const selectedTag = this.selectedTag
      for (let i = 0; i < selectedTag.length; i++) {
        tagIds.push(selectedTag[i].tagId)
      }
      deleteBatch({ tagIds: tagIds })
      .then(res => {
        this.getList(this.list)
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
    },
    goAddPage() {
      this.$router.push({
        name: 'UpdateTag'
      })
    },
    goEditPage(index) {
      this.$router.push({
        name: 'UpdateTag',
        params: {...this.tags[index], auto: this.list.isAuto}
      })
    },
    deletedTag(index) {
      deleteById({ tagId: this.tags[index].tagId })
      .then(res => {
        this.getList(this.list)
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
    }
  }
}
</script>
<style scoped>
  .el-row {
    margin-top: 20px;
  }
</style>
