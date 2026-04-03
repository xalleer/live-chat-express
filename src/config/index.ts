import dotenv from 'dotenv';
dotenv.config();

interface EnvConfig {
  port: string;
  db_uri: string;
  secret_token: string;
  salt_round: number;
}

const requiredEnv = ['PORT', 'DB_URI', 'SECRET_TOKEN', 'SALT_ROUND'] as const;

export const config: EnvConfig = requiredEnv.reduce((acc, key) => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not defined in .env`);
  return { ...acc, [key.toLowerCase()]: value };
}, {} as EnvConfig);
