import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import Model from './model.entity'
import { Roles } from './roles.entity'
import { Permissions } from './permissions.entity'

@Entity('roles_permissions')
export class RolesPermissions extends Model {
  @ManyToOne(() => Roles, (roles) => roles.rolesPermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  roles: Roles

  @ManyToOne(() => Permissions, (permissions) => permissions.rolesPermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  permissions: Permissions
}
