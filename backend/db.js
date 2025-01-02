

const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'employee_nr',
  password: '#rj152002',
  port: 4200,
});

module.exports = pool;
