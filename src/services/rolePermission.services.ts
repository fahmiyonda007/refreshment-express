import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm'
import { CreateDto } from '../dtos/userRoles.dto'
import { Roles } from '../entities/roles.entity'
import { Permissions } from '../entities/permissions.entity'
import { RolesPermissions } from '../entities/roles_permissions.entity'
import { AppDataSource } from '../utils/dataSource'

export class RolePermissionServices {
  private myRepository = AppDataSource.getRepository(RolesPermissions)

  async create(input: CreateDto, permission: Permissions, role: Roles) {
    const created = this.myRepository.create({ ...input, permission, role })
    return await this.myRepository.save(created)
  }

  async getById(id: string) {
    return await this.myRepository.findOneBy({ id: id })
  }

  async getByPermissionAndRole(permissionId: string, roleId: string) {
    return await this.myRepository.findOne({
      where: { permission: { id: permissionId }, role: { id: roleId } },
    })
  }

  async findAll(
    where: FindOptionsWhere<RolesPermissions> = {},
    select: FindOptionsSelect<RolesPermissions> = {},
    relations: FindOptionsRelations<RolesPermissions> = {}
  ) {
    return await this.myRepository.find({
      where,
      select,
      relations,
    })
  }
}
