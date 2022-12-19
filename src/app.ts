// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import express, { NextFunction, Request, Response } from 'express'
import config from 'config'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import expressJSDocSwagger from 'express-jsdoc-swagger'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { AppDataSource } from './utils/dataSource'
import AppError from './utils/appError'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import todoRouter from './routes/todo.routes'
import roleRouter from './routes/role.routes'
import validateEnv from './utils/validateEnv'
import redisClient from './utils/connectRedis'

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv()

    const app = express()

    // TEMPLATE ENGINE
    app.set('view engine', 'pug')
    app.set('views', `${__dirname}/views`)

    // MIDDLEWARE

    // 1. Body parser
    app.use(express.json({ limit: '10kb' }))

    // 2. Logger
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

    // 3. Cookie Parser
    app.use(cookieParser())

    // 4. Cors
    app.use(
      cors({
        origin: config.get<string>('origin'),
        credentials: true,
      })
    )

    const port = config.get<number>('port')

    const options = {
      info: {
        version: '1.0.0',
        title: 'REST API Refreshment-Express',
        license: {
          name: 'MIT',
        },
      },
      security: {
        BasicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
      // Base directory which we use to locate your JSDOC files
      baseDir: __dirname,
      // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
      filesPattern: './**/*.ts',
      // URL where SwaggerUI will be rendered
      swaggerUIPath: '/api-docs',
      // Expose OpenAPI UI
      exposeSwaggerUI: true,
      // Expose Open API JSON Docs documentation in `apiDocsPath` path.
      exposeApiDocs: false,
      // Open API JSON Docs endpoint.
      apiDocsPath: '/v3/api-docs',
      // Set non-required fields as nullable by default
      notRequiredAsNullable: false,
      // You can customize your UI options.
      // you can extend swagger-ui-express config. You can checkout an example of this
      // in the `example/configuration/swaggerOptions.js`
      swaggerUiOptions: {},
      // multiple option in case you want more that one instance
      multiple: true,
    }

    expressJSDocSwagger(app)(options)

    app.use('/api/auth', authRouter)
    app.use('/api/users', userRouter)
    app.use('/api/todos', todoRouter)
    app.use('/api/roles', roleRouter)

    // HEALTH CHECKER
    app.get('/api/healthChecker', async (_, res: Response) => {
      const message = await redisClient.get('try')

      res.status(200).json({
        status: 'success',
        message,
      })
    })

    // UNHANDLED ROUTE
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`))
    })

    // GLOBAL ERROR HANDLER
    app.use((error: AppError, req: Request, res: Response) => {
      error.status = error.status || 'error'
      error.statusCode = error.statusCode || 500

      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      })
    })

    app.listen(port)

    // eslint-disable-next-line no-console
    console.log(`Server started on port: ${port}`)
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error))
