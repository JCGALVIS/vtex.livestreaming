import { useState, useEffect } from 'react'

declare interface Option {
  rootMargin: string
}

export const useLivestreamingComponentOnScreen = (option: Option) => {
  const livestreaminComponent = document.getElementById('live-shopping-app')
  const [inView, setInView] = useState(false)

  const callback = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setInView(true)

      return
    }

    setInView(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, option)

    if (livestreaminComponent) observer.observe(livestreaminComponent)
  }, [livestreaminComponent, option])

  return { livestreaminComponentInView: inView }
}
