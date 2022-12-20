import express from 'express'
import { getMeHandler, getAllHandler } from '../controllers/user.controller'
import { PaginationDto } from '../dtos/pagination.dto'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'

const router = express.Router()

router.use(deserializeUser, requireUser)

// Get currently logged in user
/**
 * GET /api/users/me
 * @summary Get currently logged in user
 * @tags Users
 */
router.get('/me', getMeHandler)

// Get user list
/**
 * GET /api/users/list
 * @summary Get user list - pagination
 * @param {number<PaginationDto>} limit.query -  Limit
 * @param {number<PaginationDto>} offset.query -  Offset
 * @tags Users
 */
router.get('/list', getAllHandler)

export default router
