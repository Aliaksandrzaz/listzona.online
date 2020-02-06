import * as React from 'react'
import { Table, Button, Radio } from 'antd/lib'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import { Service } from './service'
import EditModalCar from './EditModalCar'
import CreateModalCar from './CreateModalCar'
import Filters from './Filters'

interface Props {
  service: Service
}

const TableCar = ({ service }: Props) => {
  const columns = [
    {
      title: '№',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Номер',
      dataIndex: 'carNumber',
      key: 'carNumber',
    },
    {
      title: 'Год выпуска',
      key: 'buildCar',
      render: (value: any) => (value.buildCar ? new Date(+value.buildCar).toLocaleDateString() : ''),
    },
    {
      title: 'Тех Осмотр',
      key: 'carCheck',
      render: (value: any) => (value.carCheck ? new Date(+value.carCheck).toLocaleDateString() : ''),
    },
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Марка',
      dataIndex: 'mark',
      key: 'mark',
    },

    {
      title: 'Пробег',
      dataIndex: 'mileage',
      key: 'mileage',
    },
    {
      title: 'Цена покупки',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Расходы',
      dataIndex: 'costs',
      key: 'costs',
    },
    {
      title: 'На продажу',
      dataIndex: 'forSale',
      key: 'forSale',
    },
    {
      title: 'Дата покупки',
      key: 'buyDay',
      render: (value: any) => {
        return value.buyDay ? new Date(+value.buyDay).toLocaleDateString() : ''
      },
    },
    {
      title: 'Дата продажи',
      key: 'cellDay',
      render: (value: any) => (value.cellDay ? new Date(+value.cellDay).toLocaleDateString() : ''),
    },
    {
      title: 'Владелец',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Продана',
      key: 'isCell',
      render: (value: any) => (value.isCell === 'has' ? 'В наличии' : 'Продано'),
    },
    {
      title: 'Прибыль',
      dataIndex: 'profit',
      key: 'profit',
    },
    {
      key: 'action',
      render: (value: any) => {
        return (
          <span>
            <img
              src="https://img.icons8.com/material-outlined/24/000000/gears.png"
              onClick={() => setOpenedEditModal(value.key)}
            />
            <EditModalCar
              isOpened={isOpenedEditModal === value.key}
              row={value}
              close={setOpenedEditModal}
              service={service}
            />
          </span>
        )
      },
    },
  ]

  const [isOpenedEditModal, setOpenedEditModal] = useState('')
  const [isOpenedCreateModal, setOpenedCreateModal] = useState(false)
  const [isOpenedFilters, setOpenedFilters] = useState(false)
  const [isCarsAvailable, setIsCarsAvailable] = useState(true)

  const [dataCars, setDataCars] = useState(service.dataCar)

  useEffect(() => {
    service.fetchData2(setDataCars)
  }, [])

  useEffect(() => {
    if (service.dataCar.length > 0 && !isOpenedFilters) {
      service.dateForTable(isCarsAvailable, setDataCars)
    }
  }, [service.dataCar, isCarsAvailable])

  return (
    <>
      {isOpenedFilters && (
        <Filters
          service={service}
          setDataCar={setDataCars}
          setOpenedFilters={setOpenedFilters}
          dataCar={dataCars}
          isCarsAvailable={isCarsAvailable}
        />
      )}

      {!isOpenedFilters && (
        <div className="options">
          <Radio.Group
            onChange={() => {
              console.log(isCarsAvailable)
              setIsCarsAvailable(!isCarsAvailable)
            }}
            defaultValue={isCarsAvailable}
            buttonStyle="solid"
          >
            <Radio.Button value={false}>Все</Radio.Button>
            <Radio.Button value={true}>В наличии</Radio.Button>
          </Radio.Group>

          <span>
            <Button type="primary" onClick={() => setOpenedCreateModal(true)}>
              Добавить
            </Button>
            {isOpenedCreateModal && (
              <CreateModalCar isOpened={isOpenedCreateModal} close={setOpenedCreateModal} service={service} />
            )}
          </span>

          <span>
            <Button
              type="primary"
              onClick={() => {
                setOpenedFilters(true)
                service.changeFilterActive()
              }}
            >
              Фильтр
            </Button>
          </span>
        </div>
      )}

      <Table columns={columns} dataSource={dataCars} pagination={false} bordered={true} />
    </>
  )
}

export default TableCar
