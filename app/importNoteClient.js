import Vue from 'vue';
import tree from './tree.vue';
import './element-variables.scss';
import introduction from './introduction.vue';
import VueRouter from 'vue-router';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import 'highlight.js/styles/github.css';

// const User={
//     template: '<div id="article" v-html="article" ></div>'
// };

// const router= new VueRouter({
//     routes: [
//         {
//           path: '/user/:fileName',
//           name: 'a',
//           component: User,
//         }
//     ]
// });

const outer = new Vue({
    el: '#outer',
    // router:router,

    components: {
        tree,
        introduction
    },
    data: {
        list1: [],
        article: '',
        dirs: [{ id: 1, name: 'js', dir: 'js笔记' }, { id: 2, name: 'css', dir: 'css笔记' },
            { id: 3, name: 'html', dir: 'html笔记' }, { id: 4, name: 'Vue', dir: 'Vue笔记' },
            { id: 5, name: 'reading', dir: '阅读小记' }, { id: 6, name: 'others', dir: '其他' },
            { id: 7, name: 'about', dir: '关于' }],
        expandedKey: ['11'],
        isActive: ['open', 'close'],
        sidebarClass: 'sidebar-exit',
        buttonClass: 'button-exit',
    },
    methods: {
        changeList(listType) {
            // this.expandeNode(listType);
            let list1 = ['js', 'css', 'html', 'Vue', 'reading', 'others', 'about'];
            let list2 = ['11', '21', '31', '41', '51', '61', '71'];
            let index = list1.indexOf(listType);
            this.expandedKey = [list2[index]];
            if (listType === 'about') {
                this.isActive = ['close', 'open'];
            } else {
                this.isActive = ['open', 'close'];
            }
            this.buttonClass = 'button-exit';
            this.sidebarClass = 'sidebar-exit';
        },
        changeExpand(eventData) {
            this.expandedKey[0] = eventData;
            console.log(this.expandedKey);
        },
        changeInner(flag) {
            if (flag === 'dir') {
                this.isActive = ['open', 'close'];
            } else {
                this.isActive = ['close', 'open'];
            }
        },
        loadData(arg) {
            let id = arg[1];
            let item = arg[0];
            let ele = this.dirs.filter((el) => { return el.dir === item && id <= 9 })[0];
            if (ele) {
                // console.log(ele);
                // console.log('woqu');
                this.changeList(ele.name);
            }
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const text1 = xhr.responseText;
                this.article = text1;
            };
            xhr.open('get', '/front-note/' + encodeURIComponent(item), true);
            xhr.send(null);
        },
        // loadData(arg) {
        //     // console.log(id);
        //     router.push({ path: `/user/${arg[0]}` });
        //     this.load(arg);
        // },
        changeDirExit() {
            if (this.buttonClass === 'button-exit') {
                this.sidebarClass = 'sidebar-hidden';
                this.buttonClass = 'button-hidden';
                console.log(this.sidebarClass);
            } else {
                this.buttonClass = 'button-exit';
                this.sidebarClass = 'sidebar-exit';
            }
        },
    },

});
