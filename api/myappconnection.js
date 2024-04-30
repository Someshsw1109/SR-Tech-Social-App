import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "42779happy09#09",
  database: "social"
});

function handleDisconnect(connection) {
  connection.on("error", function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Reconnecting to the database...");
      handleDisconnect(mysql.createConnection(connection.config));
    } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      console.log("Fatal error encountered. Reconnecting...");
      handleDisconnect(mysql.createConnection(connection.config));
    } else {
      throw err;
    }
  });
}

handleDisconnect(db);

export default db;