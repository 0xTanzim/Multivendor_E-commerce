import { PrismaClient } from '@repo/database';

export type ID = string | number;

export abstract class BaseRepository<
  TModel,
  TDelegate extends {
    findMany: (...args: any) => any;
    findUnique: (...args: any) => any;
    create: (...args: any) => any;
    update: (...args: any) => any;
    delete: (...args: any) => any;
    findFirst: (...args: any) => any;
    aggregate: (...args: any) => any;
    count: (...args: any) => any;
    groupBy: (...args: any) => any;
    upsert: (...args: any) => any;
    updateMany: (...args: any) => any;
    deleteMany: (...args: any) => any;
    aggregateRaw: (...args: any) => any;
  },
> {
  protected prisma: PrismaClient;
  protected delegate: TDelegate;

  constructor(prisma: PrismaClient, delegate: TDelegate) {
    this.prisma = prisma;
    this.delegate = delegate;
  }

  async findAll(
    args?: Parameters<TDelegate['findMany']>[0]
  ): Promise<TModel[]> {
    return this.delegate.findMany(args);
  }

  async findById(id: ID): Promise<TModel | null> {
    return this.delegate.findUnique({ where: { id } });
  }

  async findFirst(
    args: Parameters<TDelegate['findFirst']>[0]
  ): Promise<TModel | null> {
    return this.delegate.findFirst(args);
  }

  async findUnique(
    args: Parameters<TDelegate['findUnique']>[0]
  ): Promise<TModel | null> {
    return this.delegate.findUnique(args);
  }

  async findMany(
    args: Parameters<TDelegate['findMany']>[0]
  ): Promise<TModel[]> {
    return this.delegate.findMany(args);
  }

  async create<T = TModel>(
    data: Parameters<TDelegate['create']>[0]['data'],
    select?: Parameters<TDelegate['create']>[0]['select']
  ): Promise<T> {
    return this.delegate.create({
      data,
      select,
    }) as Promise<T>;
  }

  async update(
    id: ID,
    data: Parameters<TDelegate['update']>[0]['data']
  ): Promise<TModel | null> {
    return this.delegate.update({ where: { id }, data });
  }

  async delete(id: ID): Promise<TModel | null> {
    return this.delegate.delete({ where: { id } });
  }

  async checkExist(
    where: Parameters<TDelegate['findUnique']>[0]
  ): Promise<boolean> {
    const result = await this.delegate.findUnique(where);
    return !!result;
  }

  async aggregate(args: Parameters<TDelegate['aggregate']>[0]): Promise<any> {
    return this.delegate.aggregate(args as any);
  }

  async count(args?: Parameters<TDelegate['count']>[0]): Promise<number> {
    return this.delegate.count(args as any);
  }

  async upsert(
    args: Parameters<TDelegate['upsert']>[0]
  ): Promise<TModel | null> {
    return this.delegate.upsert(args as any);
  }

  // async groupBy(args: Parameters<TDelegate['groupBy']>[0]): Promise<any> {
  //   return this.delegate.groupBy(args as any);
  // }

  async updateMany(
    args: Parameters<TDelegate['updateMany']>[0]
  ): Promise<TModel[]> {
    return this.delegate.updateMany(args);
  }

  async deleteMany(
    args: Parameters<TDelegate['deleteMany']>[0]
  ): Promise<TModel[]> {
    return this.delegate.deleteMany(args);
  }

  async aggregateRaw(
    args: Parameters<TDelegate['aggregateRaw']>[0]
  ): Promise<any> {
    return this.delegate.aggregateRaw(args);
  }
}
