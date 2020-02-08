import * as React from 'react'
import { DatePicker, Modal, Radio } from 'antd/lib'
import { useState } from 'react'
import { TableService } from './tableService'
import { parseTime } from '../helpers'
import { Input } from '../kit/input'
import moment from 'moment'

interface Props {
  isOpened: boolean
  row: any
  close: (isOpen: string) => void
  service: TableService
}

const EditModalCar = ({ isOpened, row, close, service }: Props) => {
  const [newCar, setNewCar] = useState({
    key: row.key,
    carNumber: row.carNumber,
    buildCar: row.buildCar,
    carCheck: row.carCheck,
    model: row.model,
    mark: row.mark,
    mileage: row.mileage,
    price: row.price,
    costs: row.costs,
    forSale: row.forSale,
    buyDay: row.buyDay,
    cellDay: row.cellDay,
    owner: row.owner,
    isCell: row.isCell,
    profit: row.profit,
  })

  return (
    <>
      <Modal
        title="Редактировать"
        visible={isOpened}
        onOk={() => {
          service.editData(newCar)
          close('')
        }}
        onCancel={() => close('')}
      >
        <div>
          <Input
            type={newCar.carNumber}
            dispatch={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewCar({
                ...newCar,
                carNumber: e.target.value,
              })
            }}
            title="Номер машины"
          />
          <div className="create-item__time">
            <span className="create-item__title">Год выпуска</span>
            <DatePicker
              format="DD-MM-YYYY"
              value={newCar.buildCar === '' ? null : moment(+newCar.buildCar)}
              onChange={e =>
                setNewCar({
                  ...newCar,
                  buildCar: e !== null ? parseTime(e) : '',
                })
              }
            />
          </div>
          <div className="create-item__time">
            <span className="create-item__title">Тех Осмотр</span>
            <DatePicker
              format="DD-MM-YYYY"
              value={newCar.carCheck === '' ? null : moment(+newCar.carCheck)}
              onChange={e => {
                setNewCar({
                  ...newCar,
                  carCheck: e !== null ? parseTime(e) : '',
                })
              }}
            />
          </div>
          <Input
            type={newCar.model}
            dispatch={(e: any) =>
              setNewCar({
                ...newCar,
                model: e.target.value,
              })
            }
            title="Модель"
          />
          <Input
            type={newCar.mark}
            dispatch={(e: any) =>
              setNewCar({
                ...newCar,
                mark: e.target.value,
              })
            }
            title="Марка"
          />
          <Input
            type={newCar.mileage}
            dispatch={(e: any) =>
              setNewCar({
                ...newCar,
                mileage: e.target.value,
              })
            }
            title="Пробег"
          />
          <Input
            type={newCar.price}
            dispatch={(e: any) =>
              setNewCar({
                ...newCar,
                price: e.target.value,
              })
            }
            title="Цена покупки"
          />
          <Input
            type={newCar.costs}
            dispatch={(e: any) =>
              setNewCar({
                ...newCar,
                costs: e.target.value,
              })
            }
            title="Расходы"
          />
          <Input
            type={newCar.forSale}
            dispatch={(e: any) =>
              setNewCar({
                ...newCar,
                forSale: e.target.value,
              })
            }
            title="На продажу"
          />
          <div className="create-item__time">
            <span className="create-item__title">Дата покупки</span>
            <DatePicker
              format="DD-MM-YYYY"
              value={newCar.buyDay === '' ? null : moment(+newCar.buyDay)}
              onChange={e => {
                setNewCar({
                  ...newCar,
                  buyDay: e !== null ? parseTime(e) : '',
                })
              }}
            />
          </div>
          <div className="create-item__time">
            <span className="create-item__title">Дата продажи</span>
            <DatePicker
              format="DD-MM-YYYY"
              value={newCar.cellDay === '' ? null : moment(+newCar.cellDay)}
              onChange={e => {
                setNewCar({
                  ...newCar,
                  cellDay: e !== null ? parseTime(e) : '',
                })
              }}
            />
          </div>
          <Input
            type={newCar.owner}
            dispatch={(e: any) =>
              setNewCar({
                ...newCar,
                owner: e.target.value,
              })
            }
            title="Владелец"
          />
          <div className="create-item__radio">
            <Radio.Group
              onChange={e => {
                setNewCar({
                  ...newCar,
                  isCell: e.target.value,
                })
              }}
              value={newCar.isCell}
            >
              <Radio value={'cell'}>Продано</Radio>
              <Radio value={'has'}>В наличии </Radio>
            </Radio.Group>
          </div>
          <Input
            type={newCar.profit}
            dispatch={e =>
              setNewCar({
                ...newCar,
                profit: e.target.value,
              })
            }
            title="Прибыль"
          />
        </div>
      </Modal>
    </>
  )
}

export default EditModalCar
