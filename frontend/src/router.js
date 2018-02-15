import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './views/HomePage'
Vue.use(VueRouter)

const router = new VueRouter({
      routes: [
            {
                  path: '/',
                  component: HomePage,
                  name: 'HomePage'
            }
      ]
})

export default router
