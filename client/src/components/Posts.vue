<template>
  <div class="container" id="container">
    <Header />
    <div class="main_container">
      <div class="page_content">
        <div class="page_head"><h2 class="page_header">Latest News 💰</h2><hr class="scotch-rule"></div>
        <div v-show="loading" class="blog_container">
          <span class="page_message">Loading &hellip;</span>
        </div>
        <div class="blog_container" v-if="postLength" v-for="post in posts" :key="post.id">
          <p class="blog_header"><strong>{{ post.title }}</strong></p><hr>
          <p class="blog_sub_head"><span><small><b>Posted by Admin</b></small></span><span><small><b>{{ moment(post.timestamp).fromNow() }}</b></small></span></p>
          <!-- <p class="blog_sub_head"><span><small><b>Posted by Admin</b></small></span><span><small><b>{{ moment(post.timestamp).calendar() }}</b></small></span></p> -->
          <p class="">{{ post.description }}</p>
          <router-link :to="{ name: 'ShowPost', params: { id: post.id }}" class="blog_details"><strong>Read more &hellip;</strong></router-link>
        </div>
        <div class="blog_container" v-else><h2 class="page_message">{{ status }}</h2></div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// import postApi from '@/services/postApi'
import PostService from '@/services/PostService'
import Header from './Header'
import Footer from './Footer'
export default {
  name: 'Posts',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      posts: [],
      loading: false,
      status: 'No post yet'
    }
  },
  computed: {
    postLength () {
      if (!this.posts.length > 0) {
        return false
      }
      return true
    }
  },
  mounted () {
    this.refreshPosts()
  },
  methods: {
    async refreshPosts () {
      this.loading = true
      const response = await PostService.getPosts()
      this.posts = response.data
      this.loading = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
