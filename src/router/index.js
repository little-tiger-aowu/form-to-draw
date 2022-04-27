import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import turntable from '../views/turntable.vue'
import login from '../views/login.vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/turntable',
    name: 'turntable',
    component: turntable
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  let openId = VueCookies.get("openId")
  if (openId) {
    next()
  } else {
    if (to.path === '/login' || to.path === '/') { //这就是跳出循环的关键
      next()
    } else {
      next('/login')
    }
  }
})

export default router
