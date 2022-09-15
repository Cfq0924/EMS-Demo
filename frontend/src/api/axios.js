import axios from 'axios'
import config from '../config'

const baseUrl = process.env.NODE_ENV == 'development'?config.baseurl.dev:config.baseurl.pro

class HttpRequest{
    constructor ()
    {
        this.baseUrl=baseUrl
    }
    getInsideConfig(){
        const config={
            baseUrl:this.baseUrl,
            header:{}
        }
        return config
    }
    interceptors(instance){
        instance.interceptors.request.use(function (config) {
            // Do something before request is sent
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
        
        // Add a response interceptor
        instance.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            console.log(response)
            return response;
          }, function (error) {
            console.log(error)
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
    }
    request(options){
        const instance = axios.create()
        options={...this.getInsideConfig(),...options}
        this.interceptors(instance)
        return instance(options)
    }
}
export default new HttpRequest(baseUrl)