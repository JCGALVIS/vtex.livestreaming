import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      idLivestreaming='76e41dd1-8b15-4fa4-8794-636c4f34c247'
      account='livestreamingdemo'
    />
  )
}

export default App
