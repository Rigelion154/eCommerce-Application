import getProducts from '../../services/getProducts';
import { IProduct } from '../../../types/product-types';

export default async function getProductByPrice(minPrice: string, maxPrice: string) {
  const products: IProduct[] = await getProducts();
  return products.filter(
    (product) =>
      product.masterData.current.masterVariant.prices[0].value.centAmount / 100 >= +minPrice &&
      product.masterData.current.masterVariant.prices[0].value.centAmount / 100 <= +maxPrice,
  );
}
