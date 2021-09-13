import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

interface TimerProps {
  time: number
  setTimeExpired: Dispatch<SetStateAction<boolean>>
}

const Timer = ({ time, setTimeExpired }: TimerProps) => {
  const [timeQuestion, setTimeQuestion] = useState(time)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeQuestion((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [time, setTimeExpired])

  useEffect(() => {
    if (timeQuestion <= 0) {
      setTimeExpired(true)
    }
  }, [timeQuestion, setTimeExpired])

  return (
    <span>
      <b>
        Tiempo:
      </b>
      &nbsp;
      {timeQuestion}
      &nbsp;
      Segundos
    </span>
  )
}

export default Timer
