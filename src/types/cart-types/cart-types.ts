import { Asset, Price } from '../product-types';

export type CartType = {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  lineItems: LineItemType[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  // shipping: any[];
  // customLineItems: any[];
  // discountCodes: any[];
  // directDiscounts: any[];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  // refusedGifts: any[];
  origin: string;
  // itemShippingAddresses: any[];
};

export type LineItemType = {
  id: string;
  productId: string;
  productKey: string;
  name: {
    'en-US': string;
  };
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  productSlug: {
    'en-US': string;
  };
  variant: {
    id: number;
    sku: string;
    key: string;
    prices: Price[];
    images: {
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }[];
    attributes: {
      name: string;
      value: string;
    }[];
    assets: Asset[];
  };
  price: {
    id: string;
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discounted?: {
      discount: {
        typeId: string;
        id: string;
      };
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
    };
    key: string;
  };
  quantity: number;
  // discountedPricePerQuantity: any[];
  // perMethodTaxRate: any[];
  addedAt: string;
  lastModifiedAt: string;
  state: {
    quantity: number;
    state: {
      typeId: string;
      id: string;
    };
  }[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  // taxedPricePortions: any[];
};
