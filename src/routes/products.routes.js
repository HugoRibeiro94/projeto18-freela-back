import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productsSchema } from "../schemas/products.schemas.js";
import { getProducts, postProducts } from "../controllers/products.controllers.js";

const routerProducts = Router()

routerProducts.post('/products',validateSchema(productsSchema), postProducts)

routerProducts.get('/products',getProducts)

export default routerProducts