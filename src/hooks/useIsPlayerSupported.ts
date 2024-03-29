import { useEffect, useState } from 'react'

const IVS_PLAYER_MIN_JS =
  'https://player.live-video.net/1.5.1/amazon-ivs-player.min.js'

const useIsPlayerSupported = () => {
  const [scriptVideoPlayer, setScriptVideoPlayer] = useState(false)
  const [isPlayerSupported, setIsPlayerSupported] = useState(false)

  useEffect(() => {
    if (!scriptVideoPlayer) {
      const script = document.createElement('script')

      script.src = IVS_PLAYER_MIN_JS
      script.id = 'IVS'
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        if (window?.IVSPlayer?.isPlayerSupported) {
          setIsPlayerSupported(true)
        }
      }
    }

    if (document.getElementById('IVS')) setScriptVideoPlayer(true)
  }, [])

  return { isPlayerSupported }
}

export default useIsPlayerSupported
