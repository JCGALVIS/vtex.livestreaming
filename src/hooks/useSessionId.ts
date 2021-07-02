import { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    const sessionIdStorage = localStorage.getItem('sessionId')
    if (sessionIdStorage) {
      setSessionId(sessionIdStorage)
      return
    }

    const id = uuid()
    localStorage.setItem('sessionId', id)
    setSessionId(id)
  }, [])

  return { sessionId, setSessionId }
}
