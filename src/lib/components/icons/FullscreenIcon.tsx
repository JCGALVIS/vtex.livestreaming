import React from 'react';

declare interface Props {
  size: string;
  viewBox: string;
}

const FullscreenIcon = ({ size, viewBox }: Props) => {
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
        id="fullscreen-live-streaming"
        transform="matrix(12.5, 0, 0, 12.5, 43.400002, 43.400002)"
      >
        <path
          d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default FullscreenIcon;
