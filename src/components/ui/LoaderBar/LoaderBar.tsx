import React from 'react';
import styles from './LoaderBar.module.css';

function LoaderBar() {
  return (
    <div className={styles.wrapper}>
      <h2>Loading...</h2>
      <div className={styles.loader} />
    </div>
  );
}

export default LoaderBar;
