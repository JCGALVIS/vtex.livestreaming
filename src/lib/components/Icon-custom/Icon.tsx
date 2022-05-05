import React from 'react';

import Svg from './Svg';
import Use from './Use';

const Icon = ({
  id,
  handle,
  isActive,
  size,
  viewBox,
  activeClassName,
  mutedClassName,
}: IconProps) => {
  return (
    <Svg
      fill="none"
      width={size}
      height={size}
      viewBox={viewBox}
      className={`${isActive ? activeClassName || '' : mutedClassName || ''} ${
        handle || ''
      }`}
    >
      <Use id={id} />
    </Svg>
  );
};

Icon.defaultProps = {
  isActive: true,
  size: 16,
  viewBox: '0 0 16 16',
};

export default Icon;
