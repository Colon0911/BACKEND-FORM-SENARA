import { Router } from 'express'

import auth from '../middlewares/auth.js'
import { solicitudCreate } from '../controllers/solicitudController.js'
import { agregarQueja } from '../controllers/quejaController.js'

const router = Router()
router.post('/solicitudCreate', auth, solicitudCreate)
router.post('/form-queja', auth, agregarQueja)
export default router
