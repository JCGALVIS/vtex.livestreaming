import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='livestreamingdemo'
      idLivestreaming='944e36c9-27aa-4061-af97-7bc399ede41c'
      isInGlobalPage='_ISINGLOBALPAGE'
      isInfinite='_ISINFINITE'
      kuikpay='_KUIKPAY'
      originOfProducts='CACE'
      redirectTo={true}
      showChat={true}
      showLike={true}
      showProductsCarousel='_INACTIVEPRODUCTSCAROUSEL'
      showSidebarProducts={true}
      showViewers={true}
      time='_TIME'
    />
  )
}

export default App
