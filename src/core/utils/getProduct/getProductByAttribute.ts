import getProducts from '../../services/getProducts';
import { IProduct } from '../../../types/product-types';

export default async function getProductByAttribute(attribute: string, value: string | number) {
  const products: IProduct[] = await getProducts();
  return products.filter((product) =>
    product.masterData.current.masterVariant.attributes.some(
      (attr) => attr.name === attribute && attr.value === value,
    ),
  );
}
