import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      idLivestreaming='83baba75-834a-426e-b2fa-15a11d0c6e5c'
      account='livestreamingdemo'
      inactiveSidebarProducts='_INACTIVESIDEBARPRODUCTS'
      inactiveProductsCarousel='_INACTIVEPRODUCTSCAROUSEL'
      inactivateChat='true'
      inactivateLike='true'
      inactivateViewers='true'
      isInfinite='_ISINFINITE'
      time='_TIME'
    />
  )
}

export default App
