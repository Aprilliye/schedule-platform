<template>
    <div class="container">
        <div class="content-header">
            <button class=" btnDefault bgGreen" type="button" @click="beforeAddPost">新增岗位</button>
            <Modal title="新增岗位"
                v-model="addPostModal"
                @on-ok="addPost"
                :loading="true">
                <Form :label-width="90">
                    <FormItem label="岗位名称：" required>
                        <Input v-model.trim="addPostName" placeholder=""/>
                    </FormItem>
                    <FormItem label="备班岗：">
                        <Checkbox v-model="addIfRelay"></Checkbox>
                    </FormItem>
                </Form>
            </Modal>
            <Modal title="编辑岗位"
                v-model="editPostModal"
                @on-ok="editPost"
                :loading="false">
                <Form :label-width="90">
                    <FormItem label="岗位名称：" required>
                        <Input v-model.trim="editPostName" placeholder=""/>
                    </FormItem>
                    <FormItem label="备班岗：">
                        <Checkbox v-model="editIfRelay"></Checkbox>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div class="panel-body">
            <Table border :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>
<script>
import {getAllPost} from '@/api/api'
    export default {
        data:function () {
            return {
                editPostModal: false,
                addPostModal: false,
                addIfRelay: false,
                editIfRelay: false,
                addPostName: '',
                editPostName: '',
                columns: [
                    {
                        title: '岗位名称',
                        key: 'name'
                    },
                    {
                        title: '备班岗位',
                        key: 'ifRelay',
                        render: (h, params) => {
                            let str = params.row.ifRelay ? '是' : '否';
                            return h('div', [
                                h('span', {
                                    style: {
                                        textAlign: 'center'
                                    },
                                }, str)
                            ]);;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.currentIndex = params.index;
                                            this.editIfRelay = params.row.ifRelay;
                                            this.editPostName = params.row.name;
                                            this.editPostModal = true;
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.brforeDeletePost()
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        name: '管理员',
                        ifRelay: false
                    }
                ],
                eidtItem: {
                    name: '',
                    ifRelay: null
                }
            }
        },
        mounted: function () {
            this.getAllPost();
        },
        methods: {
            //  获取所有岗位
            getAllPost: async function () {
                let response = await getAllPost(9);
                let message = response.meta.message;
                if(response.meta !== 0){
                    this.$Message.error(message);
                }
            },
            //  点击删除岗位
            brforeDeletePost: function (index) {
                this.$Modal.confirm({
                content: "<p>确定要删除这个岗位吗？</p>",
                loading: true,
                onOk: () => {
                    this.$Modal.remove();
                    this.detelePost(this.currentIndex);
                    }
                });
            },
            //  删除岗位
            detelePost: function (index) {
                this.data.splice(index, 1);
            },
            //  点击新增岗位
            beforeAddPost: function () {
                this.addIfRelay = false;
                this.addPostName = '';
                this.addPostModal = true;
            },
            //  确认新增岗位
            addPost: async function () {
                let name = this.addPostName;
                if(!name){
                    this.$Message.warning('岗位名称不能为空！');
                    return;
                }
                let obj = {
                    name: name,
                    ifRelay: this.addIfRelay
                }
                let response = await addPost();
                this.data.unshift(obj);
                this.addPostModal = false;
            },
            //  编辑岗位
            editPost: function () {
                let obj = this.data[this.currentIndex];
                let name = this.editPostName;
                if(!name){
                    this.$Message.warning('岗位名称不能为空！');
                    return;
                }
                obj.ifRelay = this.editIfRelay;
                obj.name = name;
                this.editPostModal = false;
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>