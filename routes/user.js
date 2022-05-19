import express from 'express'

const router = express.Router()

import { signup, signIn, googleSignIn } from '../controllers/user.js'

router.post('/signup', signup)
router.post('/signin', signIn)
router.post('/googleSignIn', googleSignIn)

export default router
