import { NextFunction, Request, Response } from 'express'
import config from 'config'
import { CreateDto, UpdateDto } from '../dtos/roles.dto'
import { RoleServices } from '../services/role.services'
import AppError from '../utils/appError'
import { Like } from 'typeorm'

const myServices = new RoleServices()
const maxLimit = config.get<number>('maxLimitPagination')

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
        message: 'Role with that name already exist',
      })
    }
    next(err)
  }
}

export const getAllHandler = async (
  req: Request<object, object, object, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = !req.query.limit ? 10 : req.query.limit
    const offset = !req.query.offset ? 0 : req.query.offset
    const filterByName = !req.query.filter ? '' : req.query.filter

    if (limit - offset > maxLimit) {
      return next(new AppError(413, 'To many data request max 500'))
    }
    const [datas, count] = await myServices.findAll(
      filterByName && {name:Like(`%${filterByName}%`)},
      {},
      {},
      limit,
      offset
    )

    res.status(200).json({
      status: 'success',
      data: datas,
      meta: {
        total: count,
        limit,
        offset,
      },
    })
  } catch (err: any) {
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
      return next(new AppError(404, 'Role with that ID not found'))
    }

    res.status(200).json({
      status: 'success',
      data: data,
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
      return next(new AppError(404, 'Role with that ID not found'))
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
