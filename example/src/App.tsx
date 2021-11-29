import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='livestreamingdemo'
      idLivestreaming='203ae269-c1af-4959-ab9d-4682e1311a63'
      isInGlobalPage={false}
      isInfinite={false}
      kuikpay={false}
      originOfProducts='CACE'
      redirectTo={true}
      showChat={true}
      showLike={true}
      showProductsCarouse={false}
      showSidebarProducts={true}
      showViewers={true}
      time={10}
    />
  )
}

export default App
