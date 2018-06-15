import fetch from '@/config/fetch';

/************************* 岗位设置 **************************/

/** 获取岗位列表 */
export const getAllPost = id => fetch('/position?stationId='+ id, {}, 'GET');

/** 新增岗位 */
export const addPost = id => fetch('/position', {}, 'POST');

