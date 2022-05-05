import React, { useState, useEffect, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Answer as AnswerInterface } from '../../../typings/livestreaming';
import { Spinner, Badge } from '../commonComponents';
import styles from './question.module.css';
interface AnswerProps {
  isAnswer: boolean;
  data: any;
}

const Answer = ({ isAnswer, data }: AnswerProps) => {
  const [answers, setAnswers] = useState([
    {
      answer: '',
      votes: 0,
    },
  ]);

  useEffect(() => {
    const option = data?.question?.answers.map((answer: AnswerInterface) => {
      return {
        answer: answer.text,
        votes: answer.votes,
      };
    });

    setAnswers(option);
  }, [data, isAnswer]);

  return data === undefined ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        <p>{data?.question?.question}</p>
      </div>
      <div>
        <p>
          <b>
            <FormattedMessage id="store/total-votes" />:
          </b>{' '}
          {data?.question?.totalVotes}
        </p>
      </div>
      <div className="mt3">
        <ul>
          {answers?.map(answer => (
            <li key={answer.answer} className={styles.answerContainer}>
              <div className={styles.answerContent}>
                <div className={styles.answerText}>
                  <span className="mr4">{answer.answer}</span>
                </div>
                <div className={styles.answerVotes}>
                  <Badge value={answer.votes} type="success" />
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
              <FormattedMessage id="store/time" />:
            </b>{' '}
            {data?.question?.time} <FormattedMessage id="store/seconds" />
          </span>
        </p>
      </div>
    </Fragment>
  );
};

export default Answer;
