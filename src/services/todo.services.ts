import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm'
import { CreateTodoDto } from '../dtos/todos.dto'
import { Todo } from '../entities/todos.entity'
import { User } from '../entities/users.entity'
import { AppDataSource } from '../utils/dataSource'

export class TodoServices {
  private todoRepository = AppDataSource.getRepository(Todo)

  async createTodo(input: CreateTodoDto, user: User) {
    const createdTodo = this.todoRepository.create({ ...input, user })
    return await this.todoRepository.save(createdTodo)
  }

  async getTodo(postId: string) {
    return await this.todoRepository.findOneBy({ id: postId })
  }

  async findTodos(
    where: FindOptionsWhere<Todo> = {},
    select: FindOptionsSelect<Todo> = {},
    relations: FindOptionsRelations<Todo> = {}
  ) {
    return await this.todoRepository.find({
      where,
      select,
      relations,
    })
  }
}
