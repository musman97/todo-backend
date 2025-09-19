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
    };
};

export const todoController = createTodoController();
