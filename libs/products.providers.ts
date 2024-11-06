import { MongoClient, ObjectId } from 'mongodb';
import { tryit } from 'radash';
import { IProductNovels } from '@/interfaces/product-novels.interface';

interface IQueryProduct {
  page: number;
  perPage: number;
  sort: any;
  searchBy: string;
  categories: string[];
  isFinished?: boolean;
}

interface IQueryEpisodes {
  page: number;
  perPage: number;
  sort?: any;
  searchBy?: string;
}

export async function getNovelCopyright(mongoClient: MongoClient) {
  const db = mongoClient.db('product');

  const [err, cursor] = tryit(
    db
      .collection('products_info')
      .aggregate.bind(db.collection('products_info'))
  )([
    {
      $match: {
        ProductTypeSet: 'Novel',
        isCopyright: true,
        isPublish: true,
        isAccept: true,
      },
    },
    {
      $sort: { EpLastUpdate: -1 },
    },
    {
      $limit: 18,
    },
    {
      $project: {
        _id: { $toString: '$_id' },
        CreateBy: {
          name: { $ifNull: ['$CreateBy.name', ''] },
          id: { $ifNull: ['$CreateBy.id', ''] },
        },
        EpCount: { $ifNull: ['$EpCount', 0] },
        FanClubTranslate: { $ifNull: ['$fanClubTranslate', ''] },
        ImageUrl: { $ifNull: ['$ImageUrl', ''] },
        ProductGroup: { $ifNull: ['$ProductGroup', ''] },
        ProductIntro: { $ifNull: ['$ProductIntro', ''] },
        ProductName: { $ifNull: ['$ProductName', ''] },
        ProductPrice: { $ifNull: ['$ProductPrice', 0] },
        ProductPublisher: { $ifNull: ['$ProductPublisher', ''] },
        ProductRate: { $ifNull: ['$ProductRate', 0] },
        ProductType: { $ifNull: ['$ProductType', ''] },
        ProductTypeSet: { $ifNull: ['$ProductTypeSet', ''] },
        ProductView: { $ifNull: ['$ProductView', 0] },
        id: {
          $cond: {
            if: { $ifNull: ['$migrationDocumentId', false] },
            then: '$migrationDocumentId',
            else: { $toString: '$_id' },
          },
        },
        isAccept: { $ifNull: ['$isAccept', false] },
        isCopyright: { $ifNull: ['$isCopyRight', false] },
        isFinished: { $ifNull: ['$isFinished', false] },
        isPublish: { $ifNull: ['$isPublish', false] },
      },
    },
  ]);

  if (err) {
    console.error('Failed to fetch novel copyright:', err);
    throw err;
  }

  const product = await cursor.toArray();
  return JSON.parse(JSON.stringify(product));
}

