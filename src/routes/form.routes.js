import { Router } from 'express'

import { solicitudCreate } from '../controllers/solicitudController.js'
import auth from '../middlewares/auth.js'

const router = Router()
router.post('/solicitudCreate', auth, solicitudCreate)

export default router
