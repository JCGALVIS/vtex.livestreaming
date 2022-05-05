import React from 'react';

interface Props {
  id: string | undefined;
}

const Use = ({ id }: Props) => <use href={`#${id}`} xlinkHref={`#${id}`} />;

export default Use;
