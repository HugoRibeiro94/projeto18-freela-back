import db from "../database/database.connection.js"

export function findToken(token){
    const result = db.query(`SELECT * FROM sessions WHERE token = '${token}';`)
    return result
}

export function findProduct(userID){
    const result = db.query(`SELECT * FROM products WHERE "userID" = ${userID} AND "isActive"=true;`)
    return result
}

export function findProductId (userID){
    const result = db.query(`SELECT * FROM products WHERE "userID" = ${userID};`)
    return result
}

export function  findId(id){
    const result = db.query(`SELECT * FROM products WHERE id = '${id}';`)
    return result
}

export function  putProductFalse(id){
    const result = db.query(`UPDATE products SET "isActive"= false  WHERE id = $1;`,[id]);
    return result
}

export function  putProductTrue(id){
    const result = db.query(`UPDATE products SET "isActive"= true  WHERE id = $1;`,[id]);
    return result
}

export function  insertProduct(userID, name, image, description, price){
    const result = db.query(`INSERT INTO products ("userID", name, image, description, price) VALUES ('${userID}','${name}', '${image}', '${description}', '${price}');`)
    return result
}