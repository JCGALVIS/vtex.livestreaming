import { useState } from 'react'
// import { useApolloClient } from 'react-apollo'

// import UPDATE_VOTES from '../graphql/mutation/updateVotes.gql'

const useUpdateVotes = () => {
  const [loadingUpdate, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  //const client = useApolloClient()

  const updateVotes = async (
    idStreaming: string,
    indexQuestion: number,
    indexAnswers: number[]
  ) => {
    /*try {
      await client.mutate({
        mutation: UPDATE_VOTES,
        variables: {
          idStreaming,
          indexQuestion,
          indexAnswers,
        },
      })
    } catch (error) {
      setAlertMessage('Error on update votes')
    }*/
    console.log(idStreaming, indexQuestion, indexAnswers)
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
