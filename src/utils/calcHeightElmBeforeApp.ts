const calcHeightApp = () => {
  const totalHeight = document?.documentElement?.clientHeight
  
  const liveShoppingElement =
    document.getElementsByClassName('live-shopping-app')

  const topLiveShoppingElement = liveShoppingElement[0].getBoundingClientRect().top;

  let heightApp = totalHeight - topLiveShoppingElement

  if (heightApp <= 300) heightApp = 415

  return heightApp
}

export { calcHeightApp }
