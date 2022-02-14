const socket = io()
let username;
let textarea = document.querySelector('#textarea')
let btn= document.querySelector('#butt')
let messageArea = document.querySelector('.message__area')

do {
    username = prompt('Please enter your name: ')
} while(!username)

console.log(username);

btn.addEventListener('click', () => {
    let msg=textarea.value;
    sendMessage(msg)
})

// textarea.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
//         // console.log(e.target.value);
//         sendMessage(e.target.value)
//     }
// })

function sendMessage(message) {
    let msg = {
        user: username,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    // yaha se ye event emit ho jayegi aur server mein ham ye event listen kar skte h
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



