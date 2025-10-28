import axios from 'axios';
import { env } from './appVersion'
// import Toast from '../alert/alert.js';
window.axios = axios;

var basicBaseUrl = null

if (env=='DEV') {
  basicBaseUrl = 'https://devapi.qrforinfo.com/api/v1';
} else if (env=='DEMO') {
  basicBaseUrl = 'https://demoapi.qrforinfo.com/api/v1';
} else {
  basicBaseUrl = 'https://liveapi.qrforinfo.com/api/v1';
}
axios.defaults.baseURL = basicBaseUrl
axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('access_token');
        const val = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        // const tokenVal = val && val.token ? val.token : null
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['source'] = '@School';
        // config.headers['apiKey'] = 'secretkey';
        config.headers['Access-Control-Allow-Origin'] = '*';
        if (token) {
            config.headers.token = `${token}`;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

// Token expire redirection
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        if (error && error?.response?.status === 401) {
            // alert('Session Expired');
            window.location.href = '/login';
            console.log(error.response)
            localStorage.clear();
            return axios();
        }
        return Promise.reject(error);
    }
);
