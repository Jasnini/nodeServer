<template>
    <div id='tool'>
        <ul>
            <li><a @click="activeTool('todoList')"> TodoList </a></li>
            <li><a> Triangle </a></li>
        </ul>
    </div>
</template>

<script>
    export default({
        methods: {
            activeTool(tool){
                if(tool==='todoList'){
                    this.$router.push({path:`/tools/todoList`});
                }else if(tool==='triangle' ){
                    this.$router.push({path:`/tools/triangle`});
                }
            },  
        },
    })

</script>

<style scoped>
    ul li{
        cursor:pointer;
        margin-left: 20%;
        padding-top: 10px;
    }
    ul{
        color: rgb(245, 130, 149); 
    }

    li:active{
        color: red;
    }

</style>