<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <!-- 频道组件 -->
          <!-- <my-channel :value="filterParams.channel_id" @input="filterParams.channel_id=$event"></my-channel> -->
          <my-channel v-model="filterParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateArr"
            @change="changeDate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sreach()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px;">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px;">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" >待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="delArticles(scope.row.id)" plain type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;text-align:right"
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :total="total"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterParams: {
        status: null, // 状态码
        channel_id: null, // 文章ID
        begin_pubdate: null, // 起始时间
        end_pubdate: null, // 截止时间
        page: 1,
        per_page: 20
      },
      // 日期选择数据
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 编辑
    toEdit (articleId) {
      this.$router.push(`/publish?id=${articleId}`)
    },
    // 删除
    async delArticles (articleId) {
      try {
        await this.$http.delete(`/articles/${articleId}`)
        this.$message.success('删除成功')
        this.getArticles()
      } catch (error) {
        this.$message.error('删除成功')
      }
    },
    // 获取列表数据
    async getArticles () {
      const { data: { data } } = await this.$http.get('/articles', { params: this.filterParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 更换页码数据
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getArticles()
    },
    // 筛选
    sreach () {
      this.filterParams.page = 1
      this.getArticles()
    },
    // 时间选择器数据
    changeDate (value) {
      if (value) {
        this.filterParams.begin_pubdate = value[0]
        this.filterParams.end_pubdate = value[1]
      } else {
        this.filterParams.begin_pubdate = null
        this.filterParams.end_pubdate = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
