import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: mysql.ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD ?? "")
  }
};

const pool = mysql.createPool(dbConfig);
export default pool;