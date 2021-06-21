import React, { ReactNode } from 'react'

type Props = {
  readonly id?: string
  readonly fill?: string
  readonly width?: number
  readonly height?: number
  readonly viewBox?: string
  readonly className?: string
  readonly xmlns?: string
  readonly xmlnsXlink?: string
  readonly children?: ReactNode
}

const Icon = ({ children, ...props }: Props) => (
  <svg {...props}>
    <use href={`#${props.id}`} xlinkHref={`#${props.id}`} />
  </svg>
)

Icon.defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink'
}

export default Icon
