import axios from 'axios'

const client = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  json: true
})
export default {
  getPosts () {
    return Api().get('posts')
  },
  createPost (params) {
    return Api().post('posts', params)
  },
  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },
  getPost (params) {
    return Api().get('posts/' + params.id)
  },
  deletePost (params) {
    return Api().delete('posts/' + params)
  }
}
