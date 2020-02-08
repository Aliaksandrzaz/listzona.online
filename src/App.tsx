import React, { useState } from 'react'
import './App.css'
import TableCar from './table/table'
import { Authorization } from './authorization/Authorization'
import { TableService } from './table/tableService'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="App">
      <Authorization setIsLogin={setIsLogin} isLogin={isLogin} />
      {isLogin && <TableCar service={new TableService()} />}
    </div>
  )
}

export default App
