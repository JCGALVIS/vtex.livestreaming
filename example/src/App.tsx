import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
    account='livestreamingdemo'
    idLivestreaming='1efaa655-4d23-4ff6-9bab-7e5e9b0c8395'
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
