import type { CreateTodoDao, UpdateTodoDao } from "../../dao";
import { Todo, type TodoId } from "../../models";
import type { PaginationParams } from "../../types";

const createTodoController = () => {
    return {
        async getAll({ limit, offset }: PaginationParams) {
            const { rows: todos, count: totalTodos } =
                await Todo.findAndCountAll({ limit, offset });

            return {
                todos,
                totalTodos,
            };
        },
        async create(dao: CreateTodoDao) {
            return await Todo.create(dao);
        },
        async update(id: TodoId, dao: UpdateTodoDao) {
            const [rowsChanged] = await Todo.update(dao, { where: { id } });

            if (rowsChanged === 0) {
                return {
                    error: `Todo with id: ${id} does not exists`,
                };
            }

            const updatedTodo = await Todo.findOne({ where: { id } });

            return {
                updatedTodo,
            };
        },
    };
};

export const todoController = createTodoController();
