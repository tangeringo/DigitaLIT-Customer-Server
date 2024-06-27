import mysql from 'mysql2/promise';
import { databaseUser } from './utils/interfaces';
import bcrypt from 'bcrypt';
import { encrypt } from './utils/crypto.utils';

const connection = mysql.createPool({
  // host: 'diglit.online',
  host: '37.46.209.133',
  user: 'admin@diglit',
  password: 'EU@nD;EmMgW4"9$fqS9Ij;m!A',
  database: 'diglit_customers'
});

export async function insertUser (user: databaseUser): Promise<void> {
  try {
    const { createdAt, displayName, email, password } = user
    const query = 'INSERT INTO auth (createdAt, displayName, email, hash) VALUES (?, ?, ?, ?)';
    const encryptedEmail = encrypt(email);
    const encryptedDisplayName = encrypt(displayName);
    const hash = await bcrypt.hash(password, 10); // 10 is the salt rounds
    await connection.execute(query, [createdAt, encryptedDisplayName, encryptedEmail, hash]);
    console.log("successfully added data");
  } catch (error) {
    console.log("failed to add the data: ", error)
  }
}


export default connection;