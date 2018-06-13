<template>
    <div class="container">
        <div class="content-header">
            <label style="margin-left: 10px">班制</label>
            <Select v-model="shift" style="width:200px">
                <Option v-for="item in shiftList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <a class="btnDefault bgBlue btnworkflow" onclick="loadWorkFlow()">加载工作流程</a>
        </div>
        <div class="panel-body">
            <!-- 右侧内容 start -->
            <div id="shiftTemplate">
                <table cellpadding=0 cellspacing=0 tableType="shiftTable" class="workflowTable">
                    <template v-for="(item, index) in data">
                        <tr :key="'tr0'+index">
                            <th colspan=147 tdType='title' height=40 class='font4'>{{item.shiftName+":"+item.timeSlot}}</th>
                        </tr>
                        <tr :key="'tr1'+index">
                            <td colspan="3">编号</td>
                            <td colspan="6" v-for="n in 24" :key="'time'+n">{{ (n < 10 ? '0'+n : n)+':00' }}</td>
                        </tr>
                        <template v-for="post in item.postArr">
                            <tr :code="'tr'+index+'-'+post.index+'0'" :key="'tr'+index+'-'+post.index+'0'">
                                <td rowspan="2" colspan="3">{{post.index}}</td>
                                <template v-for="n in 24">
                                    <td v-for="m in 6" :key="'td'+n+'-'+m" @click="clickTd" width="30" :code="'atd'+index+'-'+post.index+'0'+'-'+n"></td>
                                </template>
                            </tr>
                            <tr :code="'tr'+index+'-'+post.index+'1'" :key="'tr'+index+'-'+post.index+'1'">
                                <template v-for="n in 24">
                                    <td v-for="m in 6" :key="'td'+n+'-'+m" @click="clickTd" :code="'btd'+index+'-'+post.index+'0'+'-'+n"></td>
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
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.add" @click="handleAdd">新建</button>
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.edit" @click="handleEdit">修改</button>
            <button type="button" class="btnDefault bgGreen" v-show="showBtn.submit" @click="handleConfirm">提交</button>
            <button type="button" class="btnDefault bgRed" v-show="showBtn.delete" @click="handleDelete">删除</button> 
            <button type="button" class="btnDefault" v-show="showBtn.add || showBtn.submit" @click="handleCancel">取消</button>
            <div class="colorSelector" v-show="showBtn.input">
                <input type="text" v-model.trim="workflowText">
                <ul>
                    <li v-for="(color, index) in colorArr" :key="'li'+index" :style="'background:#'+color" :code="'color'+index" @click="pickUp"></li>
                </ul>
            </div>           
        </div>
    </div>
</template>
<script>
    import {showColorPanel} from '../assets/js/workflow.js';
    import {items} from '../assets/data/workflow.js';
    let self = null;
    export default {
        data:function () {
            return {
                shiftList: [
                    {
                        value: '1',
                        label: '西直门替班员'
                    }
                ],
                shift: '1',
                data: items,
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
                temporary: ''

            }
        },
        created: function () {
            self = this;
        },
        methods:{
            //  点击单元格
            clickTd: function (e) {
                
            },
            //  新建工作流程
            handleAdd: function () {
                this.workflowText = '';
                $('.colorSelector').find('.active').removeClass('active');
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
                this.temporary = obj.attr('code');
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
                $('.gray').html(this.workflowText).attr('title', this.workflowText).css('background-color', this.currentColor).attr('name', this.editItem);
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
        $(document).on('click', '#shiftTemplate td[code]', function (e) {
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