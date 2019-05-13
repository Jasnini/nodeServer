<template>
  <div id="comparticle">
    <div
      v-cloak
      id="article"
      v-html="article"
    />
  </div>
</template>

<script>
export default ({
    props: { articleTitle: Object },

    data: () => {
        return {
            article: ''
        };
    },

    watch: {
        articleTitle(newTitle) {
            this.fetchData(newTitle);
        }
    },

    mounted() {
        this.fetchData(this.$route.query);
    },
    methods: {
        fetchData(arg) {
            // console.log(arg);
            const item = arg.dir,
                xhr = new XMLHttpRequest();

            xhr.onload = () => {
                const resText = xhr.responseText;

                this.article = resText;
            };
            xhr.open('get', '/front-note/' + encodeURIComponent(item), true);
            xhr.send(null);
        }
    }

});
</script>

<style scoped>

</style>
