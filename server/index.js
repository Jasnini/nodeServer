// 1. 导入express

let express = require('express');
let path = require('path');

// 2. 创建express服务器
let server = express();

server.use(express.static('static')); // 静态文件夹
server.use(express.static('dist')); // 静态文件夹

server.get(
    '/front-note/*',
    (request, response) => {
        (function() {
            // url = require("url");
            let fs = require('fs');
            let showdown = require('showdown');
            let showdownHighlight = require('showdown-highlight');
            // require('../node_modules/showdown-prettify/src/showdown-prettify.js');
            require('../node_modules/showdown-prettify/src/showdown-prettify.js');

            // var pathname = decodeURIComponent(url.parse(request.url).pathname);
            let pathname = decodeURIComponent(request.path);
            console.log(pathname);

           
            fs.readFile('.' + pathname + '.md', 'utf8', function(err, data) {

                if (err) {
                    console.error(err);
                    // response.status(500).send('服务器异常');
                }

                // let converter = new showdown.Converter();
                let converter = new showdown.Converter({
                    'tasklists': false,
                    'ghCodeBlocks': true,
                    tables: true,
                    extensions: [showdownHighlight],
                });
                let html = converter.makeHtml(data);

                // let markdown= require('markdown').markdown;
                // let html= markdown.toHTML(data);

                response.set('Content-Type', 'text/xml');
                response.send(html);
                // console.log(html);
                // console.log(str);
                // fn(html);
            });
        })();
    }
);

server.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname,'../dist/index.html'));
});
// server.get('/todoList/', function(req, res) {
//     res.sendFile(path.resolve(__dirname,'../dist/todoList.html'));
// });

// 4. 绑定端口
server.listen(4040);
console.log('启动4040');
