import { Pool, PoolClient, QueryResult } from 'pg';
import { query as globalQuery } from '../lib/postgres';
import { DbRowToUserInfo } from '../lib/mapper';
import { IUserRepository } from '../interface/IUserRepository';
import { CreateUserPayLoad, UserInfo } from '../type/type';

export class PgUserRepository implements IUserRepository {
  constructor(private client: Pool) {

  }
  
  private async exec(text: string, params?: any[]) {
    if (this.client) return this.client.query(text, params);
    return globalQuery(text, params);
  }

  async getByEmail(email: string): Promise<UserInfo> {
    const result = await this.exec('SELECT id, email, name FROM "User" WHERE "email"=$1', [email]);
    const row = result?.rows?.[0];
    return DbRowToUserInfo(row);
  }

  async createUser(payload: CreateUserPayLoad): Promise<boolean> {
    const result = await this.exec('INSERT INTO "User" (id, name, email, "isActive", "createdAt", "updatedAt") VALUES(gen_random_uuid(), $1, $2, true, NOW(), NOW())', [payload.name, payload.email]);
    return !!result.rowCount;
  }

  async exists(email: string): Promise<boolean> {
    const result = await this.exec('SELECT id FROM "User" WHERE email=$1', [email]);
    return !!result.rows.length;
  }
}