import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/pages/login';
import Index  from '@/pages/index';
import Usermanage from '@/pages/user-manage';
import Grouping from '@/pages/grouping';
import Role from '@/pages/role';
import ScheduleAreaForm from '@/pages/scheduleAreaForm';
import Workflow from '@/pages/workflow';
import PostSetting from '@/pages/postSetting';
import ShiftsSetting from '@/pages/shiftsSetting';
import AutoSchedule from '@/pages/autoSchedule';
import AddJurisdiction from '@/pages/addJurisdiction';
import EditJurisdiction from '@/pages/editJurisdiction';
import mySchedule from '@/pages/mySchedule';

Vue.use(Router)
let router = new Router({
  linkActiveClass:"active"
});

export default new Router({
  routes: [
      //登录页面
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
      //主页面
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/user-manage',
      children:[
          //人员管理页面
        {
          path: '/user-manage',
          name: 'Usermanage',
          component: Usermanage
        },
          //站区设置页面
        {
          path: '/grouping',
          name: 'Grouping',
          component: Grouping
        },
          //权限管理页面
        {
          path: '/role',
          name: 'Role',
          component: Role
        },
          //排班表格页面
        {
          path: '/scheduleAreaForm',
          name: 'ScheduleAreaForm',
          component: ScheduleAreaForm
        },
          //工作流程页面
        {
          path: '/workflow',
          name: 'Workflow',
          component: Workflow
        },
          //岗位设置
        {
          path: '/postSetting',
          name: 'PostSetting',
          component: PostSetting
        },
          //班次设置
        {
          path: '/shiftsSetting',
          name: 'ShiftsSetting',
          component: ShiftsSetting
        },
        //权限管理新增权限页面
        {
          path:'/addJurisdiction',
          name:'AddJurisdiction',
          component:AddJurisdiction
        },
          //权限管理编辑权限页面
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
        },
        //  我的排班
        {
            path:'/mySchedule',
            name: 'mySchedule',
            component: mySchedule
        }
      ]
    }
  ]
})

