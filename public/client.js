const socket = io();

let Name;
let textarea = document.getElementById('textarea')
let messageArea = document.querySelector('.message__area')

do {
    Name = prompt('Enter your name:-')
} while (!Name);

textarea.addEventListener('keyup', (e) => {
    // alert('data')
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
        e.target.value = ""
    }
})
function sendMessage(message) {
    console.log('send message=', message)
    let msg = {
        user: Name,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')
    scrollTopBottom()

    //send to server
    socket.emit('message',msg)
}
function appendMessage(msg, type) {
    mainDiv = document.createElement('div')
    mainDiv.classList.add(type, 'message')

    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markUp
    messageArea.appendChild(mainDiv)
}

socket.on('message',(msg)=>{
    console.log('frontend msg')
    appendMessage(msg,'incoming')
    scrollTopBottom()
})

function scrollTopBottom(){

    messageArea.scrollTop = messageArea.scrollHeight

}