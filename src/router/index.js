import Vue from 'vue';
import Router from 'vue-router';
import { routerMode } from '@/config/env.js';
import Login from '@/pages/login';
import Index  from '@/pages/index';
import Usermanage from '@/pages/user-manage';
import Grouping from '@/pages/grouping';
import Role from '@/pages/role';
import ScheduleForm from '@/pages/scheduleForm';
import Workflow from '@/pages/workflow';
import PostSetting from '@/pages/postSetting';
import ShiftsSetting from '@/pages/shiftsSetting';
import AutoSchedule from '@/pages/autoSchedule';
import AddJurisdiction from '@/pages/addJurisdiction';
import EditJurisdiction from '@/pages/editJurisdiction';
import mySchedule from '@/pages/mySchedule';
import candidateSchedule from '@/pages/candidateSchedule';
import iView from 'iview';

Vue.use(iView);
Vue.use(Router)

const router = new Router({
  mode: routerMode,
  linkActiveClass:"active",
  routes: [
      //登录页面
    {
      path: '/',
      name: 'Login',
      component: Login
    },
      //主页面
    {
      path: '/home',
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
          path: '/scheduleForm',
          name: 'ScheduleForm',
          component: ScheduleForm
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
        },
        //  备班排班
        {
            path:'/candidateSchedule',
            name: 'candidateSchedule',
            component: candidateSchedule
        },
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  let IDENTIFICATION = 'schedule_identify';
  // 若路由需要登录且token不存在, 跳到登录页
  if (to.meta.requireAuth && !localStorage.getItem(IDENTIFICATION)) {
    next({
        path: '/',
        query: { redirect: to.fullPath }
    });
    return;
  }
  // 若请求登录页但token存在, 跳转到首页
  if(to.path.indexOf('login') > -1 && localStorage.getItem(IDENTIFICATION)){
    next({
      path: '/home'
    });
    return;
  }
  next();
});

router.afterEach(route => {
});

export default router;

