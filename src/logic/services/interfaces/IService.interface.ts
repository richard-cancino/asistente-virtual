export interface IService<T> {
  all(): Promise<[T[], number]>;
  findOne?(id: number): Promise<T|undefined>;
}
