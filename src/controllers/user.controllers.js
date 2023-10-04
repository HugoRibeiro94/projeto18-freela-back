import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'
import db from "../database/database.connection.js";

export async function postSignUp (req, res){
	const {name, email, cpf, phone, password, confirmPassword} = req.body

	const passwordHash = bcrypt.hashSync(password, 10);

	try{
		if (confirmPassword !== password ) return res.status(422).send("Senha confirmada incorreta")

		const user = await db.query(`SELECT email FROM users WHERE email = '${email}';`)
		if(user.rows.length > 0) return res.status(409).send("Email já cadastrado")

		const u = await db.query(`INSERT INTO users (name, email, cpf, phone, password) VALUES ('${name}', '${email}','${cpf}', '${phone}', '${passwordHash}');`)
		res.status(201).send(u)
	} catch (err) {
		res.status(500).send(err.message)
	}
}

export async function postSignIn (req, res){
	const { email, password } = req.body

	try{
		const user = await db.query(`SELECT * FROM users WHERE email = '${email}';`)
		if (user.rows.length === 0) return res.status(401).send("Usuario não cadastrado")
		
		const passwordIsCorrect = bcrypt.compareSync(password, user.rows[0].password)
		if (!passwordIsCorrect) return res.status(401).send("Senha incorreta")

		const token = uuid()
		
		const obj ={ token:token }

		await db.query(`INSERT INTO sessions ("userID", token) VALUES ('${user.rows[0].id}', '${token}');`)
		res.status(200).send(obj)
	} catch (err) {
		res.status(500).send(err.message)
	}
}