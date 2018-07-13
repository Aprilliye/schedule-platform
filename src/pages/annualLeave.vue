<template>
    <div class="container">
        <div class="content-header">
            <span>年份：</span>
            <DatePicker v-model="year" type="year" placeholder="请选择年份" style="width: 200px" clearable></DatePicker>
            <span>站区：</span>
            <Select v-model="districtId" style="width:200px" clearable>
                <Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.districtName }}</Option>
            </Select>
            <button class="btnDefault bgBlue" type="button" @click="getHoliday">查询</button>
            <button class="btnDefault bgGreen" type="button" @click="holidayModal = true">导入年假</button>
        </div>
        <div class="panel-body">
            <Table border :columns="columns" :data="data"></Table>
        </div>
        <!--导入年假-->
        <Modal
            v-model="holidayModal"
            title="导入年假"
            @on-ok="importHoliday"
            @on-cancel="cancel"
            :loading="true">
            <Form :label-width="80" id="form">
                <FormItem label="选择文件：" id="selectFile">
                    <button type="button" class="btnDefault">选择文件</button>
                    <input type="file" id="holidayFile" name="file" @change="selectFile">
                    <span>{{fileName}}</span>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import {getDistricts, getHoliday, importHoliday} from '@/api/commonAPI';
export default {
    data: function () {
        return {
            year: '',
            lineNumber: '',
            columns: [
                {
                    title: '姓名',
                    key: 'userName'
                },
                {
                    title: '年份',
                    key: 'yearStr'
                },
                {
                    title: '站区',
                    key: 'districtName'
                },
                {
                    title: '年假额度',
                    key: 'yearyLimit'
                }
            ],
            data: [],
            districtList: [],
            districtId: null,
            lineNumbers: ['2号线', '8号线', '10号线', '13号线', '新线'],
            holidayModal: false,
            fileName: ''
        }
    },
    mounted: function () {
        this.getDistricts();
    },
    methods: {
        //  获取站区
        getDistricts: async function () {
            let response = await getDistricts();
            if(response.meta.code === 0){
                this.districtList = response.data;
                return;
            }
            this.$Message.error(response.meta.message);
        },
        //  查询
        getHoliday: async function () {
            if(!this.year){
                this.$Message.warning('请选择年份');
                return;
            }
            let year = String(this.year.getFullYear());
            let data = {
                year: year
            };

            let districtId = this.districtId;
            districtId && (data.districtId = districtId);

            let response = await getHoliday(data);
            let message = response.meta.message;
            if(response.meta.code === 0){
                this.$Message.success(message);
                this.data = response.data;
                return;
            }
            this.$Message.error(message);
        },
        //  选择文件
        selectFile: function () {
            let file = $('#holidayFile').get(0).files[0];
            this.fileName = file.name;
        },
        //  导入年假
        importHoliday: async function () {
            let formData = new FormData('form');
            let file = $('#holidayFile').get(0).files[0];
            if(!file){
                this.$Message.warning('请先选择文件');
                return;
            }
            formData.append('file', file);
            this.fileName = file.name;
            let response = await importHoliday(formData);
            if(response.meta.code === 0){
                this.$Message.success('导入成功');
                this.cancel();
                return;
            }
            this.$Message.error(response.meta.message);
        },
        //  取消
        cancel: function () {
            $('#holidayFile').val('');
            this.fileName = '';
        }
    }
}
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>
