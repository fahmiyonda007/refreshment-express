import { MigrationInterface, QueryRunner } from 'typeorm'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

export class userSeeds1671524516396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let index = 0; index < 100; index++) {
      const name = faker.name.fullName().replace(/['`"]+/g, '')
      const email = faker.internet.email()
      const password = await bcrypt.hash('admin123', 12)

      await queryRunner.query(
        `insert into users (name,email,password) values ('${name}','${email}','${password}')`
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM USER`)
  }
}
