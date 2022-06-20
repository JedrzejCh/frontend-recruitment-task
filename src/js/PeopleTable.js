import {sendPeopleRequest} from '../services/peopleAPI'

export default class PeopleTable {
  #responseData
  constructor() {
    // this.#responseData = response
    this.table = document.querySelector('.modal-table')
    this.loader = document.querySelector('.loader-wrapper')
    this.isLoading = true
    this.createTable()
  }


   async init() {
    const data = await sendPeopleRequest()
    this.#responseData = data
    this.isLoading = false
  }

  // get peopleFromData() {
  //   if (this.isDataReady) {
  //     const { data } = this.#responseData
  //     return data
  //   } else {
  //     alert("Data error")
  //     // return
  //   }
  // }

  get isDataReady() {
   return !!(this.#responseData && Object.keys(this.#responseData).length > 0)
  }

  loading() {
    if (!this.#responseData) this.makeLoaderVisible()
    else !this.isLoading
  }

  makeLoaderVisible() {
    if (this.isLoading) this.loader?.classList.add('active')
    else this.loader?.classList.remove('active')
  }

  buildTableHead(...choosenIndexes) {
    if (!choosenIndexes.length) throw Error('No indexes specified to build the table head!')

    const allHeadings = Object.keys(this.peopleFromData[0]);
    const theadValues = allHeadings.filter((item, index) => choosenIndexes.includes(index))
   
    let headingRow = ''
    for (const heading of theadValues) {
      headingRow += `<th>${heading}</th>`
    }
   
    return headingRow
  }

  buildTableBody() {
    if (!this.peopleFromData.length) return

    const getAddress = (item) => {
      const {street, suite, city, zipcode} = item.address
      return suite + ' ' + street + ' ' + city + ' ' + zipcode
    }

     let row = ''
     for (const item of this.peopleFromData) {
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










