import React, { useState, useEffect, Fragment } from 'react'
//import Tag from '@vtex/styleguide/lib/Tag'

//import { useLivestream } from '../../../ClientUseLivestreamContext'
//import GET_QUESTION from '../../graphql/queries/getQuestion.gql'
import { Answer as AnswerInterface } from '../../typings/liveStreaming'
//mport { questions } from '../../../../livestreaming/node/resolvers/livestreaming/queries/questions';
import styles from './question.css'

interface AnswerProps {
  index: number
  isAnswer: boolean
}

const data = {
  question : {
    answers: [],
    question: '',
    totalVotes: 12,
    time: 19
  }
}

const Answer = ({ index, isAnswer }: AnswerProps) => {
  console.log(index)
  const [answers, setAnswers] = useState([
    {
      answer: '',
      votes: 0,
    },
  ])

  /*const { data, refetch } = useQuery(GET_QUESTION, {
    variables: {
      idStreaming: livestreaming?.id,
      index,
    },
  })*/

  useEffect(() => {
    const option = data?.question?.answers.map((answer: AnswerInterface) => {
      return {
        answer: answer.text,
        votes: answer.votes,
      }
    })

    setAnswers(option)

    /*if (isAnswer) {
      refetch()
    }*/
  }, [data, isAnswer/*, refetch*/])

  return (
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
