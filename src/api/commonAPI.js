import fetch from '@/config/fetch';


/** 登录 */
export const login = data => fetch('/sessions', data, 'POST');

/* 退出登录 */
export const signout = () => fetch('/sessions', {}, 'DELETE');



