<template>
    <div> 
        <div>
            <div class="head-container"><img src="@/static/images/head.png"/>
            </div>

            <div style="text-align:center;">
                大大的li
            </div>

            <div class="content-container"  style="text-align:center;">
                <div style="display:inline-block;padding:1.5rem;" v-for="item in site_item_count">
                    <span style="display:block"> {{ item.num }} </span>
                    <span> {{ item.type }} </span>
                </div>
            </div>

            <div class="link-container">
                <a class="link"  v-for="item in link_personal_site" :href="item.link" target="_blank"> <img class="link-img" :src="item.img" ></img> {{ item.name }} </a>
            </div>
        </div>
    </div>
</template>



<script>
    export default{
        name: 'introduction',
        data: ()=>{
            return{
                site_item_count:[{
                    type:'分类',
                    num:'6',
                },{
                    type:'日志',
                    num:'23',
                }],
                link_personal_site: [{
                    link: 'https://weibo.com/2961922651/profile',
                    name: 'sina',
                    img: "./images/sina.svg",
                },
                {
                    link: 'https://github.com/Jasnini',
                    name: 'github',
                    img: './images/github.svg',
                }]

            }
        },

        methods:{
            // openNewWindow(url){
            //     window.open(url);
            // }
        },



    }
</script>
<style>
    .head-container{
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    img{
        height:6rem;
        width: 6rem;
    }
    .link{
        display:inline-block;
        margin: 2rem 1rem;
        color: black;
        font-size: 0.9rem;
        text-decoration: none;
        border-bottom: 1px solid black;
    }
    .link-img{
        height: 0.9rem;
        width: 0.9rem;
    }
    .link-container{
        text-align: center;
    }
</style>