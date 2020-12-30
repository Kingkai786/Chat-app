const socket = io('http://localhost:8000');

//get dom element in respective js variables
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// audio that will play on recieving mesaages
var audio = new Audio('argon.mp3');

//function which will append event info to container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

//ask the new user his/her name and let server knows
const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names);

//if new user joins , receive his/her name from the server
socket.on('user-joined',name =>{
    append(`${name} joined the chat `,'right')
})

//if server sends message, receive it
socket.on('receive',data =>{
    append(`${data.name}: ${data.message} `,'left')
})


//if user leaves the chat display the info to the container
socket.on('left',name =>{
    append(`${name} left the chat`,'right')
})

//if forms get submitted send the server message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = ''
})




