import { FunctionComponent } from 'react'

declare global {
  interface SFC<P = {}> extends FunctionComponent<P> {
    schema?: object
    getSchema?(props?: P): object
  }

  interface Window {
    IVSPlayer: any
    vtexjs: any
  }

  interface Document {
    mozFullScreenElement: HTMLElement
    webkitFullscreenElement: HTMLElement
    msFullscreenElement: HTMLElement
    webkitExitFullscreen(): void
    mozCancelFullScreen(): void
    msExitFullscreen(): void
    exitPictureInPicture(): void
  }

  interface Element {
    webkitRequestFullscreen(): void
    mozRequestFullScreen(): void
    msRequestFullscreen(): void
  }

  interface IconProps {
    readonly id?: string
    readonly handle?: string
    readonly isActive?: boolean
    readonly size?: number
    readonly viewBox?: string
    readonly activeClassName?: string
    readonly mutedClassName?: string
  }
}
