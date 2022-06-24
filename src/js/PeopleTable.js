import {sendPeopleRequest} from '../services/peopleAPI'
 
export default class PeopleTable {
  #responseData
  constructor() {
    this.table = document.querySelector('.modal-table')
    this.loader = document.querySelector('.loader-wrapper')
    this.setLoaderState()
    this.addOverlay()
  }
 

   async init() {
      try {
        const data = await sendPeopleRequest()
        this.#responseData = data
        this.setLoaderState()
        this.createTable()
      } catch (e) {
        console.error(e)
      }
  }
 
 addOverlay () {
      const overlay = document.querySelector('.overlay')
      const wrapper = document.querySelector('.table-section')
			overlay.classList.add('show')
      wrapper.scrollLeft = 0
      wrapper.scrollTop = 0
			overlay.addEventListener('touchstart', () => {
				overlay.classList.remove('show')
			})
	}

  get isLoading () {
    return !this.#responseData
  }
 
  setLoaderState() {
    if (this.isLoading) this.loader?.classList.add('active')
    else this.loader?.classList.remove('active')
  }
 
  buildTableHead(...choosenIndexes) {
    if (!choosenIndexes.length) throw Error('No indexes specified to build the table head!')
 
    const allHeadings = Object.keys(this.#responseData[0]);
    const theadValues = allHeadings.filter((item, index) => choosenIndexes.includes(index))
 
    let headingRow = ''
    for (const heading of theadValues) {
      headingRow += `<th>${heading}</th>`
    }
 
    return headingRow
  }
 
  buildTableBody() {
    if (!this.#responseData.length) return
 
    const getAddress = (item) => {
      const {street, suite, city, zipcode} = item.address
      return suite + ' ' + street + ' ' + city + ' ' + zipcode
    }
 
     let row = ''
     for (const item of this.#responseData) {
       row +=
       `
        <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${getAddress(item)}</td>
            <td>${item.phone}</td>
            <td>${item.company?.name}</td>
        </tr>
        `
     }
     return row
  }
 
  createTable() {
    this.table.innerHTML =  `
      ${this.buildTableHead(1,3,4,5,7)}
      ${this.buildTableBody()}
      `
  }
}



