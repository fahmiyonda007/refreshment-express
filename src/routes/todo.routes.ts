import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import validate from '../middleware/dtoValidation'
import { CreateTodoDto, UpdateTodoDto } from '../dtos/todos.dto'
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodoHandler,
  getTodosHandler,
  updateTodoHandler,
} from '../controllers/todo.controller'
import { uploadPostImageDisk } from '../utils/upload/singleLocal'

const router = express.Router()

router.use(deserializeUser, requireUser)
router
  .route('/')
  .post(uploadPostImageDisk, validate(CreateTodoDto), createTodoHandler)
  .get(getTodosHandler)

router
  .route('/:todoId')
  .get(getTodoHandler)
  .patch(uploadPostImageDisk, validate(UpdateTodoDto, true), updateTodoHandler)
  .delete(deleteTodoHandler)

export default router
