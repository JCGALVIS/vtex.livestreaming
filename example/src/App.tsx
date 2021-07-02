import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {

  return (
    <Livestreaming
      streamUrl='https://a8a9a64b061c.us-east-1.playback.live-video.net/api/video/v1/us-east-1.356389886440.channel.bpaeuc747at1.m3u8'
      wssStream='wss://bthvqvbpr5.execute-api.us-east-1.amazonaws.com/Prod'
    />
  )
}

export default App
