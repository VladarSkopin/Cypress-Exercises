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

    baseUrl: "https://practice.expandtesting.com/notes/api/api-docs/",
    //fileServerFolder: ".",
    //fixturesFolder: "./cypress/fixtures",
    //integrationFolder: "./cypress/integration",
    //pluginsFile: "./cypress/plugins/index.js",
    //supportFile: "./cypress/support/index.js",

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        queryDb: async (query) => {
          const [rows] = await pool.execute(query);
          return rows;
        },

        async insertData(tableName, column_names, data_to_insert) {
          const result = await pool.execute(`INSERT INTO ${tableName} \'(${column_names})\' VALUES \'(${data_to_insert})\'`);
          return result;
        }
      });

    },
  },
});

