import Vue from 'vue'
import VueRouter from 'vue-router'
import Book from '../views/book.vue'
import Swiper from '../views/swiper.vue'
import Blog from '../views/blog.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/book'
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/book',
    name: 'Book',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Book
  },
  {
    path: '/swiper',
    name: 'Swiper',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Swiper
  },
  {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Blog
  }
]

const router = new VueRouter({
  routes,
  mode:"history",
  meta:{isLogin:false}
})

export default router
