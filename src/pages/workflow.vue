<template>
    <div class="container">
        <div class="content-header">
            <label style="margin-left: 10px">班制：</label>
            <Select v-model="suite" style="width:200px" @on-change="getWorkFlow(suite)">
                <Option v-for="item in suites" :value="item.id" :key="item.id">{{ item.dutyName }}</Option>
            </Select>
            <a class="btnDefault bgBlue btnworkflow" onclick="loadWorkFlow()">加载工作流程</a>
        </div>
        <div class="panel-body">
            <!-- 右侧内容 start -->
            <div id="shiftTemplate">
                <table cellpadding=0 cellspacing=0 tableType="shiftTable" class="workflowTable">
                    <template v-for="item in workflows">
                        <tr>
                            <th colspan='150' tdType='title' height='40'>{{item.dutyName + '(' + item.dutyCode + ')' + "：" + item.startTimeStr + '-' + item.endTimeStr}}</th>
                        </tr>
                        <tr>
                            <td colspan="6">编号</td>
                            <td colspan="6" v-for="n in 24" :key="'time'+n">{{ (n > 10 ? n : '0' + n )+'00' }}</td>
                        </tr>
                        <template v-for="workflow in item.scheduleWorkflowVolist">
                            <tr :trtype="0" :code="workflow.id">
                                <td rowspan="2" colspan="6" :code="workflow.id" class="workflowCode">
                                    <span @click="beforeAddWorkflow(workflow)">{{workflow.code ? workflow.code : '--'}}</span>
                                    <input type="text" style="display:none;" @blur="updateWorkFlow()">
                                </td>
                                <template v-for="n in 24">
                                    <td class="timeTd" v-for="m in 6" :code="(n-1)*60 + m*10"></td>
                                </template>
                            </tr>
                            <tr :trtype="1" :code="workflow.id">
                                <template v-for="n in 24">
                                    <td class="timeTd" v-for="m in 6" :code="(n-1)*60 + m*10"></td>
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
        <div class="btnGroup" v-show="showBtn.add || showBtn.edit || showBtn.submit || showBtn.delete">
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.add" @click="beforeAddContent">新建</button>
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.edit" @click="handleEdit">修改</button>
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.submit" @click="addContent">提交</button>
            <button type="button" class="btnDefault bgRed" v-show="showBtn.delete" @click="handleDelete">删除</button> 
            <button type="button" class="btnDefault" v-show="showBtn.add || showBtn.submit" @click="handleCancel">取消</button>
            <div class="colorSelector" v-show="showBtn.input">
                <input type="text" v-model.trim="workflowText">
                <ul>
                    <li v-for="(color, index) in colorArr" :key="'li'+index" :style="'background:#'+color" :color="color" :code="'color'+index" @click="pickUp"></li>
                </ul>
            </div>           
        </div>
    </div>
