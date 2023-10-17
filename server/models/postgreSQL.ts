const { Pool } = require('pg');

const PG_URI = 'postgres://qrmljujn:1CjJ3DrG6pEqJlpPhkb0E35OoyJtYY61@mahmud.db.elephantsql.com/qrmljujn';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text: string, params: any, callback?: void) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
};