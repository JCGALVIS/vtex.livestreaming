import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'

import './app.css'

const App = () => {

  return (
    <Livestreaming
      streamUrl='https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8'
      wssStream='wss://vdtgqx8x77.execute-api.us-east-1.amazonaws.com/Prod'
    />
  )
}

export default App
