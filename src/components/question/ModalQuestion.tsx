import React, { useState, useEffect, useCallback, useContext } from 'react'
import Button from '@vtex/styleguide/lib/Button'

import { Modal } from '../Modal/Modal'
import QuestionPoll from './QuestionPoll'
import QuestionTrueOrFalse from './QuestionTrueOrFalse'
import QuestionQuiz from './QuestionQuiz'
import Answer from './Answer'
import useUpdateVotes from '../../hooks/useUpdateVotes'
import type { InfoSocket, Question } from '../../typings/livestreaming'
import { apiCall } from '../../services'
import styles from './question.css'
import { FormattedMessage } from 'react-intl'
import { ActionsContext } from '../../context/ActionsContext'
declare interface Props {
  infoSocket: InfoSocket
}

export const ModalQuestion = ({ infoSocket }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [typeQuestion, setTypeQuestion] = useState<string | undefined>('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [indexAnswer, setIndexAnswer] = useState<number[]>([])
  const [disabledForm, setDisabledForm] = useState(false)
  const [validateForm, setvalidateForm] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const { question, setQuestion, socket } = infoSocket
  const { saveUpdateVotes } = useUpdateVotes({ socket })
  const [data, setData] = useState<Question | undefined>()

  const {
    setting: { account, idLivestreaming }
  } = useContext(ActionsContext)

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

  useEffect(() => {
    if (!isAnswer) {
      setData(undefined)
      return
    }

    const getQuestion = () => {
      let URL = '__GET_QUESTION_URL'
      const { GET_QUESTION_URL } = process.env

      if (GET_QUESTION_URL && GET_QUESTION_URL !== URL) {
        URL = GET_QUESTION_URL
      }

      if (!URL) return

      const getData = async () => {
        const data = await apiCall({
          url: `${URL}?id=${idLivestreaming}&account=${account}&index=${
            question?.index || 0
          }`
        })

        setData(data)
      }

      getData().catch(null)
    }

    getQuestion()
  }, [isAnswer])

  return (
    <Modal show={isOpenModal}>
      {validateForm && (
        <div className={styles.errorMessageContainer}>
          <span className={styles.errorMessage}>
            <FormattedMessage id='store/text.select-answer' />
          </span>
        </div>
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

      {isAnswer && <Answer isAnswer={isAnswer} data={data} />}
      <div className={styles.buttonContenModal}>
        {!isAnswer && (
          <Button
            onClick={updateVotes}
            disabled={disabledForm}
            className={styles.btn}
          >
            {!disabledForm && <FormattedMessage id='store/button.send' />}
            {disabledForm && <FormattedMessage id='store/button.expecting' />}
          </Button>
        )}
        {isAnswer && data !== undefined && (
          <Button onClick={closeModal}>
            <FormattedMessage id='store/button.close' />
          </Button>
        )}
      </div>
    </Modal>
  )
}
