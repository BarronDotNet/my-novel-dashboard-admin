import { IProductEpisodes } from '@/interfaces/product-episodes.interface';

export enum ProductTypeSetEnum {
  NOVEL = 'Novel',
  CARTOON = 'Cartoon',
  EBOOK = 'Ebook',
}

export interface IProductNovels {
  migrationDocumentId: string;
  CreateBy: {
    id: string;
    name: string;
  };
  EpCount: number;
  EpLastUpdate: Date;
  EpTopic: IProductEpisodes[];
  FieldUrl: string | null;
  HasEP: boolean;
  ImageUrl: string;
  Language: string;
  ProductAuthor: string | null;
  ProductDetail: string | null;
  ProductFaverite: Record<string, any>;
  ProductGroup: string;
  ProductIntro: string | null;
  ProductName: string;
  ProductPage: number | null;
  ProductPrice: number;
  ProductPublisher: string;
  ProductRate: string;
  ProductTags: string[];
  ProductType: string;
  ProductTypeSet: string;
  ProductView: number;
  PublicByTime: string;
  Translator: string;
  content: string | null;
  discount: number;
  fanClubTranslate: string;
  isAccept: boolean;
  isCopyRight: boolean;
  isFanClubTranslate: boolean;
  isFinished: boolean;
  isPublish: boolean;
  onDevice: string;
  timestamp: Date;
  _id: string;
}
