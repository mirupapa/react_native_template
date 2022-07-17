import { string } from 'yup'
import { validator } from '../utils/validator'
import { DEFAULT_MAIL, DEFAULT_PASS } from '@env'

export type State = {
  email: string
  password: string
  err_email: string
  err_password: string
  isDisabled: boolean
}

export type Action = { type: 'UPDATE_EMAIL'; payload: string } | { type: 'UPDATE_PASSWORD'; payload: string }

export const initialState: State = {
  email: __DEV__ ? DEFAULT_MAIL : '',
  password: __DEV__ ? DEFAULT_PASS : '',
  err_email: '',
  err_password: '',
  isDisabled: !__DEV__,
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_EMAIL': {
      const validate = string().required('emailは必須です').email('メール形式エラー')
      const err_email = validator(validate, action.payload)
      return {
        ...state,
        email: action.payload,
        err_email: err_email,
        isDisabled:
          err_email.length > 0 ||
          state.err_password.length > 0 ||
          action.payload.length === 0 ||
          state.password.length === 0,
      }
    }
    case 'UPDATE_PASSWORD': {
      const validate = string().required('password は必須です')
      const err_password = validator(validate, action.payload)
      return {
        ...state,
        password: action.payload,
        err_password: err_password,
        isDisabled:
          state.err_email.length > 0 ||
          err_password.length > 0 ||
          state.email.length === 0 ||
          action.payload.length === 0,
      }
    }
  }
}
