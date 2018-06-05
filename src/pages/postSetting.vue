<template>
    <div class="container">
        <div class="content-header">
            <button class=" btnDefault bgGreen" type="button" @click="beforeAddPost"><span>新增岗位</span></button>
            <Modal title="新增岗位"
                v-model="addPostModal">
                <Form :label-width="80">
                    <FormItem label="岗位名称：">
                        <Input v-model="addPostName" placeholder=""/>
                    </FormItem>
                    <FormItem label="替班岗：">
                        <Checkbox v-model="addIfRelay"></Checkbox>
                    </FormItem>
                </Form>
            </Modal>
            <Modal title="编辑岗位"
                v-model="editPostModal"
                on-ok="editPost">
                <Form :label-width="80">
                    <FormItem label="岗位名称：">
                        <Input v-model="editPostName" placeholder=""/>
                    </FormItem>
                    <FormItem label="替班岗：">
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
                        title: '是不是替班',
                        key: 'ifRelay',
                        render: (h, params) => {
                            let str = params.row.ifRelay ? '是' : '不是';
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
                            this.currentIndex = params.index;
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
                                            this.editIfRelay = params.row.ifRelay;
                                            this.editPostName = params.row.name;
                                            this.editPostModal = true;
                                            //this.eidtItem = params.row;
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
                    },
                    {
                        name: '站务员',
                        ifRelay: true
                    },
                    {
                        name: '值班站长',
                        ifRelay: false
                    },
                    {
                        name: '站区长助理',
                        ifRelay: true
                    }
                ],
                eidtItem: {
                    name: '',
                    ifRelay: null
                }
            }
        },
        methods: {
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
            //  编辑岗位
            editPost: function () {
                //  this.data.ifRelay = this.currentIndex
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>