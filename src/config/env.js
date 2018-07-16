
/**
 * 配置开发环境和测试、生产环境之间的接口配置
 *
 * baseURL: 接口地址
 * routerMode: 路由模式
 */
let baseURL = '';

let routerMode = 'history';

if (process.env.NODE_ENV === 'development') {
    //baseURL = 'http://47.100.181.56/api';
    baseURL = 'http://192.168.2.246:8765';
    //baseURL = 'http://192.168.2.233:8765';
    //baseURL = 'http://suspnp.com/schedule/api/';
} else {
    baseURL = '';
}

export { baseURL, routerMode, baseImageURL }
