<template>
  <div>
    <update v-if="isUpdate"></update>
    <update-second v-else></update-second>
  </div>
</template>

<script>
import update from './component/update.vue'
import updateSecond from './component/updateSecond.vue'
export default {
  components: {
    update,
    updateSecond
  },
  data() {
    return {
      isUpdate: true
    }
  },
  mounted() {
    let data = this.$route.params
    if ((data.secondCategoryId) || (!data.name)) {
      this.isUpdate = false
    }
  },
}
</script>

<style>

</style>
