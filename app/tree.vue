
<template>
  <div id="tree">
    <template v-if="rePaint">
      <el-tree
        ref="tree"
        node-key="id"
        :data="data"
        highlight-current
        accordion
        :default-expanded-keys="expandedkey"
        :props="defaultProps"
        @node-click="handleNodeClick"
        @node-expand="changeexpand"
      />
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import Tree from '@/node_modules/element-ui';
import './element-variables.scss';
Vue.use(Tree);

export default {
    name: 'Tree',
    props: ['expandedkey'],
    data() {
        return {
            rePaint: true,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            data: [{
                id: '1',
                label: 'js笔记',
                children: [{
                    id: '11',
                    label: 'js'
                }, {
                    id: '12',
                    label: 'js原型链'
                }, {
                    id: '13',
                    label: 'this的用法'
                }, {
                    id: '14',
                    label: '事件'
                }, {
                    id: '15',
                    label: 'js块级作用域'
                }, {
                    id: '16',
                    label: 'Ajax'
                }, {
                    id: '17',
                    label: 'async await'
                }, {
                    id: '18',
                    label: 'ES6 箭头函数'
                }, {
                    id: '19',
                    label: 'promise'
                }, {
                    id: '110',
                    label: '内存泄漏'
                }, {
                    id: '111',
                    label: '正则表达式'
                }
                ]
            },
            {
                id: '2',
                label: 'css笔记',
                children: [{
                    id: '21',
                    label: 'css'
                }, {
                    id: '22',
                    label: '盒模型'
                }]
            },
            {
                id: '3',
                label: 'html笔记',
                children: [{
                    id: '31',
                    label: 'DOM'
                }]
            },
            {
                id: '4',
                label: 'Vue笔记',
                children: [{
                    id: '41',
                    label: 'Vue 解决this.$refs.content1.focus();失效的问题'
                }, {
                    id: '42',
                    label: 'Vue.js'
                }, {
                    id: '43',
                    label: 'VueRouter'
                }]
            },
            {
                id: '5',
                label: '阅读小记',
                children: [{
                    id: '51',
                    label: 'xxx'
                }
                ]
            }, {
                id: '6',
                label: '其他文章',
                children: [{
                    id: '61',
                    label: 'js前端面试问题汇总'
                }, {
                    id: '62',
                    label: 'Https'
                }, {
                    id: '63',
                    label: 'session cookie token'
                }, {
                    id: '64',
                    label: 'web性能优化的方法'
                }, {
                    id: '65',
                    label: 'web缓存'
                }, {
                    id: '66',
                    label: '几种攻击类型'
                }]
            }
            ]
        };
    },
    watch: {
        expandedkey(newExpandedkey, oldExpandedkey) {
            // if(newExpandedkey[0]!==oldExpandedkey[0]){
            if (newExpandedkey[0] !== '71' && newExpandedkey[0] !== '81') {
                this.rePaint = false;
                this.$nextTick(() => {
                    this.rePaint = true;
                    const dd = this;

                    this.$nextTick(() => {
                        const node = dd.$refs.tree.getNode(newExpandedkey[0]);

                        dd.$refs.tree.setCurrentKey(newExpandedkey[0]);
                        const nodedata = dd.$refs.tree.getCurrentNode();

                        node.expanded = true;
                        dd.handleNodeClick(nodedata);
                    });
                });
            }

            // }
        }
    },
    mounted() {
        this.$nextTick(function() {
            if (/^\/tools\//.test(this.$route.path)) {

            } else if (this.$route.query.id) {
                const id1 = this.$route.query.id;

                this.$refs.tree.setCurrentKey(id1);
                const node1 = this.$refs.tree.getCurrentNode();

                this.handleNodeClick(node1);
            } else {
                const id1 = '11';

                this.$refs.tree.setCurrentKey(id1);
                const node1 = this.$refs.tree.getCurrentNode();

                this.handleNodeClick(node1);
            }
        });
    },
    methods: {
        handleNodeClick(node1, obj, tree) {
            // let node=this.$refs.tree.getCurrentNode();
            const node = node1;

            if (node.id > 9) {
                this.$emit('loaddata', [node.label, node.id]);
            } else if (node.id <= 9) {
                this.$emit('loaddata', [node.children[0].label, node.children[0].id]);
                this.$refs.tree.setCurrentNode(node.children[0]);
            }
        },
        changeexpand(nodedata, node, tree) {
            const nodeid = nodedata.id;

            this.$emit('changeexpand', nodeid);
        }
    }
};

</script>

<style lang="less">
#tree {
    .el-tree{
        background-color: rgb(238, 237, 237);

    }

    .el-tree-node__label{
        font-size: 1.1rem;
        color: black;
        padding-right: 5px;
    }
    .el-tree-node__children  .el-tree-node__label{
        font-size: 0.93rem;
        color: gray;
    }

    .el-tree-node__content {
        height: 3rem;
        padding-left: 5px ;
        overflow:scroll;
  }
}
#tree{
    padding-bottom: 30px;
}
</style>
