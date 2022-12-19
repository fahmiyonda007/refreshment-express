import { Entity, ManyToOne, JoinColumn } from 'typeorm'
import Model from './model.entity'
import { Users } from './users.entity'
import { Roles } from './roles.entity'

@Entity('users_roles')
export class UsersRoles extends Model {
  @ManyToOne(() => Users, (x) => x.usersRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: Users

  @ManyToOne(() => Roles, (x) => x.usersRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  role: Roles
}
