import React from 'react'

declare interface Props {
  size: string
  viewBox: string
}

const ViewersIcon = ({ size, viewBox }: Props) => {
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
        id='viewers-live-streaming'
        transform='matrix(12.5, 0, 0, 12.5, 43.400002, 43.400002)'
      >
        <path d='M0 0h24v24H0z' fill='none' />
        <path
          d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
          fill='currentColor'
        />
      </g>
    </svg>
  )
}

export default ViewersIcon
