import { useEffect, useState } from 'react';
import { ICategory } from '../../types/category-types';
import getCategories from '../services/getCategoriesFromApi/getCategories';

export default function useSubCategory(slug: string | undefined) {
  const [currentSubCategory, setCurrentSubCategory] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCategories()
      .then((res) => {
        const getCurrentSubCategory = res.filter((el) => el.slug['en-US'] === slug);
        setCurrentSubCategory(getCurrentSubCategory);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  return { currentSubCategory, status: isLoading };
}
