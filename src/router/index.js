import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login'
import Index  from '@/pages/index'
import Usermanage from '@/pages/user-manage'
import Grouping from '@/pages/grouping'

Vue.use(Router)

export default new Router({
  routes: [
    //{
    //  path: '/',
    //  name: 'Login',
    //  component: Login
    //},
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path: '/user-manage',
          name: 'Usermanage',
          component: Usermanage
        },
        {
          path: '/grouping',
          name: 'Grouping',
          component: Grouping
        }
      ]
    },

  ]
})
