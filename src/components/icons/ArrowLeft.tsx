import React from 'react'

declare interface Props {
  size: string
  viewBox: string
}

const ArrowLeft = ({ size, viewBox }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={size}
      viewBox={viewBox}
      width={size}
      fill='currentColor'
    >
      <path d='M0 0h24v24H0V0z' fill='none' />
      <path d='M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z' />
    </svg>
  )
}

export default ArrowLeft
