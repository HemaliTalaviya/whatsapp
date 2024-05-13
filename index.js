const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server)


app.use(express.static(__dirname+'/public'))
app.get('/', async(req,res) =>{
    res.sendFile(__dirname +'/index.html');
})

io.on('connection',(socket)=>{
    console.log('connected....'+socket.id)

    socket.on('message',(msg)=>{
        console.log('server message',msg)
        socket.broadcast.emit('message',msg)
    })
})

const port = 3000;
server.listen(port,()=>console.log('Listening on port..!!',port))