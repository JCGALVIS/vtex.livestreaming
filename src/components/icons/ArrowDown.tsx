// eslint-disable-next-line no-unused-vars
import type { FunctionComponent } from 'react'
import React from 'react'

const ArrowDown: FunctionComponent<{ size: number }> = ({
  size = 24
}: {
  size: number
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    style={{ transform: 'rotate(-90deg)' }}
  >
    <path d='M0 0h24v24H0z' fill='none' />
    <path
      d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
      fill='currentColor'
    />
  </svg>
)

export default ArrowDown
