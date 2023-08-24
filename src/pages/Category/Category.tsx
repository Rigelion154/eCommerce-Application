import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import getCategories from '../../core/services/getCategories';
import formatCategoriesResponse from '../../core/utils/formatCategoriesResponse';
import { IFormatCategory } from '../../types/category-types';
import styles from './Category.module.css';
import Container from '../../components/layout/container/Container';

function Category() {
  const { slug } = useParams();
  const [currentCategory, setCurrentCategory] = useState<IFormatCategory[]>([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        const categories = formatCategoriesResponse(res);
        const getCurrentCategory = categories.filter((elem) => elem.slug === slug);
        setCurrentCategory(getCurrentCategory);
      })
      .catch(() => {});
  }, [slug]);

  return (
    <div className={styles.wrapper}>
      <Container>
        {currentCategory.map((category) => (
          <div key={category.id} className={styles.category__links}>
            {category.subcategories && category.subcategories?.length > 0 ? (
              category.subcategories?.map((el) => (
                <NavLink to={el.slug} key={el.id} className={styles.category__link}>
                  {el.slug}
                </NavLink>
              ))
            ) : (
              <div>No subcategories available</div>
            )}
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Category;
