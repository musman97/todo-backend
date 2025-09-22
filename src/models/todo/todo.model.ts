import {
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    Model,
} from "sequelize";
import { db } from "../../db";

const modelName = "Todo";
const tableName = "todo";

export class Todo extends Model<
    InferAttributes<Todo>,
    InferCreationAttributes<Todo>
> {
    declare id?: number;
    declare title: string;
    declare description: string;
    declare completed?: boolean;
}

Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: db.sequelize,
        modelName,
        tableName,
        timestamps: true,
    },
);

export type TodoId = NonNullable<Todo["id"]>;
export type Todos = Todo[];
