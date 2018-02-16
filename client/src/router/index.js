import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/HomePage'
import DashBoardPage from '../views/DashBoardPage'
Vue.use(Router)

export default new Router({
  routes: [
        {
              path: '/',
              component: HomePage,
              name: 'HomePage'
        },
        {
              path: '/dashboard',
              component: DashBoardPage,
              name: 'DashBoardPage'
        }
  ]
})
