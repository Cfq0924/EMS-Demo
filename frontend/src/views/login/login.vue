<template>
    <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label_width="100px"
    class="login-container">
        <h2 class="login_title">Varian APP 员工管理系统登陆</h2>
        <el-form-item 
        label="用户名" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model="form.username" 
            autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码">
            </el-input>
        </el-form-item>
        <el-form-item class="login_submit"> 
            <el-button type="primary" @click="login" class="login_submit">登陆</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import Mock from 'mockjs'
import {getMenu} from '../../api/data'
export default{
    name:'login',
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[{
                    require:true,message:"请输入用户名",trigger:"blur"},
                    {min:3,message:"用户名不能小于3位",trigger:"blur"}
                    ],
                password:[
                  {require:true,message:"请输入密码",trigger:"blur"},
                ]
            },
        }
    },
    methods:{
        login(){
            getMenu(this.form).then(({data:res})=>{
                console.log(res)
                if(res.code===20000){
                    this.$store.commit('clearMenu')
                    this.$store.commit('setMenu',res.data.menu)
                    this.$store.commit('setToken',res.data.token)
                    this.$store.commit('addMenu',this.$router)
                    this.$router.push({name:'home'})
                }
                else{
                    this.$message.warning(res.data.message)
                }
            })
            // const token = Mock.random.guid()
            // this.$store.commit('setToken',token)
            // this.$router.push({name:'home'})
        },
    }
}
</script>
<style lang="less" scoped>
.login-container{
    border-radius:15px;
    background-clip: padding-box;
    margin:180px auto;
    width:550px;
    padding:35px 35px 15px 35px;
    background-color:#fff;
    border:1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.login_title{
    margin:10px auto 40px auto;
    text-align:center;
    color:#505458;
    font-size: 28px;
}
.login_submit{
    margin:10px auto 10px auto;
    text-align: center;
}
</style>