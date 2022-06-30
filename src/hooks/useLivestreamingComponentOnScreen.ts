import { useState, useEffect } from 'react'

declare interface Option {
  rootMargin: string
}

const useLivestreamingComponentOnScreen = (option: Option) => {
  const livestreamingComponent = document.getElementById('live-shopping-app')
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

    if (livestreamingComponent) observer.observe(livestreamingComponent)
  }, [livestreamingComponent, option])

  return { livestreamingComponentInView: inView }
}

export default useLivestreamingComponentOnScreen
