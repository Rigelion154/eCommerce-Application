import { MasterData } from '../../../types/product-types';

export default function getFormatScreenSize(currentProducts: MasterData[]) {
  const screenSizes: string[] = [];

  currentProducts.forEach((prod) => {
    prod.masterVariant.attributes
      .filter((atr) => atr.name === 'screen_size')
      .forEach((atr) => {
        if (!screenSizes.includes(atr.value.toString())) screenSizes.push(atr.value.toString());
      });
  });

  return screenSizes;
}
