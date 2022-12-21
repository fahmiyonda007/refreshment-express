import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm'
import { CreateDto } from '../dtos/permissions.dto'
import { Permissions } from '../entities/permissions.entity'
import { AppDataSource } from '../utils/dataSource'

export class PermissionServices {
  private myRepository = AppDataSource.getRepository(Permissions)

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
    where: FindOptionsWhere<Permissions> = {},
    select: FindOptionsSelect<Permissions> = {},
    relations: FindOptionsRelations<Permissions> = {}
  ) {
    return await this.myRepository.find({
      where,
      select,
      relations,
    })
  }
}
