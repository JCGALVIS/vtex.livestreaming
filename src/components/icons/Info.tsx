import React from 'react'

declare interface Props {
  size: string
  viewBox: string
}

const Info = ({ size, viewBox }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={size}
    viewBox={viewBox}
    width={size}
    fill='none'
  >
    <path d='M0 0h24v24H0V0z' />
    <path
      d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
      fill='currentColor'
    />
  </svg>
)

export default Info
