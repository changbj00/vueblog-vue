<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name:'BlogDetail',params: {blogId: blog.id}}">
                {{blog.title}}
              </router-link>
            </h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination class="pagenum"
                     background
                     layout="prev, pager, next"
                     :current-page="pageNum"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=page>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header'

  export default {
    name: "Blogs",
    components: {Header},
    data() {
      return {
        blogs: {},
        pageNum: 1,
        pageSize: 5,
        total: 0
      }
    },
    methods: {
      page(pageNum) {
        const _this = this
        _this.$axios.get("/blog/list?pageNum=" + pageNum).then(res => {
          _this.blogs = res.data.data.records
          _this.pageNum = res.data.data.pageNum
          _this.pageSize = res.data.data.size
          _this.total = res.data.data.total
        })
      }
    },
    created() {
      this.page(1)
    }
  }
</script>

<style scoped>
  .pagenum {
    margin: 0 auto;
    text-align: center;
  }
</style>
