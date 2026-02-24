import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { DbRowToUserInfo, userInfoToJwtCreatePayload } from "../lib/mapper";

describe('mapper', () => {
  describe("DbRowToUserInfo", () => {
    it('should map database row to data shape', () => {
      const dbRow = { id: '1', name: 'Anwar Gaz', email: 'anwar@gazi.ai' };
      const userInfo = DbRowToUserInfo(dbRow);
      expect(userInfo).toHaveProperty('id', dbRow.id);
      expect(userInfo).toHaveProperty('name', dbRow.name);
      expect(userInfo).toHaveProperty('email', dbRow.email);
    })
  });

  describe('userInfoToJwtCreatePayload', () => {
    const userInfo = {
      id: 'sample',
      name: 'Anwar',
      email: 'minhaj.me.bd@gmail.com'
    };
    const expireAt = 'sampleDate';
    it('unit test', () => {

      const payload = userInfoToJwtCreatePayload(userInfo, expireAt);
      expect(payload).toHaveProperty('id');
      expect(payload).toHaveProperty('name');
      expect(payload).toHaveProperty('email');
      expect(payload).toHaveProperty('expireAt');
    })
  })
});