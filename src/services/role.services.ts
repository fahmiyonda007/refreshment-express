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

  async findAll(
    where: FindOptionsWhere<Roles> = {},
    select: FindOptionsSelect<Roles> = {},
    relations: FindOptionsRelations<Roles> = {}
  ) {
    return await this.myRepository.find({
      where,
      select,
      relations,
    })
  }
}
