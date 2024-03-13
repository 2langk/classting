export type UnwrapArray<T> = T extends Array<infer R> ? R : never;
export type UnwrapPromise<T> = T extends Promise<infer R> ? R : never;
export type UnExtract<T, Pattern> = T extends Pattern ? never : T;
export type OmitProperties<
  T,
  K extends keyof T,
  U extends 'methods' | null = null,
> = U extends 'methods' ? OmitMethods<Omit<T, K>> : Omit<T, K>;
export type OmitMethods<T extends object> = Omit<
  T,
  {
    [key in keyof T]: T[key] extends (...params: any[]) => any ? key : never;
  }[keyof T]
>;
export type Undefinable<T extends Record<string, any>> = {
  [P in keyof T]?: T[P] | undefined;
};
export type ClassType<T = unknown> = new (...params: any[]) => T;
