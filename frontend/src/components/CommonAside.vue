<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h4 class="tmph3">Application 员工管理系统</h4>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
        <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="sub_item in item.children" :key="sub_item.path">
        <el-menu-item  @click="clickMenu(sub_item)" :index="sub_item.path">{{sub_item.label}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    </el-menu>
</template>
<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    border:none,
  }
  .tmph3{
        color:#fff;
        text-align: center;
        line-height: 48px;
  }
</style>

<script>
import { computed } from 'vue';
  export default {
    data() {
      return {
        menu:[],
        // menu:[
        //         {
        //             path:'/',
        //             name:'home',
        //             label:'首页',
        //             icon:'s-home',
        //             url:'Home/Home'
        //         },
        //             {
        //             path:'/employee',
        //             name:'employee',
        //             label:'员工评价管理',
        //             icon:'video-play',
        //             url:'EmEval/EmEval'
        //         },
        //             {
        //             path:'/user',
        //             name:'user',
        //             label:'用户管理',
        //             icon:'user',
        //             url:'UserManage/UserManage'
        //         },
        //         {
        //             label:'其他',
        //             icon:'location',
        //             path:'/Other',
        //             children:[
        //                 {
        //                     path:'/page1',
        //                     name:'page1',
        //                     label:'页面1',
        //                     icon:'setting',
        //                     url:'Other/PageOne'
        //                 },
        //                 {
        //                     path:'/page2',
        //                     name:'page2',
        //                     label:'页面2',
        //                     icon:'setting',
        //                     url:'Other/PageTwo'
        //                 }
        //             ]  
        //         }
        //     ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push({
            name:item.name
        })
        this.$store.commit('selectMenu',item)
      }
    },
    computed: {
        noChildren(){
            return this.asyncMenu.filter(item => !item.children)
        },
        hasChildren(){
            return this.asyncMenu.filter(item => item.children)
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        },
        asyncMenu(){
          return this.$store.state.tab.menu
        }
    }
  }
</script>