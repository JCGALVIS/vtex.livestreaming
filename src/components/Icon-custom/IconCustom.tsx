import React from 'react'
import Icon from './Icon'

const IconCustom = ({ id, size, viewBox }: IconProps) => {
  return <Icon id={id} width={size} height={size} viewBox={viewBox} />
}

export default IconCustom
