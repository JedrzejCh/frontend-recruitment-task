import Counter from "./Counter"

export default class Modal {
    constructor(modal, wrapper, peopleTable) {
        this.modal = modal,
        this.wrapper = wrapper
        this.triggerBtn = this.wrapper.querySelector('[data-modal-trigger]')
        this.closeBtn = this.wrapper.querySelector('[data-modal-close]')
        this.counterField = this.wrapper.querySelector(".counter-value")
        this.resetBtn = this.wrapper.querySelector(".reset-btn")
        this.counter = new Counter(this.counterField, this.resetBtn)
        this.peopleTable = peopleTable
        this.initListeners()
     
    }
   async openModal() {
        this.modal.classList.add('open')
        await this.peopleTable.init()
    }
    closeModal() {
        this.modal.classList.remove('open')
    }

    initEvent(overlayState) {
        this.event = new CustomEvent('modal', {
            detail: {
                open: overlayState
            },
            bubbles: true
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
            this.counter.count()
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