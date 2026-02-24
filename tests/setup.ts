import dotenv from 'dotenv';

if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile('.env');
  } catch (e) {
    dotenv.config();
  }
}