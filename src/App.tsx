import React from 'react'
import './App.css'
import TableCar from './table'
import { Service } from './service'

const App = () => {
  const service = new Service()

  return (
    <div className="App">
      <TableCar service={service} />
    </div>
  )
}

export default App
