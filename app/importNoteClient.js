   
    import tree from './tree.vue';
    import './element-variables.scss';
    import introduction from './introduction.vue';
    let outer=new Vue({
        el: '#outer',
        data:{
            list1:[],
            article: '',
            dirs: [{id:1,name:'js',dir:'js笔记'},{id:2,name:'css',dir:'css笔记'},
                  {id:3,name:'html',dir:'html笔记'},{id:4,name:'Vue',dir:'Vue笔记'},
                  {id:5,name:'reading',dir:'阅读小记'},{id:6,name:'about',dir:'关于'}],
            expandedKey: ['11'],
            isActive: ['open','close'],
            sidebarClass:'sidebar-exit',
            buttonClass:'button-exit',
        },
        
        components:{
            tree,
            introduction
        },
        methods:{
            changeList(listType){
                // this.expandeNode(listType);
                let list1=['js','css','html','Vue','reading','about'];
                let list2=['11','21','31','41','51','61'];
                let index=list1.indexOf(listType);
                this.expandedKey=[list2[index]];
                if(listType === 'about'){
                    this.isActive=['close','open'];
                }else{
                    this.isActive=['open','close'];
                }
            },
            changeExpand(eventData){
                this.expandedKey[0]=eventData;
                console.log(this.expandedKey);
            },
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
            changeInner(flag){
                if (flag==='dir'){
                    this.isActive=['open','close'];
                }else{
                    this.isActive=['close','open'];
                }
            },
            changeDirExit(){
                if(this.buttonClass==='button-exit'){
                    this.buttonClass='button-hidden';
                    this.sidebarClass='sidebar-hidden';
                    console.log(this.sidebarClass);
                }else{
                    this.buttonClass='button-exit';
                    this.sidebarClass='sidebar-exit';
                }
            },
        },

    })

    