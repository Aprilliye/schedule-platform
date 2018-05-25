import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login'
import Index  from '@/pages/index'
import Usermanage from '@/pages/user-manage'
import Grouping from '@/pages/grouping'
import Role from '@/pages/role'
import ScheduleAreaForm from '@/pages/scheduleAreaForm'
import Workflow from '@/pages/workflow'
import PostSetting from '@/pages/postSetting'
import ShiftsSetting from '@/pages/shiftsSetting'

Vue.use(Router)
let router = new Router({
  linkActiveClass:"active"
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
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
        },
        {
          path: '/role',
          name: 'Role',
          component: Role
        },
        {
          path: '/scheduleAreaForm',
          name: 'ScheduleAreaForm',
          component: ScheduleAreaForm
        },
        {
          path: '/workflow',
          name: 'Workflow',
          component: Workflow
        },
        {
          path: '/postSetting',
          name: 'PostSetting',
          component: PostSetting
        },
        {
          path: '/shiftsSetting',
          name: 'ShiftsSetting',
          component: ShiftsSetting
        }
      ]
    },

  ]
})

