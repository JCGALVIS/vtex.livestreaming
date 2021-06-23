import React from 'react'

declare interface Props {
  size: string
  viewBox: string
}

const MutedIcon = ({ size, viewBox }: Props) => {
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
        id='muted-grounded-live-streaming'
        transform='matrix(3.384615, 0, 0, 3.384615, 29, 29)'
      >
        <circle
          cx='50'
          cy='50'
          r='45.5'
          fill='none'
          stroke='currentColor'
          strokeMiterlimit='10'
          strokeWidth='2px'
        />
        <path
          fill='none'
          stroke='currentColor'
          d='M 60.516 50.274 C 60.516 45.918 58.002 42.174 54.358 40.354 L 54.358 45.795 L 60.391 51.828 C 60.465 51.333 60.516 50.819 60.516 50.274 Z M 66.669 50.274 C 66.669 52.59 66.177 54.756 65.34 56.775 L 69.06 60.494 C 70.682 57.441 71.595 53.971 71.595 50.274 C 71.595 39.738 64.23 30.924 54.358 28.683 L 54.358 33.756 C 61.476 35.872 66.669 42.47 66.669 50.274 Z M 30.403 28.116 L 27.277 31.242 L 38.922 42.891 L 27.277 42.891 L 27.277 57.663 L 37.124 57.663 L 49.435 69.972 L 49.435 53.403 L 59.897 63.867 C 58.248 65.148 56.403 66.156 54.358 66.771 L 54.358 71.843 C 57.756 71.08 60.834 69.505 63.444 67.389 L 68.469 72.435 L 71.595 69.308 L 49.435 47.148 L 30.403 28.116 Z M 49.435 30.58 L 44.289 35.724 L 49.435 40.871 L 49.435 30.58 Z'
          transform='matrix(0.999958, 0.009193, -0.009193, 0.999958, 0.464272, -0.452341)'
        />
      </g>
    </svg>
  )
}

export default MutedIcon
