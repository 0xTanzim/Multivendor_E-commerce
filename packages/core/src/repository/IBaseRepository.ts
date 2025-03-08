export interface IBaseRepository {
  findAll(): Promise<any[]>;
}
