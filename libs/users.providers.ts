import { MongoClient } from 'mongodb';
import { tryit } from 'radash';
import { IPaginationRes } from '@/interfaces/pagination-respones.interface';
import { IUsers } from '@/interfaces/users.interface';

export interface IQueryUser {
  page: number;
  perPage: number;
  sortBy?: any;
  searchBy?: any;
  filter?: any;
}

const DB_NAME = 'user';
const COLLECTION_NAME = {
  FORGOT_PASSWORD_LIST: 'forgot_password_list',
  REGISTER: 'register',
  USER_ACCESS: 'user_access',
};

export class UsersProviders {
  db = this.mongoClient.db(DB_NAME);
  constructor(protected readonly mongoClient: MongoClient) {}
}

export class UsersService extends UsersProviders {
  getUsersPagination = async (
    payload: IQueryUser
  ): Promise<IPaginationRes<IUsers>> => {
    const { page, perPage, sortBy, searchBy, filter } = payload;

    const searchFilter: any = searchBy
      ? {
          $or: [
            { email: { $regex: searchBy, $options: 'i' } },
            { migrationDocumentId: { $regex: searchBy, $options: 'i' } },
            { username: { $regex: searchBy, $options: 'i' } },
          ],
        }
      : {};

    if (filter && filter !== 'all') {
      searchFilter.type = filter;
    }

    const sortOptions = sortBy || { timestamp: -1 };
    const skip = (page - 1) * perPage;
    const limit = perPage;

    const [error, result] = await tryit(async () => {
      const collection = this.db.collection<IUsers>(COLLECTION_NAME.REGISTER);

      const count = await collection.countDocuments(searchFilter);

      const records = await collection
        .find(searchFilter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray();

      return { count, records };
    })();

    if (error) {
      throw new Error('Failed to fetch users pagination');
    }

    return {
      page,
      perPage,
      count: result.count,
      records: result.records,
    };
  };

  getUserById = async (id: string): Promise<IUsers | null> => {
    return this.db
      .collection<IUsers>(COLLECTION_NAME.REGISTER)
      .findOne({ migrationDocumentId: id });
  };
}
