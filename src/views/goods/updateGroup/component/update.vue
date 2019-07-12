<template>
  <div class="update">
    <el-form ref="list" :rules="rules" label-position="center" :model="list" label-width="110px">
      <el-form-item label="分组名字" prop="name">
        <el-input v-model="list.name"></el-input>
      </el-form-item>
      <el-form-item label="分组描述" prop="description">
        <el-input type="textarea" v-model="list.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('list')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { editGroup } from '@/api/category'
export default {
  name: 'update',
  data() {
    return {
      list: {
        businessId: 1,
        categoryId: '',
        description: '',
        name: ''
      },
      rules: {
        'name': [
          { required: true, message: '请输入分组姓名' }
        ],
      }
    }
  },
  mounted() {
    const data = this.$route.params
    this.list = data
  },
  methods: {
   onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editGroup(this.list).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.$router.push({
              name: 'GroupList'
            })
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
.update {
  width: 50%;
  margin: 30px auto;
}
</style>

