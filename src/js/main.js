
import Modal from './Modal'
import PeopleTable from './PeopleTable'



    class App{
      create () {
        const peopleTable = new PeopleTable()
        const modal = new Modal(peopleTable)
      }
    }

    const app = new App()

    app.create()

