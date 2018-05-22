
/**
 * 配置开发环境和测试、生产环境之间的接口配置
 *
 * baseURL: 接口地址
 * routerMode: 路由模式
 * baseImageURL: 图片地址
 *
 */
let baseURL = '';
let baseImageURL = '';

let routerMode = 'history';

if (process.env.NODE_ENV === 'development') {
    //baseURL = 'http://192.168.10.35:8080';
    //baseURL = 'http://evtape.cn/api';
    baseImageURL = '';
} else {
    //baseURL = 'http://evtape.com/api';
    baseImageURL = '';
}

export {
    baseURL, routerMode, baseImageURL
    }
