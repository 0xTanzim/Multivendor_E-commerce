import {
  BadRequestError,
  BaseError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from '@repo/common/error';
import {} from '@repo/database';
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
      console.log(
        '[BaseService] findAll error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );

      throw new InternalServerError('Error fetching records');
    }
  }

  async findById(id: ID): Promise<TModel | null> {
    try {
      const result = await this.repository.findById(id);
      if (!result) {
        throw new NotFoundError(`Record with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      console.error(
        '[BaseService] findById error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new InternalServerError('Error fetching records');
    }
  }

  async create<T = TModel>(
    data: Parameters<TRepository['create']>[0],
    select?: Parameters<TRepository['create']>[1]
  ): Promise<T> {
    try {
      return await this.repository.create(data, select);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictError('Record already exists');
      }
      console.error(
        '[BaseService] create error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new BadRequestError('Failed to create record');
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
      if (error instanceof BaseError) {
        throw error;
      }
      console.error(
        '[BaseService] update error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new BadRequestError('Failed to update record');
    }
  }

  async deleteById(id: ID): Promise<TModel | null> {
    try {
      const result = await this.repository.delete(id);
      if (!result) throw new NotFoundError(`Record with ID ${id} not found`);
      return result;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError(
          `[${error.meta?.modelName}]: ${error.meta.cause}`
        );
      } else if (error.code === 'P2014') {
        console.log('Error Message: ', error.message);
        console.log('Error Meta: ', error.meta);
        throw new BadRequestError('Failed to delete record due to constraint');
      }

      if (error instanceof BaseError) {
        throw error;
      }
      console.error(
        '[BaseService] delete error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new BadRequestError('Failed to delete record');
    }
  }

  async checkExistById(id: ID): Promise<boolean> {
    try {
      return await this.repository.checkExist({ id });
    } catch (error) {
      throw new InternalServerError('Error checking record');
    }
  }

  async checkExist(
    where: Parameters<TRepository['checkExist']>[0]
  ): Promise<boolean> {
    try {
      return await this.repository.checkExist(where);
    } catch (error) {
      throw new InternalServerError('Error checking record');
    }
  }

  async aggregate(args: Parameters<TRepository['aggregate']>[0]): Promise<any> {
    try {
      return await this.repository.aggregate(args);
    } catch (error) {
      console.error(
        '[BaseService] aggregate error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new InternalServerError('Error performing aggregate operation');
    }
  }

  async count(args: Parameters<TRepository['count']>[0]): Promise<number> {
    try {
      return await this.repository.count(args);
    } catch (error) {
      console.error(
        '[BaseService] count error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new InternalServerError('Error counting records');
    }
  }

  async upsert(
    args: Parameters<TRepository['upsert']>[0]
  ): Promise<TModel | null> {
    try {
      return await this.repository.upsert(args);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictError('Record already exists');
      }
      console.error(
        '[BaseService] upsert error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new BadRequestError('Failed to upsert record');
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
      if (error instanceof BaseError) {
        throw error;
      }
      console.error(
        '[BaseService] findFirst error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new InternalServerError('Error finding record');
    }
  }

  async aggregateRaw(
    args: Parameters<TRepository['aggregateRaw']>[0]
  ): Promise<any> {
    try {
      return await this.repository.aggregateRaw(args);
    } catch (error) {
      console.error(
        '[BaseService] aggregateRaw error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new InternalServerError('Error performing raw aggregate operation');
    }
  }

  async findMany(
    args: Parameters<TRepository['findMany']>[0]
  ): Promise<TModel[]> {
    try {
      return await this.repository.findMany(args);
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      console.error(
        '[BaseService] findMany error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new InternalServerError('Error finding records');
    }
  }

  async deleteMany(
    args: Parameters<TRepository['deleteMany']>[0]
  ): Promise<TModel[]> {
    try {
      return await this.repository.deleteMany(args);
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      console.error(
        '[BaseService] deleteMany error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new BadRequestError('Failed to delete records');
    }
  }

  async updateMany(
    args: Parameters<TRepository['updateMany']>[0]
  ): Promise<TModel[]> {
    try {
      return await this.repository.updateMany(args);
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      console.error(
        '[BaseService] updateMany error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new BadRequestError('Failed to update records');
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
      if (error instanceof BaseError) {
        throw error;
      }
      console.error(
        '[BaseService] findUnique error',
        error.message,
        '\n',
        '[meta]:',
        error.meta,
        '\t \t [code]:',
        error.code
      );
      throw new InternalServerError('Error finding unique record');
    }
  }



}
