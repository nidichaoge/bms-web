<template>
  <div>
    <el-form ref="tag" :rules="rules" label-position="center" :model="tag" label-width="80px">
      <el-form-item label="标签名字" prop="name">
        <el-input v-model="tag.name"></el-input>
      </el-form-item>
      <el-form-item label="标签类型" prop="auto">
        <el-radio-group v-model="tag.auto">
          <el-radio :label="true">自动标签</el-radio>
          <el-radio :label="false">手动标签</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="tag.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('tag')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {createTag, editTag } from '@/api/tag'
export default {
  data() {
    return {
      tag: {
        businessId: 1,
        name: '',
        auto: '',
        description: ''
      },
      isUpdate: false,
      rules: {
        'name': [
          { required: true, message: '请填写标签姓名' }
        ],
        'auto': [
          { required: true, message: '请选择标签类型' }
        ]
      }
    }
  },
  mounted() {
    let tag = this.$route.params;
    if (tag && tag.name) {
      this.tag = {
        businessId: 1,
        name: tag.name,
        auto: tag.auto,
        description: tag.description
      }
      this.isUpdate = true
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.customer)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isUpdate) {
            editTag(this.tag)
            .then(res => {
               this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.$router.push({
                name: 'LabelManage'
              })
            }).catch(err => {
              this.$message({
                message: `失败,${err}`,
                type: 'error'
              });
            })
          }
          else {
            createTag(this.tag)
            .then(res => {
               this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.$router.push({
                name: 'LabelManage'
              })
            }).catch(err => {
              this.$message({
                message: `失败,${err}`,
                type: 'error'
              });
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.el-form {
    margin: 30px auto;
    width: 50%;
    min-width: 300px;
  }
</style>

