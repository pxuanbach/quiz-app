import React, { createContext, useState, useContext, useEffect } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { getApiClient } from '../services/api'
import Router from 'next/router'

type IAuthContextData = {
  signIn: ({ username, password }: SignInData) => Promise<void>
  signOut: (ctx?: any) => void
  user: UserData
}

type SignInData = {
  username: string
  password: string
}

type UserData = {
  username: string
  name: string
  lastname: string
  email: string
}

type IResponseData = {
  user: UserData
  accessToken: string
}

const AuthContext = createContext({} as IAuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData | undefined>(null)

  useEffect(() => {
    const { 'quiz-auth.token': token } = parseCookies()

    if (token) {
      const api = getApiClient()
      api
        .get('users/me')
        .then(response => {
          setUser(response.data)
        })
        .catch(error => {
          Router.push('/')
        })
    }
  }, [])

  const signIn = async ({ username, password }: SignInData) => {
    try {
      const api = getApiClient()

      const response = await api.post('/auth', {
        username,
        password,
      })

      const { accessToken, user } = response.data as IResponseData

      setCookie(undefined, 'quiz-auth.token', accessToken, {
        maxAge: 60 * 60 * 24, // 1 day
      })

      setUser(user)

      Router.push('/home')
    } catch (error) {
      alert(JSON.stringify(error.message))
    }
  }

  const signOut = (ctx?: any) => {
    destroyCookie(ctx, 'quiz-auth.token')
    setUser(null)
    return Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ signOut, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
