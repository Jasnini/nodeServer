
<template>
<div id='tree'>
    <template v-if="rePaint">
        <el-tree ref="tree"  node-key="id" accordion :default-expanded-keys="[expandedkey]" :data="data" :props="defaultProps" @node-click="handleNodeClick" >
        </el-tree>
    </template>
</div>
</template>

<script>
    import vue from 'vue';
    import Tree from '@/node_modules/element-ui';
    import './element-variables.scss';
    Vue.use(Tree);

    export default{
        name:'tree',
        props: ['expandedkey'],
        data(){
            return {
                rePaint: true,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                data: [{
                    id:'1',
                    label: 'js笔记',
                    children: [{
                        id: '11',
                        label: 'JS',
                    },{
                        id:'12',
                        label:'JS原型链'
                    },{
                        id:'13',
                        label:'this的用法'
                    },{
                        id:'14',
                        label:'事件'
                    },{
                        id:'15',
                        label:'块级作用域'
                    },{
                        id:'16',
                        label:'Ajax'
                    },
                    ]
                },
                {
                    id:'2',
                    label:'css笔记',
                    children: [{
                        id:'21',
                        label: 'css笔记',
                    }]
                },
                {
                    id:'3',
                    label:'html笔记',
                    children: [{
                        id:'31',
                        label: 'DOM笔记',
                    }]
                },
                {
                    id:4,
                    label:'Vue笔记',
                    children: [{
                        id:41,
                        label: 'hahaa',
                    }]
                },
                {
                    id:5,
                    label:'阅读小记',
                    children: [{
                        id:51,
                        label: 'xxx',
                    },
                    ]
                },
                ],
            }
        },
        methods: {
            handleNodeClick(){
                let node=this.$refs.tree.getCurrentNode();
                console.log(node.id);
                if(node.id>9){
                    this.$emit('loaddata',node.label);
                    console.log(node.label);
                }
            }
        },
        watch: {
            expandedkey(newExpandedkey,oldExpandedkey){
                this.rePaint = false;
                this.$nextTick(() => {
                    this.rePaint = true;
                    let dd=this;
                    this.$nextTick(() => {
                        console.log(newExpandedkey);
                        dd.$refs.tree.setCurrentKey(newExpandedkey);
                    });
                });
                
                
                
                
                
                // console.warn(newExpandedkey);
            },
        }
    }

</script>

<style> 
    .el-tree{
        background-color: rgb(238, 237, 237) !important;
         
    }
    
    .el-tree-node__label{
        font-size: 1.1rem !important;
    }
    .el-tree-node__children  .el-tree-node__label{
        font-size: 0.93rem !important;
    }

    .el-tree-node__content {
        height: 3rem;
        padding-left: 2rem !important;
  }
  

</style>