import {
  BadRequestError,
  BaseError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from '@repo/common/error';
import { BaseRepository, ID } from '../repository/BaseRepository';

export abstract class BaseService<
  TModel,
  TRepository extends BaseRepository<TModel, any>,
> {
  protected repository: TRepository;

  constructor(repository: TRepository) {
    this.repository = repository;
  }

  async findAll(
    options?: Parameters<TRepository['findAll']>[0]
  ): Promise<TModel[]> {
    try {
      const result = await this.repository.findAll(options);
      return result;
    } catch (error) {
      return this.handlePrismaError(error, 'findAll');
    }
  }

  async findById(id: ID): Promise<TModel | null> {
    try {
      const result = await this.repository.findById(id);
      return result;
    } catch (error) {
      return this.handlePrismaError(error, 'findById');
    }
  }

  async create<T = TModel>(
    data: Parameters<TRepository['create']>[0],
    select?: Parameters<TRepository['create']>[1]
  ): Promise<T> {
    try {
      return await this.repository.create(data, select);
    } catch (error) {
      return this.handlePrismaError(error, 'create');
    }
  }

  async createMany<T = TModel>(
    data: Parameters<TRepository['createMany']>[0],
    skipDuplicates?: Parameters<TRepository['createMany']>[1]
  ): Promise<{ count: number }> {
    try {
      const result = await this.repository.createMany(data, skipDuplicates);
      return result;
    } catch (error) {
      return this.handlePrismaError(error, 'createMany');
    }
  }

  async update(
    id: ID,
    data: Parameters<TRepository['update']>[1]
  ): Promise<TModel | null> {
    try {
      const record = await this.repository.findById(id);
      if (!record) throw new NotFoundError(`Record with ID ${id} not found`);

      return await this.repository.update(id, data);
    } catch (error) {
      return this.handlePrismaError(error, 'update');
    }
  }

  async deleteById(id: ID): Promise<TModel | null> {
    try {
      const result = await this.repository.delete(id);
      if (!result) throw new NotFoundError(`Record with ID ${id} not found`);
      return result;
    } catch (error) {
      return this.handlePrismaError(error, 'deleteById');
    }
  }

  async checkExistById(id: ID): Promise<boolean> {
    try {
      return await this.repository.checkExist({ id });
    } catch (error) {
      return this.handlePrismaError(error, 'checkExistById');
    }
  }

  async checkExist(
    where: Parameters<TRepository['checkExist']>[0]
  ): Promise<boolean> {
    try {
      return await this.repository.checkExist(where);
    } catch (error) {
      return this.handlePrismaError(error, 'checkExist');
    }
  }

  async aggregate(args: Parameters<TRepository['aggregate']>[0]): Promise<any> {
    try {
      return await this.repository.aggregate(args);
    } catch (error) {
      return this.handlePrismaError(error, 'aggregate');
    }
  }

  async count(args: Parameters<TRepository['count']>[0]): Promise<number> {
    try {
      return await this.repository.count(args);
    } catch (error) {
      return this.handlePrismaError(error, 'count');
    }
  }

  async upsert(
    args: Parameters<TRepository['upsert']>[0]
  ): Promise<TModel | null> {
    try {
      return await this.repository.upsert(args);
    } catch (error) {
      return this.handlePrismaError(error, 'upsert');
    }
  }

  // async groupBy(args: Parameters<TRepository['groupBy']>[0]): Promise<any> {
  //   return this.repository.groupBy(args);
  // }

  async findFirst(
    args: Parameters<TRepository['findFirst']>[0]
  ): Promise<TModel | null> {
    try {
      return await this.repository.findFirst(args);
    } catch (error) {
      return this.handlePrismaError(error, 'findFirst');
    }
  }

  async aggregateRaw(
    args: Parameters<TRepository['aggregateRaw']>[0]
  ): Promise<any> {
    try {
      return await this.repository.aggregateRaw(args);
    } catch (error) {
      return this.handlePrismaError(error, 'aggregateRaw');
    }
  }

  async findMany(
    args: Parameters<TRepository['findMany']>[0]
  ): Promise<TModel[]> {
    try {
      return await this.repository.findMany(args);
    } catch (error) {
      return this.handlePrismaError(error, 'findMany');
    }
  }

  async deleteMany(
    args: Parameters<TRepository['deleteMany']>[0]
  ): Promise<TModel[]> {
    try {
      return await this.repository.deleteMany(args);
    } catch (error) {
      return this.handlePrismaError(error, 'deleteMany');
    }
  }

  async updateMany(
    args: Parameters<TRepository['updateMany']>[0]
  ): Promise<TModel[]> {
    try {
      return await this.repository.updateMany(args);
    } catch (error) {
      return this.handlePrismaError(error, 'updateMany');
    }
  }

  async findUnique(
    args: Parameters<TRepository['findUnique']>[0]
  ): Promise<TModel | null> {
    try {
      const result = await this.repository.findUnique(args);
      if (!result) {
        throw new NotFoundError(`Record not found`);
      }
      return result;
    } catch (error) {
      return this.handlePrismaError(error, 'findUnique');
    }
  }

  protected handlePrismaError(error: any, operation: string): never {
    console.log('Prisma Error', error.message);

    if (error && error.name === 'PrismaClientKnownRequestError' && error.code) {
      console.log(
        `Error Details For:- (${operation})==> Prisma Client Error ===> :`,
        JSON.stringify(error, null, 2)
      );
      switch (error.code) {
        case 'P2001':
          throw new NotFoundError(`Record not found in where condition`);
        case 'P2002':
          throw new ConflictError('Record already exists');

        case 'P2003':
          throw new BadRequestError(
            `Foreign key constraint failed on field: ${error.meta?.field_name || 'unknown'}`
          );

        case 'P2012':
        case 'P2013':
          throw new BadRequestError(
            `Missing required value: ${error.meta || 'unknown'}`
          );

        case 'P2014':
          throw new BadRequestError(
            'Operation failed due to constraint violation'
          );
        case 'P2023':
          throw new BadRequestError(
            `Invalid ID format: ${error.meta?.message || error.message}`
          );
        case 'P2025':
          throw new NotFoundError(
            `Record not found: ${error.meta?.cause || 'Unknown cause'}`
          );
        default:
          throw new BadRequestError(
            `Database error (${error.code}): ${error.message}`
          );
      }
    }

    if (error instanceof BaseError) {
      throw error;
    }

    console.log(`Error JSON (${operation}) :1`, JSON.stringify(error, null, 2));
    throw new InternalServerError(`Error during ${operation}`);
  }
}
