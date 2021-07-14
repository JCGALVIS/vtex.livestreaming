import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      idLivestreaming='731b0136-06d2-4887-b372-c6ecdab54547'
      account='livestreamingdemo'
    />
  )
}

export default App
