import sql ,{ Transaction }from 'mssql';

const config = {
    user: 'Admin',
    password: 'Welcome1',
    server: 'localhost', // e.g. 'localhost' or 'myserver.database.windows.net'
    database: 'marketplace',
  
    options: {
        encrypt: false, // for Azure users, otherwise set to false
        TrustServerCertificate: true
    }
};

// create a pool of database connections
const pool = new sql.ConnectionPool(config);
pool.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MSSQL database');
    }
});

// create a user schema
const userSchema = new sql.Table('users');
userSchema.columns.add('id', sql.Int, {nullable: false, primary: true});
userSchema.columns.add('username', sql.VarChar(255), {nullable: false});
userSchema.columns.add('email', sql.VarChar(255), {nullable: true});
userSchema.columns.add('password', sql.VarChar(255), {nullable: false});

// create a model for the users table
const Users = {
    async create(user) {
        const transaction = new Transaction(pool);
        await transaction.begin();
        try {
            const request = new sql.Request(transaction);
            request.input('id', sql.Int, user.id);
            request.input('username', sql.VarChar(255), user.username);
            if (user.email) {
                request.input('email', sql.VarChar(255), String(user.email));
              } else {
                request.input('email', sql.VarChar(255), null);
              }
            request.input('password', sql.VarChar(255), user.password);
            const result = await request.query(`INSERT INTO users (id, username, email, password) 
                                                 VALUES (@id, @username, @email, @password)`);
            await transaction.commit();
            return result.rowsAffected[0] === 1;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }},

    async findById(id) {
        const request = pool.request();
        request.input('id', sql.Int, id);
        const result = await request.query(`SELECT * FROM users WHERE id = @id`);
        return result.recordset[0];
    },

    async findByUsername(username) {
        const request = pool.request();
        request.input('username', sql.VarChar(255), username);
        const result = await request.query(`SELECT * FROM users WHERE username = @username`);
        return result.recordset[0];
    },

    async findByEmail(email) {
        const request = pool.request();
        request.input('email', sql.VarChar(255), email);
        const result = await request.query(`SELECT * FROM users WHERE email = @email`);
        return result.recordset[0];
    }
};

export default Users;
