export interface ICreateBanner {
  fkProductId?: string;
  type: string;
  image?: File[];
  typeSet: string;
  section: string;
  titlename?: string;
}

export interface IBanner {
  FkProductId?: string;
  Type: string;
  ImageUrl?: string;
  TypeSet: string;
  Section: string;
  isActive: boolean;
  titlename?: string;
}

export interface IQueryBanner {
  page: number;
  perPage?: number;
  filterBy?: {
    Type?: string;
    TypeSet?: string;
    isActive?: boolean;
  };
  searchBy?: {
    FkProductId?: string;
  };
}
