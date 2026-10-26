const socket = io({ transports: ['websocket'] });

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
        socket.emit('user:join', { user: username });
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
    currentUser = '';
    socket.disconnect();
    chatScreen.style.display = 'none';
    joinScreen.style.display = 'block';
    messagesContainer.innerHTML = '';
    socket.connect();
});

socket.on('connect', () => {
    if (currentUser) {
        socket.emit('user:join', { user: currentUser });
    }
});

socket.on('chat:message', (data) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    const author = document.createElement('strong');
    author.textContent = `${data.user}: `;
    msgDiv.appendChild(author);
    msgDiv.appendChild(document.createTextNode(String(data.text)));
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('system:info', (data) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message system-msg';
    msgDiv.textContent = data.msg;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// P4-CONNECTION-STATE
// Indicadores visibles de conexión.
const statusElements = [joinScreen, chatScreen].map(screen => {
    const element = document.createElement('div');
    element.className = 'connection-status';
    element.setAttribute('role', 'status');
    element.setAttribute('aria-live', 'polite');
    screen.prepend(element);
    return element;
});

function updateConnectionStatus(state) {
    const labels = {
        connected: 'Conectado',
        reconnecting: 'Reconectando...',
        disconnected: 'Desconectado'
    };

    statusElements.forEach(element => {
        element.textContent = 'Estado: ' + labels[state];
        element.dataset.state = state;
    });

    sendBtn.disabled = state !== 'connected';
    joinBtn.disabled = state !== 'connected';
}

socket.on('connect', () => {
    updateConnectionStatus('connected');
});

socket.on('disconnect', () => {
    updateConnectionStatus('reconnecting');
});

socket.io.on('reconnect_attempt', () => {
    updateConnectionStatus('reconnecting');
});

socket.on('connect_error', () => {
    updateConnectionStatus('reconnecting');
});

socket.io.on('reconnect_failed', () => {
    updateConnectionStatus('disconnected');
});

updateConnectionStatus(
    socket.connected ? 'connected' : 'reconnecting'
);
