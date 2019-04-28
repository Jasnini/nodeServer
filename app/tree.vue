
<template>
<div id='tree'>
    <template v-if="rePaint">
        <el-tree ref="tree"  node-key="id"  :data="data" highlight-current accordion :default-expanded-keys="expandedkey" :props="defaultProps" @node-click="handleNodeClick" @node-expand="changeexpand" >
        </el-tree>
    </template>
</div>
</template>

<script>
    import Vue from 'vue';
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
                        label: 'js',
                    },{
                        id:'12',
                        label:'js原型链'
                    },{
                        id:'13',
                        label:'this的用法'
                    },{
                        id:'14',
                        label:'事件'
                    },{
                        id:'15',
                        label:'js块级作用域'
                    },{
                        id:'16',
                        label:'Ajax'
                    },{
                        id:'17',
                        label:'async await'
                    },{
                        id:'18',
                        label:'ES6 箭头函数'
                    },{
                        id:'19',
                        label:'promise'
                    },{
                        id:'110',
                        label:'内存泄漏'
                    },{
                        id:'111',
                        label:'正则表达式'
                    }
                    ]
                },
                {
                    id:'2',
                    label:'css笔记',
                    children: [{
                        id:'21',
                        label: 'css'
                    },{
                        id:'22',
                        label:'盒模型'
                    }]
                },
                {
                    id:'3',
                    label:'html笔记',
                    children: [{
                        id:'31',
                        label: 'DOM',
                    }]
                },
                {
                    id:'4',
                    label:'Vue笔记',
                    children: [{
                        id:'41',
                        label: 'Vue 解决this.$refs.content1.focus();失效的问题'
                    },{
                        id:'42',
                        label: 'Vue.js'
                    }]
                },
                {
                    id:'5',
                    label:'阅读小记',
                    children: [{
                        id:'51',
                        label: 'xxx',
                    },
                    ]
                },{
                    id:'6',
                    label:'其他',
                    children: [{
                        id:'61',
                        label:'js前端面试问题汇总'
                    },{
                        id:'62',
                        label:'Https',
                    },{
                        id:'63',
                        label:'session cookie token'
                    },{
                        id:'64',
                        label:'web性能优化的方法'
                    },{
                        id:'65',
                        label:'web缓存'
                    },{
                        id:'66',
                        label:'几种攻击类型'
                    }]
                }
                ],
            }
        },
        methods: {
            handleNodeClick(node1,obj,tree){
                // let node=this.$refs.tree.getCurrentNode();
                let node=node1;
                // console.log('pppp');
                if(node.id>9){
                    this.$emit('loaddata',[node.label,node.id]);
                    // console.log(node.label);
                }else if(node.id<=9){
                    this.$emit('loaddata',[node.children[0].label,node.children[0].id]);
                    this.$refs.tree.setCurrentNode(node.children[0]);
                    // console.log(node.label);
                }
            },
            changeexpand(nodedata,node,tree){
                // console.log('ppp2');
                let nodeid=nodedata.id;
                this.$emit('changeexpand',nodeid);
                
            },
        },
        watch: {
            expandedkey(newExpandedkey,oldExpandedkey){
                if(newExpandedkey[0] !== '71'){
                    this.rePaint = false;
                    console.log(newExpandedkey);
                    this.$nextTick(() => {
                        this.rePaint = true;
                        let dd=this;
                        this.$nextTick(() => {
                            console.log(newExpandedkey);
                            let node=dd.$refs.tree.getNode(newExpandedkey[0]);
                            dd.$refs.tree.setCurrentKey(newExpandedkey[0]);
                            let nodedata=dd.$refs.tree.getCurrentNode();
                            node.expanded=true;
                            dd.handleNodeClick(nodedata);
                            
                            // console.log(node);
                        });
                    });
                }    
                    // console.warn(newExpandedkey);
            }, 
        },
        mounted: 
            function () {
                this.$nextTick(function () {
                    this.$refs.tree.setCurrentKey('11');
                    let node1=this.$refs.tree.getCurrentNode();
                    console.log(node1);
                    this.handleNodeClick(node1);
                })
                }
        }

</script>

<style> 
    .el-tree{
        background-color: rgb(238, 237, 237) !important;
         
    }
    
    .el-tree-node__label{
        font-size: 1.1rem !important;
        color: black;
    }
    .el-tree-node__children  .el-tree-node__label{
        font-size: 0.93rem !important;
        color: gray !important;
    }

    .el-tree-node__content {
        height: 3rem;
        padding-left: 5px !important;
  }
  

</style>