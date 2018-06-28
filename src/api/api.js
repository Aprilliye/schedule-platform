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

/** 获取工作流程 */
export const getWorkFlow = id => fetch('/workflow/'+ id, {}, 'GET');

/** 更新工作流程 */
export const updateWorkFlow = data => fetch('/workflow', data, 'PUT');

/** 新增工作流程内容 */
export const addContent = data => fetch('/workflow/content', data, 'POST');

/** 更新工作流程内容 */
export const updateContent = (id, data) => fetch('/workflow/content/' + id, data, 'PUT');

/** 更新工作流程内容 */
export const deleteContent = id => fetch('/workflow/content/'+ id, {}, 'DELETE');


/********************* 新增排班 **********************/

/** 查询排班计划 */
export const getScheduleInfo = id => fetch('/schedule/getscheduleinfo/' + id, {}, 'GET');

/** 生成模版 */
export const createTemplate = id => fetch('/schedule/createtemplate/' + id, {}, 'POST');

/** 加载排班模版 */
export const loadTemplate = id => fetch('/schedule/templatelist/' + id, {}, 'GET');

/******************  权限管理  ******************/

/** 获取所有权限 */
export const getAllPermissions = () => fetch('/permissions', {}, 'GET');
