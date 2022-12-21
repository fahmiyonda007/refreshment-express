import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { Users } from '../entities/users.entity'

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    dataSource.initialize().then(async () => {
      await factory(Users)().createMany(15)
    })
  }
}
