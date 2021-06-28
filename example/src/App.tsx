import React from 'react'

import {
  LivestreamingVideo,
  Chat,
  Like,
  Viewers,
  Live,
  useWebSocket
} from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'

import './app.css'

const App = () => {
  const info = useWebSocket()

  return (
    <div className='appContent'>
      <div className='videoContainer'>
        <div className='videoContent'>
          <LivestreamingVideo
          infoLivestreaming={info}
          streamUrl='https://a8a9a64b061c.us-east-1.playback.live-video.net/api/video/v1/us-east-1.356389886440.channel.ORTVqqYGiqDa.m3u8'
          />
        </div>
        <div className='likeContent'>
          <Like infoLivestreaming={info} />
        </div>
        <div className='viewersContent'>
          <Viewers infoLivestreaming={info} />
        </div>
        <div className='liveContent'>
          <Live infoLivestreaming={info} />
        </div>
      </div>

      <div className='chatContent'>
        <Chat
          title='Chat'
          placeholder='Ingrese un mensaje'
          infoLivestreaming={info}
        />
      </div>
    </div>
  )
}

export default App
