<template>
  <div class="update-second">
    <el-form ref="list" :rules="rules" label-position="center" :model="list" label-width="110px">
      <el-form-item label="分组名字">
        <el-input disabled="true" v-model="list.firstname"></el-input>
      </el-form-item>
      <el-form-item label="二级分组名字" prop="name">
        <el-input v-model="list.name"></el-input>
      </el-form-item>
      <el-form-item label="二级分组描述" prop="description">
        <el-input type="textarea" v-model="list.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('list')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { editSecondGroup, createSecondGroup } from '@/api/category'
export default {
  name: 'updateSecond',
  data() {
    return {
      list: {
        businessId: 1,
        categoryId: 0,
        description: '',
        name: '',
        secondCategoryId: ''
      },
      rules: {
        'name': [
          { required: true, message: '请输入二级分组名字' }
        ],
      },
      isUpdate: false
    }
  },
  mounted() {
    const data = this.$route.params
    this.list = data
    if (data && data.secondCategoryId) {
      this.isUpdate = true
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.isUpdate) {
            editSecondGroup(this.list).then(res => {
              this.$message({
                message: '修改二级分组成功',
                type: 'success'
              });
              this.$router.push({
                name: 'GroupManage'
              })
            })
          }
          else {
            createSecondGroup(this.list).then(res => {
              this.$message({
                message: '创建二级分组成功',
                type: 'success'
              });
              this.$router.push({
                name: 'GroupManage'
              })
            })
          }
        }
        else {
          return false
        }
      })
    }
  },
}
</script>
<style scoped>
.update-second {
  width: 50%;
  margin: 30px auto;
}
</style>

