import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import validate from '../middleware/dtoValidation'
import { CreateDto, DeleteDto, UpdateDto } from '../dtos/roles.dto'
import {
  createHandler,
  deleteHandler,
  getHandler,
  getAllHandler,
  updateHandler,
} from '../controllers/role.controller'

const router = express.Router()

router.use(deserializeUser, requireUser)
router.route('/').post(createHandler, validate(CreateDto)).get(getAllHandler)

router
  // .route('/:id')
  .get('/find/:id', getHandler)
  .patch('/update', validate(UpdateDto, true), updateHandler)
  .delete('/delete', validate(DeleteDto, true), deleteHandler)

export default router
