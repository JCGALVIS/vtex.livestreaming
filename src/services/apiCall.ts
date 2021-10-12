declare interface ApiCall {
  url: string
  method?: string
  headers?: any
  body?: any
}

export const apiCall = async ({
  url,
  method = 'GET',
  headers,
  body
}: ApiCall) => {
  try {
    const response = await fetch(url, { method, headers, body })

    return response.json()
  } catch (error) {
    Promise.reject(error)
  }
}
