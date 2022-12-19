import { Entity, ManyToOne, JoinColumn } from 'typeorm'
import Model from './model.entity'
import { Roles } from './roles.entity'
import { Permissions } from './permissions.entity'

@Entity('roles_permissions')
export class RolesPermissions extends Model {
  @ManyToOne(() => Roles, (x) => x.rolesPermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  role: Roles

  @ManyToOne(() => Permissions, (x) => x.rolesPermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  permission: Permissions
}
