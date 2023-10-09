import db from "../database/database.connection.js";

export async function getProducts (req,res){
	const { authorization } = req.headers
	
	const token = authorization?.replace("Bearer ","")

	if(!token) return res.status(401).send("Envie o token na requisição")

    try{
		const session = await db.query(`SELECT * FROM sessions WHERE token = '${token}';`)
		if(session.rows.length === 0) return res.status(401).send("Envie um token valido")

		const products = await db.query(`SELECT * FROM products WHERE "userID" = ${session.rows[0].userID} AND "isActive"=true;`)

		res.send(products.rows)

	} catch (err) {
		res.status(500).send(err.message)
	}
}

export async function getAllProducts(req,res){
	const { authorization } = req.headers
	
	const token = authorization?.replace("Bearer ","")

	if(!token) return res.status(401).send("Envie o token na requisição")

    try{
		const session = await db.query(`SELECT * FROM sessions WHERE token = '${token}';`)
		if(session.rows.length === 0) return res.status(401).send("Envie um token valido")

		const products = await db.query(`SELECT * FROM products WHERE "userID" = ${session.rows[0].userID};`)

		res.send(products.rows)

	} catch (err) {
		res.status(500).send(err.message)
	}
}

export async function isActive(req,res){
	const { id } = req.params;

    try{
		const existProduct = await db.query(`SELECT * FROM products WHERE id = '${id}';`)
		if(existProduct.rows.length === 0 ) return res.status(409).send("Produto não encontrado")
		
		if(existProduct.rows[0].isActive === true){
			await db.query(`UPDATE products SET "isActive"= false  WHERE id = $1;`,[id]);
		}else{
			await db.query(`UPDATE products SET "isActive"= true  WHERE id = $1;`,[id]);
		}

		res.sendStatus(200)
	} catch (err) {
		res.status(500).send(err.message)
	}
	
}

export async function postProducts (req,res){
	const {name, image, description, price} = req.body

	const { authorization } = req.headers

	const token = authorization?.replace("Bearer ","")

	if(!token) return res.status(401).send("Envie o token na requisição")

    try{
		const session = await db.query(`SELECT * FROM sessions WHERE token = '${token}';`)
		if(session.rows.length === 0) return res.status(401).send("Envie um token valido")
		
		const newProduct = await db.query(
			`INSERT INTO products ("userID", name, image, description, price) VALUES ('${session.rows[0].userID}','${name}', '${image}', '${description}', '${price}');`
		)

		res.status(201).send(newProduct)
	} catch (err) {
		res.status(500).send(err.message)
	}
}