import getProducts from '../../services/getProducts';
import { IProduct } from '../../../types/product-types';

export default async function getProductByPrice(minPrice: string, maxPrice: string) {
  const products: IProduct[] = await getProducts();
  console.log(products);
  products.forEach((el) =>
    console.log(el.masterData.current.masterVariant.prices[0].value.centAmount / 100),
  );
  return products.filter(
    (product) =>
      product.masterData.current.masterVariant.prices[0].value.centAmount / 100 >= +minPrice &&
      product.masterData.current.masterVariant.prices[0].value.centAmount / 100 <= +maxPrice,
  );
}
