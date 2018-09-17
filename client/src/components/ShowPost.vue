<template>
  <div class="container" id="container">
    <Header />
    <div class="main_container">
      <div class="page_content">
        <span v-show="loading" class="page_message">Loading &hellip;</span>
        <template v-if="this.toggleDialog">
          <DeletePost :toggleDialog=toggleDialog @toggleDelete="onToggleDialog"/>
        </template>
          <div class="page_head"><h2 class="page_header"><strong>{{ post.title }}</strong></h2><hr class="scotch-rule"></div>
          <p class="blog_sub_head"><span><small><b>Posted by Admin</b></small></span><span><small><b>{{ moment(post.timestamp).fromNow() }}</b></small></span></p>
          <p class="">{{ post.description }}</p>
          <router-link v-if="!loading" :to="{ name: 'EditPost', params: { id: post.id }}" class=" page_button blog_details"><strong>Edit Post</strong></router-link>
          <!-- <router-link :to="{ name: 'Posts', params: { }}" class=" page_button blog_details"><strong>Delete Post</strong></router-link> -->
          <button class="page_button" @click.prevent="toggleDialog = !toggleDialog">Delete Post</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// import postApi from '@/services/postApi'
import PostService from '@/services/PostService'
import Header from './Header'
import DeletePost from './DeletePost'
import Footer from './Footer'
export default {
  name: 'ShowPost',
  components: {
    Header,
    DeletePost,
    Footer
  },
  data () {
    return {
      post: {},
      toggleDialog: false,
      loading: true,
      status: 'No post found'
    }
  },
  async created () {
    this.populatePost()
  },
  methods: {
    onToggleDialog () {
      this.toggleDialog = false
    },
    async populatePost () {
      const response = await PostService.getPost({id: this.$route.params.id})
      this.post = Object.assign({}, response.data.post)
      // this.post = response.data
      this.loading = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
