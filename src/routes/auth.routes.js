import express from "express";

import { login, signUp, verifyUser } from "../controllers/auth.controller.js"
import { authRequire } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post('/signup', signUp)

router.post('/login', login)

router.get('/verify-user', authRequire, verifyUser)

export default router