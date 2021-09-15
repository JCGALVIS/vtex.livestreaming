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
import { Checkbox } from '../commonComponents'
import styles from './question.css'

interface QuestionPollProps {
  dataQuestion?: Question
  setIsAnswer: Dispatch<SetStateAction<boolean>>
  setIndexAnswer: Dispatch<SetStateAction<number[]>>
  disabledForm: boolean
}

const QuestionPoll = ({
  dataQuestion,
  setIsAnswer,
  setIndexAnswer,
  disabledForm
}: QuestionPollProps) => {
  const [valueOption, setValueOption] = useState({
    checkOne: false,
    checkTwo: false,
    checkThree: false,
    checkFour: false
  })

  const [indexData, setIndexData] = useState<number[]>([])
  const [optionsQuestion, setOptionsQuestion] = useState([
    {
      name: '',
      position: 0
    }
  ])

  const [timeExpired, setTimeExpired] = useState(false)

  const getInformation = (e: SyntheticEvent) => {
    const { name, checked, value } = e.target as HTMLInputElement

    setValueOption({
      ...valueOption,
      [name]: checked
    })

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
            name: answer.text,
            position: index
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
        <div className={styles.checkbox}>
          <Checkbox
            checked={valueOption.checkOne}
            id='option-0'
            name='checkOne'
            onChange={getInformation}
            value={optionsQuestion[0]?.position}
            disabled={disabledForm}
            label={optionsQuestion[0]?.name}
          />
        </div>
        <div className={styles.checkbox}>
          <Checkbox
            checked={valueOption.checkTwo}
            id='option-1'
            name='checkTwo'
            onChange={getInformation}
            value={optionsQuestion[1]?.position}
            disabled={disabledForm}
            label={optionsQuestion[1]?.name}
          />
        </div>
        <div className={styles.checkbox}>
          <Checkbox
            checked={valueOption.checkThree}
            id='option-2'
            name='checkThree'
            onChange={getInformation}
            value={optionsQuestion[2]?.position}
            disabled={disabledForm}
            label={optionsQuestion[2]?.name}
          />
        </div>
        <div className={styles.checkbox}>
          <Checkbox
            checked={valueOption.checkFour}
            id='option-3'
            name='checkFour'
            onChange={getInformation}
            value={optionsQuestion[3]?.position}
            disabled={disabledForm}
            label={optionsQuestion[3]?.name}
          />
        </div>
      </div>
      <div className={styles.timeContent}>
        <Timer time={dataQuestion?.time || 0} setTimeExpired={setTimeExpired} />
      </div>
    </Fragment>
  )
}

export default QuestionPoll
