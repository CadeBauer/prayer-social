import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "db-mysql-nyc1-84726-do-user-12754065-0.b.db.ondigitalocean.com",
    port: "25060",
    user: "admin",
    password: "AVNS_jm7kF9DIfnvw4_uqLeq",
    database: "Prayer Social"
})