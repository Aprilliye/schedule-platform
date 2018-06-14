import fetch from '@/config/fetch';


/** 岗位设置 */
export const getAllPost = stationId => fetch('/station/'+ stationId, {}, 'GET');


