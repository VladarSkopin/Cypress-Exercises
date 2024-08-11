const { defineConfig } = require("cypress");
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'alex',
  password: '_K2Vq*SbuT/$t*w',
  database: 'alextest',
  connectionLimit: 10 // maximum number of connections in the pool
});


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        queryDb: async (query) => {
          const [rows] = await pool.execute(query);
          return rows;
        }
      });
    },
  },
});
