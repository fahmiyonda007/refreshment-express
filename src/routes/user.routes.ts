import express from 'express'
import { getMeHandler } from '../controllers/user.controller'
import { Users } from '../entities/users.entity'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'

const router = express.Router()

router.use(deserializeUser, requireUser)

// Get currently logged in user
/**
 * GET /api/users/me
 * @summary Get currently logged in user
 * @tags Users
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/me', getMeHandler)

export default router