export async function getNovelSortedByLastUpdate(mongoClient: MongoClient) {
  const db = mongoClient.db('product');

  const [err, cursor] = tryit(
    db
      .collection('products_info')
      .aggregate.bind(db.collection('products_info'))
  )([
    {
      $match: {
        ProductTypeSet: 'Novel',
        isPublish: true,
        isCopyright: true,
        isAccept: true,
      },
    },
    {
      $sort: { EpLastUpdate: -1 },
    },
    {
      $limit: 18,
    },
    {
      $project: {
        _id: { $toString: '$_id' },
        CreateBy: {
          name: { $ifNull: ['$CreateBy.name', ''] },
          id: { $ifNull: ['$CreateBy.id', ''] },
        },
        EpCount: { $ifNull: ['$EpCount', 0] },
        EpLastUpdate: { $ifNull: ['$EpLastUpdate', null] },
        FanClubTranslate: { $ifNull: ['$fanClubTranslate', ''] },
        ImageUrl: { $ifNull: ['$ImageUrl', ''] },
        ProductGroup: { $ifNull: ['$ProductGroup', ''] },
        ProductIntro: { $ifNull: ['$ProductIntro', ''] },
        ProductName: { $ifNull: ['$ProductName', ''] },
        ProductPrice: { $ifNull: ['$ProductPrice', 0] },
        ProductPublisher: { $ifNull: ['$ProductPublisher', ''] },
        ProductRate: { $ifNull: ['$ProductRate', 0] },
        ProductType: { $ifNull: ['$ProductType', ''] },
        ProductTypeSet: { $ifNull: ['$ProductTypeSet', ''] },
        ProductView: { $ifNull: ['$ProductView', 0] },
        id: {
          $cond: {
            if: { $ifNull: ['$migrationDocumentId', false] },
            then: '$migrationDocumentId',
            else: { $toString: '$_id' },
          },
        },
        isAccept: { $ifNull: ['$isAccept', false] },
        isCopyright: { $ifNull: ['$isCopyRight', false] },
        isFinished: { $ifNull: ['$isFinished', false] },
        isPublish: { $ifNull: ['$isPublish', false] },
      },
    },
  ]);

  if (err) {
    console.error('Failed to fetch sorted novels by last update:', err);
    throw err;
  }

  const product = await cursor.toArray();
  return JSON.parse(JSON.stringify(product));
}

export async function getNovelPagination(
  mongoClient: MongoClient,
  query: IQueryProduct
) {
  const { page, perPage, sort, searchBy, categories, isFinished } = query;
  const db = mongoClient.db('product');

  const matchStage = {
    $match: {
      ProductTypeSet: 'Novel',
      ...(searchBy && {
        $or: [
          { ProductName: { $regex: searchBy, $options: 'i' } },
          { ProductIntro: { $regex: searchBy, $options: 'i' } },
          { ProductGroup: { $regex: searchBy, $options: 'i' } },
          { ProductPublisher: { $regex: searchBy, $options: 'i' } },
          { FanClubTranslate: { $regex: searchBy, $options: 'i' } },
        ],
      }),
      ...(categories.length > 0 && {
        $or: [
          { ProductType: { $in: categories } },
          { ProductGroup: { $in: categories } },
        ],
      }),
      ...(isFinished !== undefined && { isFinished }),
    },
  };

  const sortStage = {
    $sort:
      sort && Object.keys(sort).length > 0 ? { ...sort } : { EpLastUpdate: -1 },
  };

  const skipStage = { $skip: (page - 1) * perPage };
  const limitStage = { $limit: perPage };

  const totalRecords = await db
    .collection('products_info')
    .countDocuments(matchStage.$match);

  const [err, cursor] = tryit(
    db
      .collection('products_info')
      .aggregate.bind(db.collection('products_info'))
  )([
    matchStage,
    sortStage,
    skipStage,
    limitStage,
    {
      $project: {
        _id: { $toString: '$_id' },
        CreateBy: {
          name: { $ifNull: ['$CreateBy.name', ''] },
          id: { $ifNull: ['$CreateBy.id', ''] },
        },
        EpCount: { $ifNull: ['$EpCount', 0] },
        EpLastUpdate: { $ifNull: ['$EpLastUpdate', null] },
        FanClubTranslate: { $ifNull: ['$fanClubTranslate', ''] },
        ImageUrl: { $ifNull: ['$ImageUrl', ''] },
        ProductGroup: { $ifNull: ['$ProductGroup', ''] },
        ProductIntro: { $ifNull: ['$ProductIntro', ''] },
        ProductName: { $ifNull: ['$ProductName', ''] },
        ProductPrice: { $ifNull: ['$ProductPrice', 0] },
        ProductPublisher: { $ifNull: ['$ProductPublisher', ''] },
        ProductRate: { $ifNull: ['$ProductRate', 0] },
        ProductType: { $ifNull: ['$ProductType', ''] },
        ProductTypeSet: { $ifNull: ['$ProductTypeSet', ''] },
        ProductView: { $ifNull: ['$ProductView', 0] },
        id: {
          $cond: {
            if: { $ifNull: ['$migrationDocumentId', false] },
            then: '$migrationDocumentId',
            else: { $toString: '$_id' },
          },
        },
        isAccept: { $ifNull: ['$isAccept', false] },
        isCopyright: { $ifNull: ['$isCopyRight', false] },
        isFinished: { $ifNull: ['$isFinished', false] },
        isPublish: { $ifNull: ['$isPublish', false] },
      },
    },
  ]);

  if (err) {
    throw err;
  }

  const records = await cursor.toArray();
  return {
    page,
    perPage,
    records,
    count: totalRecords,
  };
}

