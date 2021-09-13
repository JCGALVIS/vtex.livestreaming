import React, { useState, useEffect, useCallback } from 'react'
import Button  from '@vtex/styleguide/lib/Button'

import Modal from '../Modal/Modal'
import QuestionPoll from './QuestionPoll'
import QuestionTrueOrFalse from './QuestionTrueOrFalse'
import QuestionQuiz from './QuestionQuiz'
import Answer from './Answer'
import useUpdateVotes from '../../hooks/useUpdateVotes'
import type { InfoSocket, Question } from '../../typings/liveStreaming'
import styles from './question.css'

declare interface Props {
  infoSocket: InfoSocket
  idLivestreaming: string
}

export const ModalQuestion = ({infoSocket, idLivestreaming}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [typeQuestion, setTypeQuestion] = useState<string | undefined>('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [indexAnswer, setIndexAnswer] = useState<number[]>([])
  const [disabledForm, setDisabledForm] = useState(false)
  const [validateForm, setvalidateForm] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const { saveUpdateVotes } = useUpdateVotes()
  const { question, setQuestion } = infoSocket

  const showQuestion = useCallback(
    (questiontoShow: Question) => {
      if (!questiontoShow) return
      if (Object.keys(questiontoShow).length === 0 || !pageVisible) return
      setDisabledForm(false)
      setIsAnswer(false)
      setTypeQuestion(questiontoShow.type)
      setIsOpenModal(true)
    },
    [pageVisible]
  )

  const closeModal = () => {
    if (setQuestion) setQuestion({})
    setIndexAnswer([])
    setvalidateForm(false)
    setIsAnswer(false)
    setDisabledForm(false)
    setIsOpenModal(false)
  }

  const updateVotes = () => {
    if (indexAnswer.length > 0) {
      setvalidateForm(false)
      saveUpdateVotes(idLivestreaming, question?.index || 0, indexAnswer)
      setDisabledForm(true)
    } else {
      setvalidateForm(true)
    }
  }

  useEffect(() => {
    // document.addEventListener('visibilitychange', handleVisibilityChange, false)
    window.addEventListener('blur', () => {
      setPageVisible(false)
    })
    window.addEventListener('focus', () => {
      setPageVisible(true)
    })

    return () => {
      window.removeEventListener('blur', () => {
        setPageVisible(false)
      })
      window.removeEventListener('focus', () => {
        setPageVisible(true)
      })
    }
  }, [])

  useEffect(() => {
    const finalDate = question?.date
      ? question?.date + (question?.time || 0) * 1000
      : 0

    const timeRemaining = finalDate - Date.now()

    if (timeRemaining < 3000 || !question || !pageVisible) return

    question.time = Math.round(timeRemaining / 1000)
    showQuestion(question)
  }, [pageVisible, question, showQuestion])

  return (
    <Modal show={isOpenModal}>
      {validateForm && (
        <span className="c-danger">
          Debe seleccionar una respuesta.
        </span>
      )}
      {!isAnswer &&
        (() => {
          switch (typeQuestion) {
            case 'trueOrFalse':
              return (
                <QuestionTrueOrFalse
                  dataQuestion={question}
                  setIsAnswer={setIsAnswer}
                />
              )

            case 'poll':
              return (
                <QuestionPoll
                  dataQuestion={question}
                  setIsAnswer={setIsAnswer}
                  setIndexAnswer={setIndexAnswer}
                  disabledForm={disabledForm}
                />
              )

            case 'quiz':
              return (
                <QuestionQuiz
                  dataQuestion={question}
                  setIsAnswer={setIsAnswer}
                  setIndexAnswer={setIndexAnswer}
                  disabledForm={disabledForm}
                />
              )

            default:
              return null
          }
        })()}

      {isAnswer && <Answer index={question?.index || 0} isAnswer={isAnswer} />}
      <div className={styles.buttonContenModal}>
        {!isAnswer && (
          <Button
            variation="primary"
            onClick={updateVotes}
            disabled={disabledForm}
          >
            {!disabledForm && 'Enviar'}
            {disabledForm && 'Esperando...'}
          </Button>
        )}
        {isAnswer && (
          <Button variation="primary" onClick={closeModal}>
            Cerrar
          </Button>
        )}
      </div>
    </Modal>
  )
}


