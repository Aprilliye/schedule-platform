<template>
    <div class="container">
        <div class="content-header">
            <label style="margin-left: 10px">班制</label>
            <Select v-model="model" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <a class="btnDefault bgBlue btnworkflow" onclick="loadWorkFlow()">加载工作流程</a>
        </div>
        <div class="panel-body">
            <div>
                <div class="colorPanel">
                    <div>
                        <a class="btnDefault bgGreen operateUnit" id="remFlow" onclick="deleteWorkflowContent()" href="javascript:;"
                           style="display: none;">删除</a>
                        <a class="btnDefault bgOrange operateUnit" id="addFlow" @click="addWorkflowContent" style="display: none;">新建</a>
                        <a class="btnDefault bgBlue operateUnit" id="updateFlow" onclick="updateWorkFlowContent()" href="javascript:;"
                           style="display: none;">修改</a>
                        <a class="btnDefault bgGreen operateUnit" id="submitFlow" onclick="submitWorkFlowContent()" href="javascript:;"
                           style="display: none;">提交</a>
                    </div>
                    <div>
                        <input class="operateUnit" style='display: none;' size="50" id='contentInput'/>
                    </div>
                    <div>
                        <table style="display: none;" class="operateUnit" id="colorTable">
                            <tr>
                                <td color-value="FF0000" style="background-color: #FF0000"></td>
                                <td color-value="FFFFFF" style="background-color: #FFFFFF"></td>
                                <td color-value="00FF00" style="background-color: #00FF00"></td>
                                <td color-value="5588FF" style="background-color: #5588FF"></td>
                                <td color-value="00FFFF" style="background-color: #00FFFF"></td>
                                <td color-value="FFFF00" style="background-color: #FFFF00"></td>
                            </tr>
                            <tr>
                                <td color-value="cccccc" style="background-color: #cccccc"></td>
                                <td color-value="70DB93" style="background-color: #70DB93"></td>
                                <td color-value="D9D919" style="background-color: #D9D919"></td>
                                <td color-value="7093DB" style="background-color: #7093DB"></td>
                                <td color-value="C0C0C0" style="background-color: #C0C0C0"></td>
                                <td color-value="527F76" style="background-color: #527F76"></td>
                            </tr>
                            <tr>
                                <td color-value="93DB70" style="background-color: #93DB70"></td>
                                <td color-value="FF7F00" style="background-color: #FF7F00"></td>
                                <td color-value="CFB53B" style="background-color: #CFB53B"></td>
                                <td color-value="EBC79E" style="background-color: #EBC79E"></td>
                                <td color-value="FF6EC7" style="background-color: #FF6EC7"></td>
                                <td color-value="7D7DFF" style="background-color: #7D7DFF"></td>
                            </tr>
                            <tr>
                                <td color-value="9370DB" style="background-color: #9370DB"></td>
                                <td color-value="EAEAAE" style="background-color: #EAEAAE"></td>
                                <td color-value="C0D9D9" style="background-color: #C0D9D9"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 右侧内容 start -->
            <div id="shiftTemplate">
                <table cellpadding=0 cellspacing=0 tableType="shiftTable" class="workflowTable">
                    <template v-for="(item, index) in data">
                        <tr>
                            <th colspan=145 tdType='title' height=40 class='font4'>{{item.shiftName+":"+item.timeSlot}}</th>
                        </tr>
                        <tr>
                            <td width='60'>编号</td>
                            <td colspan="6" v-for="n in 24" :key="'time'+n">{{ (n<10?'0'+n:n)+':00' }}</td>
                        </tr>
                        <tr v-for="post in item.postArr">
                            <td>{{post.index}}</td>
                            <template v-for="n in 24">
                                <td v-for="m in 6"></td>
                            </template>
                        </tr>
                    </template>
                </table>
            </div>

            <div id="content">

            </div>

        </div>
    </div>
</template>
<script>
    import {showColorPanel} from '../assets/js/workflow.js';
    import {items} from '../assets/data/workflow.js';
    export default {
        data:function () {
            return {
                cityList: [
                    {
                        value: '1',
                        label: '西直门替班员'
                    }
                ],
                model: '',
                data: items
            }
        },
        mounted:function(){
            $(document).on("click", "[tdValue]", function (event) {
                var L = $(".td-active").length;
                if ($(this).hasClass("td-active")) {
                    $(this).removeClass("td-active");
                    if ($(this).attr("colspan")>0&&!$(this).attr("contentId")) {
                        var value=parseInt($(this).attr("tdValue"));
                        var colspan=$(this).attr("colspan");
                        $(this).attr("colspan",1);
                        for(var i=colspan-1;i>0;i--){
                            var v=value+i*10;
                            var td=$("<td tdType='minutes' width=15 tdValue='"+v+"'></td>");
                            $(this).after(td);
                        }
                    }
                } else {
                    if(L>1){
                        alert('只能选择两个时间节点！');
                        return false;
                        }
                    $(this).addClass("td-active");
                    showColorPanel(event);
                    if (L == 1) {
                        $(".operateUnit").hide();
                        $("#addFlow").show();
                    }
                    if ($(this).attr("contentId")) {
                        $("#remFlow").show();
                        $("#updateFlow").show();
                    }
                }
            });
        },
        
        methods:{
            addWorkflowContent:function(){
                var first = $(".td-active:first");
                var workflowId = $(first).closest("tr").attr("trWorkflowId");
                if (!workflowId) {
                    alert("没有创建流程");
                    return;
                }
                var tr = $(first).closest("tr");
                var start = parseInt($(first).attr("tdValue"));
                var rowNum = $(tr).attr("trType");
                var last = $(tr).find(".td-active:last");
                var end = parseInt($(last).attr("tdValue"));
                $(".td-active").each(function () {
                    $(this).removeClass(".td-active");
                });
                $("#addFlow").hide();

                for (var l = start + 10; l <= end; l += 10) {
                    $(tr).find("[tdValue=" + l + "]").remove();
                }
                var td = $(tr).find("[tdValue=" + start + "]");
                $(td).attr("colspan", (end - start + 10) / 10);

                $("#contentInput").show().focus();
                $("#colorTable").show();
                $("#submitFlow").show();
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>