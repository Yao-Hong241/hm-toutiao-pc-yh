<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 下拉框数据
      channelOptions: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    // 获取频道数据
    async getChannels () {
      const { data: { data } } = await this.$http.get('/channels')
      this.channelOptions = data.channels
    },
    // 频道处理函数
    changeChannel (channelId) {
      if (channelId === '') {
        channelId = null
      }
      this.$emit('input', channelId)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
