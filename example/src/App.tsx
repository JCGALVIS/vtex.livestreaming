import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
    account='livestreamingdemo'
    idLivestreaming='5f419e9d-0bef-44c1-8eff-2be7e88ed4ff'
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
