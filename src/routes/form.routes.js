import { Router } from 'express'

import { agregarQueja } from '../controllers/quejaController.js'

import auth from '../middlewares/auth.js'

const router = Router()

router.post('/form-queja', auth, agregarQueja)

export default router