<template>
    <div>
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
                        <a class="btnDefault bgOrange operateUnit" id="addFlow" onclick="addWorkflowContent()" href="javascript:;"
                           style="display: none;">新建</a>
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
                <table cellpadding=0 cellspacing=0 width=2220 tableType="shiftTable" border="1px solid black">
                    <tr height=40>
                        <td colspan=145 tdType='title' height=40 class=font4></td>
                    </tr>
                    <tr>
                        <td colspan=145 tdType='comment' height=30 class=font3></td>
                    </tr>
                    <tr>
                        <td height="30px" width=60>编号</td>
                        <td colspan=6 width=90>0100</td>
                        <td colspan=6 width=90>0200</td>
                        <td colspan=6 width=90>0300</td>
                        <td colspan=6 width=90>0400</td>
                        <td colspan=6 width=90>0500</td>
                        <td colspan=6 width=90>0600</td>
                        <td colspan=6 width=90>0700</td>
                        <td colspan=6 width=90>0800</td>
                        <td colspan=6 width=90>0900</td>
                        <td colspan=6 width=90>1000</td>
                        <td colspan=6 width=90>1100</td>
                        <td colspan=6 width=90>1200</td>
                        <td colspan=6 width=90>1300</td>
                        <td colspan=6 width=90>1400</td>
                        <td colspan=6 width=90>1500</td>
                        <td colspan=6 width=90>1600</td>
                        <td colspan=6 width=90>1700</td>
                        <td colspan=6 width=90>1800</td>
                        <td colspan=6 width=90>1900</td>
                        <td colspan=6 width=90>2000</td>
                        <td colspan=6 width=90>2100</td>
                        <td colspan=6 width=90>2200</td>
                        <td colspan=6 width=90>2300</td>
                        <td colspan=6 width=90>0000</td>
                    </tr>


                </table>
            </div>

            <div id="content">

            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data:function () {
        return {
            cityList: [
                {
                    value: '1',
                    label: 'New York'
                },
                {
                    value: '2',
                    label: 'London'
                },
                {
                    value: '3',
                    label: 'Sydney'
                }
            ],
            model: ''
        }
    }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>