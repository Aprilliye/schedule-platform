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
import AutoSchedule from '@/pages/autoSchedule'
<<<<<<< HEAD
=======
import AddJurisdiction from '@/pages/addJurisdiction'
import EditJurisdiction from '@/pages/editJurisdiction'
>>>>>>> 2c0669b50c4e451e07c4a33238e69fa721a4a64d

Vue.use(Router)
let router = new Router({
  linkActiveClass:"active"
});

export default new Router({
  routes: [
      
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/user-manage',
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
        },
        {
<<<<<<< HEAD
          path: '/autoSchedule',
          name: 'AutoSchedule',
          component: AutoSchedule
=======
          path:'/addJurisdiction',
          name:'AddJurisdiction',
          component:AddJurisdiction
        },
        {
          path:'/editJurisdiction',

          name:'EditJurisdiction',
          component:EditJurisdiction
        },
        //  新增排班
        {
            path:'/autoSchedule',
            name:'autoSchedule',
            component:AutoSchedule
>>>>>>> 2c0669b50c4e451e07c4a33238e69fa721a4a64d
        }
      ]
    }
  ]
})

