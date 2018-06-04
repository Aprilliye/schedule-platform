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
                            <th colspan=147 tdType='title' height=40 class='font4'>{{item.shiftName+":"+item.timeSlot}}</th>
                        </tr>
                        <tr>
                            <td colspan="3">编号</td>
                            <td colspan="6" v-for="n in 24" :key="'time'+n">{{ (n<10?'0'+n:n)+':00' }}</td>
                        </tr>
                        <template v-for="post in item.postArr">
                            <tr :code="'tr'+index+'-'+post.index+'0'">
                                <td rowspan="2" colspan="3">{{post.index}}</td>
                                <template v-for="n in 24">
                                    <td v-for="m in 6" @click="clickTd" width="30"></td>
                                </template>
                            </tr>
                            <tr :code="'tr'+index+'-'+post.index+'1'">
                                <template v-for="n in 24">
                                    <td v-for="m in 6" @click="clickTd"></td>
                                </template>
                            </tr>
                        </template>
                    </template>
                </table>
            </div>

            <div id="content">
            </div>
        </div>
        <!-- 按钮 -->
        <div class="btnGroup">
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.add" @click="handleAdd">新建</button>
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.edit" @click="handleEdit">修改</button>
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.submit" @click="handleConfirm">提交</button>
            <button type="button" class="btnDefault bgRed" v-show="showBtn.delete">删除</button> 
            <button type="button" class="btnDefault" v-show="showBtn.add || showBtn.submit" @click="handleCancel">取消</button>
            <div class="colorSelector" v-show="showBtn.input">
                <input type="text" v-model="workflowText">
                <ul>
                    <li v-for="color in colorArr" :style="'background:#'+color" @click="pickUp"></li>
                </ul>
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
                data: items,
                //  按钮显示状态
                showBtn: {
                    //btnGroup: false,
                    add: false,
                    edit: false,
                    submit: false,
                    delete: false,
                    input: false
                },
                workflowText: '',
                colorArr: ['FF0000', 'FFFFFF', '00FF00', '5588FF', '00FFFF', 'FFFF00', 'cccccc', '70DB93', 'D9D919', '7093DB', 'C0C0C0', '527F76', '93DB70', 'FF7F00', 'CFB53B', 'EBC79E' , 'FF6EC7', '7D7DFF', '9370DB', 'EAEAAE', 'C0D9D9'],
                currentColor: '',
                ifEdit: false,  //  确定按钮事件状态
            }
        },
        methods:{
            //  点击单元格
            clickTd: function (e) {
                let obj = $(e.target);
                let top = e.clientY - 40;
                let left = e.clientX - 300;
                let L = $('.gray').length;
                let parent = obj.parent();
                /** 有颜色单元格 */
                if(obj.attr('style')){
                    obj.removeAttr('style');
                    obj.addClass('gray');
                    this.workflowText = obj.html();
                    this.showBtn.edit = true;
                    this.showBtn.delete = true;
                    return;
                }
                /**  无颜色的单元格  */
                //  如果两个单元格不在同一行
                if(L == 1){
                    let code1 = $('.gray').parent().attr('code');
                    let code2 = parent.attr('code');
                    if(code1 !== code2){
                        this.$Message.error('只能选择同一行的两个时间点！');
                        return;
                    }
                }
                if(obj.hasClass('gray')){
                    obj.removeClass('gray');
                    L--;
                } else {
                    if(L==2){
                        this.$Message.error('只能选择两个时间点！');
                        return;
                    }
                    obj.addClass('gray');
                    L++;  
                }
                
                if(L == 2){
                    $('.btnGroup').css({'left': left + 'px', 'top': top + 'px'});
                    this.showBtn.add = true;
                } else {
                    this.showBtn.add = false;
                }
            },
            //  新建工作流程
            handleAdd: function () {
                this.ifEdit = false;
                this.showBtn.add = false;
                this.showBtn.submit = true;
                this.showBtn.input = true;
            },
            // 选择颜色
            pickUp: function (e) {
                let obj = $(e.target);
                obj.toggleClass('active');
                obj.siblings().removeClass('active');
                this.currentColor = obj.hasClass('active') ? obj.css('background-color') : '';
            },
            //  确定操作
            handleConfirm: function () {
                /** 新增确定事件 */
                if(!this.currentColor){
                    this.$Message.warning('请选择背景色！');
                    return;
                }
                if(!this.ifEdit){
                    let startTd = $('.gray').eq(0);
                    let endTd = $('.gray').eq(1);
                    let start = startTd.index();
                    let end = endTd.index();
                    let parent = startTd.parent();
                    for(let i = start+1;i<=end;i++){
                        parent.find('td').eq(i).addClass('remove');
                    }
                    $('.remove').remove();
                    startTd.attr('colspan', end-start+1);
                }
                
                $('.gray').html(this.workflowText).attr('title', this.workflowText).css('background-color', this.currentColor);
                $('.gray').removeClass('gray');
                this.workflowText = '';
                this.showBtn.submit = false;
                this.showBtn.input = false;
            },
            //  取消操作
            handleCancel: function () {
                $('.gray').removeClass('gray');
                this.showBtn.add = false;
            },
            //  修改工作流程
            handleEdit: function () {
                this.showBtn.submit = true;
                this.showBtn.input = true;
                this.showBtn.edit = false;
                this.showBtn.delete = false;
                this.ifEdit = true;
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>