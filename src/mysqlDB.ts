import mysql, { QueryResult } from 'mysql2/promise';
import { databaseUser } from './utils/interfaces';
import bcrypt from 'bcrypt';
import { encrypt, hashText } from './utils/crypto.utils';

export const db = mysql.createConnection({
  // host: 'diglit.online',
  host: '37.46.209.133',
  user: 'admin@diglit',
  password: 'EU@nD;EmMgW4"9$fqS9Ij;m!A',
  database: 'diglit_customers'
});



export default db;