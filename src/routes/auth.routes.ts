import express from 'express'
import {
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
  verifyEmailHandler,
} from '../controllers/auth.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import validate from '../middleware/dtoValidation'
import { UserSignInDto, UserSignUpDto } from '../dtos/auth.dto'

const router = express.Router()

// Register user
router.post('/register', validate(UserSignUpDto), registerUserHandler)

// Login user
router.post('/login', validate(UserSignInDto), loginUserHandler)

// Logout user
router.get('/logout', deserializeUser, requireUser, logoutHandler)

// Refresh access token
router.get('/refresh', refreshAccessTokenHandler)

// Verify Email Address
router.get('/verifyemail/:verificationCode', verifyEmailHandler)

export default router
