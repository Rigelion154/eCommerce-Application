interface ImageDimensions {
  h: number;
  w: number;
}

interface Image {
  dimensions: ImageDimensions;
  url: string;
}

interface PriceValue {
  type: string;
  fractionDigits: number;
  centAmount: number;
  currencyCode: string;
}

interface Price {
  value: PriceValue;
  id: string;
}

interface MasterVariant {
  attributes: Attributes[];
  id: number;
  images: Image[];
  prices: Price[];
  sku: string;
}

interface Attributes {
  name: string;
  value: {
    key: string;
    label: string;
  };
}

export interface IProductResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: IProduct[];
}

export interface IProduct {
  id: string;
  key: string;
  masterData: {
    current: {
      categories: {
        id: string;
        typeId: string;
      }[];
      description: {
        'en-US': string;
      };
      masterVariant: MasterVariant;
      name: {
        'en-US': string;
      };
      slug: {
        en: string;
      };
      variants: Attributes[];
    };
    staged: {
      categories: {
        id: string;
        typeId: string;
      }[];
      description: {
        en: string;
      };
      masterVariant: MasterVariant;
      name: {
        'en-US': string;
      };
      slug: {
        en: string;
      };
      variants: Attributes[];
    };
  };
  productType: {
    id: string;
    typeId: string;
  };
  taxCategory: {
    id: string;
    typeId: string;
  };
  version: number;
  createdAt: string;
  lastModifiedAt: string;
}
