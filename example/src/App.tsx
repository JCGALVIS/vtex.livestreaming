import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='livestreamingdemo'
      idLivestreaming='f3ff8ed4-e579-49cc-8c4d-37d18914cd0c'
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
