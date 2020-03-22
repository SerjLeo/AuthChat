import User from './User'
import Alert from './Alert'
import '../styles/styles.css'
import Chat from './Chat'

let name = '', user, chat, message

//Login form actions
document.querySelector('.input').addEventListener('input', e => name = e.target.value)
document.querySelector('.message-input').addEventListener('input', e => message = e.target.value)
document.querySelector('.welcome-form').addEventListener('submit', async e => {
    e.preventDefault()
    name = name.trim()
    if(name === '')
        new Alert('Empty name is not allowed', 'Error', 3000).showAlert()
    else {
      user = new User(name)
      const isAuth = await user.login()
      if(isAuth) {
        login()
        document.querySelector('.input').value = ''
        name = ''
        chat = new Chat()
      } else {
        new Alert('Something wrong with server', 'error', 4000).showAlert()
      }
    }

})
document.querySelector('.logout').addEventListener('click', e => {
  e.preventDefault();
  user.logout()
  user = null
  logout()
})
document.querySelector('.chat-form').addEventListener('submit', e => {
    e.preventDefault()
    message = message.trim()
    if(message === '')
        new Alert('Empty message is not allowed', 'Error', 3000).showAlert()
    else {
      chat.sendMessage(message)
      document.querySelector('.message-input').value = ''
      message = ''
    }
})

const login = () => {
  document.querySelector('.welcome-container').setAttribute("style", "visibility: hidden;opacity: 0;")
  document.querySelector('.chat-container').setAttribute("style", "visibility: visible;opacity: 1;")
}

const logout = () => {
  document.querySelector('.chat-container').setAttribute("style", "visibility: hidden;opacity: 0;")
  document.querySelector('.welcome-container').setAttribute("style", "visibility: visible;opacity: 1;")
}