<template>
  <div>
    <el-card class="user" >
      <div slot="header">
        <span>基本信息</span>
      </div>
      <el-row type="flex" align="bottom">
        <el-col :span="3" :offset="1">
          <img class="avatar" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="">
        </el-col>
        <el-col :span="3">姓名：{{ user.nickName }}</el-col>
        <el-col :span="6">手机号：{{ user.mobile }}</el-col>
        <el-col :span="9">地区：{{ user.area }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="4">性别：{{ user.sex === '0' ? '男' : '女' }}</el-col>
        <el-col :span="6">微信号：{{ user.weChat }}</el-col>
        <el-col :span="9">成为客户：{{ user.createdAt }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="4">描述：{{ user.description }}</el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>标签信息</span>
        <el-popover
          title="标题"
          width="200"
          trigger="click">
          <el-select v-model="myTags" @visible-change = "getChange" multiple filterable placeholder="选择标签">
            <el-option
              v-for="item in tagNames"
              :key="item.tagId"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-button slot="reference" type="text" size="mini">编辑</el-button>
        </el-popover>
      </div>
      <el-tag
        v-for="(item, index) in myTags"
        :key="index"
      >
        {{ item }}
      </el-tag>
    </el-card>
    <el-card class="browse">
      <div slot="header">
        <span>浏览信息</span>
      </div>
      <el-row>
        <el-col v-for="item in browse" :key="item.productId" :span="6">
          <el-row>
            <el-col :span="24">
              <img :src="item.image" alt="浏览信息">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" >名字：{{ item.name }}</el-col>
            <el-col :span="12" >￥ {{ item.price }}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="bought">
      <div slot="header">
        <span>购买记录</span>
      </div>
      <el-row>
        <el-col v-for="item in bought" :key="item.productId" :span="6">
          <el-row>
            <el-col :span="24">
              <img :src="item.image" alt="购买记录">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" >名字：{{ item.name }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" >￥ {{ item.price }}</el-col>
            <el-col :span="12" :offset="5" >客单价 {{ item.price }}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="trade">
      <div slot="header">
        <span>交易统计</span>
      </div>
      <el-row :gutter="20" class="trade-desc">
        <el-col :span="4">最近下单时间</el-col>
        <el-col :span="4">客单价</el-col>
        <el-col :span="4">累计消费金额</el-col>
        <el-col :span="4">累计订单数</el-col>
        <el-col :span="4">累计退款金额</el-col>
        <el-col :span="4">累计退款订单数</el-col>
      </el-row>
      <el-row :gutter="20" class="trade-info">
        <el-col :span="4">{{ trade.lastTradeTime }}</el-col>
        <el-col :span="4">{{ trade.realPrice }}</el-col>
        <el-col :span="4">{{ trade.tradeCount }}</el-col>
        <el-col :span="4">{{ trade.tradeAmount }}</el-col>
        <el-col :span="4">{{ trade.refundCount }}</el-col>
        <el-col :span="4">{{ trade.refundAmount }}</el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { getInfo, getBought, getBrowse, getTag, getTrade } from '@/api/customerBehavior'
import { getTagList } from '@/api/tag'
import { add } from '@/api/tagCustomer'
export default {
  data() {
    return {
      customerId: '',
      user: {},
      trade: {
        lastTradeTime: '2019-03-29T13:38:59.990Z',
        realPrice: 0,
        refundAmount: 0,
        refundCount: 0,
        tradeAmount: 0,
        tradeCount: 0
      },
      browse: [],
      bought: [],
      tagNames: [],
      myTags: []
    }
  },
  mounted() {
    const list = this.$route.params
    this.customerId = list.customerId
    if (list && list.customerId) {
      getInfo(list).then(res => {
        console.log(res)
        this.user = res.data
      })
      getBought(list).then(res =>{
        console.log(res)
        this.bought = res.data
      })
      getBrowse(list).then(res => {
        console.log(res)
        this.browse = res.data
      })
      getTag(list).then(res => {
        console.log(res)
        this.myTags = res.data.tagNames
      })
      getTrade(list).then(res => {
        console.log(res)
        this.trade = res.data
      })
      const tagList = {
        businessId: 1,
        page: 1,
        pageSize: 1000,
        isAuto: ''
      }
      getTagList(JSON.stringify(tagList)).then(res => {
        console.log(res)
        this.tagNames = res.data
      })
    }
    else {
      this.$router.push({
        name: 'UserList'
      })
    }
  },
  methods: {
    getChange(e) {
      let list = {
        customerId: this.customerId,
        tagIds: [],
        tagSource: 0
      }
      for (let i = 0; i < this.myTags.length; i++) {
        for (let j = 0; j < this.tagNames.length; j++) {
          if(this.myTags[i] === this.tagNames[j].name)
          list.tagIds.push(this.tagNames[j].tagId)
        }        
      }
      console.log(list)
      // add(list).then(res => {
      //   console.log(res)
      // })
    }
    
  }
}
</script>
<style scoped>
.el-card {
  margin: 20px;
}
.el-select {
  margin-bottom: 10px;
}
.user {
  font-size: 14px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-tag {
  margin-left: 20px;
}
.browse img {
  max-width: 200px;
  max-height: 200px;
  background: black;
}
.browse .el-row {
  margin: 10px;
}
.bought .el-row {
  margin-top: 10px;
}
.bought img {
  max-width: 200px;
  max-height: 200px;
}
.trade .el-row {
  margin-top: 10px;
}
.trade-desc {
  text-align: center;
}
.trade-info {
  text-align: center;
  font-size: 20px;
  color: #409EFF;
}
</style>
