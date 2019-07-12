<template>
  <div>
    <el-row :gutter="20" type="flex" justify="start">
      <el-col :span="4" :offset="1">
        <el-button type="primary" @click="goAddGroupPage">创建分组</el-button>
      </el-col>
    </el-row>
    <group-list :isVisible="isVisible" @getGroup="getGroup"></group-list>
  </div>
</template>
<script>
import groupList from './component/groupList'
export default {
  components: {
    groupList
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    goAddGroupPage() {
      this.$router.push({
        name: 'CreateGroup'
      })
    },
    getGroup(data) {
      console.log(data)
    }
  }
}
</script>
<style scoped>
.el-row {
  margin-top: 30px;
}
</style>
