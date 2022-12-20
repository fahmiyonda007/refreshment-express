import { NextFunction, Request, Response } from 'express'
import { UserServices } from '../services/user.services'

const myServices = new UserServices()

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  } catch (err) {
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
