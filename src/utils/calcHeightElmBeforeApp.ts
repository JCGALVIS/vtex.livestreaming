const calcHeightElmBeforeApp = () => {
  const bodyElement = document.getElementsByTagName('body')

  if (!bodyElement.length) return null

  const childrenElement = bodyElement[0]?.children
  let acumHeight = 0

  for (let i = 0; i < childrenElement.length; i++) {
    const children = childrenElement[i].outerHTML

    acumHeight += childrenElement[i].clientHeight

    if (children.includes('live-shopping-app')) {
      const liveShoppingElement =
        document.getElementsByClassName('live-shopping-app')

      if (liveShoppingElement.length)
        acumHeight -= liveShoppingElement[0]?.children[0]?.clientHeight

      break
    }
  }

  return acumHeight
}

const calcHeightApp = () => {
  const totalHeight = document?.documentElement?.clientHeight
    let heightElmBeforeApp = calcHeightElmBeforeApp()
    let calcHeightPlayerUI = totalHeight

    if (heightElmBeforeApp) {
      calcHeightPlayerUI = totalHeight - heightElmBeforeApp

      if (calcHeightPlayerUI <= 300) calcHeightPlayerUI = 415
    }

    return calcHeightPlayerUI
}

export { calcHeightApp } 