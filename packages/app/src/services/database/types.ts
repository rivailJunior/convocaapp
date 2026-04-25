export type BindValue = string | number | boolean | null | Uint8Array;

export interface RunResult {
  lastInsertRowId: number;
  changes: number;
}

export interface DatabaseAdapter {
  execAsync(sql: string): Promise<void>;
  runAsync(sql: string, params?: BindValue[]): Promise<RunResult>;
  getAllAsync<T>(sql: string, params?: BindValue[]): Promise<T[]>;
  getFirstAsync<T>(sql: string, params?: BindValue[]): Promise<T | null>;
  withTransactionAsync(callback: () => Promise<void>): Promise<void>;
}
