import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Posts from '@/components/Posts'
import CreatePost from '@/components/CreatePost'
import EditPost from '@/components/EditPost'
import ShowPost from '@/components/ShowPost'
import About from '@/components/About'
import Courses from '@/components/Courses'
import Tutorials from '@/components/Tutorials'
import DeletePost from '@/components/DeletePost'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/about', name: 'About', component: About },
    { path: '/courses', name: 'Courses', component: Courses },
    { path: '/tutorials', name: 'Tutorials', component: Tutorials },
    { path: '/posts', name: 'Posts', component: Posts },
    { path: '/posts/publish', name: 'CreatePost', component: CreatePost },
    { path: '/posts/:id/edit', name: 'EditPost', component: EditPost },
    { path: '/posts/:id', name: 'ShowPost', component: ShowPost },
    { path: '/posts/:id/delete', name: 'DeletePost', component: DeletePost }
  ]
})
