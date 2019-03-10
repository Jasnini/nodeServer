//1. 导入express
var express = require('express')

//2. 创建express服务器
var server = express()

server.use(express.static('statics')); //静态文件夹
server.use(express.static('node_modules'));

server.get('/front-note/*', 
    (request,response) => {
        (function() {
            //url = require("url");
            let fs=require('fs');
            let showdown=require('showdown');
            let showdownHighlight = require('showdown-highlight'); 
            // var pathname = decodeURIComponent(url.parse(request.url).pathname);
            var pathname=decodeURIComponent(request.path);
            console.log(pathname);

            fs.readFile('.'+pathname+'.md','utf8',function(err,data){     
                    let converter= new showdown.Converter({
                        extensions: [showdownHighlight]
                    });
                    let html=converter.makeHtml(data);

                    // let markdown= require('markdown').markdown;
                    // let html= markdown.toHTML(data);

                    response.set('Content-Type','text/xml');
                    response.send(html);
                    console.log(html);
                    // console.log(str);
                    // fn(html);
                }
            );
    }());
});

server.get('/', function(req,res){
    res.sendFile("index.html",{root: __dirname});
})

// server.get('/styles/indexStyle.css',function(req,res){
//     res.sendFile("styles/indexStyle.css",{root: __dirname});
// })

// server.get("/js/importNoteClient.js",function(req,res){
//     res.sendFile("js/importNoteClient.js",{root: __dirname});
// })

// server.get("/images/icon.jpg",function(req,res){
//     res.sendFile("images/icon.jpg",{root: __dirname});
// })

//4. 绑定端口
server.listen(4040)
console.log('启动4040')
