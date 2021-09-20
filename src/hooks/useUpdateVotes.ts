import { useState } from 'react'
declare interface Props {
  socket: WebSocket | undefined
}

const useUpdateVotes = ({socket}: Props) => {
  const [loadingUpdate, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const updateVotes = async (
    idStreaming: string,
    indexQuestion: number,
    indexAnswers: number[]
  ) => {
    if(!socket) return

    const data = {
      action: 'sendanswer',
      idStreaming,
      indexQuestion,
      indexAnswers,
    }

    socket.send(JSON.stringify(data))
  }

  const saveUpdateVotes = async (
    idStreaming: string,
    indexQuestion: number,
    indexAnswers: number[]
  ) => {
    try {
      setLoading(true)
      await updateVotes(idStreaming, indexQuestion, indexAnswers)
    } catch (error) {
      setAlertMessage(error)
    }

    setLoading(false)
  }

  return {
    loadingUpdate,
    saveUpdateVotes,
    alertMessage,
  }
}

export default useUpdateVotes
