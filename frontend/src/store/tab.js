import Cookie from 'js-cookie'
export default{
    state: {
        isCollapse: false,
        tabsList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icom:'home'
            }
        ] ,
        currentMenu:null,
        menu:[]     
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            if(val.name != 'home'){
                state.currentMenu=val
                const result = state.tabsList.findIndex(item=>item.name===val.name)
                if(result === -1){
                    state.tabsList.push(val)
                }
            }
            else{
                state.currentMenu = null
            }
        },
        closeTag(state,val){
            const result= state.tabsList.findIndex(item=>item.name ===val.name)
            state.tabsList.splice(result,1)
        },
        setMenu(state, val){
            state.menu=val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu=[]
            Cookie.remove('menu')
        },
        addMenu(state, router){

            if(!Cookie.get('menu')) {
                return
            }
      // 如果当前有menu数据
            const menu = JSON.parse(Cookie.get('menu')) // 将menu数据转成对象，拿到之前序列化的menu数据
            state.menu = menu
            let currentMenu = [
                {
                path: '/',
                component: () => import('../views/Main'),
                children: []
                }
            ]
            // 拿到menu数据进行遍历
            menu.forEach(item => {
                // 这里拿到的menu就是permission下面的数组，既有一级菜单也有二级菜单，需要做一个区分
                if(item.children) { // 如果它有children，继续进行遍历（二级菜单）
                item.children = item.children.map(item => {
                    // 添加component属性。动态路由必须具备的三个条件：path，name(非必选)，component
                    // 根据permission下menu的url找到对应的组件路径
                    item.component = () => import(`../views/${item.url}`) //es6模板字符串语法
                    // console.log(item.component,'item')
                    return item // 此时children对象已被更新
                })
                currentMenu[0].children.push(...item.children)
                // console.log(currentMenu,'haschild')
                // menuArray.push(...item.children) // es6语法 将item.children解构 ...扩展符
                } else { // 如果是一级菜单的话，直接为它添加component属性
                item.component = () => import(`../views/${item.url}`) //es6模板字符串语法
                // menuArray.push(item) //这里的menuArray存入的就是一级菜单的路由文件
                currentMenu[0].children.push(item)
                // console.log(currentMenu,'nochild')
                }
            })
            router.addRoutes(currentMenu)
        }
    }
}