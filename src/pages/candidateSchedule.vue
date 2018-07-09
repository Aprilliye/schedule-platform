<template>
    <div class="container">
        <div class="content-header">
            <span>选择班制：</span>
            <Select v-model="suiteId" style="width:200px" @on-change="manualTemplate(suiteId)">
                <Option v-for="item in suites" :value="item.id" :key="item.shiftId">{{ item.dutyName }}</Option>
            </Select>
            <!-- <button type="button" class="btnDefault bgBlue">创建排班</button> -->
            <button type="button" class="btnDefault bgGreen">保存排班</button>
        </div>
        <div class="schedule postformtable">
            <table class="scheduleForm" >
                <tr>
                    <th>站务员</th>
                    <th>星期一</th>
                    <th>星期二</th>
                    <th>星期三</th>
                    <th>星期四</th>
                    <th>星期五</th>
                    <th>星期六</th>
                    <th>星期日</th>
                    <th>总工时</th>
                </tr>
                <tr v-for="item in users" :key="item.userId" :id="'item'+item.userId" :code="item.userId">
                    <td>{{item.userName}}</td>
                    <td v-for="i in 7" @click="beforeSelectShift" :key="'item.userId-'+i"></td>
                    <td class="totalHours"></td>
                </tr>
            </table>
        </div>
        <!-- 选择排班 -->
        <Modal v-model="shiftsModal"
            id="usersModal"
            title="选择班次" 
            width="600"
            @on-ok="selectShift"
            @on-cancel="cancel">
            <button type="button" class="btnDefault bgBlue" @click="handleCancel">重置</button>
            <div class="userList shiftsList">
                <span v-for="item in modalShifts" :key="item.shiftId" @click="clickShift(item)" :code="item.shiftId" :style="'background-color:#'+item.shiftColor">{{item.shiftName}}</span>
            </div>
        </Modal>
    </div>
</template>
<script>
import {result} from '@/assets/data/data.js';
import {getSuites, manualTemplate, loadTemplate} from '@/api/api';
export default {
    data: function () {
        return {
            districtId: this.$store.get('districtId'),
            shiftsModal: false,
            suites: [],
            users: [],
            suiteId: null,
            shiftsMap: new Map(),
            modalShifts: [],
            modalShiftsMap: new Map(),
            currentShift: null,
            temporary: null,
            currentUser: null
        }
    },
    created: function () {
        this.getSuites();
        //this.loadTemplate();
        for(let obj of this.suites){
            this.shiftsMap.set(obj.shiftId, obj.users);
        }
        for(let key in result.suites){
            this.modalShifts.push(result.shifts[key]);
            this.modalShiftsMap.set(key, result.shifts[key]);
        }
    },
    methods: {
        //  获取班制
        getSuites: async function () {
            let data = {
                districtId: this.districtId,
                backup: 1
            };
            let response = await getSuites(data);
            if(response.meta.code === 0){
                this.suites = response.data;
                this.suiteId = response.data[0].id;
                this.loadTemplate(this.suiteId);
                return;
            }
            this.$Message.error(response.meta.message);
        },
        //  加载排班模版
        loadTemplate: async function () {
            let response = await loadTemplate(this.suiteId);
            console.log(response);
        },
        changeShift: function () {
            this.users = this.shiftsMap.get(this.shift);
        },
        //  选择班次取消
        cancel: function () {
            $('.userList').find('.active').removeClass('active');
        },
        //  设置班次
        setTemplateClass: async function () {
            let data = {
                suiteId: this.suiteId,
                classId: classId,
                weekNum: weekNum,
                dayNum: dayNum
            }
            let response = await setTemplateClass(data);
            let message = response.meta.message;
            if(response.meta.code === 0){
                this.$Message.success(message);
                return;
            }
            this.$Message.error(message);
        },
        //  保存排班
        manualTemplate: async function (id) {
            // let response = await manualTemplate(94);
            // let message = response.meta.message;
            // if(response.meta.code === 0){
            //     this.$Message.success(message);
            //     this.users = response.data;
            //     return;
            // }
            // this.$Message.error(message);
        },
        
        //  取消已选班次
        handleCancel: function () {
            $('.currentTd').html('').removeAttr('code').removeAttr('style').removeAttr('hours'); 
            this.shiftsModal = false;
            this.countHours();
        },
        // 点击单元格选择班次
        beforeSelectShift: function (e) {
            $('.currentTd').removeClass('currentTd');
            let obj = $(e.target);
            obj.addClass('currentTd');
            this.shiftsModal = true;
            this.currentUser = {};
            let code = obj.parent().attr('code');
            
            for(let obj of this.users){
                if(obj.userId === code){
                    this.currentUser = obj;
                    break;
                }
            }
        },
        //  点击模态框班次
        clickShift: function (item) {
            this.temporary = item;
            $('span[code="' + item.shiftId + '"]').addClass('active').siblings().removeClass('active');
        },
        //  选择班次确定
        selectShift: function () {
            this.currentShift =  this.temporary;
            let hours = this.currentShift.totalAt/60;
            $('.currentTd').html(this.currentShift.shiftName).attr('hours', hours)
            .attr('code', this.currentShift.shiftId).css('background-color', '#'+this.currentShift.shiftColor);    
            $('.userList').find('.active').removeClass('active'); 
            this.countHours();       
        },
        //  统计工时
        countHours: function () {
            $('.totalHours').each(function () {
                let total = 0;
                let tds = $(this).prevAll();
                tds.each(function () {
                    let hours = $(this).attr('hours');
                    if(hours){
                        total += parseInt(hours);
                    }
                })
                total = total === 0 ? '' : total;
                $(this).html(total);
            })
        }
    }
}
</script>

