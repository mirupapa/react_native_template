import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useReducer } from 'react'
import { Alert } from 'react-native'
import { auth } from 'src/../firebase'
import { CommonContext } from 'src/context/commonContext'
import { initialState, reducer, State } from 'src/reducers/loginReducer'
import { LoginNavigationProp } from 'src/screens/Top/Login'
import { SignUpNavigationProp } from 'src/screens/Top/SignUp'

export type HandlersType = {
  onClickLogin: () => void
  onClickSignUp: () => void
  onChangeEmail: (value: string) => void
  onChangePassword: (value: string) => void
}

export type UseLoginType = {
  state: State
  handlers: HandlersType
}

const useLogin = (navigation?: SignUpNavigationProp | LoginNavigationProp): UseLoginType => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { dispatch: commonDispatch } = CommonContext()

  const onChangeEmail = (value: string) => {
    dispatch({
      type: 'UPDATE_EMAIL',
      payload: value,
    })
  }

  const onChangePassword = (value: string) => {
    dispatch({
      type: 'UPDATE_PASSWORD',
      payload: value,
    })
  }

  const onClickLogin = async () => {
    try {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
      await signInWithEmailAndPassword(auth, state.email, state.password)
      const user = auth.currentUser
      if (user) {
        if (user.emailVerified) {
          commonDispatch({ type: 'SET_USER_INFO', payload: user })
        } else {
          await sendEmailVerification(user)
          Alert.alert(
            'まだメールアドレスの確認が取れてません。登録されたメールアドレスに、確認用リンクを送信しました。',
          )
          navigation?.navigate('Top')
        }
      } else {
        Alert.alert('ログインエラー')
      }
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert('ログインエラー')
      }
    } finally {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
    }
  }

  const onClickSignUp = async () => {
    try {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
      const result = await createUserWithEmailAndPassword(auth, state.email, state.password)
      await sendEmailVerification(result.user)
      Alert.alert('登録されたメールアドレスに、確認用リンクを送信しました。')
      navigation?.navigate('Top')
    } catch (err) {
      Alert.alert('サインアップエラー')
    } finally {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
    }
  }

  return {
    state,
    handlers: {
      onClickLogin,
      onClickSignUp,
      onChangeEmail,
      onChangePassword,
    },
  }
}

export default useLogin
