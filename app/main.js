import Vue from 'vue';
import Outer from './app.vue';
const outline = new Vue({
    render: (h) => h(Outer)
}).$mount('#outline');
