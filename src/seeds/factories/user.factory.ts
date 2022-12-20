import { faker } from '@faker-js/faker'
import { define } from 'typeorm-seeding'
import { Users } from '../../entities/users.entity'

define(Users, (fak: typeof faker) => {
  const user = new Users()
  user.name = fak.name.fullName()
  user.email = fak.internet.email()
  user.password = 'admin123'
  return user
})
