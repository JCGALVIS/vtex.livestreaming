import React from 'react';

declare interface Props {
  size: string;
  viewBox: string;
}

const PictureAndPictureIcon = ({ size, viewBox }: Props) => {
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
        id="picture-and-picture-live-streaming"
        transform="matrix(12.5, 0, 0, 12.5, 43.400002, 43.400002)"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default PictureAndPictureIcon;
