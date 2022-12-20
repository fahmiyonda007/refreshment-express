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
 * @return {object} 200 - Success response - application/json
* @param {object} request.body.required
* @example request - example body
* {
*  "email":"jhondoe@de.com",
*  "password":"admin123"
* }
* @example response - 200 - example success response - application/json
* {
* "status": "success",
 * "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMzMzMmYwYi1hNDExLTQ0MWMtODY1ZS00NTE5NzU3NzJmNjEiLCJpYXQiOjE2NzE0NzgzNDEsImV4cCI6MTY3MTQ3OTI0MX0.S3Wpg3WkH5dblDcNYHWCqXxx7S22kr4ntmTknPzs_PFwxpe7dsFno4TGoeRdkB8tDVaP6EOVnjnAFSeQguaMcyVzfdpZznhSS9pjD_YebNgLSSmr3ZQqSPrxlxUTLCKb_wWWiKXQRa5KkBEEpz7Bx5h01tmho5yIC7tRTNK-MZ4"
}
*/
router.post('/login', validate(UserSignInDto), loginUserHandler)

// Logout user
/**
 * GET /api/auth/logout
 * @summary logout user
 * @tags Auth
 * @return {object} 200 - Success response
 * @param {object} request.body.required
 * @example response - 200 - example success response
 * {
 *  "status": "success"
 * }
 */
router.get('/logout', deserializeUser, requireUser, logoutHandler)

// Refresh access token
/**
 * GET /api/auth/refresh
 * @summary Refresh access token
 * @tags Auth
 * @return {object} 200 - Success response - application/json
 * @example response - 200 - example success response - application/json
* {
* "status": "success",
 * "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMzMzMmYwYi1hNDExLTQ0MWMtODY1ZS00NTE5NzU3NzJmNjEiLCJpYXQiOjE2NzE0NzgzNDEsImV4cCI6MTY3MTQ3OTI0MX0.S3Wpg3WkH5dblDcNYHWCqXxx7S22kr4ntmTknPzs_PFwxpe7dsFno4TGoeRdkB8tDVaP6EOVnjnAFSeQguaMcyVzfdpZznhSS9pjD_YebNgLSSmr3ZQqSPrxlxUTLCKb_wWWiKXQRa5KkBEEpz7Bx5h01tmho5yIC7tRTNK-MZ4"
}
 */
router.get('/refresh', refreshAccessTokenHandler)

// Verify Email Address
/**
 * GET /api/auth/verifyemail
 * @summary Verify Email Address
 * @tags Auth
 * @return {object} 200 - Success response - application/json
 * @param {string} verificationCode.query.required - Verification Code
 * @example response - 200 - example success response - application/json
 * {
 * "status": "success",
 *}
 */
router.get('/verifyemail/:verificationCode', verifyEmailHandler)

export default router
