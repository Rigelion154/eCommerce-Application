import { Asset, Price } from '../product-types';

export type CartType = {
  type: string;
  anonymousId: string;
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
  discountCodes?: DiscountType[];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  totalLineItemQuantity: number;
  origin: string;
};

export type DiscountType = {
  discountCode: {
    id: string;
    typeId: string;
  };
  state: string;
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
};
