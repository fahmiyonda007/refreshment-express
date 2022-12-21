import { NextFunction, Request, Response } from 'express'
import { CreateDto, UpdateDto } from '../dtos/permissions.dto'
import { PermissionServices } from '../services/permission.services'
import AppError from '../utils/appError'

const myServices = new PermissionServices()

export const createHandler = async (
  req: Request<object, object, CreateDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await myServices.create(req.body)

    res.status(201).json({
      status: 'success',
      data: data,
    })
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Permission with that name already exist',
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
      return next(new AppError(404, 'Permission with that ID not found'))
    }

    res.status(200).json({
      status: 'success',
      data: data,
    })
  } catch (err: any) {
    next(err)
  }
}

export const getByNameHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await myServices.getByName(req.params.name)

    if (!data) {
      return next(new AppError(404, 'Permission with that ID not found'))
    }

    res.status(200).json({
      status: 'success',
      data: data,
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
      data: datas,
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
      return next(new AppError(404, 'Permission with that ID not found'))
    }

    Object.assign(data, req.body)

    const updatedData = await data.save()

    res.status(200).json({
      status: 'success',
      data: updatedData,
    })
  } catch (err: any) {
    next(err)
  }
}

export const deleteHandler = async (
  req: Request<{ id: string }, object, object>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await myServices.getById(req.params.id)

    if (!data) {
      return next(new AppError(404, 'Permission with that ID not found'))
    }

    const deletedData = await data.remove()

    res.status(200).json({
      status: 'success',
      data: deletedData,
    })
  } catch (err: any) {
    next(err)
  }
}