export async function getProductById(mongoClient: MongoClient, id: string) {
  try {
    const db = mongoClient.db('product');

    const product = await db
      .collection('products_info')
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    throw error;
  }
}

export async function getEpisodesPaginationByProductId(
  mongoClient: MongoClient,
  ProductId: string,
  query: IQueryEpisodes
) {
  const { page, perPage, sort, searchBy } = query;
  const db = mongoClient.db('product');

  await getProductById(mongoClient, ProductId);

  const skip = (page - 1) * perPage;
  const limit = perPage;

  const matchStage: any = { ProductId };
  if (ProductId) {
    matchStage.ProductId = ProductId;
  }

  if (searchBy) {
    matchStage.EpName = { $regex: searchBy, $options: 'i' };
  }

  try {
    const pipeline = [
      { $match: matchStage },
      { $sort: sort && Object.keys(sort).length ? sort : { createDate: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];

    const records = await db
      .collection('products_episode')
      .aggregate(pipeline)
      .toArray();
    const count = await db
      .collection('products_episode')
      .countDocuments(matchStage);

    return {
      page,
      perPage,
      records,
      count,
    };
  } catch (error) {
    throw new Error('Failed to fetch episodes');
  }
}

export async function getPaginationEpisodesInProductNovel(
  mongoClient: MongoClient,
  ProductId: string,
  query: IQueryEpisodes
) {
  const { page, perPage, sort, searchBy } = query;
  const db = mongoClient.db('product');

  const skip = (page - 1) * perPage;
  const limit = perPage;

  const pipeline: any[] = [
    { $match: { 'EpTopic.ProductId': ProductId } },
    { $unwind: '$EpTopic' },
    { $match: { 'EpTopic.ProductId': ProductId } },
  ];

  if (searchBy) {
    pipeline.push({
      $match: { 'EpTopic.EpName': { $regex: searchBy, $options: 'i' } },
    });
  }

  const sortStage =
    sort && Object.keys(sort).length > 0
      ? { ...sort, 'EpTopic.createDate': 1 }
      : { 'EpTopic.createDate': 1 };
  pipeline.push({ $sort: sortStage });

  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  const results = await db
    .collection('products_info')
    .aggregate(pipeline)
    .toArray();

  const countPipeline: any[] = [
    { $match: { 'EpTopic.ProductId': ProductId } },
    { $unwind: '$EpTopic' },
    { $match: { 'EpTopic.ProductId': ProductId } },
  ];

  if (searchBy) {
    countPipeline.push({
      $match: { 'EpTopic.EpName': { $regex: searchBy, $options: 'i' } },
    });
  }

  countPipeline.push({ $count: 'count' });

  const totalEpisodes = await db
    .collection('products_info')
    .aggregate(countPipeline)
    .toArray();

  return {
    records: results.map((item) => item.EpTopic),
    count: totalEpisodes[0]?.count || 0,
    page,
    perPage,
  };
}

export const findProductByIds = async (
  mongoClient: MongoClient,
  ids?: string[]
): Promise<IProductNovels[]> => {
  const db = mongoClient.db('product');
  return db
    .collection('products_info')
    .find<IProductNovels>({
      migrationDocumentId: { $in: ids },
    })
    .toArray();
};
