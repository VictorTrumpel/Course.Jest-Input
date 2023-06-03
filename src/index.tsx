import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

document.getElementById('root')!.style.height = '0'
class Button {
  private buttonDOM: HTMLButtonElement

  constructor(text: string, onClick: () => void) {
    this.buttonDOM = document.createElement('button')

    this.buttonDOM.textContent = text

    this.buttonDOM.addEventListener('click', onClick)
  } 

  render() {
    document.body.append(this.buttonDOM)
  }
}

class Modal {
  private modalDOM: HTMLDivElement

  getModalDOM(): HTMLDivElement {
    return this.modalDOM
  }

  constructor(text: string) {
    this.modalDOM = document.createElement('div')

    this.modalDOM.textContent = text

    this.modalDOM.className = 'modal-block'
  }

  render() {
    document.body.append(this.modalDOM)
  }
}

const modal = new Modal('Модалка, с текстом')

const button = new Button('Show modal', () => {
  const modalDOM = modal.getModalDOM()

  if (modalDOM.style.display !== 'none')
    modalDOM.style.display = 'none'
  else
  modalDOM.style.display = 'block'
})

button.render()

modal.render()
