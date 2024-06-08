import axios from 'axios'
import { UTILS } from '../constants/utils'
import { parseCookies } from 'nookies'

export const getApiClient = (ctx?: any) => {
  const { ['quiz-auth.token']: token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: UTILS.api,
  })

  api.interceptors.request.use(config => {
    return config
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
