import axios from 'axios';
import store from 'storejs';
import router from '../router/index.js'

/* axios全局设置 */
const http = axios.create();
http.defaults.timeout = 5000;
http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
export default http;