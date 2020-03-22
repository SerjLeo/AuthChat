import Alert from "./Alert"

export default class Chat {
    constructor(){
        this.ws = new WebSocket(`ws://${location.host}`)
        this.ws.onopen = () => new Alert('Connected to chat!', 'Success', 3000).showAlert()
        this.ws.onclose = () => {
            new Alert('Disconnected!', 'Success', 3000).showAlert()
            this.ws = null
        }
        this.ws.onmessage = msg => this.printMessage(msg)
    }

    sendMessage(msg) {
        if (typeof(msg) === "string")
          this.ws.send(msg)
    }

    printMessage(msg){
        let data = JSON.parse(msg.data)
        let message = document.createElement('div')
        if(data.from) {
            message.innerHTML = `<div class="chat-message">
                                    <div class="from">${data.from} :</div>
                                    <div class="message">${data.message}</div>
                                </div>`
        } else {
            message.innerHTML = `<div class="chat-message">
                                    <div class="from"></div>
                                    <div class="system-message">${data.message}</div>
                                </div>`
        }
        document.querySelector('.chat').appendChild(message)
    }
    //         ws.onerror = function() {
    //           showMessage('WebSocket error');
    //         };
}