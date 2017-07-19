// var websocket=require("ws").Server;//获取服务
// var WS=new websocket({port:8888});//创建对象

// WS.on("connection",function(ws){
// 	console.log("来人了！")
// 	ws.on("message",function(data){
// 			ws.send(data)
// 	});

// })

var express = require("express");

var app = express();

var http = require("http").Server(app);//系统原生的创建服务的模块

var io = require("socket.io")(http);

//

app.use(express.static('./'));

http.listen(8090); //http 协议使用这个端口，ws 也是这个端口

io.on('connection', function(ws) {
   ws.on('login',function(user) { //接受前端发过来的登陆信息
      io.sockets.emit("singin",user);//发送消息给所以的连接用户
   });
   
   ws.on('msg', function(data) {
      io.sockets.emit("message",data); //发给所有连接用户
   });

});
