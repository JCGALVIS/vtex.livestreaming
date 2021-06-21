import React from 'react'

import { LivestreamingVideo } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'

const App = () => {
  return (
    <>
      <LivestreamingVideo streamUrl='https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8' />
    </>
  )
}

export default App
