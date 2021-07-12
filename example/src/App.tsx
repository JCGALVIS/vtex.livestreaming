import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {

  return (
    <Livestreaming
      idLivestreaming='a48e402d-a67d-43f1-9a20-aea32d898355'
      account='livestreamingdemo'
    />
  )
}

export default App
