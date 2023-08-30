import { useEffect, useState } from 'react';
import { ICategory } from '../../types/category-types';
import getCategories from '../services/getCategoriesFromApi/getCategories';

export default function useSubCategory(slug: string | undefined) {
  const [currentSubCategory, setCurrentSubCategory] = useState<ICategory[]>([]);
  useEffect(() => {
    getCategories()
      .then((res) => {
        const getCurrentSubCategory = res.filter((el) => el.slug['en-US'] === slug);
        setCurrentSubCategory(getCurrentSubCategory);
      })
      .catch(() => {});
  }, [slug]);

  return currentSubCategory;
}
