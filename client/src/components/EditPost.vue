<template>
  <div class="container" id="container">
    <Header />
    <div class="main_container">
      <div class="page_content">
        <div class="page_head"><h2 class="page_header">Edit Post</h2><hr class="scotch-rule"></div>
        <div v-show="onLoading" class="blog_container">
          <span class="page_message">Loading &hellip;</span>
        </div>
        <form @submit.prevent="onUpdatePost">
        <div class="form-field">
          <label for="title">Post Title: <span class="page_form_input_required">*</span></label>
          <input type="text" name="title" v-model="post.title" placeholder="Enter post title" class="page_form_input" id="title" aria-required="true" aria-invalid="false" autofocus />
        </div>
        <br>
        <div class="form-field">
          <label for="description">Post Description  <span class="page_form_input_required">*</span></label>
          <textarea name="description" v-model="post.description" placeholder="Enter post description" cols="40" rows="10" class="page_form_input" id="description" aria-required="true" aria-invalid="false"></textarea>
        </div>
        <div class="">
          <button class="form_button" v-bind:class="{ page_button: formIsFilled }" :disabled="!formIsFilled">Update Post</button>
        </div>
        <span class="page_message" v-if="loading">{{ loading }} &hellip;</span>
        <span class="page_message">{{ status }}</span>
      </form>
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
  name: 'EditPost',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      post: {
        title: '',
        description: ''
      },
      loading: '',
      onLoading: false,
      status: ''
    }
  },
  computed: {
    formIsFilled () {
      return this.post.title !== '' &&
        this.post.description !== ''
    }
  },
  async mounted () {
    this.populatePost()
  },
  methods: {
    async populatePost () {
      this.onLoading = true
      const response = await PostService.getPost({id: this.$route.params.id})
      this.post = Object.assign({}, response.data.post)
      // this.post = response.data
      this.onLoading = false
    // this.post = Object.assign({}, post_id)
    },
    async onUpdatePost () {
      if (!this.formIsFilled) {
        this.loading = 'All the fields are required'
      } else {
        this.loading = 'Updating Post, please wait'
        await PostService.updatePost(this.post)
        console.log('Updated successfully')
        this.loading = ''
        this.$router.push({name: 'Posts'})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
