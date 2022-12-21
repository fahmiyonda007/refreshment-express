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
/**
 * POST /api/auth/register
 * @summary create new user
 * @tags Auth
 * @param {object} request.body.required
 * @example request - example body
 * {
 *  "name": "jhon doe",
 *  "email":"jhondoe@de.com",
 *  "password":"admin123",
 *  "passwordConfirm":"admin123"
 * }
 */
router.post('/register', validate(UserSignUpDto), registerUserHandler)

// Login user
/**
 * POST /api/auth/login
 * @summary login user
 * @tags Auth
 * @param {object} request.body.required
 * @example request - example body
 * {
 *  "email":"Mia.Walker72@yahoo.com",
 *  "password":"admin123"
 * }
 */
router.post('/login', validate(UserSignInDto), loginUserHandler)

// Logout user
/**
 * GET /api/auth/logout
 * @summary logout user
 * @tags Auth
 * @param {object} request.body.required
 */
router.get('/logout', deserializeUser, requireUser, logoutHandler)

// Refresh access token
/**
 * GET /api/auth/refresh
 * @summary Refresh access token
 * @tags Auth
 */
router.get('/refresh', refreshAccessTokenHandler)

// Verify Email Address
/**
 * GET /api/auth/verifyemail
 * @summary Verify Email Address (DEV)
 * @tags Auth
 * @param {string} verificationCode.query.required - Verification Code
 */
router.get('/verifyemail/:verificationCode', verifyEmailHandler)

export default router
