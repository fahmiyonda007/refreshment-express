import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import Model from './model.entity'
import { Users } from './users.entity'

@Entity('todos')
export class Todo extends Model {
  @Column()
  title: string

  @Column()
  description: string

  @Column({ type: 'timestamptz', nullable: true })
  deadline: Date

  @Column({
    default: false,
  })
  isDone: boolean

  @Column({
    default: 'default-todo.png',
  })
  image: string

  @ManyToOne(() => Users, (x) => x.todos)
  @JoinColumn()
  user: Users
}
