import { useState } from 'react'
import { Alert } from 'react-native'
import { auth } from 'src/../firebase'
import { CommonContext } from 'src/context/commonContext'
import { ResetPassNavigationProp } from 'src/screens/Top/ResetPass'
import { sendPasswordResetEmail } from 'firebase/auth'

const useResetPass = (navigation?: ResetPassNavigationProp) => {
  const [state, setState] = useState({ email: '' })
  const { dispatch: commonDispatch } = CommonContext()

  const onChangeEmail = (value: string) => {
    setState({ email: value })
  }

  const onClickSendMail = async () => {
    try {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
      const result = await sendPasswordResetEmail(auth, state.email)
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
      onChangeEmail,
      onClickSendMail,
    },
  }
}

export default useResetPass
