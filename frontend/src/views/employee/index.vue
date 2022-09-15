<template>
    <el-tabs class="el_tab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="培训项目" name="training_project">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="product" label="产品" width="180">
            </el-table-column>
            <el-table-column prop="self_eval" label="自评" width="180">
                <template slot-scope="scope">
                    <el-select v-model="scope.row[scope.column.property]" placeholder="请选择">
                        <el-option
                        v-for="item in self_eval_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="mentor_eval" label="主管评价">
                <template slot-scope="scope">
                <el-select v-model="scope.row[scope.column.property]" size="small" style="width:180px">
                    <el-option
                    v-for="item in mentor_eval_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="内部培训" name="internal_training">
        <el-button @click="add_internal_training">添加</el-button>
        <el-button>删除</el-button>
        <el-table :data="internal_training_table" style="width: 100%">
            <el-table-column prop="training_format" label="培训形式" width="230">
                <template slot-scope="scope">
                    <el-select v-model="scope.row[scope.column.property]" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in training_format_options"
                        :key="index"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="training_product" label="培训产品" width="180">
                <template slot-scope="scope">
                    <el-select v-model="scope.row[scope.column.property]" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in training_products_options"
                        :key="index"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="training_addr" label="培训地点" width="180">
                <template slot-scope="scope">
                    <el-select v-model="scope.row[scope.column.property]" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in training_addr_options"
                        :key="index"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间">
                <template slot-scope="scope">
                <el-date-picker
                    v-model="scope.row[scope.column.property]"
                    type="date"
                    placeholder="选择日期时间">
                </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间">
                <template slot-scope="scope">
                <el-date-picker
                    v-model="scope.row[scope.column.property]"
                    type="date"
                    placeholder="选择日期时间">
                </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="teacher" label="培训导师">
                <el-input  placeholder="请输入内容"></el-input>
            </el-table-column>
            <el-table-column prop="OJTteacher" label="OJT导师打分">
                <el-input placeholder="请输入内容"></el-input>
            </el-table-column>
            <el-table-column prop="OJTteacher_eval" label="OJT导师评语">
                <el-input  placeholder="请输入内容"></el-input>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="参与OKR" name="OKR">
                    <el-button>添加</el-button>
        <el-button>删除</el-button>
        <el-table :data="internal_training_table" style="width: 100%">
            <el-table-column prop="project_name" label="项目名称" width="230">
                <template slot-scope="scope">
                    <el-select v-model="scope.row[scope.column.property]" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in project_names_options"
                        :key="index"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="is_leader" label="是否是leader" width="150">
                <template slot-scope="scope">
                    <el-select v-model="scope.row[scope.column.property]" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in is_leader_options"
                        :key="index"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="main_context" label="主要工作内容" width="360">
                <template>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea"
                        ></el-input>
                </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="获奖情况" name="award">
            <el-table :data="internal_training_table" style="width: 100%">
            <el-table-column prop="award_time" label="时间" width="150">
                <template slot-scope="scope">
                    <el-date-picker
                        v-model="scope.row[scope.column.property]"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="award_detail" label="获奖情况" width="500">
                <template slot-scope="scope">
                    <el-select v-model="scope.row[scope.column.property]" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in award_detail_options"
                        :key="index"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="夜校讲课" name="night_shchool">
            <el-table :data="internal_training_table" style="width: 100%">
            <el-table-column prop="night_school_time" label="时间" width="150">
                <template slot-scope="scope">
                    <el-date-picker
                        v-model="scope.row[scope.column.property]"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="night_school_detail" label="夜校课程" width="500">
                <template>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="night_school_detail"
                        ></el-input>
                </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="职业/学习经历" name="career">
        <el-table :data="internal_training_table" style="width: 100%">
            <el-table-column prop="career_start_time" label="开始时间" width="150">
                <template slot-scope="scope">
                    <el-date-picker
                        v-model="scope.row[scope.column.property]"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="career_end_time" label="结束时间" width="150">
                <template slot-scope="scope">
                    <el-date-picker
                        v-model="scope.row[scope.column.property]"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="career_name" label="工作/学习名称" width="500">
                <template>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="night_school_detail"
                        ></el-input>
                </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="出差记录" name="travel">出差记录</el-tab-pane>

    </el-tabs>
</template>
<script>
export default{
    name:'mall',
    data(){
        return{
        textarea:'',
        night_school_detail:'',
        value:'',
        award_detail_options:[
            {label:"部门季度之星"},
            {label:"进步之星"},
            {label:"服务之星"},
            ],
        is_leader_options:[
            {label:"否"},
            {label:"是"},
            ],
        project_names_options:[
            {label:"FY22 Q1-人工智能模型完善及验证"},
            {label:"FY22 Q3-QA软件开发"},
            {label:"FY22 Q4-员工信息管理系统"},
        ],
        training_format_options:[
            {label:"Global Internal Training"},
            {label:"瓦里安客户课"},
            {label:"临床培训班"},
            {label:"现场OJT"},
            {label:"Varian Learning"},
        ],
        training_products_options:[
            {label:"RapidPlan"},
            {label:"Eclipse p1"},
            {label:"ARIA"},
            {label:"RPM"},            
        ],
        training_addr_options:[
            {label:"线上"},
            {label:"北京教育中心"},
            {label:"日本教育中心"},
            {label:"Las Vags"},            
        ],
        mentor_eval_options: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }, {
          value: '选项3',
          label: '3'
        }, {
          value: '选项4',
          label: '4'
        }, {
          value: '选项5',
          label: '5'
        }],
        self_eval_options: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }, {
          value: '选项3',
          label: '3'
        }, {
          value: '选项4',
          label: '4'
        }, {
          value: '选项5',
          label: '5'
        }],
        tableData:[
                {product:"Eclipse"},
                {product:"Eclipse Planing Skills"},
                {product:"RapidPlan"},
                 {product:"Eclipse Script"},
                ],
        internal_training_table:[
                    {}
                ]
        }
    },
    methods:{
        add_internal_training(){
            this.internal_training_table.push({})
        },
        handleClick(){

        },
        handleEdit(row){

        },
        
        entranceChange(one,two) {
	console.log(one,two)
}
    }
}
</script>
<style lang="less" scoped>
.el_tab {
		height: calc(100vh - 110px);
		overflow-y: auto;
}
</style>