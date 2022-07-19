import { Router } from 'express'
import { addPlanRiego } from '../controllers/planController.js'

import auth from '../middlewares/auth.js'

const router = Router()

router.post('/plan-riego', auth, addPlanRiego)

export default router