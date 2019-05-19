<template>
  <div id="outer">
    <div id="dhead">
      <div id="dheader2">
        <div id="dheader3">
          <nav
            id="return"
            style="cursor:pointer;"
            @click="changeList('js')"
          >
            DaLi&Blog
          </nav>
        </div>
        <div id="dheader4">
          <ul class="list1">
            <li
              v-for="item in showDir"
              :key="item.id"
              class="dir"
            >
              <a
                v-cloak
                class="js-note"
                @click="changeList(item.name)"
              >{{ item.dir }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div id="dbody">
      <div id="dbody2">
        <nav
          id="list2"
          :class="sidebarClass"
          value="目录"
        >
          <div style="text-align:center;">
            <button
              class="label"
              @click="changeInner('dir')"
            >
              目录
            </button><button
              class="label"
              @click="changeInner('about')"
            >
              关于
            </button>
          </div>

          <div
            class="innner"
            :class="isActive[0]"
          >
            <tree
              :expandedkey="expandedKey"
              @loaddata="loadData($event)"
              @changeexpand="changeExpand($event)"
            />
          </div>
          <div
            class="innner"
            :class="isActive[1]"
          >
            <introduction />
          </div>
          <div
            class="innner"
            :class="isActive[2]"
          >
            <tool />
          </div>
        </nav>

        <section
          id="content"
          value="内容"
          style="position:relative !important;"
        >
          <router-view />
          <button
            :class="buttonClass"
            style="cursor:pointer; display:inline-block !important;"
            @click="changeDirExit()"
          >
            &#9776;
          </button>
        </section>
      </div>
    </div>
    <div id="dend">
      <div id="dend1">
        <span
          id="copy"
          style="font-family:arial;"
        >Copyright &copy; 2019 &hearts; Dali</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import tree from './tree.vue';
import './element-variables.scss';
import introduction from './introduction.vue';
import VueRouter from 'vue-router';
import tool from './tool.vue';
Vue.use(VueRouter);

// import hljs from 'highlight.js/lib/highlight';
// import javascript from 'highlight.js/lib/languages/javascript';
// hljs.registerLanguage('javascript', javascript);

// import '../static/styles/github.css';
import comparticle from './article.vue';
import todoList from './TodoList.vue';
import triangle from './Triangle.vue';

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/article/:filename',
            name: 'comparticle',
            component: comparticle,
            props: (route) => {
                return { articleTitle: route.query };
            }
        },
        {
            path: '/tools/todoList',
            name: 'todoList',
            component: todoList
        },
        {
            path: '/tools/triangle',
            name: 'triangle',
            component: triangle
        }
    ]
});

export default ({
    name: 'Outer',
    router,

    components: {
        tree,
        introduction,
        tool
    },
    data() {
        return {
            list1: [],
            article: '',
            dirs: [
                { id: 1, name: 'js', dir: '前端笔记' },
                { id: 2, name: 'css', dir: 'css笔记' },
                { id: 3, name: 'html', dir: 'html笔记' },
                { id: 4, name: 'Vue', dir: 'Vue笔记' },
                { id: 5, name: 'reading', dir: '阅读小记' },
                { id: 6, name: 'others', dir: '其他文章' },
                { id: 8, name: 'tools', dir: '实用工具' },
                { id: 7, name: 'about', dir: '关于' }],
            showDir: [{
                id: 1, name: 'js', dir: '前端笔记' },
            { id: 5, name: 'reading', dir: '阅读小记' },
            { id: 6, name: 'others', dir: '其他文章' },
            { id: 8, name: 'tools', dir: '实用工具' },
            { id: 7, name: 'about', dir: '关于' }
            ],
            expandedKey: [],
            isActive: ['open', 'close', 'close'],
            sidebarClass: 'sidebar-exit',
            buttonClass: 'button-exit'
            // isRouterAlive: true,
        };
    },

    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route'() {
            // console.log(this.$route);
            if (!/^\/tools\//.test(this.$route.path)) {
                this.fetchData(this.$route.query);
            }
        }
    },

    created() {
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
    },
    methods: {
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
            }
        },
        loadData(arg) {
            // console.log('r');
            const oldRoute = this.$route.query.id;

            this.$router.push({ path: `/article/${arg[0]}`, query: { id: arg[1], dir: arg[0] }});
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
    }
});

</script>

<style >
@charset "utf-8";

body{
    font-size: 18px;
    width:100%;
    font-size:18px;
}
#outer{
    margin:0 0 0 0;
    width: 100%;

}

#dhead {
    height: 6rem;
    margin: 0 auto;
    background-color:rgb(91, 126, 139,0.1);

}

