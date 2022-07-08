import { Router } from 'express'

import { register, login, getUser, validateEmail, changePassword, updateUser } from '../controllers/userController.js'

import auth from '../middlewares/auth.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)

router.get('/profile/:id', auth, getUser)
router.patch('/profile/:id', auth, updateUser)

router.post('/forget-password', validateEmail)
router.post('/reset-password/:token', auth, changePassword)
router.get('/form-de-quejas/:id', auth, getUser)

export default router