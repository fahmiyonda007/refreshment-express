import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import validate from '../middleware/dtoValidation'
import { CreateDto, UpdateDto } from '../dtos/permissions.dto'
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  getAllHandler,
  updateHandler,
  getByNameHandler,
} from '../controllers/permission.controller'

const router = express.Router()

router.use(deserializeUser, requireUser)

/**
 * POST /api/permissions/create
 * @summary create new role
 * @tags Permissions
 * @param {object} request.body.required
 * @example request - example body
 * {
 *  "name": "auth:user:view"
 * }
 */
router.route('/create').post(createHandler, validate(CreateDto))

/**
 * GET /api/permissions/list
 * @summary Get list permissions
 * @tags Permissions
 */
router.route('/list').get(getAllHandler)

/**
 * GET /api/permissions/find/id/{id}
 * @summary Get permission by id
 * @tags Permissions
 * @param {string} id.path.required - ID
 */
router.route('/find/id/:id').get(getByIdHandler)

/**
 * GET /api/permissions/find/name/{name}
 * @summary Get permission by name
 * @tags Permissions
 * @param {string} name.path.required - Role Name
 */
router.route('/find/name/:name').get(getByNameHandler)

/**
 * PATCH /api/permissions/update/{id}
 * @summary Update permission
 * @tags Permissions
 * @param {string} id.path.required -  Role ID
 * @param {object} request.body.required
 * @example request - example body - application/json
 * {
 *  "name": "auth:user:view"
 * }
 */
router.route('/update/:id').patch(validate(UpdateDto, true), updateHandler)

/**
 * DELETE /api/permissions/delete/{id}
 * @summary delete permission
 * @tags Permissions
 * @param {string} id.path.required -  ID
 */
router.route('/delete/:id').delete(deleteHandler)

export default router
