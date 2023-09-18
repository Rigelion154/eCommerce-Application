import React from 'react';
import styles from './AboutUs.module.css';
import logo from '../../assets/images/rs_school.svg';

function AboutUs() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>About us</h1>
      <p className={styles.text}>
        We met each other thanks to the random distribution made by RSSchool algorithm. Ilya was the
        one who reached out to me and Anton, created Discord-server for us and set up our first
        voice conference. After that we had voice discussions at the start of each development
        sprint and additional ones, if necessary, with all or two team members, depending on which
        task was discussed. We also used Trello for the purpose of tracking our progress.
      </p>
      <p className={styles.text}>
        Our mutual work and thus, this project as whole, were only possible thanks to RSSchool
        contribution. You can find more information about them by clicking on logo below.
      </p>
      <a href='https://rs.school/'>
        <img src={logo} alt='RSSchool logo' className={styles.logo} />
      </a>
      <div>
        <div className={styles.dev}>
          <div className={styles.ilya} />
          <div className={styles.dev__individual}>
            <h2 className={styles.header}>Ilya</h2>
            <h3 className={styles.header}>Team leader</h3>
            <h4 className={styles.header}>Contribution</h4>
            <ul className={styles.list}>
              <li>As a team leader, Ilya was instrumental in coordinating team effort</li>
              <li>
                Helped other two developers when they encountered difficulties during their work
              </li>
              <li>Envisioned and implemented design for the whole project</li>
              <li>Implemented header</li>
              <li>Implemented routing for the whole project</li>
              <li>Implemented catalog page</li>
              <li>Implemented cart</li>
            </ul>
            <h4 className={styles.header}>Bio</h4>
            <p>
              Ilya is a very experienced full-stack senior web-developer with over 20 years of
              working experience. He is also a big yacht enthusiast and loves to spend his free time
              on voyage across the Mediterranean Sea with his beautiful wife and daughter.
            </p>
            <h4 className={styles.header}>Github</h4>
            <a href='https://github.com/Rigelion154'>https://github.com/Rigelion154</a>
          </div>
        </div>
        <div className={styles.dev}>
          <div className={styles.vlad} />
          <div className={styles.dev__individual}>
            <h2 className={styles.header}>Vlad</h2>
            <h3 className={styles.header}>Developer</h3>
            <h4 className={styles.header}>Contribution</h4>
            <ul className={styles.list}>
              <li>Managed Trello board for team coordination</li>
              <li>Implemented login page</li>
              <li>Implemented profile page</li>
              <li>Implemented this very page you are reading right now!</li>
              <li>Implemented promo codes?</li>
            </ul>
            <h4 className={styles.header}>Bio</h4>
            <p>
              He lives in the American Gardens building on West 81st street, on 11 floor. He
              believes in taking care of himself, in a balanced diet and a rigorous exercise
              routine. In the morning, he does stomach crunches. He can do a thousand now.
            </p>
            <h4 className={styles.header}>Github</h4>
            <a href='https://github.com/v154254'>https://github.com/v154254</a>
          </div>
        </div>
        <div className={styles.dev}>
          <div className={styles.anton} />
          <div className={styles.dev__individual}>
            <h2 className={styles.header}>Anton</h2>
            <h3 className={styles.header}>Developer</h3>
            <h4 className={styles.header}>Contribution</h4>
            <ul className={styles.list}>
              <li>Implemented registration page</li>
              <li>Implemented product page</li>
              <li>Implemented slider for modal window</li>
              <li>Implemented pagination for catalog page</li>
            </ul>
            <h4 className={styles.header}>Bio</h4>
            <p>
              Anton main hobby is collecting sport cars. His favorite one is Lamborghini Gallardo
              Bicolore. He often drives it around and enjoys the scenery of his homeland.
            </p>
            <h4 className={styles.header}>Github</h4>
            <a href='https://github.com/AntonLeshkovich'>https://github.com/AntonLeshkovich</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
