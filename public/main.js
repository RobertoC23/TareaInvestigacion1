const socket = io();

const joinScreen = document.getElementById('join-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const leaveBtn = document.getElementById('leave-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages-container');
const userDisplay = document.getElementById('user-display');

let currentUser = '';

joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        socket.emit('user:join', { username });
        userDisplay.textContent = `Usuario: ${username}`;
        joinScreen.style.display = 'none';
        chatScreen.style.display = 'block';
    }
});

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat:message', { text: message });
        messageInput.value = '';
    }
}

leaveBtn.addEventListener('click', () => {
    socket.emit('user:leave');
    chatScreen.style.display = 'none';
    joinScreen.style.display = 'block';
    messagesContainer.innerHTML = '';
});

socket.on('chat:message', (data) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('system:info', (data) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message system-msg';
    msgDiv.textContent = data.text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});