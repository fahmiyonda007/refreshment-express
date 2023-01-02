import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm'
import { CreateDto } from '../dtos/roles.dto'
import { Roles } from '../entities/roles.entity'
import { AppDataSource } from '../utils/dataSource'

export class RoleServices {
  private myRepository = AppDataSource.getRepository(Roles)

  async create(input: CreateDto) {
    const created = this.myRepository.create({ ...input })
    return await this.myRepository.save(created)
  }

  async getById(id: string) {
    return await this.myRepository.findOneBy({ id: id })
  }

  async getByName(name: string) {
    return await this.myRepository.findOneBy({ name: name })
  }

  async findAll(
    where: FindOptionsWhere<Roles> = {},
    select: FindOptionsSelect<Roles> = {},
    relations: FindOptionsRelations<Roles> = {},
    take = 10,
    skip = 0
  ) {
    return await this.myRepository.findAndCount({
      where,
      select,
      relations,
      take,
      skip,
    })
  }
}
