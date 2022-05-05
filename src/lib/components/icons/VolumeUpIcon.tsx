import React from 'react';

declare interface Props {
  size: string;
  viewBox: string;
}

const VolumeUpIcon = ({ size, viewBox }: Props) => {
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
        id="volume-up-live-streaming"
        transform="matrix(12.5, 0, 0, 12.5, 43.400002, 43.400002)"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default VolumeUpIcon;
