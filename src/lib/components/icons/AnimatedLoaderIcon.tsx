import React from 'react';

declare interface Props {
  className: string;
}

const AnimatedLoaderIcon = ({ className }: Props) => {
  return <div className={className}></div>;
};

export default AnimatedLoaderIcon;
