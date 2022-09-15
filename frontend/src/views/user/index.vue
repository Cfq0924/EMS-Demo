<template>
    <div class="manage">
        <el-dialog :title="operateType === 'add'?'新增用户':'更新用户'" :visible.sync="isShow">
            <common-form
            :formLabel="operateFormLabel"
            :form="operateForm"
            :inline="true"
            ref="form"
            ></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow=false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">新增</el-button>
                <common-form
                    :formLabel="formLabel"
                    :form="searchForm"
                    :inline="true"
                    ref="form"
                >
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
                </common-form>
        </div>
        <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editUser"
        @del="delUser"
        >

        </common-table>
    </div>
</template>
<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import {getUser} from '../../api/data'
export default{
    name:'user',
    components:{
        CommonForm,
        CommonTable
    },
    data(){
        return{
            operateType:'add',
            isShow:false,
            operateFormLabel:[{
                model:'name',
                label:'姓名',
                type:'input'
            },
            {
                model:'sso',
                label:'SSO',
                type:'input'
            },

            {
                model:'sex',
                label:'性别',
                type:'select',
                opts:[
                    {
                        label:'男',
                        value:'1'
                    },
                    {
                        label:'女',
                        value:'0'
                    }
                ]
            },
            {
                model:'birth',
                label:'出生日期',
                type:'date'
            },
            {
                model:'email',
                label:'邮箱',
                type:'input'
            },
             {
                model:'phone',
                label:'手机号',
                type:'input'
            },
            {
                model:'base_addr',
                label:'base地',
                type:'input'
            },            
            {
                model:'onboard_time',
                label:'入职时间',
                type:'date'
            },
             {
                model:'password',
                label:'密码',
                type:'input'
            },
            {
                model:'permission',
                label:'权限',
                type:'select',
                opts:[
                    {
                        label:'经理',
                        value:'1'
                    }
                    ,
                    {
                        label:'区域经理',
                        value:'2'
                    }
                    ,
                    {
                        label:'职员',
                        value:'3'
                    }
                ]
            },
            ],
            operateForm:{
                name:'',
                base_addr:'',
                birth:'',
                sex:'',
                onboard_time:'',
                email:'',
                sso:'',
                phone:''

            },
            formLabel:[
                {
                    model:'keyword',
                    label:'',
                    type:'input'
                }
            ],
            searchForm:{
                keyword:''
            },
            tableData:[],
            tableLabel:[
                {
                    prop:'name',
                    label:'姓名'
                },
                 {
                    prop:'sexLabel',
                    label:'性别'
                },
                                {
                    prop:'birth',
                    label:'出生日期',
                    width:150
                },
                                {
                    prop:'base_addr',
                    label:'base地'
                },
                 {
                    prop:'sso',
                    label:'SSO',
                    width:150
                },
                {
                    prop:'email',
                    label:'邮箱',
                    width:200
                },
                {
                    prop:'phone',
                    label:'电话',
                    width:150
                },
                {
                    prop:'onboard_time',
                    label:'入职时间',
                    width:150
                },
                 {
                    prop:'permissionLabel',
                    label:'权限'
                },
                {
                    prop:'password',
                    label:'密码'
                },
            ],
            config:{
                page:1,
                total:30
            }

        }
    },
    methods:{
        confirm(){
            if (this.operateType === 'edit'){
                this.$http.put('http://localhost:4965/employee/ChangeEmployee/?id='+this.operateForm.id,this.operateForm).then(res=>{
                    this.isShow=false
                    this.getList()
                })
            }else{
                // this.$http.post('http://10.120.120.168:80/machine_qa/starshot',{    
                //     "img_path":"E:\\QA\\Projects\\pylinacAPI\\source\\starshot.tif",
                //     "dpi":105,
                //     "sid":1000}).then(res=>{
                //     console.log(res)
                // })
                this.$http.post('http://localhost:4965/employee/AddEmployee',this.operateForm).then(res=>{
                    this.isShow=false
                    this.getList()
                })
            }
        },
        addUser(){
            this.isShow = true
            this.operateType='add'
            this.operateForm={
                name:'',
                base_addr:'',
                birth:'',
                sex:'',
                onboard_time:'',
                email:'',
                sso:'',
                phone:''
            }
        },
        editUser(row){
            this.operateType = 'edit'
            this.isShow=true    
            this.operateForm=row
        },
        delUser(row){
            this.$confirm("此操作将永久该组件，是否继续","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:"warning"
            }).then(()=>{
                const id = row.id
                console.log(row.id)
                this.$http.delete('http://localhost:4965/employee/DeleteEmployee',{
                    params:{id:id}
                })
            }).then(res=>[
                this.$message({
                    type:'success',
                    message:"删除成功"
                }),
                this.getList(),
                console.log(res)
            ])

        },
        getList(name = ''){
            this.config.loading=true
            name?(this.config.page=1):''
            getUser({
                page:this.config.page,
                name
            }).then(({data:res})=>{
                this.tableData = res.list.map(item=>{
                    item.sexLabel = item.sex == 0? '女':'男'
                    var setlabel = function(item){
                        if(item==='1'){return "经理"}
                        if(item==='2'){return "区域经理"}
                        if(item==='3'){return "职员"}
                    };
                    item.permissionLabel= setlabel(item.permission)
                    return item
                })
                this.config.total=res.count
                this.config.loading = false
            })
        }
    },
    created(){
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.manage-header{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
</style>