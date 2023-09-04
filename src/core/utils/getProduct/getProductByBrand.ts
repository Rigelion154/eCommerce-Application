import getProducts from '../../services/getProducts';
import { IProduct } from '../../../types/product-types';

export default async function getProductByBrand(brandName: string | undefined) {
  const products: IProduct[] = await getProducts();
  return products.filter((product) => product.key.split('_')[0] === brandName);
}
