import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import styles from '../styles/Utils.module.scss';
import * as tokenActions from '../slices/TokenSlice';
import Spinner from '../components/Spinner';

export default function Home() {
  const dispatch = useDispatch();
  const { status, token } = useSelector(state => state.token);
  const date = new Date(token.time.updated);

  useEffect(() => {
    dispatch(tokenActions.init());

    const interval = setInterval(() => {
      dispatch(tokenActions.init());
    }, 300000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const refreshData = () => {
    dispatch(tokenActions.init());
  };

  if (status === 'loading') {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <p className={styles.title}>
            Something go wrong!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Bitcoin token price</title>
      </Head>
      <h1 className={styles.title}>BTC price</h1>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.btn_box}>
            <button
              type='button'
              className={styles.button}
              onClick={refreshData}
            >
              Update Price
            </button>
          </div>
          <div className={styles.comment}>
            <p className={styles.comment_text}>
              The price is automatically updated every 5 minutes, but if you
              want, you can update it using the top button. New price available
              every minute.
            </p>
          </div>
          <div className={styles.comment}>
            {'Updated: '}
            {date.toString()}
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>{token.bpi.USD.code}</h2>
              <p>{token.bpi.USD.description}</p>
              <div className={styles.description}>
                {'Price: '}
                {token.bpi.USD.rate}
              </div>
            </div>

            <div className={styles.card}>
              <h2>{token.bpi.EUR.code}</h2>
              <p>{token.bpi.EUR.description}</p>
              <div className={styles.description}>
                {'Price: '}
                {token.bpi.EUR.rate}
              </div>
            </div>

            <div className={styles.card}>
              <h2>{token.bpi.GBP.code}</h2>
              <p>{token.bpi.GBP.description}</p>
              <div className={styles.description}>
                {'Price: '}
                {token.bpi.GBP.rate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
