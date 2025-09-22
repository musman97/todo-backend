import { app } from "./app";
import { Env } from "./config";
import { db } from "./db";

const regitserGracefulShutdownListeners = async () => {
    const shutdownSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    let isShuttingDown = false;

    async function gracefulShutdown(signal: NodeJS.Signals): Promise<void> {
        if (isShuttingDown) {
            return;
        }

        isShuttingDown = true;
        console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

        try {
            // Close database connection
            await db.disconnect();

            console.log("Database connection closed successfully.");

            // Add other cleanup tasks here (e.g., close HTTP server, Redis connections, etc.)

            process.exit(0);
        } catch (error) {
            console.error("Error during graceful shutdown:", error);
            process.exit(1);
        }
    }

    // Handle shutdown signals
    shutdownSignals.forEach((signal) => {
        process.on(signal, () => gracefulShutdown(signal));
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", async (error) => {
        console.error("Uncaught Exception:", error);
        await gracefulShutdown("SIGTERM");
    });

    // Handle unhandled rejections
    process.on("unhandledRejection", async (reason, promise) => {
        console.error("Unhandled Rejection at:", promise, "reason:", reason);
        await gracefulShutdown("SIGTERM");
    });

    console.log("Graceful shutdown handlers registered.");
};

const startServer = async () => {
    try {
        await db.connect();
        regitserGracefulShutdownListeners();

        await db.sequelize.sync({});

        const port = Env.PORT;
        const host = Env.isProduction ? "0.0.0.0" : "localhost";

        await app.listen({ port, host });

        console.log(`Server is running on http://${host}:${port}`);
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
