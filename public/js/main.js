const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// message on server
socket.on('message', message => {
  console.log(message)
  outputMessage(message);

  // auto scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  // console.log(msg);
  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // clear input message area
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// output message on DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> Rid <span> 10:10am </span></p>
  <p class="text"> ${message} </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}