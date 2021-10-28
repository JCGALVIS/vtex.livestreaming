import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  Fragment
} from 'react'

import Timer from './Timer'
import type { Answer, Question } from '../../typings/livestreaming'
import { Checkbox } from '../commonComponents'
import styles from './question.css'

interface QuestionPollProps {
  dataQuestion?: Question
  setIsAnswer: Dispatch<SetStateAction<boolean>>
  setIndexAnswer: Dispatch<SetStateAction<number[]>>
  disabledForm: boolean
}

interface PollAnswer {
  label: string
  value: number
  checked: boolean
}

const QuestionPoll = ({
  dataQuestion,
  setIsAnswer,
  setIndexAnswer,
  disabledForm
}: QuestionPollProps) => {
  const [indexData, setIndexData] = useState<number[]>([])
  const [optionsQuestion, setOptionsQuestion] = useState<PollAnswer[]>([])

  const [timeExpired, setTimeExpired] = useState(false)

  const getInformation = (e: SyntheticEvent) => {
    const { checked, value } = e.target as HTMLInputElement

    setOptionsQuestion((prev) =>
      prev.map((item) => {
        if (Number(value) === item.value) item.checked = checked

        return item
      })
    )

    const dataIndex = indexData

    if (!checked) {
      setIndexData((prev) => {
        return prev.filter((item) => item !== Number(value))
      })
    } else {
      setIndexData([...dataIndex, Number(value)])
    }
  }

  useEffect(() => {
    if (indexData.length <= 0 && !!dataQuestion?.answers) {
      const options = dataQuestion?.answers.map(
        (answer: Answer, index: number) => {
          return {
            label: answer.text,
            value: index,
            checked: false
          }
        }
      )

      setOptionsQuestion(options)
    }

    setIndexAnswer(indexData)
    setIsAnswer(timeExpired)
  }, [dataQuestion, timeExpired, indexData, setIndexAnswer, setIsAnswer])

  return (
    <Fragment>
      <div>
        <p>{dataQuestion?.question}</p>
      </div>
      <div>
        {optionsQuestion.map((item) => (
          <div className={styles.checkbox} key={item.value}>
            <Checkbox
              checked={item.checked}
              id={`option-${item.value}`}
              label={item.label}
              name={`check-${item.value}`}
              onChange={getInformation}
              value={item.value}
              disabled={disabledForm}
            />
          </div>
        ))}
      </div>
      <div className={styles.timeContent}>
        <Timer time={dataQuestion?.time || 0} setTimeExpired={setTimeExpired} />
      </div>
    </Fragment>
  )
}

export default QuestionPoll
