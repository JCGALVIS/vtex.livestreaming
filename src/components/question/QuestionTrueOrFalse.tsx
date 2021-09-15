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
import { Radio } from '../commonComponents'
import styles from './question.css'

interface QuestionTrueOrFalseProps {
  dataQuestion?: Question
  setIsAnswer: Dispatch<SetStateAction<boolean>>
}

declare interface Option {
  value: string
  label: string
}

const QuestionTrueOrFalse = ({
  dataQuestion,
  setIsAnswer,
}: QuestionTrueOrFalseProps) => {
 // const [valueOption, setValueOption] = useState('')
  const [optionsQuestion, setOptionsQuestion] = useState([{}])
  const [timeExpired, setTimeExpired] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (dataQuestion?.answers) {
      const options = dataQuestion?.answers.map((answer: Answer) => {
        return {
          value: answer.text,
          label: answer.text === 'true' ? 'Verdadero' : 'Falso',
        }
      })

      setOptionsQuestion(options)
      setIsAnswer(timeExpired)
    }
  }, [timeExpired, setOptionsQuestion, setIsAnswer, dataQuestion])

  const saveVotes = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement
    console.log(value)
    //setValueOption(value)
  }

  return (
    <Fragment>
      <div>
        <p>{dataQuestion?.question}</p>
      </div>
      <p>
      {optionsQuestion.map((option: Option) => (
          <div>
            <Radio
              id={`${option.label}_${option.value}`}
              name='trueOrFalse'
              value={option.value}
              onChange={saveVotes}
              disabled={timeExpired}
              label={option.label}
            />
          </div>
        ))}
      </p>
      <div className={styles.timeContent}>
        <Timer time={dataQuestion?.time || 0} setTimeExpired={setTimeExpired} />
      </div>
    </Fragment>
  )
}

export default QuestionTrueOrFalse
