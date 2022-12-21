import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import validate from '../middleware/dtoValidation'
import { CreateDto, UpdateDto } from '../dtos/roles.dto'
import {
  createHandler,
  deleteHandler,
  getByIdHandler,
  getAllHandler,
  updateHandler,
  getByNameHandler,
} from '../controllers/role.controller'

const router = express.Router()

router.use(deserializeUser, requireUser)

/**
 * POST /api/roles/create
 * @summary create new role
 * @tags Roles
 * @param {object} request.body.required
 * @example request - example body
 * {
 *  "name": "administrator:general"
 * }
 */
router.route('/create').post(createHandler, validate(CreateDto))

/**
 * GET /api/roles/list
 * @summary Get list roles
 * @tags Roles
 */
router.route('/list').get(getAllHandler)

/**
 * GET /api/roles/find/id/{id}
 * @summary Get role by id
 * @tags Roles
 * @param {string} id.path.required - ID
 */
router.route('/find/id/:id').get(getByIdHandler)

/**
 * GET /api/roles/find/name/{name}
 * @summary Get role by name
 * @tags Roles
 * @param {string} name.path.required - Role Name
 */
router.route('/find/name/:name').get(getByNameHandler)

/**
 * PATCH /api/roles/update/{id}
 * @summary Update role
 * @tags Roles
 * @param {string} id.path.required -  Role ID
 * @param {object} request.body.required
 * @example request - example body - application/json
 * {
 *  "name": "user"
 * }
 */
router.route('/update/:id').patch(validate(UpdateDto, true), updateHandler)

/**
 * DELETE /api/roles/delete/{id}
 * @summary delete role
 * @tags Roles
 * @param {string} id.path.required -  ID
 */
router.route('/delete/:id').delete(deleteHandler)

export default router
