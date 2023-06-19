const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "registration-form",
});

module.exports = pool;
