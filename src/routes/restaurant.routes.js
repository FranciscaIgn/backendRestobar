import express from 'express'
import { CreateNewiInfo, deleteInfoById, getAllInfo, updateInfoById } from '../controllers/restaurant.controller.js'
import { authRequire } from '../middlewares/auth.middleware.js'


const router = express.Router()

router.get('/info', getAllInfo)

router.post('/info', authRequire, CreateNewiInfo)

router.put('/info/:id', authRequire, updateInfoById)

router.delete('/info/:id', authRequire, deleteInfoById)

export default router