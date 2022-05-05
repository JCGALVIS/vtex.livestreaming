import React from 'react';

declare interface Props {
  size: string;
  viewBox: string;
}

const Close = ({ size, viewBox }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="close" transform="matrix(18.75, 0, 0, 18.75, -30, -26.5)">
      <path d="M6 6L18 18" stroke="currentColor" />
      <path d="M18 6L6 18" stroke="currentColor" />
    </g>
  </svg>
);

export default Close;
