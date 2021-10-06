import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  document.addEventListener('addToCartPortal', () => {
    alert('Add to cart...')
  })

  return (
    <Livestreaming
      idLivestreaming='__IDLIVESTREAMING'
      account='__ACCOUNT'
      inactiveSidebarProducts='_INACTIVESIDEBARPRODUCTS'
      inactiveProductsCarousel='_INACTIVEPRODUCTSCAROUSEL'
      inactivateChat='_INACTIVATECHAT'
      inactivateLike='_INACTIVATELIKE'
      inactivateViewers='_INACTIVATEVIEWERS'
      isInfinite='_ISINFINITE'
      time='_TIME'
      pdp='_PDP'
      originOfProducts='_ORIGINOFPRODUCTS'
      kuikpay='_KUIKPAY'
    />
  )
}

export default App
