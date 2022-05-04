const { Pool } = require('pg');
const connectionString =
  'postgres://atheityu:716mt4YYBqY420NE1xxdp8B5_SNMZ2iF@chunee.db.elephantsql.com/atheityu';

// Database Schema: 

const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
