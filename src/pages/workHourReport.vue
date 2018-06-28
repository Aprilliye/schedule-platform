<template>
    <div class="container">
        <div class="content-header">
            线别：
            <Select style="width:200px" placeholder="请选择线别">
                <Option v-for="(item,index) in lineList"  :key="item.index" :value="item.id">{{ item.name }}</Option>
            </Select>
            站区：
            <Select style="width:200px" placeholder="请选择站区">
                <Option v-for="(item,index) in district"  :key="item.index" :value="item.id">{{ item.name }}</Option>
            </Select>
            <Button type="primary"  size="large">查询</Button>
        </div> 
        <div class="panel-body">
            <table cellpadding=0 cellspacing=0 class="workHourTable">
                <tr>
                    <th v-for="(item,index) in titleList" :key="index">{{item}}</th>
                </tr>
                <template v-for="(list,index) in linesTable">
                    <tr>
                        <td rowspan="4">{{list.name}}</td><td>{{list.title}}</td><td v-for="n in 6"> </td>
                    </tr>
                    <tr v-for="(item,index) in linesStation">
                        <td>{{item}}</td><td v-for="n in 6"> </td>
                    </tr>
                </template>
            </table>
        </div>
    </div>   
</template>
<script>
    export default{
        data: function () {
            return {
                lines:'',
                lineList:[
                    {
                        id:1,
                        name:'2号线'
                    },
                    {
                        id:2,
                        name:'13号线'
                    },
                    {
                        id:3,
                        name:'10号线'
                    },
                    {
                        id:4,
                        name:'8号线'
                    },
                    {
                        id:5,
                        name:'新线'
                    }
                ],
                district:[
                    {
                        id:1,
                        name:'西直门'
                    },
                    {
                        id:2,
                        name:'鼓楼大街'
                    },
                    {
                        id:3,
                        name:'巴沟站'
                    },
                ],
                titleList:['线别','部门','平均人数','计划工时','实际工时','工时兑现','加班工时','缺勤率'],
                linesStation:['---','---','总结'],
                linesTable:[
                    {
                        name:'2号线',
                        title:'2号线西直门站'
                    },
                    {
                        name:'13号线',
                        title:'13号线西直门站区'
                    },
                    {
                        name:'10号线',
                        title:'10号线巴沟站区'
                    },
                    {
                        name:'8号线',
                        title:'8号线鼓楼大街站区'
                    },
                    {
                        name:'新线',
                        title:'8号线xx站区'
                    }
                ]
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>