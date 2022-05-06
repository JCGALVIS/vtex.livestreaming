import React from 'react';

declare interface Props {
  size: string;
  viewBox: string;
}

const PictureAndPictureAltIcon = ({ size, viewBox }: Props) => {
  return (
    <svg
      fill="white"
      id="fi_3121571"
      height={size}
      viewBox={viewBox}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="picture-and-picture-alt-live-streaming"
        transform="matrix(12.5, 0, 0, 12.5, 43.400002, 43.400002)"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default PictureAndPictureAltIcon;
