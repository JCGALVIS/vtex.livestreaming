import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {

  return (
    <Livestreaming
      idLivestreaming='57a7d44b-64ff-4405-abd7-db39d4b2480b'
      account='livestreamingdemo'
    />
  )
}

export default App
