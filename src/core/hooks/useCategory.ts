import { useEffect, useState } from 'react';
import { IFormatCategory } from '../../types/category-types';
import getCategories from '../services/getCategoriesFromApi/getCategories';
import formatCategoriesResponse from '../services/getCategoriesFromApi/formatCategoriesResponse';

export default function useCategory(slug: string | undefined) {
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

  return currentCategory;
}
