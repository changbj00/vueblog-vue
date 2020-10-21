<template>
<div>
  <Header></Header>
  <div class="m-blog">
    <h2>{{blog.title}}</h2>
    <el-link icon="el-icon-edit" v-if="ownblog">
      <router-link :to="{name: 'BlogEdit',params: {blogId: blog.id}}">
        编辑
      </router-link>
      </el-link>
    <el-divider></el-divider>
    <div class="markdown-body" v-html="blog.content">

    </div>
  </div>
</div>
</template>

<script>
  import 'github-markdown-css'
    import Header from "../components/Header";
    export default {
        name: "BlogDetail",
      components: {Header},
      data(){
          return{
            blog: {
              id: '',
              title: 'blog',
              content: 'blog'
            },
            ownblog: false
          }
      },
      created(){
        const _this=this
        const blogId=this.$route.params.blogId
        if (blogId) {
          this.$axios.get("/blog/detail/"+blogId
          ).then(res =>{
            const blog=res.data.data
            _this.blog.title=blog.title
            _this.blog.id=blog.id
            var MarkdownIt=require("markdown-it")
            var md=new MarkdownIt
            _this.blog.content=md.render(blog.content)

            _this.ownblog=(blog.userId===_this.$store.getters.getUser.id)
          })
        }
      }
    }
</script>

<style scoped>
.m-blog{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  width:  100%;
  min-height: 700px;
  padding: 20px 15px;
}
</style>
