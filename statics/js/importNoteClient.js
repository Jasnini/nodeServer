    let outer=new Vue({
        el: '#outer',
        data:{
            list1:[],
            article: '',
            dirs: [{name:'js',dir:'js笔记'},{name:'css',dir:'css笔记'},
                  {name:'html',dir:'html笔记'},{name:'Vue',dir:'Vue笔记'},
                  {name:'reading',dir:'阅读小记'},{name:'about',dir:'关于'}]
        },
        methods:{
            changeList(listType){
                if (listType==='js'){
                    this.list1=['JS','JS原型链','this的用法','事件','块级作用域','Ajax'];//文件名
                }else if(listType==='css'){
                    this.list1=['CSS笔记'];
                }else if(listType==='html'){
                    this.list1=['DOM笔记'];
                }else if(listType==='Vue'){
                    this.list1=[''];
                }else if(listType==='reading'){
                    this.list1=[''];
                }else if(listType==='about'){
                    this.list1=[''];
                }
            },
            loadData(item) {
                const xhr = new XMLHttpRequest();       
                xhr.onload = () => {
                    const text1 = xhr.responseText;
                    this.article = text1;
                };
                xhr.open("get","/front-note/"+encodeURIComponent(item), true);
                xhr.send(null);
            }
        },

    })

    