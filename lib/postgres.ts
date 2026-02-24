import { Pool, PoolClient, types } from 'pg';

types.setTypeParser(1114, function (stringValue: string) {
  return new Date(stringValue);
});

process.env.TZ = process.env.APP_TIMEZONE || 'Asia/Dhaka';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : undefined,
});

pool.on('connect', (client: PoolClient) => {
  const tz = process.env.APP_TIMEZONE || 'Asia/Dhaka';
  client.query(`SET timezone = '${tz}'`);
});


/**
 * Executes a query using the global pool.
 */
export const query = (text: string, params?: any[]) => pool.query(text, params);

/**
 * Transaction helper to ensure a client is checked out, transaction started,
 * and automatically committed or rolled back.
 */
export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
