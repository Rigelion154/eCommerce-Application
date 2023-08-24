export interface ICategoriesResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ICategory[];
}

export interface ICategory {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  name: {
    'en-US': string;
  };
  slug: {
    'en-US': string;
  };
  ancestors?: Ancestors[];
  orderHint: string;
  assets?: [];
}

interface Ancestors {
  typeId: string;
  id: string;
}

export interface IFormatCategory {
  id: string;
  slug: string;
  subcategories?: ISubCategory[];
}

export interface ISubCategory {
  id: string;
  slug: string;
}
