import vue from 'vue'
import vueRouter from 'vue-router'
vue.use(vueRouter)
const routes=[
    {
        path:'/',
        name:'Main',
        component: () => import('../views/Main.vue'),
        children:[
            // {
            //     path:'/home',
            //     name:'home',
            //     component:()=>import('../views/home')
            // },
            // {
            //     path:'/user',
            //     name:'user',
            //     component:()=> import('../views/user')
            // },
            // {
            //     path:'/employee',
            //     name:'employee',
            //     component:()=> import('../views/employee')
            // },
            // {
            //     path:'/page1',
            //     name:'page1',
            //     component:()=> import('../views/Other/pageone.vue')
            // },
            // {
            //     path:'/page2',
            //     name:'page2',
            //     component:()=> import('../views/Other/pagetwo.vue')
            // },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/login/login.vue')
    }
]
const router = new vueRouter({
    model:'history',
    routes

})
export default router