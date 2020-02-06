import * as React from 'react'
import { Modal } from 'antd/lib'
import { Data } from './service'

interface Props {
  isOpened: boolean
  close: (isOpen: boolean) => void
  data: Data
}

const Report = ({ isOpened, close, data }: Props) => {
  const style = {
    height: 800,
    fontSize: 24,
    fontWeight: 700,
  }
  return (
    <Modal
      bodyStyle={style}
      title="Отчет"
      visible={isOpened}
      onOk={() => {
        close(false)
      }}
      onCancel={() => close(false)}
    >
      <p>Куплено авто: {data.filter(item => item.isCell === 'has').length}</p>
      <p>
        Закупка: :
        {data.reduce((acc, item) => {
          if (item.price !== '') {
            acc = acc + parseFloat(item.price)
          }
          return acc
        }, 0)}
      </p>
      <p>
        Расходы: :
        {data.reduce((acc, item) => {
          if (item.costs !== '') {
            acc = acc + parseFloat(item.costs)
          }
          return acc
        }, 0)}
      </p>
      <p>
        Продано :
        {data.reduce((acc, item) => {
          if (item.forSale !== '') {
            acc = acc + parseFloat(item.forSale)
          }
          return acc
        }, 0)}
      </p>
      <p>
        Прибыль :
        {data.reduce((acc, item) => {
          if (item.profit !== '') {
            acc = acc + parseFloat(item.profit)
          }
          return acc
        }, 0)}
      </p>
    </Modal>
  )
}

export default Report
