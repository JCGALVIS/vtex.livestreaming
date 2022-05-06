import React, { useEffect, useState, useContext } from 'react';

import { SettingContext } from '../../context';
import ViewersIcon from '../icons/ViewersIcon';
import styles from './viewers.module.css';

export const Viewers = () => {
  const [viewers, setViewers] = useState(0);
  const { infoSocket } = useContext(SettingContext);

  const { ivsRealTime, showCounter, isTransmiting } = infoSocket || {};

  useEffect(() => {
    if (ivsRealTime && ivsRealTime.status === 'LIVE') {
      setViewers(ivsRealTime.viewerCount);
    } else {
      setViewers(0);
    }
  }, [ivsRealTime]);

  if (!infoSocket) {
    return null;
  }

  return showCounter && isTransmiting ? (
    <div className={styles.viewersContainer}>
      <div className={styles.viewerIcon}>
        <ViewersIcon size="20" viewBox="0 0 400 400" />
      </div>
      <div className={styles.viewers}>{viewers}</div>
    </div>
  ) : null;
};
