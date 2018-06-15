import fetch from '@/config/fetch';

/************************* 岗位设置 **************************/

/** 获取岗位列表 */
export const getAllPost = id => fetch('/position?stationId='+ id, {}, 'GET');

/** 新增岗位 */
export const addPost = data => fetch('/position', data, 'POST');

/** 编辑岗位 */
export const updatePost = (id, data) => fetch('/position/' + id, data, 'PUT');

/** 删除岗位 */
export const detelePost = id => fetch('/position/' + id, {}, 'DELETE');