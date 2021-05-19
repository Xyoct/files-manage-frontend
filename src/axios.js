
import axios from 'axios'
import { Loading } from 'element-ui';

let options = {
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.7)'
}

var loadingInstance;

var instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'? 'http://www.bestlifebestyue.com/file-manage/api': '/api'
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    loadingInstance = Loading.service(options);
    let token = localStorage.getItem('token') || ''
    // 在发送请求之前做些什么
    if (token) {
        config.headers['token'] = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    loadingInstance.close();
    // 对响应数据做点什么
    if (response.status == 200) {
        return response.data;
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance