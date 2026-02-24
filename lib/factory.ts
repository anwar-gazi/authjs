import { PgUserRepository } from "../repository/PgUserRepository";
import { Repository } from "../repository/Repository";
import { Service } from "../service/service";
import { pool } from "./postgres";
import { settings } from "../settings";

export const repository = (): Repository => {
  if (settings.databaseAdapter === 'mongo') {
    // later
  }

  const pgUserRepo = new PgUserRepository(pool);
  return new Repository(pgUserRepo);
};

export const service = (): Service => {
  const repo = repository();
  return new Service(repo);
};