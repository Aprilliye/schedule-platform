import fetch from '@/config/fetch';


/** 登录 */
export const login = data => fetch('/login', data, 'POST');

/* 退出登录 */
export const signout = () => fetch('/sessions', {}, 'DELETE');

/************************* 排班管理 *************************/
/*************************站区设置**************************/
/** 站区列表 */
export const stationAreaList = () => fetch('/district', {},'GET');

/** 新增站区 */
export const addstationArea = data => fetch('/district', data, 'POST');

/** 删除站区 */
export const deleteDistrict = id => fetch('/district/' + id, {}, 'DELETE');

/** 修改站区 */
export const updateDistrict = (id, data) => fetch('/district/' + id, data, 'PUT');

/** 站点列表 */
export const getStations = id => fetch('/station?districtId=' + id, {}, 'GET');

/** 新增站点 */
export const addStation = data => fetch('/station', data, 'POST');

/** 删除站点 */
export const deleteStation = id => fetch('/station/' + id, {}, 'DELETE');

/** 修改站点 */
export const updateStation = (id, data) => fetch('/station/' + id, data, 'PUT');

/***************************** 人员设置 *******************************/

/** 新增用户 */
export const addUser = data => fetch('/user/add', data, 'POST');

/** 获取角色 */
export const getRole = () => fetch('/role', {},'GET');

