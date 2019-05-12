import Vue from 'vue';
import tree from './tree.vue';
import './element-variables.scss';
require('../static/styles/indexStyle.css');
import introduction from './introduction.vue';
import VueRouter from 'vue-router';
import tool from './tool.vue';
Vue.use(VueRouter);

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

// import 'highlight.js/styles/github.css';
import comparticle from './article.vue';
import todoList from './TodoList.vue';

const router = new VueRouter({
    // mode: 'history',
    'routes': [
        {
            'path': '/article/:filename',
            'name': 'comparticle',
            'component': comparticle,
            'props': (route) => {
                return { 'articleTitle': route.query };
            }
        },
        {
            'path': '/tools/todoList',
            'name': 'todoList',
            'component': todoList
        }
    ]
});

const outer = new Vue({
    'el': '#outer',
    'router': router,

    'components': {
        tree,
        introduction,
        tool
    },
    'data': {
        'list1': [],
        'article': '',
        'dirs': [
            { 'id': 1, 'name': 'js', 'dir': '前端笔记' },
            { 'id': 2, 'name': 'css', 'dir': 'css笔记' },
            { 'id': 3, 'name': 'html', 'dir': 'html笔记' },
            { 'id': 4, 'name': 'Vue', 'dir': 'Vue笔记' },
            { 'id': 5, 'name': 'reading', 'dir': '阅读小记' },
            { 'id': 6, 'name': 'others', 'dir': '其他文章' },
            { 'id': 8, 'name': 'tools', 'dir': '实用工具' },
            { 'id': 7, 'name': 'about', 'dir': '关于' }],
        'showDir': [{
            'id': 1, 'name': 'js', 'dir': '前端笔记' },
        { 'id': 5, 'name': 'reading', 'dir': '阅读小记' },
        { 'id': 6, 'name': 'others', 'dir': '其他文章' },
        { 'id': 8, 'name': 'tools', 'dir': '实用工具' },
        { 'id': 7, 'name': 'about', 'dir': '关于' }
        ],
        'expandedKey': [],
        'isActive': ['open', 'close', 'close'],
        'sidebarClass': 'sidebar-exit',
        'buttonClass': 'button-exit'
        // isRouterAlive: true,
    },
    'methods': {
        changeList(listType) {
            // this.expandeNode(listType);
            const list1 = ['js', 'css', 'html', 'Vue', 'reading', 'others', 'about', 'tools'];
            const list2 = ['11', '21', '31', '41', '51', '61', '71', '81'];
            const index = list1.indexOf(listType);

            if (this.expandedKey[0] !== list2[index]) {
                this.expandedKey = [list2[index]];
            }

            if (listType === 'about') {
                this.isActive = ['close', 'open', 'close'];
            } else if (listType === 'tools') {
                this.isActive = ['close', 'close', 'open'];
            } else {
                this.isActive = ['open', 'close', 'close'];
            }
            this.buttonClass = 'button-exit';
            this.sidebarClass = 'sidebar-exit';
        },

        changeExpand(eventData) {
            this.expandedKey[0] = eventData;
            // console.log('q');
        },
        changeInner(flag) {
            if (flag === 'dir') {
                this.isActive = ['open', 'close', 'close'];
            } else {
                this.isActive = ['close', 'open', 'close'];
            }
        },
        fetchData(arg) {
            const id = arg.id;
            //   let item = arg.dir;
            const ele = this.dirs.filter((el) => {
                return el.id === id && id <= 9;
            })[0];

            if (ele) {
                // console.log('e');
                this.changeList(ele.name);
            } else if (this.expandedKey[0] !== id) {
                this.expandedKey = [id];
                // console.log('o');
                // const xhr = new XMLHttpRequest();
                // xhr.onload = () => {
                //     const text1 = xhr.responseText;
                //     this.article = text1;
                // };
                // xhr.open('get', '/front-note/' + encodeURIComponent(item), true);
                // xhr.send(null);
            }
        },
        loadData(arg) {
            // console.log('r');
            const oldRoute = this.$route.query.id;

            this.$router.push({ 'path': `/article/${arg[0]}`, 'query': { 'id': arg[1], 'dir': arg[0] }});
            if (oldRoute === arg[1]) {
                this.fetchData(this.$route.query);
            }
        },

        changeDirExit() {
            if (this.buttonClass === 'button-exit') {
                this.sidebarClass = 'sidebar-hidden';
                this.buttonClass = 'button-hidden';
            } else {
                this.buttonClass = 'button-exit';
                this.sidebarClass = 'sidebar-exit';
            }
        }
    },

    'watch': {
        // 如果路由有变化，会再次执行该方法
        '$route'() {
            // console.log(this.$route);
            if (!/^\/tools\//.test(this.$route.path)) {
                this.fetchData(this.$route.query);
            }
        }
    },

    created() {
        // console.log('rrr');
        this.initialId = this.$route.query.id;
        let id = '11';

        if (this.$route.query.id) {
            id = this.$route.query.id;
        }
        if (/^\/tools\//.test(this.$route.path)) {
            id = '81';
            this.isActive = ['close', 'close', 'open'];
        }
        console.log(id);
        this.expandedKey = [id];
        // this.isRouterAlive = false
        // this.$nextTick(() => (this.isRouterAlive = true))
    }

});
