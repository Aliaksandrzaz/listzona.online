import { Button, DatePicker, Radio } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Data, TableService } from './tableService'
import Report from './Report'
import { parseTime } from '../helpers'

interface Props {
  service: TableService
  setDataCar: (data: Data) => void
  setOpenedFilters: (isOpened: boolean) => void
  dataCar: Data
  isCarsAvailable: boolean
}
const Filters = ({ service, setDataCar, dataCar, setOpenedFilters, isCarsAvailable }: Props) => {
  const [filters, setFilters] = useState({
    model: '',
    mark: '',
    key: '',
    time: {
      start: '',
      end: '',
    },
    isCell: 'all',
  })

  const [isOpenReportModal, setOpenReportModal] = useState(false)
  const [isFilter, setIsFilter] = useState(false)

  useEffect(() => {
    setDataCar([])
  }, [])

  useEffect(() => {
    if (dataCar.length > 0 && isFilter) {
      service.filter(filters, setDataCar)
    }
  }, [service.dataCar, isFilter])

  return (
    <div className="filters">
      <div className="filters-item">
        <DatePicker
          format="DD-MM-YYYY"
          placeholder="Начало"
          value={filters.time.start === '' ? null : moment(+filters.time.start)}
          onChange={e => {
            setFilters({
              ...filters,
              time: {
                ...filters.time,
                start: e !== null ? parseTime(e) : '',
              },
            })
          }}
        />
        <DatePicker
          placeholder="Конец"
          format="DD-MM-YYYY"
          value={filters.time.end === '' ? null : moment(+filters.time.end)}
          onChange={e =>
            setFilters({
              ...filters,
              time: {
                ...filters.time,
                end: e !== null ? `${+parseTime(e)}` : '',
              },
            })
          }
        />
      </div>

      <div className="filters-item">
        <input
          placeholder="Модель"
          value={filters.model}
          onChange={e =>
            setFilters({
              ...filters,
              model: e.target.value,
            })
          }
        />
      </div>

      <div className="filters-item">
        <input
          placeholder="Позиция"
          value={filters.key}
          onChange={e =>
            setFilters({
              ...filters,
              key: e.target.value,
            })
          }
        />
      </div>

      {/*<div className="filters-item">*/}
      {/*  <input*/}
      {/*    value={filters.mark}*/}
      {/*    placeholder="Марка"*/}
      {/*    onChange={e => {*/}
      {/*      return setFilters({*/}
      {/*        ...filters,*/}
      {/*        mark: e.target.value,*/}
      {/*      })*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}

      <div>
        <Radio.Group
          onChange={e => {
            setFilters({
              ...filters,
              isCell: e.target.value,
            })
          }}
          value={filters.isCell}
        >
          <Radio value="all">Все</Radio>
          <Radio value="cell">Продано</Radio>
          <Radio value="has">В наличии </Radio>
        </Radio.Group>
      </div>

      <div className="filter-btn__mobile">
        <Button
          type="primary"
          onClick={() => {
            setIsFilter(true)
            service.filter(filters, setDataCar)
          }}
        >
          Применить
        </Button>

        <Button
          type="primary"
          onClick={() => {
            service.reset(setDataCar)

            setFilters({
              model: '',
              mark: '',
              key: '',
              time: {
                start: '',
                end: '',
              },
              isCell: 'all',
            })
            setIsFilter(false)
          }}
        >
          Сбросить
        </Button>

        <Button type="primary" onClick={() => setOpenReportModal(true)}>
          Отчет
        </Button>

        <Button
          type="primary"
          onClick={() => {
            setOpenedFilters(false)
            service.dateForTable(isCarsAvailable, setDataCar)
            service.changeFilterActive()
          }}
        >
          Закрыть
        </Button>

        {isOpenReportModal && (
          <Report isOpened={isOpenReportModal} close={setOpenReportModal} data={dataCar} />
        )}
      </div>
    </div>
  )
}

export default Filters
