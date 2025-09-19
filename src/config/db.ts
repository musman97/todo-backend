import type { Options } from "sequelize";
import { Env } from "./env";

export const dbConfig: Options = {
    database: Env.DB_NAME,
    username: Env.DB_USER,
    password: Env.DB_PASSWORD,
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
