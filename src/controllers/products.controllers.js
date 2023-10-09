import { findId, findProduct, findProductId, findToken, insertProduct, putProductFalse, putProductTrue } from "../repository/products.repository.js";

export async function getProducts (req,res){
	const { authorization } = req.headers
	
	const token = authorization?.replace("Bearer ","")

	if(!token) return res.status(401).send("Envie o token na requisição")

    try{
		const session = await findToken(token)
		if(session.rows.length === 0) return res.status(401).send("Envie um token valido")

		const userID = session.rows[0].userID

		const products = await findProduct(userID)

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
		const session = await findToken(token)
		if(session.rows.length === 0) return res.status(401).send("Envie um token valido")

		const userID = session.rows[0].userID
		const products = await findProductId(userID)

		res.send(products.rows)

	} catch (err) {
		res.status(500).send(err.message)
	}
}

export async function isActive(req,res){
	const { id } = req.params;

    try{
		const existProduct = await findId(id)
		if(existProduct.rows.length === 0 ) return res.status(409).send("Produto não encontrado")
		
		if(existProduct.rows[0].isActive === true){
			await putProductFalse(id)
		}else{
			await putProductTrue(id)
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
		const session = await findToken(token)
		if(session.rows.length === 0) return res.status(401).send("Envie um token valido")
		
		const userID = session.rows[0].userID
		const newProduct = await insertProduct(userID, name, image, description, price)

		res.status(201).send(newProduct)
	} catch (err) {
		res.status(500).send(err.message)
	}
}