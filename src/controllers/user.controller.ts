import { NextFunction, Request, Response } from 'express'
import { UserServices } from '../services/user.services'
import AppError from '../utils/appError'
import config from 'config'
import { UserRoleServices } from '../services/userRole.services'
import { PaginationDto } from '../dtos/pagination.dto'

const myServices = new UserServices()
const userRoleServices = new UserRoleServices()

const maxLimit = config.get<number>('maxLimitPagination')

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user
    const roles = await (
      await userRoleServices.findAll(
        { user: { id: user.id } },
        {},
        { user: false, role: true }
      )
    ).map((x) => x.role)

    res
      .status(200)
      .status(200)
      .json({
        status: 'success',
        data: { user: user, roles: roles },
      })
  } catch (err) {
    next(err)
  }
}

export const getAllHandler = async (
  req: Request<object, object, object, PaginationDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = !req.query.limit ? 10 : req.query.limit
    const offset = !req.query.offset ? 0 : req.query.offset

    if (limit - offset > maxLimit) {
      return next(new AppError(413, 'To many data request max 500'))
    }

    const [datas, count] = await myServices.findAllPagination(
      {},
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
