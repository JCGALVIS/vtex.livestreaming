import React from 'react';

declare interface Props {
  size: string;
  viewBox: string;
}

const VerticalDots = ({ size, viewBox }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="vertical-dots-livestreaming"
      transform="matrix(15.625, 0, 0, 15.625, 69.25, 71)"
    >
      <circle cx="8" cy="2" r="2" fill="currentColor" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <circle cx="8" cy="14" r="2" fill="currentColor" />
    </g>
  </svg>
);

export default VerticalDots;
