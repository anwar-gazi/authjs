import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { pool } from '../lib/postgres';
import { PgUserRepository } from '../repository/PgUserRepository';
import { repository } from '../lib/factory';

describe('PostgreSQL User Repository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const email = 'minhaj.me.bd@gmail.com';

  describe('unit test getByEmail method', () => {

    it('unit test the getByEmail method', async () => {
      const mockRow = { id: 1, name: "anwar", email };

      const mockQuery = vi.fn().mockResolvedValue({ rows: [mockRow], rowCount: 1 });
      const mockClient = { query: mockQuery };
      const repo = new PgUserRepository(mockClient as any);

      const userInfo = await repo.getByEmail(email);

      expect(userInfo).toEqual(mockRow);
      expect(mockQuery).toHaveBeenCalledWith('SELECT id, email, name FROM "User" WHERE "email"=$1', [email]);
    });
  });

  describe('unit test createUser method', () => {
    const payload = { name: 'Anwar', email };

    const query = vi.fn().mockResolvedValue({ rows: [], rowCount: 1 });
    const client = { query: query };

    const repo = new PgUserRepository(client as any);

    it('unit test the createUser method', async () => {
      const result = await repo.createUser(payload);
      expect(result).toBeDefined();
    });
  });



  describe('integration test the createUser method', () => {
    const payload = {name: 'Anwar', email};

    const repo = new PgUserRepository(pool);

    it('try creating a new user if doesnt exist', async () => {
      if (!await repo.exists(email)) {
        const success = await repo.createUser(payload);
        expect(success).toBe(true);
      }
    });
    
  });

  describe('user existance', () => {
    const repo = repository();
    const email = Date.now().toString() + '.some.random@user.com';
    it('should check user existance', async () => {
      const existance = await repo.user.exists(email);
      expect(existance).toBeDefined();
      expect(existance).toBe(false);
    });
  });



});

