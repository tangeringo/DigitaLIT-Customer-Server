import mysql from 'mysql2';

const dbConfig: mysql.ConnectionOptions = {
  host: 'localhost',
  user: 'admin',
  password: 'EU@nD;EmMgW4"9$fqS9Ij;m!A',
  database: 'diglit_customers',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('EU@nD;EmMgW4"9$fqS9Ij;m!A')
  }
};

const pool = mysql.createPool(dbConfig);
export default pool;