import React from 'react'

import {
  LivestreamingVideo,
  Chat,
  Like,
  Viewers,
  Live,
  useWebSocket,
} from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const LIVESTREAMING_ID = '495e55e2-c49a-437d-b7cf-17f914c60a81'
const ACCOUNT = 'livestreamingdemo'
const streamUrl = 'https://a8a9a64b061c.us-east-1.playback.live-video.net/api/video/v1/us-east-1.356389886440.channel.zM3SdTZdbjJJ.m3u8'
const wssStream = 'wss://vdtgqx8x77.execute-api.us-east-1.amazonaws.com/Prod'

const App = () => {

  const infoSocket = useWebSocket({ wssStream })

  return (
    <div className='appContent'>
      <div className='videoContainer'>
        <div className='videoContent'>
          <LivestreamingVideo infoSocket={infoSocket} streamUrl={streamUrl} />
        </div>
        <div className='likeContent'>
          <Like infoSocket={infoSocket} />
        </div>
        <div className='viewersContent'>
          <Viewers infoSocket={infoSocket} />
        </div>
        <div className='liveContent'>
          <Live infoSocket={infoSocket} />
        </div>
        <div className='chatContent'>
          <Chat
            title='Chat'
            placeholder='Ingrese un mensaje'
            infoSocket={infoSocket}
            idLivestreaming={LIVESTREAMING_ID}
            account={ACCOUNT}
          />
        </div>
      </div>
    </div>
  )
}

export default App
