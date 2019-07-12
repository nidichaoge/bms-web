<template>
  <div>
    <el-form ref="customer" :rules="rules" label-position="center" :model="customer" label-width="80px">
      <el-form-item label="用户名" prop="nickName">
        <el-input v-model="customer.nickName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="customer.gender">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="customer.mobile"></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="customerDetailInfo.weChat">
        <el-input v-model="customer.customerDetailInfo.weChat"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="customerDetailInfo.birthday">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          style="width: 100%"
          v-model="customer.customerDetailInfo.birthday"
          :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item label="省/市" prop="customerDetailInfo.area">
        <el-input v-model="customer.customerDetailInfo.area"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="customer.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('customer')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getInfo } from '@/api/customerBehavior'
import { editCustomer, addCustomer } from '@/api/customer'
export default {
  data() {
    return {
      customer: {
        businessId: 1,
        customerDetailInfo: {
          weChat: '',
          birthday: '',
          anniversary: new Date(),
          area: ''
        },
        nickName: '',
        mobile: '',
        gender: '',
        description: ''
      },
      isUpdate: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rules: {
        'nickName': [
          { required: true, message: '请选择姓名' }
        ],
        'gender': [
          { required: true, message: '请选择性别' }
        ],
        'mobile': [
          { required: true, message: '请输入手机号' },
          { min: 11, max: 11, message: '手机号长度错误' }
        ],
        'customerDetailInfo.weChat': [
          { required: true, message: '请输入微信号' }
        ],
        'customerDetailInfo.birthday': [
          { required: true, message: '请选择生日' }
        ],
        'customerDetailInfo.area': [
          { required: true, message: '请填写地区' }
        ],
      }
    }
  },
  mounted() {
    const list = this.$route.params
    if (list && list.customerId) {
      this.isUpdate = true
      getInfo(list)
      .then(res => {
        const data = res.data
        this.customer = {
          customerDetailInfo: {
            weChat: data.weChat,
            birthday: data.birthday,
            anniversary: data.anniversary,
            area: data.area
          },
          nickName: data.nickName,
          mobile: data.mobile,
          gender: data.sex,
          description: data.description
        }
      })
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isUpdate) {
            editCustomer(this.customer)
            .then(res => {
               this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.$router.push({
                name: 'UserList'
              })
            }).catch(err => {
              this.$message({
                message: `失败,${err}`,
                type: 'error'
              });
            })
          }
          else {
            addCustomer(this.customer)
            .then(res => {
               this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.$router.push({
                name: 'UserList'
              })
            }).catch(err => {
              this.$message({
                message: `失败,${err}`,
                type: 'error'
              });
            })
          }
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
  .el-form {
    margin: 30px auto;
    width: 50%;
    min-width: 300px;
  }
</style>
