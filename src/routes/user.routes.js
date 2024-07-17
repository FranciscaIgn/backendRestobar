import express from 'express'

import {  createNewUser, deleteUserByRut, getAllUsers, getUserByRut, updateUser } from '../controllers/user.controller.js'
import { authRequire } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/users',authRequire, getAllUsers)

router.get('/users/:rut', authRequire, getUserByRut)

router.post('/users', createNewUser)

router.put("/users/:rut", authRequire, updateUser)

router.delete("/users/:rut", authRequire, deleteUserByRut)



export default router
