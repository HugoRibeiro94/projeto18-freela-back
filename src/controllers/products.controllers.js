import db from "../database/database.connection.js";

export async function getProducts (req,res){
    try{

		const products = await db.query(`SELECT * FROM products;`)

		res.send(products.rows)

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

		const existProduct = await db.query(`SELECT name FROM products WHERE name = '${name}';`)
		if(existProduct.rows.length > 0) return res.status(409).send("Produto já cadastrado")
		
		const newProduct = await db.query(
			`INSERT INTO products ("userId", name, image, description, price) VALUES ('${session.rows[0].userID}','${name}', '${image}', '${description}', '${price}');`
		)

		res.status(201).send(newProduct)
	} catch (err) {
		res.status(500).send(err.message)
	}
}