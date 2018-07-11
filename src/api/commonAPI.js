import fetch from '@/config/fetch';


/** 登录 */
export const login = data => fetch('/login', data, 'POST');

/* 退出登录 */
export const signout = () => fetch('/sessions', {}, 'DELETE');

/************************* 排班管理 *************************/
/*************************站区设置**************************/
/** 站区列表 */
export const getDistricts = () => fetch('/district', {},'GET');

/** 新增站区 */
export const addDistrict = data => fetch('/district', data, 'POST');

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

/** 设置站区管理员 */
export const setDistrictAdmin = data => fetch('/district/admin', data, 'POST');

/***************************** 人员设置 *******************************/

/** 新增用户 */
export const addUser = data => fetch('/user', data, 'POST');

/** 获取角色 */
export const getRole = () => fetch('/role', {},'GET');

/** 获取用户列表 */
export const getUser = data => fetch('/user', data ,'GET');

/** 获取备班用户列表 */  
export const getBackupUser = districtId => fetch('/user/backuplist/' + districtId, {} ,'GET');

/** 修改用户 */
export const updateUser = data => fetch('/user', data, 'PUT');

/** 删除用户 */
export const deleteUser = id => fetch('/user/' + id, {}, 'DELETE');

/***************************** 权限设置*********************************/

/** 新增角色 */
export const addRoler = data => fetch('/role', data, 'POST');

/** 获取当前角色权限 */
export const getCurrentRole = id => fetch('/role/' + id , {}, 'GET');

/** 更新当前角色权限 */
export const updateCurrentRole = (id, data) => fetch('/role/' + id , data, 'PUT');
