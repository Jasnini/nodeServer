   
    import tree from './tree.vue';
    import './element-variables.scss';
    let outer=new Vue({
        el: '#outer',
        data:{
            list1:[],
            article: '',
            dirs: [{id:1,name:'js',dir:'js笔记'},{id:2,name:'css',dir:'css笔记'},
                  {id:3,name:'html',dir:'html笔记'},{id:4,name:'Vue',dir:'Vue笔记'},
                  {id:5,name:'reading',dir:'阅读小记'},{id:6,name:'about',dir:'关于'}],
            expandedKey: ['11'],
        },
        
        components:{
            tree
        },
        methods:{
            changeList(listType){
                // this.expandeNode(listType);

                if (listType==='js'){
                    // this.list1=['JS','JS原型链','this的用法','事件','块级作用域','Ajax'];//文件名
                    console.log(this.expandedKey);
                    this.expandedKey=['11'];
                    console.log('p1');
                }else if(listType==='css'){
                    // this.list1=['CSS笔记'];
                    this.expandedKey=['21'];
                }else if(listType==='html'){
                    // this.list1=['DOM笔记'];
                    this.expandedKey=['31'];
                }else if(listType==='Vue'){
                    // this.list1=[''];
                    this.expandedKey=['41'];
                }else if(listType==='reading'){
                    // this.list1=[''];
                    this.expandedKey=['51'];
                }else if(listType==='about'){
                    // this.list1=[''];
                    this.expandedKey=['61'];
                }
            },
            changeExpand(eventData){
                this.expandedKey[0]=eventData;
                console.log(this.expandedKey);
            },
            // expandeNode(listType) {
            //     this.expandedKey = map[listType];
            // },
            loadData(arg) {
                // console.log(id);
                let id=arg[1];
                let item=arg[0];
                let ele=this.dirs.filter((el)=>{return el.dir===item && id<=9})[0];
                if (ele){
                    // console.log(ele);
                    // console.log('woqu');
                    this.changeList(ele.name);
                }
                const xhr = new XMLHttpRequest();       
                xhr.onload = () => {
                    const text1 = xhr.responseText;
                    this.article = text1;
                };
                xhr.open("get","/front-note/"+encodeURIComponent(item), true);
                xhr.send(null);
            },
        },

    })

    