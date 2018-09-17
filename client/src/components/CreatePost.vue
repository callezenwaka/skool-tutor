<template>
  <div class="container" id="container">
    <Header />
    <div class="main_container">
      <div class="page_content">
        <div class="page_head"><h2 class="page_header">Publish News</h2><hr class="scotch-rule"></div>
        <form @submit.prevent="onCreatePost">
          <div class="form-field">
            <label for="title">Post Title: <span class="page_form_input_required">*</span></label>
            <input type="text" name="title" value="" v-model="post.title" placeholder="Enter blog title" style="width: 95%;" class="page_form_input" id="title" aria-required="true" aria-invalid="false" required autofocus />
          </div>
          <br>
          <div class="form-field">
            <label for="description">Post Description  <span class="page_form_input_required">*</span></label>
            <textarea name="description" v-model="post.description" placeholder="Enter blog description" cols="40" rows="10" class="page_form_input" id="description" aria-required="true" aria-invalid="false"></textarea>
          </div>
          <div class="">
            <button class="form_button" v-bind:class="{ page_button: formIsFilled }" :disabled="!formIsFilled">Create Post</button>
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
  name: 'CreatePost',
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
      status: ''
    }
  },
  computed: {
    formIsFilled () {
      return this.post.title !== '' &&
        this.post.description !== ''
    }
  },
  methods: {
    async onCreatePost () {
      if (!this.formIsFilled) {
        this.loading = 'All the fields are required'
      } else {
        this.loading = 'Sending Post, please wait'
        console.log('Here 2')
        await PostService.createPost(this.post)
        console.log('Sent successfully')
        this.loading = ''
        this.$router.push({name: 'Posts'})
        // console.log(this.post)
        // this.loading = ''
        // this.post = {}
        // console.log(this.post)
        // console.log('Here')
        // this.$router.push({name: 'Posts'})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
