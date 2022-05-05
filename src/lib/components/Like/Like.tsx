/* eslint-disable no-unused-vars */
import React, { useMemo, useContext, useEffect } from 'react';
import { HeartIcon } from '../icons';
import HeartComponent from './heart/Heart';
import type { Heart } from '../../../typings/livestreaming';
import { getRandomColor, Queue, getRandomNumber } from '../../utils';
import { ActionsContext, SettingContext } from '../../context';
import styles from './like.module.css';

interface LikeProps {
  isFinalized: boolean;
}

const LIKES_LIMIT = 5;

export const Like = ({ isFinalized }: LikeProps) => {
  const { infoSocket } = useContext(SettingContext);

  const {
    socket,
    hearts: socketHearts,
    setHearts,
    sessionId,
    queueSocket,
    setQueueSocket,
  } = infoSocket || {};

  const {
    setting: { showLike },
  } = useContext(ActionsContext);

  const removeHeart = () => {
    if (setHearts) setHearts((prev: Heart[]) => prev.slice(1, prev.length));
  };

  const handleClick = () => {
    const id = Date.now();

    if (queueSocket && queueSocket.size() < LIKES_LIMIT) {
      if (setHearts)
        setHearts(prev => [...prev, { id, color: getRandomColor() }]);
      queueSocket.add(id);
    }

    if (socket && socket?.readyState === 1) {
      const sendLike = {
        action: 'sendlike',
        sessionId: sessionId,
      };

      socket.send(JSON.stringify(sendLike));
    }
  };

  const heartRenderer = (array: Heart[]) =>
    array.map(({ id, color }: Heart) => (
      <HeartComponent key={id} color={color} removeHeart={removeHeart} />
    ));

  const HeartCollection = useMemo(
    () => heartRenderer(socketHearts || []),
    [socketHearts],
  );

  useEffect(() => {
    if (!isFinalized) return;
    if (!queueSocket && setQueueSocket) setQueueSocket(new Queue<number>());

    const interval = setInterval(() => {
      let i = 1;
      const numberOfLikes = getRandomNumber(2, LIKES_LIMIT);

      const myLoop = () => {
        setTimeout(() => {
          handleClick();
          i++;
          if (i <= numberOfLikes) myLoop();
        }, 400);
      };

      myLoop();
    }, 6000);

    return () => clearInterval(interval);
  }, [isFinalized, queueSocket]);

  return showLike ? (
    <div className={styles.likeWrapper}>
      <button className={styles.likeButton} onClick={handleClick}>
        <HeartIcon size="30" viewBox="0 0 400 400" aria-label="Like Button" />
      </button>
      {HeartCollection}
    </div>
  ) : null;
};
