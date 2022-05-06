import React from 'react';

import styles from './spinner.module.css';

export const Spinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div
          className={`${styles.loadingItem} ${styles.loadingAnimationOne}`}
        />
        <div
          className={`${styles.loadingItem} ${styles.loadingAnimationTwo}`}
        />
        <div
          className={`${styles.loadingItem} ${styles.loadingAnimationThree}`}
        />
        <div className={styles.loadingItem} />
      </div>
    </div>
  );
};
