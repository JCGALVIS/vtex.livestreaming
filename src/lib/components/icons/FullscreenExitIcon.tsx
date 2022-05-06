import React from 'react';

declare interface Props {
  size: string;
  viewBox: string;
}

const FullscreenExitIcon = ({ size, viewBox }: Props) => {
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
        id="fullscreen-exit-live-streaming"
        transform="matrix(12.5, 0, 0, 12.5, 43.400002, 43.400002)"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default FullscreenExitIcon;
