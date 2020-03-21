import User from './User'
import Alert from './Alert'
import '../styles/styles.css'
import Chat from './Chat'

let name = '', user, chat, message

//Login form actions
document.querySelector('.input').addEventListener('input', e => name = e.target.value)
document.querySelector('.message-input').addEventListener('input', e => message = e.target.value)
document.querySelector('.form').addEventListener('submit', async e => {
    e.preventDefault()
    name = name.trim()
    if(name === '')
        new Alert('Empty name is not allowed', 'Error', 4000).showAlert()
    else {
      user = new User(name)
      const isAuth = await user.login()
      if(isAuth) {
        chat = new Chat()
      } else {
        new Alert('Something wrong with server', 'error', 4000).showAlert()
      }
    }

})

document.querySelector('.chat-form').addEventListener('submit', e => {
    e.preventDefault()
    message = message.trim()
    if(name === '')
        new Alert('Empty name is not allowed', 'Error', 4000).showAlert()
    else {
      chat.sendMessage(message)
      message = ''
    }
})



  const messages = document.querySelector('#messages');
  const wsButton = document.querySelector('#wsButton');
  const wsSendButton = document.querySelector('#wsSendButton');
  const logout = document.querySelector('#logout');
  const login = document.querySelector('#login');

//   let ws;

//   