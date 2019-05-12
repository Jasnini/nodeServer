<template>
  <div id="todoList">
    <div>
      <p id="title">
        TODOS
      </p>
    </div>
    <nav id="head">
      <input
        id="addbox"
        v-model="thing"
        placeholder="What you want to do?"
        @keyup.enter="addThing()"
      ><button
        id="addbutton"
        @click="addThing()"
      >
        AddThing
      </button>
    </nav>
    <div id="mainout">
      <div id="main">
        <componnet
          is="todo-item"
          v-for="(item) in showThings"
          :key="item.id"
          :item="item.content"
          :classt=" item.done===0 ? &quot;uncomplete&quot;:&quot;complete&quot; "
          :state=" item.done===0 ? false:true"
          @del-thing="deletThing(item.id)"
          @state-change="stateChange(item)"
          @input="changeThing(item,$event)"
        />
      </div>
    </div>
    <div v-if=" things.length!==0 ">
      <nav id="bottom">
        <!-- <div> -->
        <input
          id="all"
          name="listType"
          type="radio"
          checked
          @click="showWhat('all')"
        >
        <label for="all">All</label>
        <!-- </div> -->
        <!-- <div> -->
        <input
          id="complete"
          name="listType"
          type="radio"
          @click="showWhat('complete')"
        >
        <label for="complete">Done</label>
        <!-- </div> -->
        <!-- <div> -->
        <input
          id="uncomplete"
          name="listType"
          type="radio"
          @click="showWhat('uncomplete')"
        >
        <label for="uncomplete">Undone</label>
        <!-- </div> -->

        <!-- <button id='all' v-on:click="showWhat('all')">All</button>
                <button id='complete' v-on:click="showWhat('complete')">Done</button>
                <button id='uncomplete' v-on:click="showWhat('uncomplete')">Undone</button> -->
        <button
          id="dels"
          :style="{visibility: dis}"
          @click="clearDone()"
        >
          Clear Done
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import todoItem from './TodoItem.vue';

export default ({
    data() {
        return {
            'thing': '',
            'things': [], // id content done
            'button': 'all',
            'i': 0,
            'dis': 'hidden'
        };
    },

    'components': {
        todoItem
    },

    'methods': {
        addThing() {
            if (this.thing.trim().length !== 0) {
                this.i++;
                this.things.push({ 'id': this.i, 'content': this.thing, 'done': 0 });
                this.thing = '';
            }
        },

        deletThing(id1) {
            this.things = this.things.filter((el, index1, arr) => {
                return el.id !== id1;
            });
            const temp = this.things.filter(function(el, index1, arr) {
                return el.done === 1;
            });

            if (temp.length !== 0) {
                this.dis = 'visible';
            } else {
                this.dis = 'hidden';
            }
        },

        stateChange(item1) {
            if (item1.done === 0) {
                const index1 = this.things.indexOf(item1),
                    id1 = item1.id,
                    content1 = item1.content;

                Vue.set(this.things, index1, { 'id': id1, 'content': content1, 'done': 1 });
            } else if (item1.done === 1) {
                const index1 = this.things.indexOf(item1),
                    id1 = item1.id,
                    content1 = item1.content;

                Vue.set(this.things, index1, { 'id': id1, 'content': content1, 'done': 0 });
            }
            const temp = this.things.filter(function(el, index1, arr) {
                return el.done === 1;
            });

            if (temp.length !== 0) {
                this.dis = 'visible';
            } else {
                this.dis = 'hidden';
            }
        },
        clearDone() {
            this.things = this.things.filter(function(el) {
                return el.done !== 1;
            });
            const temp = this.things.filter(function(el, index1, arr) {
                return el.done === 1;
            });

            if (temp.length !== 0) {
                this.dis = 'visible';
            } else {
                this.dis = 'hidden';
            }
        },
        showWhat(buttonType) {
            if (buttonType === 'all') {
                this.button = 'all';
            } else if (buttonType === 'complete') {
                this.button = 'complete';
            } else if (buttonType === 'uncomplete') {
                this.button = 'uncomplete';
            }
        },
        changeThing(item1, event1) {
            const index = this.things.indexOf(item1),
                event2 = event1.slice(0, event1.length);
            // console.log(index);

            if (event2.length === 0) {
                this.things.splice(index, 1);
            } else {
                Vue.set(this.things, index, { 'id': item1.id, 'content': event2, 'done': item1.done });
            }
            // console.log(1);
            // console.log(event1.length);
            // console.log(event1);
        }
    },
    'computed': {
    // 根据不同的选项按钮，展示的不同的数据
        'showThings': function() {
            if (this.button === 'all') {
                return this.things;
            } else if (this.button === 'uncomplete') {
                const temp = this.things.filter((el, index1, arr) => {
                    return el.done === 0;
                });

                return temp;
            } else if (this.button === 'complete') {
                const temp = this.things.filter((el, index1, arr) => {
                    return el.done === 1;
                });

                return temp;
            }
        }
    //  storageList () {
    //         localStorage.setItem('todoList',this.things);
    //     }
    },
    'watch': {
        things() {
            window.localStorage.removeItem('todoList');
            window.localStorage.setItem('todoList', JSON.stringify(this.things));
        }
    },
    created() {
        const todoList = JSON.parse(window.localStorage.getItem('todoList'));

        if (todoList) {
            this.things = todoList;
            this.i = this.things.length;
        }
        const doneThings = this.things.filter((el, index1, arr) => {
            return el.done === 1;
        });

        console.log(doneThings.length > 0);
        if (doneThings.length > 0) {
            this.dis = 'visible';
        } else {
            this.dis = 'hidden';
        }
    }

});
</script>

