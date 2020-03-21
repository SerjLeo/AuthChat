import uuid from 'uuid';

export default class Alert {
    constructor(text, type, timeout){
        this._text = text
        this._type = type
        this._id = uuid.v4()
        this._timeout = timeout
        this._anchorEl = document.querySelector('.alert')
    }

    showAlert(){
        this._alert = document.createElement('div')
        this._alert.className= 'alertChild'
        this._alert.innerHTML = this._text
        this._anchorEl.appendChild(this._alert)
        setTimeout(() => {
            this.destroyAlert()
        }, this._timeout)
    }

    destroyAlert(){
        this._anchorEl.removeChild(this._alert)
    }
}