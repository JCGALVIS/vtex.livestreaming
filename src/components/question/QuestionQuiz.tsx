import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  Fragment
} from 'react'

import Timer from './Timer'
import { Answer, Question } from '../../typings/liveStreaming'
import styles from './question.css'

interface QuestionQuizProps {
  dataQuestion?: Question
  setIsAnswer: Dispatch<SetStateAction<boolean>>
  setIndexAnswer: Dispatch<SetStateAction<number[]>>
  disabledForm: boolean
}

declare interface Option {
  value: string
  label: string
  index: number
}

const QuestionQuiz = ({
  dataQuestion,
  setIsAnswer,
  setIndexAnswer,
  disabledForm
}: QuestionQuizProps) => {
  const [valueOption, setValueOption] = useState('')
  const [optionsQuestion, setOptionsQuestion] = useState([
    {
      value: '',
      label: '',
      index: 0
    }
  ])

  const [timeExpired, setTimeExpired] = useState(false)

  useEffect(() => {
    if (!valueOption && dataQuestion?.answers) {
      const options = dataQuestion?.answers.map(
        (answer: Answer, index: number) => {
          return {
            value: answer.text,
            label: answer.text,
            index
          }
        }
      )

      setOptionsQuestion(options)
    }

    setIsAnswer(timeExpired)
  }, [timeExpired, valueOption, dataQuestion, setIsAnswer])

  const saveVotes = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement
    const valueIndex = optionsQuestion.find((answer) => answer.value === value)

    const indexArray: number[] = []

    indexArray.push(Number(valueIndex?.index))
    setIndexAnswer(indexArray)
    setValueOption(value)
  }

  return (
    <Fragment>
      <div>
        <p>{dataQuestion?.question}</p>
      </div>
      <p>
        {optionsQuestion.map((option: Option) => (
          <div>
            <input
              type='radio'
              id={`${option.label}_${option.value}`}
              name='questionQuiz'
              value={option.value}
              onChange={saveVotes}
              disabled={disabledForm}
            />
            <label htmlFor={`${option.label}_${option.value}`}>{option.label}</label>
          </div>
        ))}
      </p>
      <div className={styles.timeContent}>
        <Timer time={dataQuestion?.time || 0} setTimeExpired={setTimeExpired} />
      </div>
    </Fragment>
  )
}

export default QuestionQuiz
