import Modal from './Modal'
import PeopleTable from './PeopleTable'
// import {sendPeopleRequest} from '../services/peopleAPI'


const modalItem = document.querySelector(".modal")
const mainElement = document.querySelector(".main-content")


const peopleTable = new PeopleTable()

const modal = new Modal(modalItem, mainElement, peopleTable )
