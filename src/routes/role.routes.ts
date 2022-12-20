import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import validate from '../middleware/dtoValidation'
import { CreateDto, DeleteDto, UpdateDto } from '../dtos/roles.dto'
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
 * @param {object} request.body.required - Body raw
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
 * GET /api/find/:id
 * @summary Get find role by id (?????)
 * @tags Roles
 * @param {string} id.query.required - ID
 */
router.route('/find/:id').get(getByIdHandler)

/**
 * GET /api/find/?name
 * @summary Get find role by name (?????)
 * @tags Roles
 * @param {string} name.query.required - Role Name
 */
router.route('/find/:name').get(getByNameHandler)

/**
 * PATCH /api/update/:id
 * @summary Update role by name (?????)
 * @tags Roles
 * @param {string} id.query.required -  ID
 */
router.route('/update/:id').patch(validate(UpdateDto, true), updateHandler)

/**
 * DELETE /api/delete/:id
 * @summary Update role by name (?????)
 * @tags Roles
 * @param {string} id.query.required -  ID
 */
router.route('/delete/:id').delete(validate(DeleteDto, true), deleteHandler)

export default router
