import config from 'config'
import { User } from '../entities/user.entity'
import { UserSignUpDto } from '../dtos/auth.dto'
import { AppDataSource } from '../utils/dataSource'
import redisClient from '../utils/connectRedis'
import { signJwt } from '../utils/jwt'

export class UserServices {
  private userRepository = AppDataSource.getRepository(User)

  async createUser(input: UserSignUpDto) {
    const createdUser = this.userRepository.create(input)
    return await this.userRepository.save(createdUser)
  }

  async findUserByEmail({ email }: { email: string }) {
    return await this.userRepository.findOneBy({ email })
  }

  async findUserById(userId: string) {
    return await this.userRepository.findOneBy({ id: userId })
  }

  async findUser(query: object) {
    return await this.userRepository.findOneBy(query)
  }

  async signTokens(user: User) {
    // 1. Create Session
    redisClient.set(user.id, JSON.stringify(user), {
      EX: config.get<number>('redisCacheExpiresIn') * 60,
    })

    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    })

    const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
      expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    })

    return { access_token, refresh_token }
  }
}
