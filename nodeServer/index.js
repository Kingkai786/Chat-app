//node server which will handle socket io connections

const io = require('socket.io')(8000);
const users = {};


io.on('connection', socket=>{
    // if someone join the chat it will display to other
    socket.on('new-user-joined', name =>{
        // console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    //if someone send the message it will display to others
    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });
    //if someone left the chat it will display to other
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})