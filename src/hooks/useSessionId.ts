import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    const sessionIdStorage = localStorage.getItem('sessionId')
    if (sessionIdStorage) {
      setSessionId(sessionIdStorage)
      return
    }

    const id = uuidv4()
    localStorage.setItem('sessionId', id)
    setSessionId(id)
  }, [])

  return { sessionId, setSessionId }
}
