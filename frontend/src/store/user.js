import Cookie from 'js-cookie'
export default{
    state:{
        token:''
    },
    mutations:{
        setToken(state, value){
            state.token=value
            Cookie.set('token',value)
        },
        clearToken(state){
            state.token=''
            Cookie.remove('token')
        },
        GetToken(state){
            state.token=state.token||Cookie.get('token')
        },
    }
}