</template>
<script>
    import {showColorPanel} from '../assets/js/workflow.js';
    import {items} from '../assets/data/workflow.js';
    import {getSuites, getWorkFlow, updateWorkFlow, addContent} from '@/api/api';
    let self = null;
    export default {
        data:function () {
            return {
                districtId: this.$store.get('districtId'),
                suites: [],
                suite: [],
                workflows: [],              //  工作流程
                //  按钮显示状态
                showBtn: {
                    add: false,
                    edit: false,
                    submit: false,
                    delete: false,
                    input: false
                },
                workflowText: '',
                colorArr: ['FF0000', 'FFFFFF', '00FF00', '5588FF', '00FFFF', 'FFFF00', 'cccccc', '70DB93', 'D9D919', '7093DB', 'C0C0C0', '527F76', '93DB70', 'FF7F00', 'CFB53B', 'EBC79E' , 'FF6EC7', '7D7DFF', '9370DB', 'EAEAAE', 'C0D9D9'],
                currentColor: '',
                ifEdit: false,      //  确定按钮事件状态
                currentTd: null,    //   当前操作的单元格
                editItem: '',      //  编辑工作流程的颜色
                temporary: '',
                currentSuite: null,
                currentWorkflow: null,
                currentLineNumber: null,
                currentWorkflowId: null,
            }
        },
        created: function () {
            self = this;
            this.getSuites();
        },
        methods:{
            //  获取班制
            getSuites: async function () {
                let data = {
                    districtId: this.districtId
                };
                let response = await getSuites(data);
                if(response.meta.code === 0){
                    this.suites = response.data;
                    this.suite = response.data[0].id;
                    this.currentPositionId = response.data[0].positionId;
                    return;
                }
                this.$Message.error(response.meta.message);
            },
            //  获取工作流程
            getWorkFlow: async function (id) {
                let suiteId = id || this.suite;
                let response = await getWorkFlow(suiteId);
                if(response.meta.code === 0){
                    this.workflows = response.data;
                }
            },
            //  更新工作流程
            beforeAddWorkflow: function (item) {
                this.currentWorkflow = item;
                let obj = $('.workflowCode[code="'+ item.id +'"]');
                let span = obj.find('span');
                obj.find('span').hide();
                obj.find('input').val(item.code).show();
                // let obj = $(e.target);
                // obj.hide().next().show();
            },
            updateWorkFlow: async function () {
                let item = this.currentWorkflow;
                let obj = $('.workflowCode[code="'+ item.id +'"]');
                let input = obj.find('input');
                let data = {
                    id: this.currentWorkflow.id,
                    code: input.val()
                };
                let response = await updateWorkFlow(data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    let data = response.data;
                    this.$Message.success(message);
                    obj.find('span').html(data.code).show();
                    input.hide();
                    return;
                }
                this.$Message.error(message);
            },
            //  新建工作流程内容
            beforeAddContent: function () {
                this.workflowText = '';
                $('.colorSelector').find('.active').removeClass('active');
                this.ifEdit = false;
                this.showBtn.add = false;
                this.showBtn.submit = true;
                this.showBtn.input = true;
            },
            addContent: async function () {
                if(!this.currentColor){
                    this.$Message.warning('请选择背景色！');
                    return;
                }
                if(!this.workflowText){
                    this.$Message.warning('工作流程内容不能为空！');
                    return;
                }
                this.editItem = this.temporary;
                let startTime = null;
                let endTime = null;
                /** 新增确定事件 */
                if(!this.ifEdit){
                    let startTd = $('.gray').eq(0);
                    startTime = startTd.attr('code');
                    let startTdColspan = startTd.attr('colspan') ? parseInt(startTd.attr('colspan'))-1 : 0;
                    
                    let endTd = $('.gray').eq(1);
                    endTime = endTd.attr('code');
                    let endTdColspan = endTd.attr('colspan') ? parseInt(endTd.attr('colspan'))-1 : 0;
                    let start = startTd.index();
                    let end = endTd.index();
                    let parent = startTd.parent();
                    for(let i = start+1;i<=end;i++){
                        parent.find('td').eq(i).addClass('remove');
                    }
                    $('.remove').remove();
                    let colspan = end - start + 1 + startTdColspan + endTdColspan;
                    startTd.attr('colspan', colspan);
                }
                $('.gray').html(this.workflowText).attr('title', this.workflowText).css('background-color', this.currentColor).attr('name', this.editItem);
                $('.gray').removeClass('gray');
                let data = {
                    workFlowId: this.currentWorkflowId,
                    startTime: parseInt(startTime),
                    endTime: parseInt(endTime),
                    content: this.workflowText,
                    color: this.temporary,
                    lineNumber: this.currentLineNumber
                }
                let response = await addContent(data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.$Message.success(message);
                    this.workflowText = '';
                    this.showBtn.submit = false;
                    this.showBtn.input = false;
                    return;
                }
                this.$Message.error(message);
            },
            // 选择颜色
            pickUp: function (e) {
                let obj = $(e.target);
                obj.toggleClass('active');
                obj.siblings().removeClass('active');
                this.currentColor = obj.hasClass('active') ? obj.css('background-color') : '';
                this.temporary = obj.attr('color');
            },
            //  确定操作
            handleConfirm: function () {
                if(!this.currentColor){
                    this.$Message.warning('请选择背景色！');
                    return;
                }
                if(!this.workflowText){
                    this.$Message.warning('工作流程内容不能为空！');
                    return;
                }
                this.editItem = this.temporary;
                /** 新增确定事件 */
                if(!this.ifEdit){
                    let startTd = $('.gray').eq(0);
                    let startTdColspan = startTd.attr('colspan') ? parseInt(startTd.attr('colspan'))-1 : 0;
                    
                    let endTd = $('.gray').eq(1);
                    let endTdColspan = endTd.attr('colspan') ? parseInt(endTd.attr('colspan'))-1 : 0;
                    let start = startTd.index();
                    let end = endTd.index();
                    let parent = startTd.parent();
                    for(let i = start+1;i<=end;i++){
                        parent.find('td').eq(i).addClass('remove');
                    }
                    $('.remove').remove();
                    let colspan = end - start + 1 + startTdColspan + endTdColspan;
                    startTd.attr('colspan', colspan);
                }
                $('.gray').html(this.workflowText).attr('title', this.workflowText).css('background-color', '#' + this.currentColor).attr('name', this.editItem);
                $('.gray').removeClass('gray');
                this.workflowText = '';
                this.showBtn.submit = false;
                this.showBtn.input = false;
                
            },
            //  取消操作
            handleCancel: function () {
                this.currentColor = '';
                $('.gray').removeClass('gray');
                for(let obj in this.showBtn){
                    this.showBtn[obj] = false;
                }
            },
            //  修改工作流程
            handleEdit: function () {
                this.showBtn.submit = true;
                this.showBtn.input = true;
                this.showBtn.edit = false;
                this.showBtn.delete = false;
                this.ifEdit = true;
                $('li[code="'+ this.editItem +'"]').addClass('active').siblings().removeClass('active');
            },
            //  删除工作流程
            handleDelete: function () {
                let currentTd = this.currentTd;
                this.$Modal.confirm({
                    content: '确定删除工作流程吗？',
                    onOk: () => {
                        this.currentTd.html('');
                        let n = currentTd.attr('colspan');
                        let str = '';
                        for(let i=0;i<n-1;i++){
                            str += '';
                            $('<td></td>').insertBefore(currentTd);
                        }
                        currentTd.removeAttr('colspan').removeAttr('style').removeClass('gray');
                        this.showBtn.delete = false;
                        this.showBtn.edit = false;
                        this.workflowText = '';
                        this.currentColor = '';
                    },
                    onCancel: () => {
                        currentTd.css('background-color', this.currentColor).removeClass('gray');
                        this.showBtn.delete = false;
                        this.showBtn.edit = false;
                    }
                });
            }
        }
    }
    $(function () {
        //  点击单元格
        $(document).on('click', '#shiftTemplate .timeTd', function (e) {
            let obj = $(e.target);
            self.currentTd = obj;
            let top = e.clientY - 40;
            let left = e.clientX - 300;
            let L = $('.gray').length;
            let parent = obj.parent();
            /** 有颜色单元格 */
            if(obj.attr('style')){
                //obj.removeAttr('style');
                //obj.addClass('gray');
                self.workflowText = obj.html();
                self.showBtn.edit = true;
                self.showBtn.delete = true;
                self.editItem = obj.attr('name');
                //console.log(self.editColor);
                //return;
            }
            /**  无颜色的单元格  */
            //  如果两个单元格不在同一行
            if(L == 1){
                let code1 = $('.gray').parent().attr('code');
                let code2 = parent.attr('code');
                if(code1 !== code2){
                    self.$Message.error('只能选择同一行的两个时间点！');
                    return;
                }
            }
            if(obj.hasClass('gray')){
                obj.removeClass('gray');
                L--;
            } else {
                if(L==2){
                    self.$Message.error('只能选择两个时间点！');
                    return;
                }
                obj.addClass('gray');
                let parent = obj.parent();
                self.currentLineNumber = parseInt(parent.attr('trtype'));
                self.currentWorkflowId = parseInt(parent.attr('code'));
                L++;  
            }
            
            if(L == 2){
                left = left>1000 ? 1000 : left;
                let scrollTop = $(window).scrollTop();
                top += scrollTop;
                $('.btnGroup').css({'left': left + 'px', 'top': top + 'px'});
                self.showBtn.add = true;
                self.showBtn.edit = false;
                self.showBtn.delete = false;
            } else {
                self.showBtn.add = false;
            }
        })
    })
    
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>