export default class Counter {
  #sessionStoreField
  constructor(field, resetBtn, name = 'counterValue') {
    this.counterField = field
    this.resetBtn = resetBtn
    this.#sessionStoreField = name
    this.init()
  }

  init() {
    if(this.isSessionStorageExists) this.setSessionStorage(this.#sessionStoreField )
    else this.resetSessionStorage()
  }

  count() {
    if (!this.isSessionStorageExists) this.resetSessionStorage()

    let newValue = this.getSessionStorage(this.#sessionStoreField)
    if (!isNaN(newValue)) newValue++
    this.update(newValue)
  }
  
  get isSessionStorageExists() {
    return !!sessionStorage.getItem(this.#sessionStoreField)
  }

  get shouldResetBtnRender() {
    return sessionStorage.getItem(this.#sessionStoreField) >= 5
  }

  setSessionStorage(...params) {
    if (params.length === 1) sessionStorage.setItem(params[0], this.getSessionStorage(params[0]))
    else sessionStorage.setItem(params[0], params[1])
  }

  getSessionStorage(field) { 
   return sessionStorage.getItem(field)
  }

  resetSessionStorage() {
    sessionStorage.setItem(this.#sessionStoreField, 0)
  }

  update(newValue) {
    this.setSessionStorage(this.#sessionStoreField , parseInt(newValue) )
    this.setFieldValue()
    this.handleResetButton()
  } 

  setFieldValue(value) {
    if (value) this.counterField.innerHTML = value
    else this.counterField.innerHTML = this.getSessionStorage(this.#sessionStoreField);
  }

  handleResetButton() {
    this.shouldResetBtnRender ? this.resetBtn.classList.add('active') : this.resetBtn.classList.remove('active')
    this.resetBtn.addEventListener('click', () => {
      this.resetSessionStorage()
      this.setFieldValue('0')
    })
  }

}