const express=require('express')
const app=express()
const http=require('http')
const socketio=require('socket.io')
const cors=require('cors')
const server=http.createServer(app)
const io=socketio(server)
const port=4500

const users=[{}];

io.on("connection",(socket)=>{
   

    socket.on("joined",({user})=>{
        users[socket.id]=user;
        console.log(`${user} is connected`)
        socket.broadcast.emit("userjoined",{user:"Admin",message:`${users[socket.id]} has joined`})
        socket.emit('welcome',{user:'Admin',message:`welcome to the chat ,${users[socket.id]}`})
    })

    socket.on("message",({message,id})=>{
       io.emit("sendmessage",{user:users[id],message,id})
    })

    socket.on("disconnected",()=>{
        socket.broadcast.emit("leave",{user:"Admin",message:`${users[socket.id]} has been left`})
        console.log("user left")
    })


})


server.listen(port,()=>{
    console.log(`http://localhost:${port}/`)
})