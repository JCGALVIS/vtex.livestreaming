import React from 'react';

declare interface Props {
  size: string;
  viewBox: string;
}

const ShareIcon = ({ size, viewBox }: Props) => (
  <svg
    fill="white"
    id="fi_3121571"
    height={size}
    viewBox={viewBox}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="share-live-streaming4"
      transform="matrix(0.3125, 0, 0, 0.321229, 85.12941, 126.740936)"
      origin="0.504666 0.504666"
    >
      <path
        fill="currentColor"
        d="M 687.586 222.854 L 421.615 -41.585 L 421.615 116.184 L 365.068 116.184 C 189.724 116.184 47.586 245.06 47.586 404.043 L 47.586 487.65 L 72.703 462.695 C 158.099 377.859 278.928 329.523 405.608 329.523 L 421.615 329.523 L 421.615 487.292 Z M 687.586 222.854"
      />
    </g>
  </svg>
);

export default ShareIcon;