#dheader2 {
    display:flex;
    height: 100%;
    width: 75%;
    background-color:rgb(91, 126, 139, 0.8);
    margin: 0  auto;
    padding-top: 10px;
}

#dheader3 {
    display:inline-block;
    flex: 1;
    color:white;
}
#return {
    position: relative;
    top:10%;
    left:10%;
    width: 6rem;
    padding:4%;
    border-top : solid 3px white;
    border-bottom: solid 3px white;
    text-align: center;
    font-size: 1rem;
}

#dheader4 {
    display:inline-block;
    flex: 2.5;
    position: relative;

}

.list1 {
    position: absolute;
    bottom: 0%;
    padding-left:0;
    width: 100%;
    color: white ;
}
.js-note{
    cursor: pointer;
    padding: 3px 3px;
}
.js-note:active{
    color:rgb(233, 115, 115);
}

.list1 .dir {
    display: inline-block ;
    margin-right: 1.2rem;
    margin-bottom: 0.5rem;

}

#dbody {
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
#dbody2{
    display: -webkit-flex;
    display: flex;
    /* flex-wrap: wrap; */
    height: 700px;
    width:75%;
    margin: 2px 0 2px 0;
    opacity:0.95 ;
    z-index:9999 ;
}

#list2,.innner {
    height: 100%;
    margin-top: 0%;
    padding-top: 0px;
    background-color:rgb(238, 237, 237);
    overflow-y:auto;

}

.list2 {

    display: block;
    padding-left: 40%;
    padding-top: 3%;
    padding-bottom: 3%;
    height: 99%;

}

#content {
    flex-grow:1 ;
    box-sizing: border-box;
    height: 100%;
    background-color:rgb(255, 255, 255);
    overflow-x:scroll;
}

#comparticle{
    width: 100% ;
    box-sizing : border-box;
    height:100%;
    overflow-y:auto;
    padding: 2rem 2rem;
    background-color: white;
    font-size:1rem;
    line-height: 1.7rem;
}

#dend {
    display: block;
    height: 3rem;
    position: relative;
    background-color: rgb(64, 74, 78);
    z-index:1 ;
}

#dend1{
    height: 100%;
    z-index:2 ;
}

#copy {
    left:50%;
    transform: translate(-50%,-50%);
    position: absolute;
    top: 50%;
    color: white;
    font-size: 1rem;
}

/* ul li{
    display:block;
} */

[v-cloak]{
    display: none;
}
#section{
    max-width: 100% ;
    /* overflow:auto; */

}

.close{
    width: 0;
    visibility: hidden;
    height:0;
}
.open{
    width: 100%;
    opacity: 1;
    transition: opacity 0.5s linear;
    visibility: visible;
}

.label {
    display: inline-block;
    font-size: 1rem;
    width: 3rem;
    cursor: pointer;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-family: Microsoft Yahei;
    font-weight: 500;

}

.label:focus{
    background-color: rgb(119, 162, 241);
    outline: none ;
}

.sidebar-exit{
    visibility: visible;
    transition:0.3s;
    flex-shrink:0;
    flex-basis: 25%;
}

.sidebar-hidden{
    visibility: hidden ;
    flex: 0.001 ;
    transition:0.5s;
}
.button-exit{
    position:fixed;
    margin-left:-3rem ;
    bottom: 1rem;
    /* z-index:9999 !important; */
    font-size:0.8rem;
    color:white;
    background-color:rgb(64, 74, 78);
    transition:0.3s;
    outline:none;

}
.button-hidden{
    position:fixed;
    margin-left:1rem ;
    bottom: 1rem;
    /* z-index:9999 !important; */
    font-size:0.8rem;
    color:white;
    background-color: rgb(64, 74, 78);
    transition:0.5s;
    outline:none;
}

/* .el-tree-node__label{
} */
.el-tree>.el-tree-node{

   min-width:100%;
   display: inline-block;
}
.el-tree-node__label{
    padding-right: 5px;
}

table,th,td{
    border-collapse: collapse;
    border: solid 1px black;
}

.cache-img-container {
    text-align: center;
}

.cache-img {
    width: 554px;
    height: 528px;
}
[v-cloak] {
    display: none ;
}

@media screen and (max-width: 700px){
    html,.js-note{
        font-size: 12px;
    }
    #comparticle{
        font-size: 12px;
    }

    .sidebar-exit{
        flex-basis: 40%;
    }

    #content{
        flex-grow: 1;
        overflow:hidden;
    }

    #dheader2{
        width: 100% ;
    }
    #dbody2{
        width: 100% ;
    }
    .cache-img{
        width: 200px;
        height:  220px;
    }

}

</style>

