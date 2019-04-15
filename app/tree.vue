
<template>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>

<script>
    import vue from 'vue';
    import Tree from '@/node_modules/element-ui';
    Vue.use(Tree);

    export default{
        name:'tree',
        data(){
            return{
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                data: [{
                    label: 'js笔记',
                    children: [{
                        label: '',
                    }]
                },
                {
                    label:'css笔记',
                    children: [{
                        label: '',
                    }]
                },
                {
                    label:'html笔记',
                    children: [{
                        label: '',
                    }]
                },
                {
                    label:'Vue笔记',
                    children: [{
                        label: '',
                    }]
                },
                {
                    label:'阅读小记',
                    children: [{
                        label: '',
                    }]
                },
                ],
            }
        },
    }

</script>

<style>

</style>