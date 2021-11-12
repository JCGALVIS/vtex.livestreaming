import React from 'react'

declare interface Props {
  size: string
  viewBox: string
}

const PlayIcon = ({ size, viewBox }: Props) => {
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
        id='pause-grounded-live-streaming'
        transform='matrix(3.384615, 0, 0, 3.384615, 28.969231, 28.969231)'
      >
        <circle
          cx='50'
          cy='50'
          r='45.5'
          style={{
            fill: '#000000',
            fillOpacity: 0.5,
            stroke: 'none',
            strokeWidth: 0.398621
          }}
        />
        <rect
          x='52.87'
          y='28.68'
          width='14.76'
          height='43.04'
          fill='none'
          stroke='currentColor'
          strokeMiterlimit='10'
          strokeWidth='2px'
        />
        <rect
          x='29.91'
          y='28.68'
          width='14.76'
          height='43.04'
          fill='none'
          stroke='currentColor'
          strokeMiterlimit='10'
          strokeWidth='2px'
        />
      </g>
    </svg>
  )
}

export default PlayIcon
