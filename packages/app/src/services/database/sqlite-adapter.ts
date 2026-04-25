import * as SQLite from 'expo-sqlite';

import type { BindValue, DatabaseAdapter, RunResult } from './types';

const DB_NAME = 'sportspay.db';

export class SqliteAdapter implements DatabaseAdapter {
  private dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

  private getDb(): Promise<SQLite.SQLiteDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = SQLite.openDatabaseAsync(DB_NAME).catch((error) => {
        this.dbPromise = null;
        throw error;
      });
    }
    return this.dbPromise;
  }

  async execAsync(sql: string): Promise<void> {
    const db = await this.getDb();
    await db.execAsync(sql);
  }

  async runAsync(sql: string, params?: BindValue[]): Promise<RunResult> {
    const db = await this.getDb();
    const result = await db.runAsync(sql, params ?? []);
    return { lastInsertRowId: result.lastInsertRowId, changes: result.changes };
  }

  async getAllAsync<T>(sql: string, params?: BindValue[]): Promise<T[]> {
    const db = await this.getDb();
    return db.getAllAsync<T>(sql, params ?? []);
  }

  async getFirstAsync<T>(sql: string, params?: BindValue[]): Promise<T | null> {
    const db = await this.getDb();
    return db.getFirstAsync<T>(sql, params ?? []);
  }

  async withTransactionAsync(callback: () => Promise<void>): Promise<void> {
    const db = await this.getDb();
    await db.withTransactionAsync(callback);
  }

  reset(): void {
    this.dbPromise = null;
  }
}
