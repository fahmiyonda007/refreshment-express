import { NextFunction, Request, Response } from 'express'
import { CreateDto, DeleteDto, UpdateDto } from '../dtos/userRoles.dto'
import { UserRoleServices } from '../services/userRole.services'
import { UserServices } from '../services/user.services'
import { RoleServices } from '../services/role.services'
import AppError from '../utils/appError'
import { UsersRoles } from '../entities/users_roles.entity'
import { Users } from '../entities/users.entity'
import { Roles } from '../entities/roles.entity'

const myServices = new UserRoleServices()
const userServices = new UserServices()
const roleServices = new RoleServices()

export const createHandler = async (
  req: Request<object, object, CreateDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userServices.findUserById(req.body.user as string)
    const role = await roleServices.getById(req.body.role as string)

    if (!user) {
      return next(new AppError(404, 'User with that ID not found'))
    }

    if (!role) {
      return next(new AppError(404, 'Role with that ID not found'))
    }

    const isExist = await myServices.getByUserAndRole(user.id, role.id)
    if (isExist) {
      return next(new AppError(404, 'Data is exist'))
    }

    const data = await myServices.create(req.body, user, role)

    res.status(201).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Data with that name already exist',
      })
    }
    next(err)
  }
}

export const getByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await myServices.getById(req.params.id)

    if (!data) {
      return next(new AppError(404, 'Role with that ID not found'))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const datas = await myServices.findAll({}, {}, { user: true, role: true })

    res.status(200).json({
      status: 'success',
      data: {
        datas,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getByUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const datas = await myServices.findAll({ user: { id: req.params.id } }, {}, { user: true, role: true })

    const user = await userServices.findUserById(req.params.id)
    const roles = datas.map(x => x.role)
    const result = { user: user, roles: roles }

    res.status(200).json({
      status: 'success',
      data: {
        result
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const updateHandler = async (
  req: Request<{ id: string }, object, UpdateDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await myServices.getById(req.params.id)

    if (!data) {
      return next(new AppError(404, 'Role with that ID not found'))
    }

    Object.assign(data, req.body)

    // const updatedData = await data.save()
    const updatedData = { message: 'success' }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedData,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const deleteHandler = async (
  req: Request<{ dataId: string }, object, DeleteDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await myServices.getById(req.params.dataId)

    if (!data) {
      return next(new AppError(404, 'Role with that ID not found'))
    }

    // const deletedData = req.params.dataId
    const deletedData = await data.remove()

    res.status(200).json({
      status: 'success',
      data: {
        data: deletedData,
      },
    })
  } catch (err: any) {
    next(err)
  }
}
