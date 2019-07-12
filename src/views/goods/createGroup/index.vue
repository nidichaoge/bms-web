<template>
  <div class="create">
    <el-form ref="list" :rules="rules" label-position="center" :model="list" label-width="110px">
      <el-form-item label="分组名字" prop="name">
        <el-input v-model="list.name"></el-input>
      </el-form-item>
      <el-form-item label="分组描述" prop="description">
        <el-input type="textarea" v-model="list.description"></el-input>
      </el-form-item>
      <el-form-item label="二级分组" prop="isCreateSecond">
        <el-switch v-model="list.isCreateSecond"></el-switch>
      </el-form-item>
      <el-form-item label="二级分组名字" prop="category2CreateRequest.name" v-if="list.isCreateSecond">
        <el-input v-model="list.category2CreateRequest.name"></el-input>
      </el-form-item>
      <el-form-item label="二级分组描述" prop="category2CreateRequest.description" v-if="list.isCreateSecond">
        <el-input type="textarea" v-model="list.category2CreateRequest.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('list')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createGroup } from '@/api/category'
export default {
  data() {
    return {
      list: {
        businessId: 1,
        category2CreateRequest: {
          businessId: 1,
          categoryId: '',
          description: '',
          name: ''
        },
        description: '',
        isCreateSecond: false,
        name: ''
      },
      rules: {
        'name': [
          { required: true, message: '请输入分组姓名' }
        ],
        'category2CreateRequest.name': [
          { required: true, message: '请输入二级分组姓名' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createGroup(this.list).then(res => {
          })
          this.$message({
            message: '添加分组成功',
            type: 'success'
          });
          this.$router.push({
            name: 'GroupManage'
          })
        }
        else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.create {
  width: 50%;
  margin: 30px auto;
}
</style>
