import { CookieOptions, NextFunction, Request, Response } from 'express'
import config from 'config'
import crypto from 'crypto'
import { UserServices } from '../services/user.services'
import AppError from '../utils/appError'
import redisClient from '../utils/connectRedis'
import { signJwt, verifyJwt } from '../utils/jwt'
import { Users } from '../entities/users.entity'
import { UserSignInDto, UserSignUpDto } from '../dtos/auth.dto'
import Email from '../utils/email'

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
}

const userServices = new UserServices()

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
}

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
}

export const registerUserHandler = async (
  req: Request<object, object, UserSignUpDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email } = req.body

    const newUser = await userServices.createUser({
      name,
      email: email.toLowerCase(),
      password,
    })

    const { hashedVerificationCode, verificationCode } =
      Users.createVerificationCode()
    newUser.verificationCode = hashedVerificationCode
    await newUser.save()

    // Send Verification Email
    const redirectUrl = `${config.get<string>(
      'origin'
    )}/api/auth/verifyemail/${verificationCode}`

    try {
      await new Email(newUser, redirectUrl).sendVerificationCode()

      res.status(201).json({
        status: 'success',
        message:
          'An email with a verification code has been sent to your email',
      })
    } catch (error) {
      newUser.verificationCode = null
      await newUser.save()

      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending email, please try again',
      })
    }
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'User with that email already exist',
      })
    }
    next(err)
  }
}

export const loginUserHandler = async (
  req: Request<object, object, UserSignInDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await userServices.findUserByEmail({ email })

    // 1. Check if user exist
    if (!user) {
      return next(new AppError(400, 'Invalid email or password'))
    }

    // 2. Check if the user is verified
    if (!user.verified) {
      return next(new AppError(400, 'You are not verified'))
    }

    //3. Check if password is valid
    if (!(await Users.comparePasswords(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'))
    }

    // 4. Sign Access and Refresh Tokens
    const { access_token, refresh_token } = await userServices.signTokens(user)

    // 5. Add Cookies
    res.cookie('access_token', access_token, accessTokenCookieOptions)
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions)
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    // 6. Send response
    res.status(200).json({
      status: 'success',
      access_token,
      user
    })
  } catch (err: any) {
    next(err)
  }
}

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token

    const message = 'Could not refresh access token'

    if (!refresh_token) {
      return next(new AppError(403, message))
    }

    // Validate refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refreshTokenPublicKey'
    )

    if (!decoded) {
      return next(new AppError(403, message))
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub)

    if (!session) {
      return next(new AppError(403, message))
    }

    // Check if user still exist
    const user = await userServices.findUserById(JSON.parse(session).id)

    if (!user) {
      return next(new AppError(403, message))
    }

    // Sign new access token
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    })

    // 4. Add Cookies
    res.cookie('access_token', access_token, accessTokenCookieOptions)
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    // 5. Send response
    res.status(200).json({
      status: 'success',
      access_token,
    })
  } catch (err) {
    next(err)
  }
}

const logout = (res: Response) => {
  res.cookie('access_token', '', { maxAge: 1 })
  res.cookie('refresh_token', '', { maxAge: 1 })
  res.cookie('logged_in', '', { maxAge: 1 })
}

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user

    await redisClient.del(user.id)
    logout(res)

    res.status(200).json({
      status: 'success',
    })
  } catch (err) {
    next(err)
  }
}

export const verifyEmailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verificationCode = crypto
      .createHash('sha256')
      .update(req.params.verificationCode)
      .digest('hex')

    const user = await userServices.findUser({ verificationCode })

    if (!user) {
      return next(new AppError(401, 'Could not verify email'))
    }

    user.verified = true
    user.verificationCode = null
    await user.save()

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    })
  } catch (err: any) {
    next(err)
  }
}
