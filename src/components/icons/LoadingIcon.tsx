import React from 'react'

declare interface Props {
  size: string
  viewBox: string
}

const LoadingIcon = ({ size, viewBox }: Props) => {
  return (
    <svg
      fill='white'
      id='fi_3121571'
      height={size}
      viewBox={viewBox}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        id='loading-grounded-live-streaming'
        transform='matrix(3.09299, 0, 0, 3.09299, 44.762802, 44.971462)'
      >
        <path
          d='M6,43.59a44.51,44.51,0,0,1,87.71-2.2'
          fill='none'
          stroke='currentColor'
          strokeMiterlimit='10'
          strokeWidth='2px'
        />
        <polygon
          points='84.06 36.84 85.17 35.17 93.36 40.67 98.25 32.1 99.98 33.09 94.03 43.53 84.06 36.84'
          fill='currentColor'
        />
        <path
          d='M93.92,57.22A44.51,44.51,0,0,1,6.54,59.57'
          fill='none'
          stroke='currentColor'
          strokeMiterlimit='10'
          strokeWidth='2px'
        />
        <polygon
          points='16.24 63.91 15.16 65.6 6.86 60.28 2.16 68.95 0.4 68 6.13 57.44 16.24 63.91'
          fill='currentColor'
        />
      </g>
    </svg>
  )
}

export default LoadingIcon
