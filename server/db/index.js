import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
client.connect();

export const ERROR_DB = "DATABASE ERROR";
export function send_query(text, values) {
  return client.query(text, values);
}
