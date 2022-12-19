import { Entity, Column, OneToMany } from 'typeorm'
import Model from './model.entity'
import { RolesPermissions } from './roles_permissions.entity'

@Entity('permissions')
export class Permissions extends Model {
  @Column({
    unique: true,
  })
  name: string

  @OneToMany(() => RolesPermissions, (x) => x.permission)
  rolesPermissions: RolesPermissions[]
}
