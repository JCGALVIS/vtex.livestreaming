import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='livestreamingdemo'
      idLivestreaming='a9fbdd90-739b-414d-807e-d9a982e5d816'
      isInGlobalPage={false}
      isInfinite={false}
      kuikpay={false}
      originOfProducts='CACE'
      redirectTo={true}
      showChat={true}
      showLike={true}
      showProductsCarousel={false}
      showSidebarProducts={true}
      showViewers={true}
      time={10}
    />
  )
}

export default App
