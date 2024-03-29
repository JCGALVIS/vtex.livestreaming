import React from 'react'

declare interface Props {
  size: string
  viewBox: string
}

const Send = ({ size, viewBox }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M0.946021 7.31504C0.424021 7.14104 0.419021 6.86004 0.956021 6.68104L20.043 0.31904C20.572 0.14304 20.875 0.43904 20.727 0.95704L15.273 20.043C15.123 20.572 14.818 20.59 14.594 20.088L11 12L17 4.00004L9.00002 10L0.946021 7.31504Z'
      fill='currentColor'
    />
  </svg>
)

export default Send
