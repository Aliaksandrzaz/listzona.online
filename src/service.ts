import * as firebase from 'firebase/app'
import 'firebase/firestore'

export interface Filter {
  model: string
  mark: string
  time: {
    start: string
    end: string
  }
  isCell: string
}

export interface FirebaseData {
  [key: string]: {
    car: Car
  }
}

export interface Car {
  key: string
  carNumber: string
  buildCar: string
  carCheck: string
  model: string
  mark: string
  mileage: string
  price: string
  costs: string
  forSale: string
  buyDay: string
  cellDay: string
  owner: string
  isCell: string
  profit: string
}

export type Data = Car[]

export class Service {
  firebaseConfig = {
    apiKey: 'AIzaSyAS3Tmzpw_YfZnpGdisPnfXZjN8BScjhL0',
    authDomain: 'lehtierittely-bc08d.firebaseapp.com',
    databaseURL: 'https://lehtierittely-bc08d.firebaseio.com',
    projectId: 'lehtierittely-bc08d',
    storageBucket: 'lehtierittely-bc08d.appspot.com',
    messagingSenderId: '455064458920',
    appId: '1:455064458920:web:b70dc58166e8de8996d49d',
  }

  db: any

  dataCar: Data = []
  allData: Data = []
  filterData: Data = []

  isFilterActive: boolean = false

  constructor() {
    firebase.initializeApp(this.firebaseConfig)
    this.db = firebase.firestore()
  }

  fetchData2(dispatch: (data: Data) => void) {
    return this.db
      .collection('car')
      .doc('NB9Di5WqKJ4Ti29UATtd')
      .onSnapshot(
        (doc: any) => {
          const data = doc.data() as FirebaseData
          this.dataCar = Object.values(data)
            .map(item => item.car)
            .reverse()

          this.filterData = Object.values(data)
            .map(item => item.car)
            .reverse()
          this.allData = Object.values(data)
            .map(item => item.car)
            .reverse()

          !this.isFilterActive && dispatch(this.dataCar)
        },
        () => {}
      )
  }

  addData2(car: Car) {
    this.db
      .collection('car')
      .doc('NB9Di5WqKJ4Ti29UATtd')
      .set(
        {
          [car.key]: {
            car,
          },
        },
        { merge: true }
      )
      .then(() => {
        console.log('Document written with ID: ')
      })
      .catch(() => {
        console.error('Error adding document: ')
      })
  }

  editData2(car: Car) {
    this.db
      .collection('car')
      .doc('NB9Di5WqKJ4Ti29UATtd')
      .update({
        [car.key]: {
          car,
        },
      })
      .then(() => {
        console.log('Document written with ID: ')
      })
      .catch(() => {
        console.error('Error adding document: ')
      })
  }
  filterCell(type: string, setDataCar: (data: Data) => void) {
    const cell = this.dataCar.filter(item => {
      if (type === 'has') {
        return item.isCell === 'has'
      } else if (type === 'cell') {
        return item.isCell === 'cell'
      } else {
        return item
      }
    })

    setDataCar(cell)
  }

  filter(filterType: Filter, setDataCar: (data: Data) => void) {
    console.log('filter')
    const hasCar =
      filterType.isCell !== ''
        ? this.allData.filter(item => {
            if (filterType.isCell === 'has') {
              return item.isCell === 'has'
            } else if (filterType.isCell === 'cell') {
              return item.isCell === 'cell'
            } else {
              return item
            }
          })
        : this.allData

    const model = filterType.model !== '' ? hasCar.filter(item => item.model === filterType.model) : hasCar

    const mark = filterType.mark !== '' ? model.filter(item => item.mark === filterType.mark) : model

    const startTime =
      filterType.time.start !== ''
        ? mark.filter(item => item.buyDay !== '' && +item.buyDay >= +filterType.time.start)
        : mark

    const finishTime =
      filterType.time.end !== ''
        ? startTime.filter(item => item.buyDay !== '' && +item.buyDay <= +filterType.time.end)
        : startTime

    // this.dataCar = finishTime
    setDataCar(finishTime)
  }

  reset(setDataCar: (data: Data) => void) {
    this.filterData = this.allData
    setDataCar(this.dataCar)
  }

  report() {
    return this.filterData
  }

  getAllData(setDataCar: (data: Data) => void) {
    this.filterData = this.allData
    setDataCar(this.allData)
  }

  dateForTable(type: boolean, setDataCar: (data: Data) => void) {
    if (type) {
      setDataCar(this.dataCar.filter(car => car.isCell === 'has'))
    } else {
      setDataCar(this.dataCar)
    }
  }

  changeFilterActive() {
    this.isFilterActive = !this.isFilterActive
  }
}
