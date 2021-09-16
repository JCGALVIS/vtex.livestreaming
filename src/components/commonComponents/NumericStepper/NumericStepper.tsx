import React, { useState } from 'react'

import styles from './numericStepper.css'

export const NumericStepper = () => {
  const [count, setCount] = useState(1)

  const handleMinus = () => {
    if (count - 1 >= 1) setCount(count - 1)
  }

  const handlePlus = () => {
    setCount(count + 1)
  }

  const handleOnChage = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement

    setCount(
      isNaN(parseInt(value)) ? 1 : parseInt(value) >= 1 ? parseInt(value) : 1
    )
  }

  return (
    <div className={styles.numericStepperContent}>
      <div>
        <button
          className={`${styles.numericStepperButton} ${
            styles.numericStepperMinusButton
          } ${count === 1 ? styles.numericStepperInactiveButton : ''}`}
          onClick={handleMinus}
        >
          -
        </button>
      </div>
      <input
        type='tel'
        value={count}
        className={styles.numericStepperInput}
        onChange={handleOnChage}
      />
      <div>
        <button
          className={`${styles.numericStepperButton} ${styles.numericStepperPlusButton}`}
          onClick={handlePlus}
        >
          +
        </button>
      </div>
    </div>
  )
}
