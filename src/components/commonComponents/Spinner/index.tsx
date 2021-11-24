import React from 'react'
import styles from './styles.css'

declare interface Props {
  size?: number
  color?: string
  borderColor?: string
  borderWidth?: number
}

export const Spinner = ({
  size = 40,
  color = '#134cd8',
  borderColor = '#f3f3f3',
  borderWidth = 4.5
}: Props) => {
  return (
    <div
      className={styles.loader}
      style={{
        border: `${borderWidth}px solid  ${borderColor}`,
        borderTop: `${borderWidth}px solid ${color}`,
        borderRight: `${borderWidth}px solid ${color}`,
        borderBottom: `${borderWidth}px solid ${color}`,
        width: size,
        height: size
      }}
    />
  )
}
