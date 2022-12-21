import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import validate from '../middleware/dtoValidation'
import { CreateDto, UpdateDto } from '../dtos/rolePermissions.dto'
import {
  createHandler,
  deleteHandler,
  getAllHandler,
  updateHandler,
  getByPermissionHandler,
  getByRoleHandler,
} from '../controllers/rolePermission.controller'

const router = express.Router()

router.use(deserializeUser, requireUser)

/**
 * POST /api/role-permissions/create
 * @summary create new
 * @tags Role - Permissions
 * @param {object<CreateDto>} request.body.required
 * @example request - example body
 * {
 *  "role": "b998a3d5-5d79-40bb-8137-00cafe71f5eb",
 *  "permission": "a913d21e-ed50-4765-916d-1083a400f71b"
 * }
 */
router.route('/create').post(createHandler, validate(CreateDto))

/**
 * GET /api/role-permissions/group/role
 * @summary Get list group by role
 * @tags Role - Permissions
 */
router.route('/group/role').get(getAllHandler)

/**
 * GET /api/role-permissions/find/role/{id}
 * @summary Get mapping by role id
 * @tags Role - Permissions
 * @param {string} id.path.required - Role ID
 */
router.route('/find/role/:id').get(getByRoleHandler)

/**
 * GET /api/role-permissions/find/permission/{id}
 * @summary Get mapping by permission id
 * @tags Role - Permissions
 * @param {string} id.path.required - User ID
 */
router.route('/find/permission/:id').get(getByPermissionHandler)

/**
 * PATCH /api/role-permissions/update/{id}
 * @summary Update (?????)
 * @tags Role - Permissions
 * @param {string} id.path.required - ID
 * @param {object} request.body.required
 * @example request - example body - application/json
 * {
 *  "name": "user"
 * }
 */
router.route('/update/:id').patch(validate(UpdateDto, true), updateHandler)

/**
 * DELETE /api/role-permissions/delete/{id}
 * @summary Delete (?????)
 * @tags Role - Permissions
 * @param {string} id.path.required -  ID
 */
router.route('/delete/:id').delete(deleteHandler)

export default router
