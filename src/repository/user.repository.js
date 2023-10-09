import db from "../database/database.connection.js";

export function getUserEmail(email){
    const result = db.query(`SELECT * FROM users WHERE email = '${email}';`)
    return result;
}

export function insertUser(name, email, cpf, phone, passwordHash){
    const result = db.query(`INSERT INTO users (name, email, cpf, phone, password) VALUES ('${name}', '${email}','${cpf}', '${phone}', '${passwordHash}');`)
    return result
}

export function  insertSession(userID,token){
    const result = db.query(`INSERT INTO sessions ("userID", token) VALUES ('${userID}', '${token}');`)
    return result
}

