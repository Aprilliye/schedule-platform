<template>
    <div>
        <div class="content-header">
            <button class=" btnDefault bgGreen" type="button" @click="modal8 = true"><span>新增岗位</span></button>
            <Modal title="新增岗位"
                   v-model="modal8"
                    >
                <p>
                    岗位名称
                    <input id="newUserCode" type="text" >
                </p>
                <p class="settingp">
                    <label class="lableright">替班岗</label>
                    <input  data-size="small" type="checkbox" unchecked/>
                </p>
            </Modal>
            <Modal title="编辑岗位"
                   v-model="modal"
                    >
                <p>
                    岗位名称
                    <input id="editorUserCode" type="text" >
                </p>
                <p class="settingp">
                    <label class="lableright">替班岗</label>
                    <input  data-size="small" type="checkbox" unchecked/>
                </p>
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
                modal: false,
                modal8: false,
                columns: [
                    {
                        title: '岗位名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        name: '管理员'
                    },
                    {
                        name: '管理员'
                    },
                    {
                        name: '管理员'
                    },
                    {
                        name: '管理员'
                    }
                ]
            }
        },
        methods: {
            show:function (index) {
                this.modal = true;
    },
            remove:function (index) {
                this.data.splice(index, 1);
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>