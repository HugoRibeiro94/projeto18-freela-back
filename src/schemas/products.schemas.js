import Joi from 'joi'

export const productsSchema = Joi.object({
	name: Joi.string().trim().required(),
	image: Joi.string().uri().trim().required(),
	description: Joi.string().required(),
	price: Joi.number().positive().precision(2).required()
})