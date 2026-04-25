import { SqliteAdapter } from './sqlite-adapter';

import type { DatabaseAdapter } from './types';

export type { BindValue, DatabaseAdapter, RunResult } from './types';

let adapter: DatabaseAdapter = new SqliteAdapter();

export const getAdapter = (): DatabaseAdapter => adapter;

export const setAdapter = (newAdapter: DatabaseAdapter): void => {
  adapter = newAdapter;
};

export const _resetAdapterForTesting = (): void => {
  adapter = new SqliteAdapter();
};
