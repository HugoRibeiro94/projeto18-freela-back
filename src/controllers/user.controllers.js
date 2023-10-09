import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'
import { getUserEmail, insertSession, insertUser } from "../repository/user.repository.js";

export async function postSignUp (req, res){
	const {name, email, cpf, phone, password, confirmPassword} = req.body

	const passwordHash = bcrypt.hashSync(password, 10);

	try{
		if (confirmPassword !== password ) return res.status(422).send("Senha confirmada incorreta")

		const user = await getUserEmail(email)
		if(user.rows.length > 0) return res.status(409).send("Email já cadastrado")

		const u = await insertUser(name, email, cpf, phone, passwordHash)
		res.status(201).send(u)
	} catch (err) {
		res.status(500).send(err.message)
	}
}

export async function postSignIn (req, res){
	const { email, password } = req.body
	console.log(req.body);

	try{
		const user = await getUserEmail(email)
		if (user.rows.length === 0) return res.status(401).send("Usuario não cadastrado")
		console.log(password)
		console.log(user.rows);
		const passwordIsCorrect = bcrypt.compareSync(password, user.rows[0].password)
		if (!passwordIsCorrect) return res.status(401).send("Senha incorreta")

		const token = uuid()
		const obj ={ token:token }
		const userID = user.rows[0].id

		await insertSession(userID,token)

		res.status(200).send(obj)
	} catch (err) {
		res.status(500).send(err.message)
	}
}