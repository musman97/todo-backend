import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const Env = cleanEnv(process.env, {
    PORT: num({ default: 3000 }),
    DB_HOST: str({ default: "" }),
    DB_PORT: num({ default: 0 }),
    DB_USER: str({ default: "" }),
    DB_PASSWORD: str({ default: "" }),
    DB_NAME: str({ default: "" }),
});
