import Counter from "./Counter"
 
export default class Modal {
    constructor(peopleTable) {
        this.modal = document.querySelector(".modal")
        this.wrapper =  document.querySelector(".main-content")
        this.triggerButtonsFromSections = [...document.querySelectorAll('[data-modal-trigger]')]
        this.closeBtn = this.modal.querySelector('[data-modal-close]')
        this.counterField = this.modal.querySelector(".counter-value")
        this.resetBtn = this.modal.querySelector(".reset-btn")
        this.counter = new Counter(this.counterField, this.resetBtn)
        this.peopleTable = peopleTable
        this.initListeners()
    }

 
   async openModal() {
        this.modal.classList.add('open')
        this.peopleTable.addOverlay()
        await this.peopleTable.init()
    }

    closeModal() {
        this.modal.classList.remove('open')
    }
 
    initEvent(overlayState) {
        this.event = new CustomEvent('modalOpen', {
            detail: {
                open: overlayState
            },
            bubbles: true
        })

        this.wrapper.dispatchEvent(this.event)
    }

    overlayHandle() {
        let bool = this.event.detail.open
        if(bool){
            this.wrapper.classList.add('main-content--dark')
        } else {
              this.wrapper.classList.remove('main-content--dark')
        }
    }

    initListeners() {
        this.triggerButtonsFromSections.forEach(button=>{
            button.addEventListener('click', (e) => {
                this.openModal()
                this.initEvent(true)
                this.counter.count()
            })
        })
 
        this.closeBtn?.addEventListener('click', (e) => {
            this.initEvent(false)
            this.closeModal()
        })
 
        this.wrapper.addEventListener('modalOpen', () => this.overlayHandle())
 
        document.body.addEventListener('click', (e) => {
            if (!e.target.matches('[data-modal-trigger]') && !e.target.closest('.modal')){
                this.closeModal()
                this.initEvent(false)
            }
        })
    }
}