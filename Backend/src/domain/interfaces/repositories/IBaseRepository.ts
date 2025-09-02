export interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findByEmail(email: string): Promise<T | null>;
  deleteById(id: string): Promise<void>;
}
