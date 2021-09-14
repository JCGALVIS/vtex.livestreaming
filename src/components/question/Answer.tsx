import React, { useState, useEffect, Fragment } from 'react'
import { Answer as AnswerInterface } from '../../typings/liveStreaming'
import styles from './question.css'
interface AnswerProps {
  isAnswer: boolean
  data: any
}

const Answer = ({ isAnswer, data}: AnswerProps) => {
  const [answers, setAnswers] = useState([
    {
      answer: '',
      votes: 0,
    },
  ])

  useEffect(() => {
    const option = data?.question?.answers.map((answer: AnswerInterface) => {
      return {
        answer: answer.text,
        votes: answer.votes,
      }
    })

    setAnswers(option)
  }, [ data, isAnswer])

  return data === undefined ? <div>Cargando...</div> : (
    <Fragment>
      <div>
        <p>{data?.question?.question}</p>
      </div>
      <div>
        <p>
          <b>
           Total votos:
          </b>{' '}
          {data?.question?.totalVotes}
        </p>
      </div>
      <div className="mt3">
        <ul>
          {answers?.map((answer) => (
            <li key={answer.answer}>
              <div className={styles.answerContent}>
                <div className={styles.answerText}>
                  <span className="mr4">{answer.answer}</span>
                </div>
                <div className={styles.answerVotes}>
                  <div>{answer.votes}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.timeContent}>
        <p>
          <span>
            <b>
              Tiempo:
            </b>{' '}
            {data?.question?.time} Segundos
          </span>
        </p>
      </div>
    </Fragment>
  )
}

export default Answer
