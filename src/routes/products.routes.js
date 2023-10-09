import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productsSchema } from "../schemas/products.schemas.js";
import { getAllProducts, getProducts, getProductsId, isActive, postProducts } from "../controllers/products.controllers.js";

const routerProducts = Router()

routerProducts.post('/products',validateSchema(productsSchema), postProducts)

routerProducts.get('/products',getProducts)

routerProducts.get("/products/:id", getProductsId);

routerProducts.get('/all-products',getAllProducts)

routerProducts.put("/products/:id", isActive);

export default routerProducts