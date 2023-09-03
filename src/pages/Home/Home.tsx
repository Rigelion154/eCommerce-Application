import React from 'react';
import Container from '../../components/layout/container/Container';
import styles from './Home.module.css';

function Home() {
  return (
    <section>
      <Container>
        <div>
          <div className={styles.bg__image} />
          <div className={styles.description}>
            <h1 style={{ fontSize: '4rem' }}>
              Shop the Best Deals on <br /> <span className={styles.accent_primary}>Phones</span>{' '}
              and <span className={styles.accent_primary}>Laptops</span>
            </h1>
            <h2 style={{ fontSize: '3rem' }}>
              Get <span className={styles.accent_primary}>10% Off</span> <br />
              on <span className={styles.accent_primary}>All Items</span> Over $500
            </h2>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Home;
