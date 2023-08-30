import { IProduct } from '../../types/product-types';
import getProducts from '../services/getProducts';

export default async function getProductByKey(key: string | undefined) {
  const products: IProduct[] = await getProducts();
  return products.filter((product) => product.key === key);
}
