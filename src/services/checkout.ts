import { apiCall } from './apiCall'

export const cartSimulation = async (body: any) => {
  const url = `/api/checkout/pub/orderforms/simulation`

  const method = 'POST'

  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')

  const raw = JSON.stringify(body)

  const data = await apiCall({ url, method, headers, body: raw })

  return data
}
