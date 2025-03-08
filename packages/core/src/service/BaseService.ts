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
    return this.repository.findAll(options);
  }

  async findById(id: ID): Promise<TModel | null> {
    return this.repository.findById(id);
  }

  async create<T = TModel>(
    data: Parameters<TRepository['create']>[0],
    select?: Parameters<TRepository['create']>[1]
  ): Promise<T> {
    return this.repository.create(data, select);
  }

  async update(
    id: any,
    data: Parameters<TRepository['update']>[1]
  ): Promise<TModel | null> {
    return this.repository.update(id, data);
  }

  async delete(id: ID): Promise<TModel | null> {
    return this.repository.delete(id);
  }

  async checkExistById(id: ID): Promise<boolean> {
    return this.repository.checkExist({ id });
  }

  async checkExist(
    where: Parameters<TRepository['checkExist']>[0]
  ): Promise<boolean> {
    return this.repository.checkExist(where);
  }

  async aggregate(args: Parameters<TRepository['aggregate']>[0]): Promise<any> {
    return this.repository.aggregate(args);
  }

  async count(args: Parameters<TRepository['count']>[0]): Promise<number> {
    return this.repository.count(args);
  }

  async upsert(
    args: Parameters<TRepository['upsert']>[0]
  ): Promise<TModel | null> {
    return this.repository.upsert(args);
  }

  // async groupBy(args: Parameters<TRepository['groupBy']>[0]): Promise<any> {
  //   return this.repository.groupBy(args);
  // }

  async findFirst(
    args: Parameters<TRepository['findFirst']>[0]
  ): Promise<TModel | null> {
    return this.repository.findFirst(args);
  }

  async aggregateRaw(
    args: Parameters<TRepository['aggregateRaw']>[0]
  ): Promise<any> {
    return this.repository.aggregateRaw(args);
  }

  async findMany(
    args: Parameters<TRepository['findMany']>[0]
  ): Promise<TModel[]> {
    return this.repository.findMany(args);
  }
  async deleteMany(
    args: Parameters<TRepository['deleteMany']>[0]
  ): Promise<TModel[]> {
    return this.repository.deleteMany(args);
  }
  async updateMany(
    args: Parameters<TRepository['updateMany']>[0]
  ): Promise<TModel[]> {
    return this.repository.updateMany(args);
  }
  async findUnique(
    args: Parameters<TRepository['findUnique']>[0]
  ): Promise<TModel | null> {
    return this.repository.findUnique(args);
  }
}
