import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/user.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/user.schemas.js";

const routerUser = Router()

routerUser.post('/sign-up',validateSchema(userSchema), postSignUp)

routerUser.post('/sign-in', validateSchema(loginSchema),postSignIn)

export default routerUser