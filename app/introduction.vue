<template>
  <div>
    <div>
      <div class="head-container">
        <img src="@/static/images/head.png">
      </div>

      <div style="text-align:center;">
        大大的li
      </div>

      <div
        class="content-container"
        style="text-align:center;"
      >
        <div
          v-for="item in site_item_count"
          style="display:inline-block;padding:1.5rem;"
        >
          <span style="display:block"> {{ item.num }} </span>
          <span> {{ item.type }} </span>
        </div>
      </div>
      <div id="pp">
        <div class="link-container">
          <a
            v-for="item in link_personal_site"
            class="link"
            :href="item.link"
            target="_blank"
          > <img
            class="link-img"
            :src="item.img"
          > {{ item.name }}</a>
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script>
export default {
    'name': 'introduction',
    'data': () => {
        return {
            'site_item_count': [{
                'type': '分类',
                'num': '6'
            }, {
                'type': '日志',
                'num': '23'
            }],
            'link_personal_site': [{
                'link': 'https://weibo.com/2961922651/profile',
                'name': 'sina',
                'img': './images/sina.svg'
            },
            {
                'link': 'https://github.com/Jasnini',
                'name': 'github',
                'img': './images/github.svg'
            }
                // {
                //     link: './todoList',
                //     name: 'todoList',
                //     img: './images/write.svg',

                // }
            ]

        };
    },

    'methods': {
    // openNewWindow(url){
    //     window.open(url);
    // }
    }

};
</script>
<style>
    .head-container{
        text-align: center!important;
        margin-top: 1rem!important;
        margin-bottom: 1rem!important;
    }
    img{
        height:6rem!important;
        width: 6rem!important;
    }
    .link{
        display:flex!important;
        align-items: center!important;
        margin: 0.4rem 0.4rem!important;
        height: 1rem!important;
        /*line-height: 1.5rem;*/
        color: black!important;
        font-size: 0.9rem!important;
        text-decoration: none!important;
        padding: 0.2rem!important;
        border-bottom: 1px solid black!important;
    }

    .link-img{
        margin-right: 0.2rem!important;
        height: 1.2rem!important;
        width: 1.2rem!important;

    }
    .link-container{
        display: flex!important;
         align-items: center!important;
         justify-content: center!important;
        text-align: center!important;
        height: 2rem!important;
        padding: 0.5rem;
    }
    @media screen and (max-width: 1200px){
        .link-container{
            display: inline-block!important;
        }
        #pp{
            display: flex;
            justify-content: center;
        }
        .link{
           font-size: 1rem!important;

        }
    }
</style>
