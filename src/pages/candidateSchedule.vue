<template>
    <div class="container">
        <div class="content-header">
            <span>选择班制：</span>
            <Select v-model="shift" style="width:200px" @on-change="changeShift">
                <Option v-for="item in shifts" :value="item.shiftId" :key="item.shiftId">{{ item.shiftName }}</Option>
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
                <tr v-for="item in users" :key="item.userId" :id="'item'+item.userId" code="item.userId">
                    <td code="item.userId">{{item.userName}}</td>
                    <td v-for="i in 7" @click="beforeSelectShift" :key="'item.userId-'+i"></td>
                    <td>{{item.totalHours === 0 ? '' : item.totalHours}}</td>
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
import {result} from '@/assets/data/data.js'
export default {
    data: function () {
        return {
            shiftsModal: false,
            shifts: [
                {
                    shiftName: '班制一',
                    shiftId: 1,
                    users: [
                        {userName: '封伟', userId: 0, totalHours: 0},
                        {userName: '王惠云', userId: 1, totalHours: 0},
                        {userName: '祁爱军', userId: 2, totalHours: 0},
                        {userName: '鞠淑云', userId: 3, totalHours: 0},
                        {userName: '孟凡君', userId: 4, totalHours: 0}
                    ],
                },
                {
                    shiftName: '班制二',
                    shiftId: 2,
                    users: [
                        {userName: '张海军', userId: 7, totalHours: 0 },
                        {userName: '王素梅', userId: 8, totalHours: 0},
                        {userName: '王磊', userId: 9, totalHours: 0}
                    ],
                },
            ],
            users: [
                {userName: '封伟', userId: 0 },
                {userName: '王惠云', userId: 1},
                {userName: '祁爱军', userId: 2},
                {userName: '鞠淑云', userId: 3},
                {userName: '孟凡君', userId: 4}
            ],
            shift: 1,
            shiftsMap: new Map(),
            modalShifts: [],
            modalShiftsMap: new Map(),
            currentShift: null,
            temporary: null
        }
    },
    computed: {
        totalHours: function (item) {
            let total = 0;
            return total;
        }
    },
    created: function () {
        for(let obj of this.shifts){
            this.shiftsMap.set(obj.shiftId, obj.users);
        }
        for(let key in result.shifts){
            this.modalShifts.push(result.shifts[key]);
            this.modalShiftsMap.set(key, result.shifts[key]);
        }
    },
    methods: {
        changeShift: function () {
            this.users = this.shiftsMap.get(this.shift);
        },
        //  选择班次取消
        cancel: function () {
            $('.userList').find('.active').removeClass('active');
        },
        //  取消已选班次
        handleCancel: function () {
            $('.currentTd').html('').removeAttr('code').removeAttr('style'); 
            this.shiftsModal = false;
        },
        // 点击单元格选择班次
        beforeSelectShift: function (e) {
            $('.currentTd').removeClass('currentTd');
            $(e.target).addClass('currentTd');
            this.shiftsModal = true;
        },
        //  点击模态框班次
        clickShift: function (item) {
            this.temporary = item;
            $('span[code="' + item.shiftId + '"]').addClass('active').siblings().removeClass('active');
        },
        //  选择班次确定
        selectShift: function () {
            this.currentShift =  this.temporary;
            $('.currentTd').html(this.currentShift.shiftName).attr('code', this.currentShift.shiftId).css('background-color', '#'+this.currentShift.shiftColor);    
            $('.userList').find('.active').removeClass('active');        
        },
    }
}
</script>

