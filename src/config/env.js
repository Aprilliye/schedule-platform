
/**
 * 配置开发环境和测试、生产环境之间的接口配置
 *
 * baseURL: 接口地址
 * routerMode: 路由模式
 */
let baseURL = '';

let routerMode = 'history';

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:8765';
    //baseURL = 'http://suspnp.com/schedule/api/';
} else {
    baseURL = '';
}

export { baseURL, routerMode, baseImageURL }
