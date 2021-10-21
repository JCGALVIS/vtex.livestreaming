const calcHeightApp = () => {
  const totalHeight = document?.documentElement?.clientHeight
  
  const liveShoppingElement =
    document.getElementById('live-shopping')

  const topLiveShoppingElement = liveShoppingElement?.getBoundingClientRect()?.top || 0;

  let heightApp = totalHeight - topLiveShoppingElement

  if (heightApp <= 300) heightApp = 415

  return heightApp
}

export { calcHeightApp }
