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
        id='play-grounded-live-streaming'
        transform='matrix(3.460674, 0, 0, 3.460674, 25.166292, 25.166292)'
      >
        <circle
          cx='50'
          cy='50'
          r='44.5'
          style={{
            fill: '#000000',
            fillOpacity: 0.5,
            stroke: 'none',
            strokeWidth: 0.398621
          }}
        />
        <polygon
          points='36.77 71.25 36.77 29.15 73.65 50.2 36.77 71.25'
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
