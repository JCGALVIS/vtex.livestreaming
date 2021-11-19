import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      idLivestreaming='333d64be-3caa-4a08-88a5-6f4675a13fc1'
      account='livestreamingdemo'
      inactiveSidebarProducts='_INACTIVESIDEBARPRODUCTS'
      inactiveProductsCarousel='_INACTIVEPRODUCTSCAROUSEL'
      inactivateChat="true"
      inactivateLike=''
      inactivateViewers='_INACTIVATEVIEWERS'
      isInfinite='_ISINFINITE'
      time='_TIME'
      pdp='_PDP'
      originOfProducts='CACE'
      kuikpay='_KUIKPAY'
    />
  )
}

export default App
