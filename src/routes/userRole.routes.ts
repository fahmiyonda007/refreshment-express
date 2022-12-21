import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import validate from '../middleware/dtoValidation'
import { CreateDto, UpdateDto } from '../dtos/userRoles.dto'
import {
  createHandler,
  deleteHandler,
  getAllHandler,
  updateHandler,
  getByUserHandler,
  getByRoleHandler,
} from '../controllers/userRole.controller'

const router = express.Router()

router.use(deserializeUser, requireUser)

/**
 * POST /api/user-roles/create
 * @summary create new role
 * @tags User - Roles
 * @param {object} request.body.required
 * @example request - example body
 * {
 *  "user": "a913d21e-ed50-4765-916d-1083a400f71b",
 *  "role": "b998a3d5-5d79-40bb-8137-00cafe71f5eb"
 * }
 */
router.route('/create').post(createHandler, validate(CreateDto))

/**
 * GET /api/user-roles/list-group/user
 * @summary Get list group by user
 * @tags User - Roles
 */
router.route('/list-group/user').get(getAllHandler)

/**
 * GET /api/user-roles/find/role/{id}
 * @summary Get mapping by role id
 * @tags User - Roles
 * @param {string} id.path.required - Role ID
 */
router.route('/find/role/:id').get(getByRoleHandler)

/**
 * GET /api/user-roles/find/user/{id}
 * @summary Get mapping by user id
 * @tags User - Roles
 * @param {string} id.path.required - User ID
 */
router.route('/find/user/:id').get(getByUserHandler)

/**
 * PATCH /api/user-roles/update/{id}
 * @summary Update role
 * @tags User - Roles
 * @param {string} id.path.required - ID
 * @param {object} request.body.required
 * @example request - example body - application/json
 * {
 *  "name": "user"
 * }
 */
router.route('/update/:id').patch(validate(UpdateDto, true), updateHandler)

/**
 * DELETE /api/user-roles/delete/{id}
 * @summary Update role by name (?????)
 * @tags User - Roles
 * @param {string} id.path.required -  ID
 */
router.route('/delete/:id').delete(deleteHandler)

export default router
