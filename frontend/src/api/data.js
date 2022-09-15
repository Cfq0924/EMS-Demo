import axios from "./axios";
export const getMenu=(param)=>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data: param
    })
}
export const getData=()=>{
    return axios.request({
        url:'/home/getData'

    })
}
export const getUser = (params)=>{
    console.log(params)
    return axios.request(
        {
            url:'http://localhost:4965/employee/getallemployees',
            //url:'/user/getUser',
            method:'get',
            params:params
        }
    )
}