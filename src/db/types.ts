import type { Sequelize } from "sequelize";

export interface Database {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sequelize: Sequelize;
}
