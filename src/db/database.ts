import { type Options, Sequelize } from "sequelize";
import { dbConfig } from "../config";
import type { Database } from "./types.ts";

const createDatabase = (config: Options): Database => {
    const sequelize = new Sequelize(config);
    let isConnected = false;

    const connect = async () => {
        if (isConnected) {
            return;
        }

        try {
            await sequelize.authenticate();
            isConnected = true;
            console.log("Database connected successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
            throw error;
        }
    };

    const disconnect = async () => {
        if (!isConnected) {
            return;
        }

        try {
            await sequelize.close();
            isConnected = false;
            console.log("Database disconnected successfully.");
        } catch (error) {
            console.error(
                "Error while disconnecting from the database:",
                error,
            );
            throw error;
        }
    };

    return {
        connect,
        disconnect,
        get sequelize() {
            return sequelize;
        },
    };
};

export const db = createDatabase(dbConfig);
