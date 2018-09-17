<template>
  <div class="modal" >
    <div class="modal-content">
      <span class="close-button" @click.prevent="toggleModal">&times;</span>
      <h3 class="page_form_input_required"><strong>Are you sure you want to delete this post?</strong></h3><hr class="scotch-rule">
      <h3 style="margin-bottom: 20px;">{{ post.title }}!</h3>
      <button class="page_button" @click.prevent="toggleModal">Cancel</button>
      <button class="page_button" @click.stop.prevent="onDeletePost(post.id)">Delete Post</button>
    </div>
  </div>
</template>

<script>
// import postApi from '@/services/postApi'
import PostService from '@/services/PostService'
export default {
  name: 'DeletePost',
  props: ['toggleDialog'],
  data () {
    return {
      post: {},
      cancelDelete: false,
      loading: '',
      status: 'No post found'
    }
  },
  async created () {
    this.populatePost()
  },
  methods: {
    toggleModal (event) {
      this.$emit('toggleDelete', this.cancelDelete)
    },
    async populatePost () {
      const response = await PostService.getPost({id: this.$route.params.id})
      this.post = response.data.post
      this.loading = false
      console.log(this.post)
    // this.model = Object.assign({}, post_id)
    },
    async onDeletePost (id) {
      this.loading = 'Deleting post, Please wait'
      if (this.post.id === id) {
        await PostService.deletePost(this.post.id)
        this.toggleModal = false
        this.loading = ''
        this.$router.push({name: 'Posts'})
      }
      // await PostService.deletePost(this.id)
      // this.toggleModal = false
      // this.loading = ''
      // this.$router.push({name: 'Posts'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  // display: block;
}
.modal {
  position: fixed;
  left: 25%;
  top: 25%;
  width: 50%;
  height: 50%;
  }
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
  width: 24rem;
  border-radius: 0.5rem;
}
.close-button {
  float: right;
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  border-radius: 0.25rem;
  background-color: lightgray;
}
.close-button:hover {
  background-color: darkgray;
}
.show-modal {
  opacity: 1;
  visibility: visible;
  transform: scale(1.0);
  transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
</style>
