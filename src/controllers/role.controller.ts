import { NextFunction, Request, Response } from 'express'
import { CreateDto, DeleteDto, UpdateDto } from '../dtos/roles.dto'
import { RoleServices } from '../services/role.services'
import AppError from '../utils/appError'

const myServices = new RoleServices()

export const createHandler = async (
  req: Request<object, object, CreateDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await myServices.create(req.body)

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
        message: 'Role with that name already exist',
      })
    }
    next(err)
  }
}

export const getHandler = async (
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
    const datas = await myServices.findAll({}, {}, {})

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

    const updatedData = await data.save()

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
  req: Request<{ dataId: string }>,
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
