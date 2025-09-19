import { Todo, type Todos } from "../../models";
import type { GeneralReply } from "../../types";

const createTodoController = () => {
    return {
        async getAll(): Promise<GeneralReply<Todos>> {
            const todos = await Todo.findAll();

            return {
                success: true,
                data: todos,
            };
        },
    };
};

export const todoController = createTodoController();
