import dotenv from 'dotenv';

dotenv.config();

export const settings = {
  tokenTTLSec: 60*60,
  authSecret: process.env.AUTH_SECRET,
  databaseAdapter: 'postgresql',
  databaseUrl: process.env.DATABASE_URL
};