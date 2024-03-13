import typia from 'typia';
import { indexBy, pipe } from '@fxts/core';
export declare class F {
  static clone: <T>(input: T) => typia.Resolved<T>;
  static pipe: typeof pipe;
  static assoicateBy: typeof indexBy;
  static toUnique<T>(arr: T[]): T[];
  static removeUndefined<T extends Record<string, any>>(target: T): T;
  static groupBy<T extends Record<string, any>, U extends string>(
    fn: (each: T) => U,
    keys: U[],
    records: T[],
  ): Record<U, T[]>;
  static groupBy<T extends Record<string, any>, U extends string>(
    fn: (each: T) => U,
    keys?: U[],
  ): (records: T[]) => Record<U, T[]>;
  static mapValues<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
    record: T,
  ): {
    [key in keyof T]: U;
  };
  static mapValues<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
  ): (record: T) => {
    [key in keyof T]: U;
  };
  static recordToArray<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
    record: T,
  ): U[];
  static recordToArray<T extends Record<string, any>, U>(
    fn: (entry: { key: keyof T; value: T[keyof T] }) => U,
  ): (record: T) => U[];
}
