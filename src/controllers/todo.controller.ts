import { NextFunction, Request, Response } from 'express'
import { CreateTodoDto, UpdateTodoDto } from '../dtos/todos.dto'
import { TodoServices } from '../services/todo.services'
import { UserServices } from '../services/user.services'
import AppError from '../utils/appError'

const userServices = new UserServices()
const todoServices = new TodoServices()

export const createTodoHandler = async (
  req: Request<object, object, CreateTodoDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userServices.findUserById(res.locals.user.id as string)
    if (!user) {
      return next(new AppError(404, 'User with that ID not found'))
    }
    const todo = await todoServices.createTodo(req.body, user)

    res.status(201).json({
      status: 'success',
      data: {
        todo,
      },
    })
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Todo with that title already exist',
      })
    }
    next(err)
  }
}

export const getTodoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoServices.getTodo(req.params.todoId)

    if (!todo) {
      return next(new AppError(404, 'Todo with that ID not found'))
    }

    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getTodosHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await todoServices.findTodos({}, {}, { user: true })

    res.status(200).json({
      status: 'success',
      data: {
        todos,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const updateTodoHandler = async (
  req: Request<{ todoId: string }, object, UpdateTodoDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoServices.getTodo(req.params.todoId)

    if (!todo) {
      return next(new AppError(404, 'Todo with that ID not found'))
    }

    Object.assign(todo, req.body)

    const updatedTodo = await todo.save()

    res.status(200).json({
      status: 'success',
      data: {
        todo: updatedTodo,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const deleteTodoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoServices.getTodo(req.params.todoId)

    if (!todo) {
      return next(new AppError(404, 'Todo with that ID not found'))
    }

    await todo.remove()

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (err: any) {
    next(err)
  }
}
