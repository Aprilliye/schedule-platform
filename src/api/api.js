import fetch from '@/config/fetch';

/************************* 岗位设置 **************************/

/** 获取岗位 */
export const getAllPost = id => fetch('/position?stationId='+ id, {}, 'GET');

/** 新增岗位 */
export const addPost = data => fetch('/position', data, 'POST');

/** 编辑岗位 */
export const updatePost = (id, data) => fetch('/position/' + id, data, 'PUT');

/** 删除岗位 */
export const detelePost = id => fetch('/position/' + id, {}, 'DELETE');


/*************************** 班次设置 *******************************/

/** 获取班制 */
export const getSuites = data => fetch('/duty', data, 'GET');

/** 新增班制 */
export const addSuites = data => fetch('/duty/suite', data, 'POST');

/**删除班制 */
export const deteleSuites = id => fetch('/duty/suitedelete/' + id, {}, 'DELETE');

/** 编辑班制 */
export const updateSuites = data => fetch('/duty/suitupdate' , data, 'PUT');

/** 获取班次 */
export const getClass = id => fetch('/duty/suite?suiteId='+id, {}, 'GET');

/** 新增班次 */
export const addClass = data => fetch('/duty/class', data, 'POST');

/** 删除班次 */
export const deteleClass = (id, suiteId) => fetch('/duty/classdelete/' + id +'?suiteId='+ suiteId, {} ,'DELETE');

/** 编辑班次 */
export const updateClass = data => fetch('/duty/classupdate' , data, 'PUT');

/** 新增时间段 */
export const addPeriod = data => fetch('/duty/periodadd', data, 'POST');

/** 编辑时间段 */
export const updatePeriod = data => fetch('/duty/periodupdate' , data, 'PUT');

/** 删除时间段 */
export const detelePeriod = id => fetch('/duty/perioddelete/' + id, {}, 'DELETE');
