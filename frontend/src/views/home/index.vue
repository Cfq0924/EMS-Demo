<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" /><div class="userinfo">
                        <p class="name">陈富强</p>
                        <p class="acccess">超级管理员</p>
                    </div>

                </div>
                <div class="login-info">
                    <p>上次登录时间： <span>2021-7-19</span></p>
                    <p>上次登录地点： <span>北京</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 460px">
                <el-table :data="tableData">
                    <el-table-column v-for="(value, key) in tableLabel" 
                    :key="key" :prop="key" :label="value">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px">
            <div class="num">
                <el-card class="order" v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i :class="'el-icon-'+item.icon" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px">
                <!-- <div style="height:260px" ref="echarts"></div> -->
                <echart :chartData="echartData.order" style="height:260px"></echart>>
            </el-card>
            <div class="graph">
                <el-card style="height: 260px">
                    <!-- <div style="height:240px" ref="userEcharts"></div> -->
                    <echart :chartData="echartData.user" style="height:260px"></echart>>
                </el-card>
                <el-card style="height: 260px">
                    <!-- <div style="height:240px" ref="videoEcharts"></div> -->
                    <echart :chartData="echartData.video" :isAxisChart="false" style="height:260px"></echart>>
                </el-card>
            </div>
        </el-col>
    </el-row>
    
</template>
<style lang="less" scoped>
</style>
<script>
import {getMenu,getData} from '../../api/data.js'
// import * as echarts from 'echarts'
import Echart from '../../components/ECharts'
export default{
    name:'home',
    components:{
        Echart
    },
    data(){
        return{
            userImg:require('C:/CFQ/Study/FrontEnd/vue/my_project/src/assets/images/user.jpg'),
            tableData:[
              
            ],
            tableLabel:{
                name:'课程',
                todayBuy:'今日购买',
                monthBuy:'本月购买',
                totalBuy:'总购买'
            },
            countData:[
                {
                    name:'今日支付订单',
                    value:1234,
                    icon:'star-on',
                    color:'#2ec7c9'
                },
                 {
                    name:'今日收藏订单',
                    value:1234,
                    icon:'star-on',
                    color:'#ffb980'
                }
            ],
            echartData:{
                order:{
                    xData:[],
                    series:[]
                },
                user:{
                    xData:[],
                    series:[]
                },
                video:{
                    series:[]
                }
            }
        }
    },
    mounted(){
        getData().then(res=>{
            const {code, data} =res.data
            if(code == 20000){
                this.tableData = data.tableData
                const order=data.orderData
                const xData = order.date
                const keyArray =  Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key=>{
                    series.push({
                        name:key,
                        data:order.data.map(item=>item[key]),
                        type:'line'
                    })
                })
                this.echartData.order.xData = xData
                this.echartData.order.series=series

                // const option = {
                //     xAxis:{
                //         data:xData

                //     },
                //     yAxis:{},
                //     legend:{
                //         data:keyArray
                //     },
                //     series
                // }
                // const E = echarts.init(this.$refs.echarts)
                // E.setOption(option)
                //用户图
                this.echartData.user.xData = data.userData.map(item =>item.date)
                this.echartData.user.series=[{
                        name:'新增用户',
                        data:data.userData.map(item=>item.new),
                        type:"bar"
                    },{
                        name:'活跃用户用户',
                        data:data.userData.map(item=>item.active),
                        type:"bar"
                    }
                    ]
                // const userOption={
                //     legend:{textStyle:{color:"#333"}},
                //     grid:{left:"20%"},
                //     tooltip:{trigger:"axis"},
                //     xAxis:{
                //         type:"category",
                //         data:data.userData.map(item =>item.date),
                //         axisLine:{
                //             lineStyle:{color:"#17b3a3"}
                //         },
                //         axisLabel:{interval:0,color:"#333"}
                //     },
                //     yAxis:[{
                //         type:"value",
                //         axisLine:{lineStyle:{color:"#17B3A3"}}
                //     }
                //     ],
                //     color:["#2EC7C9","#b6a2de"],
                //     series:[{
                //         name:'新增用户',
                //         data:data.userData.map(item=>item.new),
                //         type:"bar"
                //     },{
                //         name:'活跃用户用户',
                //         data:data.userData.map(item=>item.active),
                //         type:"bar"
                //     }
                //     ]
                // }
                // const U = echarts.init(this.$refs.userEcharts)
                // U.setOption(userOption)
                //饼图
                this.echartData.video.series=[
                        {
                            data:data.videoData,
                            type:'pie'
                        }
                    ]
                // const videoOption = {
                //     tooltip:{
                //         trigger:"item"
                //     },
                //     color:[
                //         "#0f78f4",
                //         "#dd536b",
                //         "#9462e5",
                //         "#a6a6a6",
                //         "#e1bb22",
                //         "#39c362",
                //         "#3ed1cf"
                //     ],
                //     series:[
                //         {
                //             data:data.videoData,
                //             type:'pie'
                //         }
                //     ],
                // }
                // //videoEcharts
                // const V = echarts.init(this.$refs.videoEcharts)
                // V.setOption(videoOption)
            }
            //userEcharts
            // console.log(res)
        })
    }
}
</script>