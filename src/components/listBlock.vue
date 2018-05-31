<template>
    <div>
        <div class="content-block">
            <div class="blockheader">
                {{title}}
                <div class="rgbutton">
                    <Dropdown>
                        <a>
                            <span class="white">操作</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem><a @click="modal1 = true">修改站区名称</a></DropdownItem>
                            <DropdownItem><a @click="modal2 = true">添加站点</a></DropdownItem>
                            <DropdownItem><a class="red" @click="removestation">删除站区</a></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

            </div>
            <div class="blockcontent">
                <ul class="blockul">
                    <li>
                        <span class="blockspan"></span>
                        <a class="icon-1 delete"></a>
                        <a class="icon-4 edit"></a>
                    </li>
                </ul>
            </div>
        </div>
        <Modal class="usermanage-model"
               title="修改站区名称"
               v-model="modal1"
                >
            <p>
                站区名称
                <input  name="userCode" type="text" >
            </p>
        </Modal>
        <Modal class="usermanage-model"
               title="添加站点"
               v-model="modal2"
                >
            <p>
                站点名称
                <input  name="userCode" type="text" >
            </p>
        </Modal>
    </div>
</template>
<script>
    export default {
        data:function(){
            return{
                modal8:false,
                modal1:false,
                modal2:false
            }
        },
        props:['title'],
        methods:{
            removestation:function(){
                $(".content-block").css("display","none")
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>