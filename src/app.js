import axios from 'axios'

let name = '';

const onLogin = async name => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const body = {
            name
        }
        const res = await axios.post('/login', body, config)
        console.log(res);
    } catch (error) {
        showMessage(error.message);
    }
}



    // fetch('/login', {
    //     method: 'POST',
    //     body: JSON.stringify(user), 
    //     credentials: 'same-origin',
    //     headers: {
        
    //     }
    // })
    //     .then(handleResponse)
    //     .then(showMessage)
    //     .catch(function(err) {
        
    //     });
    // };

document.querySelector('.input').addEventListener('input', e => name = e.target.value)

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault()
    if(name === '')
        console.log('Empty name is not allowed');
    else onLogin(name);

})

  const messages = document.querySelector('#messages');
  const wsButton = document.querySelector('#wsButton');
  const wsSendButton = document.querySelector('#wsSendButton');
  const logout = document.querySelector('#logout');
  const login = document.querySelector('#login');

//   


  function showMessage(message) {
    messages.textContent += `\n${message}`;
    messages.scrollTop = messages.scrollHeight;
  }

  function handleResponse(response) {
    return response.ok
      ? response.json().then((data) => JSON.stringify(data, null, 2))
      : Promise.reject(new Error('Unexpected response'));
  }

//   

//   login.onclick = onLogin

//   logout.onclick = function() {
//     fetch('/logout', { method: 'DELETE', credentials: 'same-origin' })
//       .then(handleResponse)
//       .then(showMessage)
//       .catch(function(err) {
//         showMessage(err.message);
//       });
//   };

//   let ws;

//   wsButton.onclick = function() {
//     if (ws) {
//       ws.onerror = ws.onopen = ws.onclose = null;
//       ws.close();
//     }

//     ws = new WebSocket(`ws://${location.host}`);
//     ws.onerror = function() {
//       showMessage('WebSocket error');
//     };
//     ws.onopen = function() {
//       showMessage('WebSocket connection established');
//     };
//     ws.onclose = function() {
//       showMessage('WebSocket connection closed');
//       ws = null;
//     };
//   };

//   wsSendButton.onclick = function() {
//     if (!ws) {
//       showMessage('No WebSocket connection');
//       return;
//     }

//     ws.send('Hello World!');
//     showMessage('Sent "Hello World!"');
//   };