import { Entity, Column, OneToMany } from 'typeorm'
import Model from './model.entity'
import { RolesPermissions } from './roles_permissions.entity'

@Entity('roles')
export class Roles extends Model {
  @Column({
    unique: true,
  })
  name: string

  @OneToMany(() => RolesPermissions, (x) => x.roles)
  rolesPermissions: RolesPermissions[]
}
