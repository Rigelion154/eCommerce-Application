import { MasterData } from '../../../types/product-types';

export default function getFormatColor(currentProducts: MasterData[]) {
  const colors: string[] = [];

  currentProducts.forEach((prod) => {
    prod.masterVariant.attributes
      .filter((atr) => atr.name === 'product_color')
      .forEach((atr) => {
        if (!colors.includes(atr.value.toString())) colors.push(atr.value.toString());
      });
  });

  return colors;
}
