import { Form, Icon, Input, Button } from 'antd'
import React, { useState } from 'react'
import { AuthorizationService } from './authorizationService'

interface Props {
  setIsLogin: (isLogin: boolean) => void
  isLogin: boolean
}

export const Authorization = ({ setIsLogin, isLogin }: Props) => {
  const [login, setLogin] = useState({
    user: '',
    password: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    authorizationService.loginAuthorization(login.user, login.password)
  }

  const authorizationService = new AuthorizationService(setIsLogin)

  return !isLogin ? (
    <Form layout="inline" onSubmit={handleSubmit} className="form__authorization">
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Логин"
          onChange={e => {
            setLogin({
              ...login,
              user: e.target.value,
            })
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Пароль"
          onChange={e => {
            setLogin({
              ...login,
              password: e.target.value,
            })
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <div className="wrapper__signOut">
      <Button type="danger" onClick={authorizationService.signOut} className="signOut">
        Выйти
      </Button>
    </div>
  )
}
