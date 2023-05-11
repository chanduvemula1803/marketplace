import sql from 'mssql';
require('ssl-root-cas').inject();
const config = {
  user: 'Admin',
  password: 'Welcome1',
  server: 'localhost',
  database: 'marketplace',
 
  options: {
    encrypt: false, // Use this if you're on Windows (default is false)
    TrustServerCertificate: true
    }
};

const connectsql = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to mssql!');
  } catch (error) {
    console.error('Error connecting to sql:', error);
    throw error;
  } 
};

export default connectsql;
