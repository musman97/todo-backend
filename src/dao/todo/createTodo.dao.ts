import type { Todo } from "../../models";

export type CreateTodoDao = Pick<Todo, "description" | "title"> &
    Partial<Pick<Todo, "completed">>;
