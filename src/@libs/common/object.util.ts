import typia from 'typia';
import {
  entries,
  filter,
  fromEntries,
  groupBy,
  indexBy,
  isObject,
  map,
  pipe,
  toArray,
  uniq,
} from '@fxts/core';

export class F {
  static clone = typia.misc.clone;

  static pipe = pipe;
  static assoicateBy = indexBy;
  static toUnique<T>(arr: T[]): T[] {
    return pipe(arr, uniq, toArray);
  }

  /**
   * 객체에서 `undefined` 값 속성을 제거합니다.
   * @param target `undefined` 속성을 제거할 객체입니다.
   * @return `undefined` 속성이 제거된 객체입니다.
   */
  static removeUndefined<T extends Record<string, any>>(target: T): T {
    return pipe(
      entries(target as Record<string, any>),
      map((entry): typeof entry => {
        const [key, value] = entry;

        if (Array.isArray(value)) {
          return [
            key,
            value.map((each) => {
              if (Array.isArray(each)) {
                return each.map(this.removeUndefined);
              }

              if (isObject(each) && !(each instanceof Date)) {
                return this.removeUndefined(each);
              }

              return each;
            }),
          ];
        }

        if (isObject(value) && !(value instanceof Date)) {
          return [key, this.removeUndefined(value)];
        }

        return value !== undefined ? [key, value] : ['_removed_', ''];
      }),
      filter((each) => each[0] !== '_removed_'),
      fromEntries,
    ) as T;
  }

  static groupBy<T extends Record<string, any>, U extends string>(
    fn: (each: T) => U,
    keys: U[],
    records: T[],
  ): Record<U, T[]>;

  static groupBy<T extends Record<string, any>, U extends string>(
    fn: (each: T) => U,
    keys?: U[],
  ): (records: T[]) => Record<U, T[]>;

  static groupBy<T extends Record<string, any>, U extends string>(
    fn: (each: T) => U,
    keys?: U[],
    records?: T[],
  ) {
    if (records) {
      const map = groupBy(fn, records);
      if (!keys || keys.length === 0) return map;

      keys.forEach((key) => {
        map[key] = map[key] ?? [];
      });

      return map;
    }

    return (records: T[]): Record<U, T[]> => {
      const map = groupBy(fn, records);
      if (!keys || keys.length === 0) return map;

      keys.forEach((key) => {
        map[key] = map[key] ?? [];
      });

      return map;
    };
  }

  static mapValues<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
    record: T,
  ): { [key in keyof T]: U };

  static mapValues<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
  ): (record: T) => { [key in keyof T]: U };

  static mapValues<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
    record?: T,
  ) {
    if (record) {
      return pipe(
        entries(record),
        map((entry): [keyof T, U] => {
          const [key, value] = entry;
          return [key, fn({ key, value })];
        }),
        fromEntries,
      );
    }

    return (record: T) =>
      pipe(
        entries(record),
        map((entry): [keyof T, U] => {
          const [key, value] = entry;
          return [key, fn({ key, value })];
        }),
        fromEntries,
      );
  }

  static recordToArray<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
    record: T,
  ): U[];

  static recordToArray<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
  ): (record: T) => U[];

  static recordToArray<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
    record?: T,
  ) {
    if (record) {
      return pipe(
        entries(record),
        map((entry) => {
          const [key, value] = entry;
          return fn({ key, value });
        }),
        toArray,
      );
    }

    return (record: T) =>
      pipe(
        entries(record),
        map((entry) => {
          const [key, value] = entry;
          return fn({ key, value });
        }),
        toArray,
      );
  }
}
