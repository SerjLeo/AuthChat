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
        let message = document.createElement('div')
        message.innerHTML = msg.data
        document.querySelector('.chat').appendChild(message)
    }
    // wsButton.onclick = function() {
    //         if (ws) {
    //           ws.onerror = ws.onopen = ws.onclose = null;
    //           ws.close();
    //         }
        
    //         ;
    //         ws.onerror = function() {
    //           showMessage('WebSocket error');
    //         };
    //         ws.onopen = function() {
    //           showMessage('WebSocket connection established');
    //         };
    //         ws.onclose = function() {
    //           showMessage('WebSocket connection closed');
    //           ws = null;
    //         };
    //       };
        
    //       wsSendButton.onclick = function() {
    //         if (!ws) {
    //           showMessage('No WebSocket connection');
    //           return;
    //         }
        
    //         ws.send('Hello World!');
    //         showMessage('Sent "Hello World!"');
    //       };
}