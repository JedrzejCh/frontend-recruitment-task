export default class Modal {
    constructor(modal, wrapper) {
        this.modal = modal,
        this.wrapper = wrapper
        this.triggerBtn = document.querySelector('[data-modal-trigger]')
        this.closeBtn = document.querySelector('[data-modal-close]')
        this.initListeners()
    }
    openModal() {
        this.modal.classList.add('open')
    }
    closeModal() {
        this.modal.classList.remove('open')
    }

    initEvent(overlayState) {
        this.event = new CustomEvent('modal', {
            detail: {
                open: overlayState
            }
        })
        this.wrapper.dispatchEvent(this.event)
    }
    overlayHandle() {
        let bool = this.event?.detail.open === 'true' ? true : false

        if(bool){
            this.wrapper.classList.add('main-content--dark')
        } else {
              this.wrapper.classList.remove('main-content--dark')
        }
    }
    initListeners() {
        this.triggerBtn?.addEventListener('click', (e) => {
            this.openModal()
            this.initEvent(e.currentTarget.dataset.open)
        })
        
        this.closeBtn?.addEventListener('click', (e) => {
            this.closeModal()
            this.initEvent(e.currentTarget.dataset.open)
        })

        this.wrapper.addEventListener('modal', () => this.overlayHandle())

        document.body.addEventListener('click', (e) => {
            if (!e.target.matches('[data-modal-trigger]') && !e.target.closest('.modal')){
                this.closeModal()
                this.initEvent(false)
            }
        })
    }
}