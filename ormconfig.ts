// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import config from 'config'

const postgresConfig = config.get<{
  host: string
  port: number
  username: string
  password: string
  database: string
}>('postgresConfig')

export default {
  ...postgresConfig,
  type: 'postgres',
  entities: ['src/entities/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/seeds/factories/**/*{.ts,.js}'],
}
