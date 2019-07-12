<template>
  <div>
    <el-form ref="goods" :rules="rules" label-position="center" :model="goods" label-width="100px">
      <el-form-item label="花费价格" prop="costPrice">
        <el-input v-model="goods.costPrice"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="goods.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="image">
        <el-upload
          ref="upload"
          :limit="5"
          action=""
          :auto-upload=false
          list-type="picture-card"
          :on-change="getChange"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述" prop="infoDescription">
        <el-input v-model="goods.infoDescription" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="inventory">
        <el-input v-model="goods.inventory"></el-input>
      </el-form-item>
      <el-form-item label="市场价" prop="marketPrice">
        <el-input v-model="goods.marketPrice"></el-input>
      </el-form-item>
      <el-form-item label="邮费" prop="postage">
        <el-input v-model="goods.postage"></el-input>
      </el-form-item>
      <el-form-item label="价格描述" prop="priceDescription">
        <el-input v-model="goods.priceDescription" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="利润" prop="profits">
        <el-input v-model="goods.profits"></el-input>
      </el-form-item>
      <el-form-item label="拍卖" prop="sale">
        <el-input v-model="goods.sale"></el-input>
      </el-form-item>
      <el-form-item label="分组" prop="secondCategoryId">
        <el-popover
          placement="bottom"
          width="1000"
          v-model="showGroup">
          <groupList :isVisible="isVisible" @getGroup="getGroup"></groupList>
          <el-button slot="reference" type="primary">选择</el-button>
        </el-popover>
        <el-input readonly style="width: 50%; margin-left: 30%;" v-model="goods.secondCategoryId"></el-input>
      </el-form-item>
      <el-form-item label="售价" prop="sellPrice">
        <el-input v-model="goods.sellPrice"></el-input>
      </el-form-item>
      <el-form-item label="服务" prop="service">
        <el-checkbox-group v-model="goods.service">
          <el-checkbox v-for="item in services" v-bind:key="item.value" :label="item.value">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="goods.status">
          <el-radio v-for="item in status" v-bind:key="item.value" :label="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="goods.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="重量" prop="weight">
        <el-input v-model="goods.weight" placeholder="单位：kg"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('goods')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import groupList from '../groupManage/component/groupList'
import { getGroupList, getSecondGroupList } from '@/api/category'
import { addProduct, editProduct, getProductInfo } from '@/api/product'
export default {
  components: {
    groupList
  },
  data() {
    return {
      isVisible: true,
      goods: {
        brandId: 0,
        businessId: 1,
        color: 0,
        costPrice: '',
        description: '',
        image: '',
        infoDescription: '',
        inventory: '',
        marketPrice: '',
        profits: '',
        sale: '',
        secondCategoryId: '',
        sellPrice: '',
        service: [],
        status: '0',
        title: '',
        weight: '',
        groupName: '',
      },
      
      services: [
        {
          name: '七天包退',
          value: '0'
        },
        {
          name: '免运费',
          value: '1'
        }
      ],
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
      isUpdate: false,
      showGroup: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      rules: {
        'costPrice': [
          { required: true, message: '请填写进价' }
        ],
        'description': [
          { required: true, message: '请填写描述' }
        ],
        'infoDescription': [
          { required: true, message: '请填写信息描述' }
        ],
        'inventory': [
          { required: true, message: '请填写库存' }
        ],
        'image': [
          { required: true, message: '请填写图片地址' }
        ],
        'marketPrice': [
          { required: true, message: '请填写市场价' }
        ],
        'secondCategoryId': [
          { required: true, message: '请选择商品分组' }
        ],
        'postage': [
          { required: true, message: '请填写邮费' }
        ],
        'priceDescription': [
          { required: true, message: '请填写价格描述' }
        ],
        'profits': [
          { required: true, message: '请填写利润' }
        ],
        'sale': [
          { required: true, message: '请填写拍卖' }
        ],
        'sellPrice': [
          { required: true, message: '请填写售价' }
        ],
        'status': [
          { required: true, message: '请填写状态' }
        ],
        'title': [
          { required: true, message: '请填写标题' }
        ],
        'weight': [
          { required: true, message: '请填写重量' }
        ],
        
      }
    }
  },
  mounted() {
    const data = this.$route.params
    console.log(data)
    if (data && data.productId) {
      getProductInfo(data).then(res => {
        this.goods = res.data
        console.log(res.data)
      })
      this.isUpdate = true
    }
  },
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    getChange(file, fileList) {
        this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  submitForm(formName) {
      console.log(this.goods)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fileList.length > 0) {

            if (this.isUpdate) {
              editProduct(this.goods).then(res => {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.$router.push({
                  name: 'GoodsList'
                })
              })
            }
            else {
              addProduct(this.goods).then(res => {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.$router.push({
                  name: 'GoodsList'
                })
              })
              .catch(err => {
                this.$message({
                  message: `失败,${err}`,
                  type: 'error'
                });
              })
            }
          }
          else {
              this.$message({
                  message: '请选择图片',
                  type: 'error'
                });
            }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleShowGroup() {
      this.showGroup = true
    },
    getGroup(data) {
      this.goods.secondCategoryId = data.secondCategoryId,
      this.showGroup = false
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
