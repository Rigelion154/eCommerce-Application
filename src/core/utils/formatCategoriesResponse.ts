import { ICategory, IFormatCategory } from '../../types/category-types';

export default function formatCategoriesResponse(data: ICategory[]) {
  const categories: IFormatCategory[] = data
    .filter((item) => item.ancestors && item.ancestors.length === 0)
    .map((item) => {
      return {
        id: item.id,
        slug: item.slug['en-US'],
        subcategories: [],
      };
    });
  data
    .filter((item) => item.ancestors && item.ancestors.length > 0)
    .forEach((item) => {
      if (item.ancestors) {
        const parentId = item.ancestors[0].id;
        const subcategory = {
          id: item.id,
          slug: item.slug['en-US'],
        };
        const parentCategory = categories.find((category) => category.id === parentId);
        if (parentCategory && parentCategory.subcategories)
          parentCategory.subcategories.push(subcategory);
      }
    });
  return categories;
}
