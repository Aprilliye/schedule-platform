import fetch from '@/config/fetch';


/** 登录 */
export const login = data => fetch('/login', data, 'POST');

/* 退出登录 */
export const signout = () => fetch('/sessions', {}, 'DELETE');

/************************* 排班管理 *************************/




