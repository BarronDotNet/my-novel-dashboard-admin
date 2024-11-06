import { MongoClient } from 'mongodb';
import { uploadFileToFirebase } from './utils/upload-file-to-firebase';
import ApiUrls from './utils/api-urls';
import {
  IBanner,
  ICreateBanner,
  IQueryBanner,
} from '@/interfaces/banner.interface';
import { IPaginationRes } from '@/interfaces/pagination-respones.interface';

const DB_NAME = 'product';
const COLLECTION_NAME = {
  PRODUCT_BANNER: 'product_banner',
};

const productUrl = ApiUrls.productURL;

export class BannerProviders {
  db = this.mongoClient.db(DB_NAME);
  constructor(protected readonly mongoClient: MongoClient) {}
}

export class BannerService extends BannerProviders {
  createBanner = async (payload: ICreateBanner) => {
    const { fkProductId, section, image, type, typeSet } = payload;
    let imageUrl = '';

    if (image && image.length > 0) {
      imageUrl = await uploadFileToFirebase({
        image: image[0],
        type: 'images',
      });
    }

    const initData = {
      imageUrl,
      fkProductId,
      section,
      typeSet,
      type,
    };

    return this.db
      .collection(COLLECTION_NAME.PRODUCT_BANNER)
      .insertOne(initData);
  };

  getBannerPagination = async (
    payload: IQueryBanner
  ): Promise<IPaginationRes<IBanner>> => {
    const { page, perPage, searchBy, filterBy } = payload;

    const searchFilter: Record<string, any> = {};

    if (searchBy?.FkProductId) {
      searchFilter.FkProductId = searchBy.FkProductId;
    }

    if (filterBy) {
      if (filterBy.Type) {
        searchFilter.Type = filterBy.Type;
      }
      if (filterBy.TypeSet) {
        searchFilter.TypeSet = filterBy.TypeSet;
      }
    }

    const skip = perPage ? (page - 1) * perPage : 0;
    const limit = perPage ?? 0;

    const collection = this.db.collection<IBanner>(
      COLLECTION_NAME.PRODUCT_BANNER
    );

    try {
      const count = await collection.countDocuments(searchFilter);

      const records = await collection
        .find(searchFilter)
        .skip(skip)
        .limit(limit)
        .toArray();

      return {
        page,
        perPage: perPage ?? count,
        count,
        records,
      };
    } catch (error) {
      console.error('Failed to fetch banners pagination:', error);
      throw new Error('Failed to fetch banners pagination');
    }
  };
}
