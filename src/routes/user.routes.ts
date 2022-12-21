import express from 'express'
import { getMeHandler, getAllHandler } from '../controllers/user.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'

const router = express.Router()

router.use(deserializeUser, requireUser)

// Get currently logged in user
/**
 * GET /api/users/me
 * @tags Users
 * @summary Get currently logged in user
 */
router.get('/me', getMeHandler)

// Get user list
/**
 * GET /api/users/list
 * @tags Users
 * @summary Get user list - pagination
 * @param {number<PaginationDto>} limit.query -  Limit
 * @param {number<PaginationDto>} offset.query -  Offset
 */
router.get('/list', getAllHandler)

export default router
