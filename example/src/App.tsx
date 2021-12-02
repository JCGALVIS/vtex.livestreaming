import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='__ACCOUNT'
      idLivestreaming='__IDLIVESTREAMING'
      isInGlobalPage='_ISINGLOBALPAGE'
      isInfinite='_ISINFINITE'
      kuikpay='_KUIKPAY'
      originOfProducts='_ORIGINOFPRODUCTS'
      redirectTo='_PDP'
      showChat='_INACTIVATECHAT'
      showLike='_INACTIVATELIKE'
      showProductsCarousel='_INACTIVEPRODUCTSCAROUSEL'
      showSidebarProducts='_INACTIVESIDEBARPRODUCTS'
      showViewers='_INACTIVATEVIEWERS'
      time='_TIME'
    />
  )
}

export default App
