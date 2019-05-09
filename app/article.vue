<template>
    <div id="comparticle">
        <div id="article" v-html="article" v-cloak></div>
    </div>
</template>

<script>
    export default({
        props: ['article'],
    })
</script>

