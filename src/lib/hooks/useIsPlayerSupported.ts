import { useEffect, useMemo, useState } from 'react';
import { useScript } from './useScript';

const IVS_PLAYER_MIN_JS =
  'https://player.live-video.net/1.5.1/amazon-ivs-player.min.js';

const useIsPlayerSupported = () => {
  const status = useScript(IVS_PLAYER_MIN_JS);
  const [isPlayerSupported, setIsPlayerSupported] = useState(false);
  const playerScriptLoaded = useMemo(() => status === 'ready', [status]);

  useEffect(() => {
    if (status === 'ready' && window?.IVSPlayer?.isPlayerSupported) {
      setIsPlayerSupported(true);
    }
  }, [status]);

  return { isPlayerSupported, playerScriptLoaded };
};

export default useIsPlayerSupported;