<style>
    html {
    height:100%;
    font-size: 16px;
    font-family: Helvetica;
    }
    body {
        height:100%;
    }

    #title {
        /* width: 1rem; */
        /* height: 2rem; */
        padding-top:2rem ;
        /* padding-left:40%; */
        margin: 0 0;
        font-size: 3.5rem;
        text-align: center;
        font-family: cursive;
        color: rgba(240, 118, 118, 0.986);
        font-weight: 800;
    }

    #head {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2rem;
    padding-bottom: 1rem;

    }

    #mainout {
        display: flex;
    align-items: center;
    justify-content: center;
    }

    #main {
        width: 80%;
        /* padding-bottom: 0rem; */
        margin-bottom: 2rem;
        box-shadow: 0.5rem 0.5rem 2rem gray ;
    }

    #bottom {
        height: 1.5rem;
        padding-bottom: 1rem;
        text-align: center;
    }

    #addbox {
        display: inline-block;
        width: 65%;
        height: 3rem;
        margin-right: 0.3rem;
        font-size: 1.5rem;
        padding-left: 1rem;
    }

    #addbutton {
        display: inline-block;
        height: 3.316rem;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 4px;
        border:0.1rem solid rgb(204, 203, 203);
        outline: none;
    }

    #addbutton:active {
        border-color: rgb(163, 163, 163);
    }

    #addbutton:hover {
        /* background-color: rgb(226,224, 224); */
        box-shadow: 0.2rem 0.2rem 0.2rem 0 rgba(114, 114, 114)
    }

    #container {
        display: flex;
        border-bottom: 1px solid rgb(216, 214, 214);
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        /* height: 1.8rem; */
    }
    /* #main #container:last-of-type{
        border-bottom:1px solid rgb(216, 214, 214);
    } */

    #check {
        zoom: 170%;
        /* margin-top: 0.5rem;  */
        margin-left: 1rem;
        /* float: left; */
        /* vertical-align: middle;  */
        /* left: 1 em; */
    }
    #item {
        /* display: flex; */
        position: relative;
        display: inline-block;
        width: 100%;
        padding-right: 0.5rem;
        word-wrap:break-word;
        white-space: nowrap;

    }
    #del {
        float: right;
        position: absolute;
        right: 0.4rem;
        bottom: 0rem;
        /* flex: 1; */
        display: none;
        font-size: 1.5rem;
        background: transparent;
        border: none;
        color: rgb(194, 190, 190);
        /* margin-top: 0rem;
        padding-top: 0rem; */
        /* padding-bottom: 0.5rem; */
        /* visibility: hidden; */
        outline: none;
    }

    #item:hover #del {
        /* visibility: visible; */
        display: inline;
    }
    #del:hover {
        color: rgb(122, 32, 103);
    }

    #dels{
        display:inline-block;
        height: 2rem;
        font-size: 1rem;
        color: rgb(194, 190, 190);
        margin-right: 0.3rem;
        cursor: pointer;
        border-radius: 4px;
        border: none;
        background: transparent;
        outline: none;
    }
    #dels:hover{
        color: rgb(122, 32, 103);
    }

    ::-webkit-input-placeholder {
        font-style: italic;
        color: rgb(214, 211, 211);
        font-size: 1.5rem;
        font-family: Georgia, 'Times New Roman', Times, serif;
    }

    .complete{
        text-decoration-line: line-through;
        -webkit-text-decoration-line: line-through;
        color: rgb(167, 162, 162);
        font-style: italic;
    }
    #itemin{
        /* flex: 20; */
        /* user-modify: read-write-plaintext-only; */
        display: inline-block;
        width: 98%;
        /* margin-right:1rem; */
        padding-right: 0;
        font-size: 1.3rem;
        font-weight: 300;
        font-family:  "Microsoft Yahei";
        outline: none;
    }

    label{
        padding-right:2rem;
    }
</style>
