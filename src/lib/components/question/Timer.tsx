import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';

interface TimerProps {
  time: number;
  setTimeExpired: Dispatch<SetStateAction<boolean>>;
}

const Timer = ({ time, setTimeExpired }: TimerProps) => {
  const [timeQuestion, setTimeQuestion] = useState(time);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeQuestion(prev => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [time, setTimeExpired]);

  useEffect(() => {
    if (timeQuestion <= 0) {
      setTimeExpired(true);
    }
  }, [timeQuestion, setTimeExpired]);

  return (
    <span>
      <b>
        <FormattedMessage id="store/time" />:
      </b>
      &nbsp;
      {timeQuestion}
      &nbsp; <FormattedMessage id="store/seconds" />
    </span>
  );
};

export default Timer;
