import mysql, { Connection, MysqlError } from 'mysql';
import { databaseUser } from './utils/interfaces';
// import bcrypt from 'bcrypt';
// import { encrypt, hashText } from './utils/crypto.utils';

// Create a connection configuration object
const dbConfig: mysql.ConnectionConfig = {
// host: 'diglit.online',
host: 'localhost',
user: 'admin@diglit',
password: 'EU@nD;EmMgW4"9$fqS9Ij;m!A',
database: 'diglit_customers'
};

// Create a connection variable with explicit type
const con: Connection = mysql.createConnection(dbConfig);

export default con;