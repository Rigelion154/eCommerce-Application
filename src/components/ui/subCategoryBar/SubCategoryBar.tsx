import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { IFormatCategory } from '../../../types/category-types';
import Container from '../../layout/container/Container';
import styles from './SubCategoryBar.module.css';

function SubCategoryBar({ currentCategory }: { currentCategory: IFormatCategory[] }) {
  const { current } = useParams();
  return (
    <div className={styles.wrapper}>
      <Container>
        {currentCategory.map((category) => (
          <div key={category.id} className={styles.category__links}>
            {category.subcategories &&
              category.subcategories?.length > 0 &&
              category.subcategories?.map((el) => (
                <NavLink
                  to={`/categories/${current}/${el.slug}`}
                  key={el.id}
                  className={({ isActive }) =>
                    isActive ? `${styles.category__link} ${styles.active}` : styles.category__link
                  }
                >
                  {el.slug}
                </NavLink>
              ))}
          </div>
        ))}
      </Container>
    </div>
  );
}

export default SubCategoryBar;
