import type { CreateTodoDao } from "../../dao";
import { Todo } from "../../models";
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
    };
};

export const todoController = createTodoController();
