import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  Fragment
} from 'react'

import Timer from './Timer'
import { Answer, Question } from '../../typings/livestreaming'
import { Radio } from '../commonComponents'
import styles from './question.css'
import { FormattedMessage } from 'react-intl'

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
  setIsAnswer
}: QuestionTrueOrFalseProps) => {
  // const [valueOption, setValueOption] = useState('')
  const [optionsQuestion, setOptionsQuestion] = useState([{}])
  const [timeExpired, setTimeExpired] = useState(false)

  useEffect(() => {
    if (dataQuestion?.answers) {
      const options = dataQuestion?.answers.map((answer: Answer) => {
        return {
          value: answer.text,
          label:
            answer.text === 'true' ? (
              <FormattedMessage id='store/text.true' />
            ) : (
              <FormattedMessage id='store/text.false' />
            )
        }
      })

      setOptionsQuestion(options)
      setIsAnswer(timeExpired)
    }
  }, [timeExpired, setOptionsQuestion, setIsAnswer, dataQuestion])

  const saveVotes = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement
    console.log(value)
    // setValueOption(value)
  }

  return (
    <Fragment>
      <div>
        <p>{dataQuestion?.question}</p>
      </div>
      <p>
        {optionsQuestion.map((option: Option) => (
          <div key={`${option.label}_${option.value}`}>
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
