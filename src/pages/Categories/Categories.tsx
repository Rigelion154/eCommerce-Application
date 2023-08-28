import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useCategory from '../../core/hooks/useCategory';
import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import Container from '../../components/layout/container/Container';
import styles from './Category.module.css';

function Categories() {
  const { current } = useParams();
  const currentCategory = useCategory(current);

  return (
    <div>
      <SubCategoryBar currentCategory={currentCategory} />
      <Container>
        {currentCategory.map((category) => (
          <div key={category.id} className={styles.category__links}>
            {category.subcategories &&
              category.subcategories?.length > 0 &&
              category.subcategories?.map((el) => (
                <NavLink
                  to={`/categories/${current}/${el.slug}`}
                  key={el.id}
                  className={styles.category__link}
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

export default Categories;
