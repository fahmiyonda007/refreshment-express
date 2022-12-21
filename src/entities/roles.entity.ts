import { Entity, Column, OneToMany } from 'typeorm'
import Model from './model.entity'
import { RolesPermissions } from './roles_permissions.entity'
import { UsersRoles } from './users_roles.entity'

@Entity('roles')
export class Roles extends Model {
  @Column({
    unique: true,
  })
  name: string

  @OneToMany(() => RolesPermissions, (x) => x.role)
  rolesPermissions: RolesPermissions[]

  @OneToMany(() => UsersRoles, (x) => x.role)
  usersRoles: UsersRoles[]
}
