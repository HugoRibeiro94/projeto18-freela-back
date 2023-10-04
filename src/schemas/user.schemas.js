import Joi from 'joi'

export const userSchema = Joi.object({
	name: Joi.string().trim().required(),
	phone: Joi.string().trim().min(10).max(11).pattern(/^\d+$/).required(),
	cpf: Joi.string().trim().length(11).pattern(/^\d+$/).required(),
	email: Joi.string().trim().email().required(),
	password: Joi.string().required(),
	confirmPassword: Joi.string().required()
})

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
})