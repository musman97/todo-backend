import { app } from "./app";
import { Env } from "./config";

const startServer = async () => {
    const port = Env.PORT;
    const host = "localhost";

    try {
        await app.listen({ port, host });
        console.log(`Server is running on http://${host}:${port}`);
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
