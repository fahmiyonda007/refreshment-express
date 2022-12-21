import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm'
import { CreateDto } from '../dtos/userRoles.dto'
import { Users } from '../entities/users.entity'
import { Roles } from '../entities/roles.entity'
import { UsersRoles } from '../entities/users_roles.entity'
import { AppDataSource } from '../utils/dataSource'

export class UserRoleServices {
  private myRepository = AppDataSource.getRepository(UsersRoles)

  async create(input: CreateDto, user: Users, role: Roles) {
    const created = this.myRepository.create({ ...input, user, role })
    return await this.myRepository.save(created)
  }

  async getById(id: string) {
    return await this.myRepository.findOneBy({ id: id })
  }

  async getByUserAndRole(user: string, role: string) {
    return await this.myRepository.findOne({
      where: { user: { id: user }, role: { id: role } },
    })
  }

  async findAll(
    where: FindOptionsWhere<UsersRoles> = {},
    select: FindOptionsSelect<UsersRoles> = {},
    relations: FindOptionsRelations<UsersRoles> = {}
  ) {
    return await this.myRepository.find({
      where,
      select,
      relations,
    })
  }
}
