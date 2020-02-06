import * as React from 'react'

interface Props {
  dispatch: (e:any) => void
  type: string
  title: string

}

export const Input = ({ dispatch, type, title }: Props) => {
  return (
    <div className="create-item">
      <span>{title}</span>
      <input value={type} onChange={dispatch} />
    </div>
  )
}
