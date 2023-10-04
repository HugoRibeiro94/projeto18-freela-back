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

    try{
		const existProduct = await db.query(`SELECT name FROM products WHERE name = '${name}';`)
		if(existProduct.rows.length > 0) return res.status(409).send("Produto já cadastrado")
		

		const newProduct = await db.query(
			`INSERT INTO products (name, image, description, price) VALUES ('${name}', '${image}', '${description}', '${price}');`
		)

		res.status(201).send(newProduct)
	} catch (err) {
		res.status(500).send(err.message)
	}
}