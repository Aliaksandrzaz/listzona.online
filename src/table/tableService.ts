import * as firebase from 'firebase/app'
import 'firebase/firestore'

export interface Filter {
  model: string
  mark: string
  key: string
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

export class TableService {
  firebaseConfig = {
    apiKey: 'AIzaSyAS3Tmzpw_YfZnpGdisPnfXZjN8BScjhL0',
    authDomain: 'lehtierittely-bc08d.firebaseapp.com',
    databaseURL: 'https://lehtierittely-bc08d.firebaseio.com',
    projectId: 'lehtierittely-bc08d',
    storageBucket: 'lehtierittely-bc08d.appspot.com',
    messagingSenderId: '455064458920',
    appId: '1:455064458920:web:b70dc58166e8de8996d49d',
  }

  dataCar: Data = []

  isFilterActive: boolean = false

  constructor() {
    this.init()
  }

  init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig)
    }
  }

  fetchData(dispatch: (data: Data) => void) {
    return firebase
      .firestore()
      .collection('car')
      .doc('NB9Di5WqKJ4Ti29UATtd')
      .onSnapshot(
        (doc: any) => {
          const responseData = doc.data() as FirebaseData
          const data = Object.values(responseData)
            .map(item => item.car)
            .reverse()
          this.dataCar = data

          dispatch(this.dataCar)
        },
        () => {}
      )
  }

  addData(car: Car) {
    firebase
      .firestore()
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
      .then(() => {})
      .catch(() => {
        console.error('Error adding document: ')
      })
  }

  editData(car: Car) {
    firebase
      .firestore()
      .collection('car')
      .doc('NB9Di5WqKJ4Ti29UATtd')
      .update({
        [car.key]: {
          car,
        },
      })
      .then(() => {})
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
    const filter: Partial<Filter> = {
      ...(filterType.isCell !== 'all' ? { isCell: filterType.isCell } : {}),
      ...(filterType.model !== '' ? { model: filterType.model } : {}),
      ...(filterType.key !== '' ? { key: filterType.key } : {}),
      ...(filterType.mark !== '' ? { mark: filterType.mark } : {}),
    }

    const data = this.filterTest(this.dataCar, filter)

    const startTime =
      filterType.time.start !== ''
        ? data.filter(item => item.buyDay !== '' && +item.buyDay >= +filterType.time.start)
        : data

    const finishTime =
      filterType.time.end !== ''
        ? startTime.filter(item => item.buyDay !== '' && +item.buyDay <= +filterType.time.end)
        : startTime

    setDataCar(finishTime)
  }

  filterTest(arr: Data, criteria: Partial<Filter>) {
    return arr.filter(obj => {
      return Object.keys(criteria).every(c => {
        // @ts-ignore
        return obj[c] == criteria[c]
      })
    })
  }

  reset(setDataCar: (data: Data) => void) {
    setDataCar([])
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
